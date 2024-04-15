import { awscdk } from 'projen'
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Alex Parra',
  authorAddress: 'parraletz@gmail.com',
  cdkVersion: '2.133.0',
  constructsVersion: '10.3.0',
  defaultReleaseBranch: 'main',
  docgen: true,
  eslint: false,
  jsiiVersion: '~5.4.0',
  name: 'cdk-vpc-pattern',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/parraletz/cdk-vpc-pattern.git',
  docgenFilePath: 'docs',
  readme: { filename: 'docs/README.md' },
  npmProvenance: false,

  publishToPypi: {
    distName: 'cdk-vpc-pattern',
    module: 'cdk_vpc_pattern',
  },

  publishToGo: {
    moduleName: 'github.com/parraletz/cdk-vpc-pattern',
  },

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
})
project.synth()
