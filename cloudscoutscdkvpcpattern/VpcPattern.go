package cloudscoutscdkvpcpattern

import (
	_jsii_ "github.com/aws/jsii-runtime-go/runtime"
	_init_ "github.com/parraletz/cdk-vpc-pattern/cloudscoutscdkvpcpattern/jsii"

	"github.com/aws/aws-cdk-go/awscdk/v2/awsec2"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/parraletz/cdk-vpc-pattern/cloudscoutscdkvpcpattern/internal"
)

type VpcPattern interface {
	constructs.Construct
	DatabaseSubnets() *[]awsec2.ISubnet
	SetDatabaseSubnets(val *[]awsec2.ISubnet)
	// The tree node.
	Node() constructs.Node
	PrivateSubnets() *[]awsec2.ISubnet
	SetPrivateSubnets(val *[]awsec2.ISubnet)
	PublicSubnets() *[]awsec2.ISubnet
	SetPublicSubnets(val *[]awsec2.ISubnet)
	VpcId() awsec2.IVpc
	SetVpcId(val awsec2.IVpc)
	// Returns a string representation of this construct.
	ToString() *string
}

// The jsii proxy struct for VpcPattern
type jsiiProxy_VpcPattern struct {
	internal.Type__constructsConstruct
}

func (j *jsiiProxy_VpcPattern) DatabaseSubnets() *[]awsec2.ISubnet {
	var returns *[]awsec2.ISubnet
	_jsii_.Get(
		j,
		"databaseSubnets",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_VpcPattern) Node() constructs.Node {
	var returns constructs.Node
	_jsii_.Get(
		j,
		"node",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_VpcPattern) PrivateSubnets() *[]awsec2.ISubnet {
	var returns *[]awsec2.ISubnet
	_jsii_.Get(
		j,
		"privateSubnets",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_VpcPattern) PublicSubnets() *[]awsec2.ISubnet {
	var returns *[]awsec2.ISubnet
	_jsii_.Get(
		j,
		"publicSubnets",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_VpcPattern) VpcId() awsec2.IVpc {
	var returns awsec2.IVpc
	_jsii_.Get(
		j,
		"vpcId",
		&returns,
	)
	return returns
}


func NewVpcPattern(scope constructs.Construct, id *string, props *VpcProps) VpcPattern {
	_init_.Initialize()

	if err := validateNewVpcPatternParameters(scope, id, props); err != nil {
		panic(err)
	}
	j := jsiiProxy_VpcPattern{}

	_jsii_.Create(
		"@cloudscouts/cdk-vpc-pattern.VpcPattern",
		[]interface{}{scope, id, props},
		&j,
	)

	return &j
}

func NewVpcPattern_Override(v VpcPattern, scope constructs.Construct, id *string, props *VpcProps) {
	_init_.Initialize()

	_jsii_.Create(
		"@cloudscouts/cdk-vpc-pattern.VpcPattern",
		[]interface{}{scope, id, props},
		v,
	)
}

func (j *jsiiProxy_VpcPattern)SetDatabaseSubnets(val *[]awsec2.ISubnet) {
	if err := j.validateSetDatabaseSubnetsParameters(val); err != nil {
		panic(err)
	}
	_jsii_.Set(
		j,
		"databaseSubnets",
		val,
	)
}

func (j *jsiiProxy_VpcPattern)SetPrivateSubnets(val *[]awsec2.ISubnet) {
	if err := j.validateSetPrivateSubnetsParameters(val); err != nil {
		panic(err)
	}
	_jsii_.Set(
		j,
		"privateSubnets",
		val,
	)
}

func (j *jsiiProxy_VpcPattern)SetPublicSubnets(val *[]awsec2.ISubnet) {
	if err := j.validateSetPublicSubnetsParameters(val); err != nil {
		panic(err)
	}
	_jsii_.Set(
		j,
		"publicSubnets",
		val,
	)
}

func (j *jsiiProxy_VpcPattern)SetVpcId(val awsec2.IVpc) {
	if err := j.validateSetVpcIdParameters(val); err != nil {
		panic(err)
	}
	_jsii_.Set(
		j,
		"vpcId",
		val,
	)
}

// Checks if `x` is a construct.
//
// Use this method instead of `instanceof` to properly detect `Construct`
// instances, even when the construct library is symlinked.
//
// Explanation: in JavaScript, multiple copies of the `constructs` library on
// disk are seen as independent, completely different libraries. As a
// consequence, the class `Construct` in each copy of the `constructs` library
// is seen as a different class, and an instance of one class will not test as
// `instanceof` the other class. `npm install` will not create installations
// like this, but users may manually symlink construct libraries together or
// use a monorepo tool: in those cases, multiple copies of the `constructs`
// library can be accidentally installed, and `instanceof` will behave
// unpredictably. It is safest to avoid using `instanceof`, and using
// this type-testing method instead.
//
// Returns: true if `x` is an object created from a class which extends `Construct`.
func VpcPattern_IsConstruct(x interface{}) *bool {
	_init_.Initialize()

	if err := validateVpcPattern_IsConstructParameters(x); err != nil {
		panic(err)
	}
	var returns *bool

	_jsii_.StaticInvoke(
		"@cloudscouts/cdk-vpc-pattern.VpcPattern",
		"isConstruct",
		[]interface{}{x},
		&returns,
	)

	return returns
}

func (v *jsiiProxy_VpcPattern) ToString() *string {
	var returns *string

	_jsii_.Invoke(
		v,
		"toString",
		nil, // no parameters
		&returns,
	)

	return returns
}

