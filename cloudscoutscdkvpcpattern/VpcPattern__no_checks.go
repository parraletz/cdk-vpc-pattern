//go:build no_runtime_type_checking

package cloudscoutscdkvpcpattern

// Building without runtime type checking enabled, so all the below just return nil

func validateVpcPattern_IsConstructParameters(x interface{}) error {
	return nil
}

func (j *jsiiProxy_VpcPattern) validateSetDatabaseSubnetsParameters(val *[]awsec2.ISubnet) error {
	return nil
}

func (j *jsiiProxy_VpcPattern) validateSetPrivateSubnetsParameters(val *[]awsec2.ISubnet) error {
	return nil
}

func (j *jsiiProxy_VpcPattern) validateSetPublicSubnetsParameters(val *[]awsec2.ISubnet) error {
	return nil
}

func (j *jsiiProxy_VpcPattern) validateSetVpcIdParameters(val awsec2.IVpc) error {
	return nil
}

func validateNewVpcPatternParameters(scope constructs.Construct, id *string, props *VpcProps) error {
	return nil
}

