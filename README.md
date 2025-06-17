# CDK VPC Pattern

[![NPM version](https://img.shields.io/npm/v/@cloudscouts/cdk-vpc-pattern)](https://www.npmjs.com/package/@cloudscouts/cdk-vpc-pattern)
[![PyPI version](https://img.shields.io/pypi/v/cdk-vpc-pattern)](https://pypi.org/project/cdk-vpc-pattern/)
[![NuGet version](https://img.shields.io/nuget/v/CloudScoutsCdkVpcPattern)](https://www.nuget.org/packages/CloudScoutsCdkVpcPattern/)
[![License](https://img.shields.io/github/license/parraletz/cdk-vpc-pattern)](https://github.com/parraletz/cdk-vpc-pattern/blob/main/LICENSE)

A CDK construct library that provides a standardized pattern for creating AWS VPCs with public, private, and optional database subnets. This pattern includes NAT Gateways for private subnet internet access and proper tagging for Kubernetes if enabled.

## Features

- Creates a VPC with customizable CIDR block
- Configures public subnets with Internet Gateway
- Sets up private subnets with NAT Gateways
- Optional database subnet tier
- Kubernetes-compatible tagging for EKS clusters
- Multi-AZ support for high availability
- Proper naming and tagging of all resources

## Installation

### TypeScript/JavaScript

```bash
npm install @cloudscouts/cdk-vpc-pattern
```

### Python

```bash
pip install cdk-vpc-pattern
```

### .NET

```bash
dotnet add package CloudScoutsCdkVpcPattern
```

### Go

```bash
go get github.com/parraletz/cdk-vpc-pattern
```

## Usage

### Basic VPC with Public and Private Subnets

```typescript
import { App, Stack } from "aws-cdk-lib"
import { VpcPattern } from "@cloudscouts/cdk-vpc-pattern"

const app = new App()
const stack = new Stack(app, "MyStack")

// Create a VPC with public and private subnets
const vpc = new VpcPattern(stack, "MyVpc", {
  name: "production-vpc",
  cidr: "10.0.0.0/16",
  azs: ["us-west-2a", "us-west-2b", "us-west-2c"],
  publicSubnets: ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"],
  privateSubnets: ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"],
})

// Access the created VPC and subnets
const vpcId = vpc.vpcId
const privateSubnets = vpc.privateSubnets
const publicSubnets = vpc.publicSubnets
```

### VPC with Database Subnets

```typescript
import { App, Stack } from "aws-cdk-lib"
import { VpcPattern } from "@cloudscouts/cdk-vpc-pattern"

const app = new App()
const stack = new Stack(app, "MyStack")

// Create a VPC with public, private, and database subnets
const vpc = new VpcPattern(stack, "MyVpc", {
  name: "production-vpc",
  cidr: "10.0.0.0/16",
  azs: ["us-west-2a", "us-west-2b", "us-west-2c"],
  publicSubnets: ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"],
  privateSubnets: ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"],
  databaseSubnets: ["10.0.7.0/24", "10.0.8.0/24", "10.0.9.0/24"],
})
```

### VPC for Kubernetes (EKS)

```typescript
import { App, Stack } from "aws-cdk-lib"
import { VpcPattern } from "@cloudscouts/cdk-vpc-pattern"

const app = new App()
const stack = new Stack(app, "MyStack")

// Create a VPC configured for EKS
const eksVpc = new VpcPattern(stack, "EksVpc", {
  name: "eks-vpc",
  cidr: "10.1.0.0/16",
  azs: ["us-west-2a", "us-west-2b"],
  publicSubnets: ["10.1.1.0/24", "10.1.2.0/24"],
  privateSubnets: ["10.1.3.0/24", "10.1.4.0/24"],
  enableKubernenetes: true,
  kubernetesClusterName: "my-eks-cluster",
})
```

### Using the VPC with Other Constructs

```typescript
import { App, Stack } from "aws-cdk-lib"
import * as rds from "aws-cdk-lib/aws-rds"
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2"
import { VpcPattern } from "@cloudscouts/cdk-vpc-pattern"

const app = new App()
const stack = new Stack(app, "MyStack")

const vpc = new VpcPattern(stack, "MyVpc", {
  name: "app-vpc",
  cidr: "10.0.0.0/16",
  azs: ["us-west-2a", "us-west-2b"],
  publicSubnets: ["10.0.1.0/24", "10.0.2.0/24"],
  privateSubnets: ["10.0.3.0/24", "10.0.4.0/24"],
  databaseSubnets: ["10.0.5.0/24", "10.0.6.0/24"],
})

// Use public subnets for a load balancer
const alb = new elbv2.ApplicationLoadBalancer(stack, "ALB", {
  vpc: vpc.vpcId,
  internetFacing: true,
  vpcSubnets: {
    subnets: vpc.publicSubnets,
  },
})

// Use database subnets for an RDS instance
const dbInstance = new rds.DatabaseInstance(stack, "Database", {
  engine: rds.DatabaseInstanceEngine.mysql({
    version: rds.MysqlEngineVersion.VER_8_0,
  }),
  vpc: vpc.vpcId,
  vpcSubnets: {
    subnets: vpc.databaseSubnets,
  },
  instanceType: ec2.InstanceType.of(
    ec2.InstanceClass.T3,
    ec2.InstanceSize.MICRO
  ),
})
```

## API Reference

### VpcProps

Properties for creating a VPC pattern.

| Property              | Type     | Required | Description                                                                 |
| --------------------- | -------- | -------- | --------------------------------------------------------------------------- |
| name                  | string   | Yes      | The name of the VPC                                                         |
| cidr                  | string   | Yes      | The CIDR block for the VPC                                                  |
| azs                   | string[] | Yes      | The availability zones to use                                               |
| publicSubnets         | string[] | Yes      | The CIDR blocks for public subnets                                          |
| privateSubnets        | string[] | Yes      | The CIDR blocks for private subnets                                         |
| databaseSubnets       | string[] | No       | Optional CIDR blocks for database subnets                                   |
| enableKubernenetes    | boolean  | No       | Whether to enable Kubernetes tags                                           |
| kubernetesClusterName | string   | No       | The name of the Kubernetes cluster (required if enableKubernenetes is true) |

### VpcPattern

A construct that creates a VPC with public, private, and optional database subnets.

#### Properties

| Property        | Type          | Description                                            |
| --------------- | ------------- | ------------------------------------------------------ |
| vpcId           | ec2.IVpc      | The VPC instance                                       |
| publicSubnets   | ec2.ISubnet[] | The public subnets created in the VPC                  |
| privateSubnets  | ec2.ISubnet[] | The private subnets created in the VPC                 |
| databaseSubnets | ec2.ISubnet[] | The database subnets created in the VPC (if specified) |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.
