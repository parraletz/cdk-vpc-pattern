import { awscdk } from 'projen'
import { NpmAccess } from 'projen/lib/javascript/node-package'
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Alex Parra',
  authorAddress: 'parraletz@gmail.com',
  cdkVersion: '2.137.0',
  constructsVersion: '10.3.0',
  defaultReleaseBranch: 'main',
  docgen: true,
  eslint: false,
  jsiiVersion: '~5.4.0',
  name: 'cdk-vpc-pattern',
  npmAccess: NpmAccess.PUBLIC,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/parraletz/cdk-vpc-pattern.git',
  docgenFilePath: 'docs/API.md',
  readme: { filename: 'docs/README.md' },
  npmProvenance: false,
  copyrightOwner: 'Alex Parra',
  copyrightPeriod: '2024',
  description: 'A CDK pattern to create a VPC with public and private subnets',
  packageName: '@cloudscouts/cdk-vpc-pattern',

  publishToPypi: {
    distName: 'cdk-vpc-pattern',
    module: 'cdk_vpc_pattern',
  },
  publishToNuget: {
    dotNetNamespace: 'CloudScouts.CdkVpcPattern',
    packageId: 'CloudScoutsCdkVpcPattern',
  },

  publishToGo: {
    moduleName: 'github.com/parraletz/cdk-vpc-pattern',
  },

  publishToMaven: {
    mavenGroupId: 'com.github.cloudscouts',
    mavenArtifactId: 'cdk-vpc-pattern',
    javaPackage: 'com.github.cloudscouts.cdkvpcpattern',
  },

  // defaultTask: undefined,  /* The default task to execute. */

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
})

project.tasks
  .tryFind('release')
  ?.updateStep(4, { exec: 'git diff --ignore-space-at-eol --exit-code | tee' })
project.synth()
