import { Tags } from "aws-cdk-lib"
import * as ec2 from "aws-cdk-lib/aws-ec2"
import { Vpc } from "aws-cdk-lib/aws-ec2"
import { Construct } from "constructs"

/**
 * Properties for creating a VPC pattern.
 *
 * @example
 * ```typescript
 * const vpcProps: VpcProps = {
 *   name: 'my-vpc',
 *   cidr: '10.0.0.0/16',
 *   azs: ['us-west-2a', 'us-west-2b', 'us-west-2c'],
 *   publicSubnets: ['10.0.1.0/24', '10.0.2.0/24', '10.0.3.0/24'],
 *   privateSubnets: ['10.0.4.0/24', '10.0.5.0/24', '10.0.6.0/24'],
 *   databaseSubnets: ['10.0.7.0/24', '10.0.8.0/24', '10.0.9.0/24'],
 *   enableKubernenetes: true,
 *   kubernetesClusterName: 'my-eks-cluster'
 * };
 * ```
 */
export interface VpcProps {
  /** The name of the VPC. */
  readonly name: string
  /** The CIDR block for the VPC. */
  readonly cidr: string
  /** The availability zones to use. */
  readonly azs: string[]
  /** The CIDR blocks for public subnets. */
  readonly publicSubnets: string[]
  /** The CIDR blocks for private subnets. */
  readonly privateSubnets: string[]
  /** Optional CIDR blocks for database subnets. */
  readonly databaseSubnets?: string[]
  /** Whether to enable Kubernetes tags. */
  readonly enableKubernenetes?: boolean
  /** The name of the Kubernetes cluster (required if enableKubernenetes is true). */
  readonly kubernetesClusterName?: string
}

/**
 * A construct that creates a VPC with public, private, and optional database subnets.
 * Includes NAT Gateways for private subnet internet access and proper tagging for Kubernetes if enabled.
 *
 * @example
 * ```typescript
 * import { App, Stack } from 'aws-cdk-lib';
 * import { VpcPattern } from './vpc-pattern';
 *
 * const app = new App();
 * const stack = new Stack(app, 'MyStack');
 *
 * // Create a VPC with public, private, and database subnets
 * const vpc = new VpcPattern(stack, 'MyVpc', {
 *   name: 'production-vpc',
 *   cidr: '10.0.0.0/16',
 *   azs: ['us-west-2a', 'us-west-2b', 'us-west-2c'],
 *   publicSubnets: ['10.0.1.0/24', '10.0.2.0/24', '10.0.3.0/24'],
 *   privateSubnets: ['10.0.4.0/24', '10.0.5.0/24', '10.0.6.0/24'],
 *   databaseSubnets: ['10.0.7.0/24', '10.0.8.0/24', '10.0.9.0/24']
 * });
 *
 * // For Kubernetes use case
 * const eksVpc = new VpcPattern(stack, 'EksVpc', {
 *   name: 'eks-vpc',
 *   cidr: '10.1.0.0/16',
 *   azs: ['us-west-2a', 'us-west-2b'],
 *   publicSubnets: ['10.1.1.0/24', '10.1.2.0/24'],
 *   privateSubnets: ['10.1.3.0/24', '10.1.4.0/24'],
 *   enableKubernenetes: true,
 *   kubernetesClusterName: 'my-eks-cluster'
 * });
 *
 * // Access the created VPC and subnets
 * const vpcId = vpc.vpcId;
 * const privateSubnets = vpc.privateSubnets;
 * const publicSubnets = vpc.publicSubnets;
 * ```
 */
export class VpcPattern extends Construct {
  /** References to the NAT Gateways created in the VPC. */
  private natGateways: string[] = []

  /**
   * The VPC instance.
   * @example
   * ```typescript
   * // Access the VPC to use in other constructs
   * const myVpc = vpcPattern.vpcId;
   * ```
   */
  public vpcId: ec2.IVpc

  /**
   * The private subnets created in the VPC.
   * @example
   * ```typescript
   * // Use private subnets for an RDS instance
   * new rds.DatabaseInstance(this, 'Database', {
   *   vpc: vpcPattern.vpcId,
   *   vpcSubnets: {
   *     subnets: vpcPattern.privateSubnets
   *   },
   *   // other properties...
   * });
   * ```
   */
  public privateSubnets: ec2.ISubnet[] = []

