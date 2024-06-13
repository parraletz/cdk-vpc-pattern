// A CDK pattern to create a VPC with public and private subnets
package cloudscoutscdkvpcpattern

import (
	"reflect"

	_jsii_ "github.com/aws/jsii-runtime-go/runtime"
)

func init() {
	_jsii_.RegisterClass(
		"@cloudscouts/cdk-vpc-pattern.VpcPattern",
		reflect.TypeOf((*VpcPattern)(nil)).Elem(),
		[]_jsii_.Member{
			_jsii_.MemberProperty{JsiiProperty: "databaseSubnets", GoGetter: "DatabaseSubnets"},
			_jsii_.MemberProperty{JsiiProperty: "node", GoGetter: "Node"},
			_jsii_.MemberProperty{JsiiProperty: "privateSubnets", GoGetter: "PrivateSubnets"},
			_jsii_.MemberProperty{JsiiProperty: "publicSubnets", GoGetter: "PublicSubnets"},
			_jsii_.MemberMethod{JsiiMethod: "toString", GoMethod: "ToString"},
			_jsii_.MemberProperty{JsiiProperty: "vpcId", GoGetter: "VpcId"},
		},
		func() interface{} {
			j := jsiiProxy_VpcPattern{}
			_jsii_.InitJsiiProxy(&j.Type__constructsConstruct)
			return &j
		},
	)
	_jsii_.RegisterStruct(
		"@cloudscouts/cdk-vpc-pattern.VpcProps",
		reflect.TypeOf((*VpcProps)(nil)).Elem(),
	)
}
