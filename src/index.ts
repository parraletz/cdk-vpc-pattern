import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { Vpc } from 'aws-cdk-lib/aws-ec2'
import { Construct } from 'constructs'

export interface VpcProps {
  readonly name: string
  readonly cidr: string
  readonly azs: string[]
  readonly publicSubnets: string[]
  readonly privateSubnets: string[]
  readonly databaseSubnets?: string[]
}

export class VpcPattern extends Construct {
  private natGateways: string[] = []
  public vpcId: ec2.IVpc
  public privateSubnets: ec2.ISubnet[] = []
  public publicSubnets: ec2.ISubnet[] = []
  public databaseSubnets: ec2.ISubnet[] = []

  constructor(scope: Construct, id: string, props: VpcProps) {
    super(scope, id)

    const azs = props?.azs || ['us-west-2a', 'us-west-2b', 'us-west-2c']

    const vpc = new Vpc(this, props.name, {
      vpcName: props?.name,
      maxAzs: props?.azs.length,
      ipAddresses: ec2.IpAddresses.cidr(props.cidr),
      subnetConfiguration: [],
      createInternetGateway: false,
    })
    const internetGateway = new ec2.CfnInternetGateway(this, `${id}-igw`, {})

    new ec2.CfnVPCGatewayAttachment(this, `${id}-igw-attachment`, {
      vpcId: vpc.vpcId,
      internetGatewayId: internetGateway.ref,
    })

    for (let i = 0; i < azs.length; i++) {
      const privateSubnet = new ec2.PrivateSubnet(
        this,
        `PrivateSubnet-${azs[i]}`,
        {
          vpcId: vpc.vpcId,
          availabilityZone: azs[i],
          cidrBlock: props?.privateSubnets[i] ?? '',
          mapPublicIpOnLaunch: false,
        }
      )
      privateSubnet.addRoute('DefaultRoute', {
        routerId: this.natGateways[i],
        routerType: ec2.RouterType.NAT_GATEWAY,
        destinationCidrBlock: '0.0.0.0/0',
      })
    }

    for (let i = 0; i < azs.length; i++) {
      const publicSubnet = new ec2.PublicSubnet(
        this,
        `PublicSubnet-${azs[i]}`,
        {
          vpcId: vpc.vpcId,
          availabilityZone: azs[i],
          cidrBlock: props?.publicSubnets[i] ?? '',
          mapPublicIpOnLaunch: true,
        }
      )
      publicSubnet.addRoute('DefaultRoute', {
        routerId: internetGateway.ref,
        routerType: ec2.RouterType.GATEWAY,
        destinationCidrBlock: '0.0.0.0/0',
      })
    }

    if (props?.databaseSubnets) {
      for (let i = 0; i < azs.length; i++) {
        new ec2.PrivateSubnet(this, `DatabaseSubnet-${azs[i]}`, {
          vpcId: vpc.vpcId,
          availabilityZone: azs[i],
          cidrBlock: props?.databaseSubnets[i] ?? '',
          mapPublicIpOnLaunch: false,
        })
      }
    }

    this.vpcId = vpc
    this.privateSubnets = vpc.privateSubnets
    this.publicSubnets = vpc.publicSubnets
  }
}