  /**
   * The public subnets created in the VPC.
   * @example
   * ```typescript
   * // Use public subnets for a load balancer
   * new elbv2.ApplicationLoadBalancer(this, 'ALB', {
   *   vpc: vpcPattern.vpcId,
   *   internetFacing: true,
   *   vpcSubnets: {
   *     subnets: vpcPattern.publicSubnets
   *   }
   * });
   * ```
   */
  public publicSubnets: ec2.ISubnet[] = []

  /**
   * The database subnets created in the VPC (if specified).
   * @example
   * ```typescript
   * // Use database subnets for an RDS instance
   * if (vpcPattern.databaseSubnets.length > 0) {
   *   new rds.DatabaseInstance(this, 'Database', {
   *     vpc: vpcPattern.vpcId,
   *     vpcSubnets: {
   *       subnets: vpcPattern.databaseSubnets
   *     },
   *     // other properties...
   *   });
   * }
   * ```
   */
  public databaseSubnets: ec2.ISubnet[] = []

  /**
   * Creates a new VPC pattern.
   * @param scope The parent construct.
   * @param id The construct ID.
   * @param props The VPC properties.
   *
   * @example
   * ```typescript
   * // Basic usage
   * const vpc = new VpcPattern(this, 'MyVpc', {
   *   name: 'app-vpc',
   *   cidr: '10.0.0.0/16',
   *   azs: ['us-west-2a', 'us-west-2b'],
   *   publicSubnets: ['10.0.1.0/24', '10.0.2.0/24'],
   *   privateSubnets: ['10.0.3.0/24', '10.0.4.0/24']
   * });
   * ```
   */
  constructor(scope: Construct, id: string, props: VpcProps) {
    super(scope, id)

    const azs = props?.azs || ["us-west-2a", "us-west-2b", "us-west-2c"]

    const vpc = new Vpc(this, "VPC", {
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
          cidrBlock: props?.publicSubnets[i] ?? "",
          mapPublicIpOnLaunch: true,
        }
      )
      publicSubnet.addRoute("DefaultRoute", {
        routerId: internetGateway.ref,
        routerType: ec2.RouterType.GATEWAY,
        destinationCidrBlock: "0.0.0.0/0",
      })

      const elasitcIP = new ec2.CfnEIP(this, `EIP-${azs[i]}`)

      const natGateway = new ec2.CfnNatGateway(this, `Natgateway-${azs[i]}`, {
        subnetId: publicSubnet.subnetId,
        allocationId: elasitcIP.attrAllocationId,
      })

      this.natGateways.push(natGateway.ref as string)

      Tags.of(publicSubnet).add("Name", `${props.name}-public-${azs[i]}`)
      Tags.of(publicSubnet).add("Tier", "Public")
      if (props?.enableKubernenetes) {
        Tags.of(publicSubnet).add("kubernetes.io/role/elb", "1")
        Tags.of(publicSubnet).add(
          `kubernetes.io/cluster/${props.kubernetesClusterName}`,
          "owned"
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
          cidrBlock: props?.privateSubnets[i] ?? "",
          mapPublicIpOnLaunch: false,
        }
      )
      privateSubnet.addRoute("DefaultRoute", {
        routerId: this.natGateways[i],
        routerType: ec2.RouterType.NAT_GATEWAY,
        destinationCidrBlock: "0.0.0.0/0",
      })
      Tags.of(privateSubnet).add("Name", `${props.name}-private-${azs[i]}`)
      Tags.of(privateSubnet).add("Tier", "Private")

      if (props?.enableKubernenetes) {
        Tags.of(privateSubnet).add("kubernetes.io/role/internal-elb", "1")
        Tags.of(privateSubnet).add(
          `kubernetes.io/cluster/${props.kubernetesClusterName}`,
          "owned"
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
            cidrBlock: props?.databaseSubnets[i] ?? "",
            mapPublicIpOnLaunch: false,
          }
        )
        Tags.of(databaseSubnet).add("Name", `${props.name}-database-${azs[i]}`)
        Tags.of(databaseSubnet).add("Tier", "Private")
      }
    }
    this.vpcId = vpc
    this.privateSubnets = vpc.privateSubnets
    this.publicSubnets = vpc.publicSubnets
  }
}
