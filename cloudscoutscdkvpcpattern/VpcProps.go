package cloudscoutscdkvpcpattern


type VpcProps struct {
	Azs *[]*string `field:"required" json:"azs" yaml:"azs"`
	Cidr *string `field:"required" json:"cidr" yaml:"cidr"`
	Name *string `field:"required" json:"name" yaml:"name"`
	PrivateSubnets *[]*string `field:"required" json:"privateSubnets" yaml:"privateSubnets"`
	PublicSubnets *[]*string `field:"required" json:"publicSubnets" yaml:"publicSubnets"`
	DatabaseSubnets *[]*string `field:"optional" json:"databaseSubnets" yaml:"databaseSubnets"`
	EnableKubernenetes *bool `field:"optional" json:"enableKubernenetes" yaml:"enableKubernenetes"`
	KubernetesClusterName *string `field:"optional" json:"kubernetesClusterName" yaml:"kubernetesClusterName"`
}

