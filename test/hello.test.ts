import { App, assertions, CfnOutput, Stack } from 'aws-cdk-lib'
import { VpcPattern } from '../src'

test('stack has required resources', () => {
  const app = new App()
  const stack = new Stack(app, 'VPCStack')

  const vpc = new VpcPattern(stack, 'VpcPattern', {
    name: 'VpcPattern',
    cidr: '10.0.0.0/16',
    azs: ['us-east-1a', 'us-east-1b'],
    publicSubnets: ['10.0.0.0/24', '10.0.1.0/24'],
    privateSubnets: ['10.0.2.0/24', '10.0.3.0/24'],
  })
  const template = assertions.Template.fromStack(stack)
  template.resourceCountIs('AWS::EC2::VPC', 1)

  new CfnOutput(stack, 'vpcId', {
    value: vpc.vpcId.vpcId,
  })
})
