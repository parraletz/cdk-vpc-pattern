import { Tags } from 'aws-cdk-lib'
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
  readonly enableKubernenetes?: boolean
  readonly kubernetesClusterName?: string
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

    const vpc = new Vpc(this, 'VPC', {
      vpcName: props?.name,
      maxAzs: props?.azs.length,
      ipAddresses: ec2.IpAddresses.cidr(props.cidr),
      subnetConfiguration: [],
      createInternetGateway: false,
    })
    const internetGateway = new ec2.CfnInternetGateway(
      this,
      `${props.name}-igw`,
      {}
    )

    new ec2.CfnVPCGatewayAttachment(this, `${props.name}-igw-attachment`, {
      vpcId: vpc.vpcId,
      internetGatewayId: internetGateway.ref,
    })

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

      const elasitcIP = new ec2.CfnEIP(this, `EIP-${azs[i]}`)

      const natGateway = new ec2.CfnNatGateway(this, `Natgateway-${azs[i]}`, {
        subnetId: publicSubnet.subnetId,
        allocationId: elasitcIP.attrAllocationId,
      })

      this.natGateways.push(natGateway.ref as string)

      Tags.of(publicSubnet).add('Name', `${props.name}-public-${azs[i]}`)
      Tags.of(publicSubnet).add('Tier', 'Public')
      if (props?.enableKubernenetes) {
        Tags.of(publicSubnet).add('kubernetes.io/role/elb', '1')
        Tags.of(publicSubnet).add(
          `kubernetes.io/cluster/${props.kubernetesClusterName}`,
          'owned'
        )
      }

      this.publicSubnets.push(publicSubnet)
    }

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
      Tags.of(privateSubnet).add('Name', `${props.name}-private-${azs[i]}`)
      Tags.of(privateSubnet).add('Tier', 'Private')

      if (props?.enableKubernenetes) {
        Tags.of(privateSubnet).add('kubernetes.io/role/internal-elb', '1')
        Tags.of(privateSubnet).add(
          `kubernetes.io/cluster/${props.kubernetesClusterName}`,
          'owned'
        )
      }
      this.privateSubnets.push(privateSubnet)
    }

    if (props?.databaseSubnets) {
      for (let i = 0; i < azs.length; i++) {
        const databaseSubnet = new ec2.PrivateSubnet(
          this,
          `DatabaseSubnet-${azs[i]}`,
          {
            vpcId: vpc.vpcId,
            availabilityZone: azs[i],
            cidrBlock: props?.databaseSubnets[i] ?? '',
            mapPublicIpOnLaunch: false,
          }
        )
        Tags.of(databaseSubnet).add('Name', `${props.name}-database-${azs[i]}`)
        Tags.of(databaseSubnet).add('Tier', 'Private')
      }
    }
    this.vpcId = vpc
    this.privateSubnets = vpc.privateSubnets
    this.publicSubnets = vpc.publicSubnets
  }
}
