# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### VpcPattern <a name="VpcPattern" id="cdk-vpc-pattern.VpcPattern"></a>

#### Initializers <a name="Initializers" id="cdk-vpc-pattern.VpcPattern.Initializer"></a>

```typescript
import { VpcPattern } from 'cdk-vpc-pattern'

new VpcPattern(scope: Construct, id: string, props: VpcProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-vpc-pattern.VpcPattern.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-vpc-pattern.VpcPattern.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-vpc-pattern.VpcPattern.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-vpc-pattern.VpcProps">VpcProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-vpc-pattern.VpcPattern.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-vpc-pattern.VpcPattern.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-vpc-pattern.VpcPattern.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-vpc-pattern.VpcProps">VpcProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-vpc-pattern.VpcPattern.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-vpc-pattern.VpcPattern.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-vpc-pattern.VpcPattern.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-vpc-pattern.VpcPattern.isConstruct"></a>

```typescript
import { VpcPattern } from 'cdk-vpc-pattern'

VpcPattern.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-vpc-pattern.VpcPattern.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-vpc-pattern.VpcPattern.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-vpc-pattern.VpcPattern.property.databaseSubnets">databaseSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.ISubnet[]</code> | *No description.* |
| <code><a href="#cdk-vpc-pattern.VpcPattern.property.privateSubnets">privateSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.ISubnet[]</code> | *No description.* |
| <code><a href="#cdk-vpc-pattern.VpcPattern.property.publicSubnets">publicSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.ISubnet[]</code> | *No description.* |
| <code><a href="#cdk-vpc-pattern.VpcPattern.property.vpcId">vpcId</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-vpc-pattern.VpcPattern.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `databaseSubnets`<sup>Required</sup> <a name="databaseSubnets" id="cdk-vpc-pattern.VpcPattern.property.databaseSubnets"></a>

```typescript
public readonly databaseSubnets: ISubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISubnet[]

---

##### `privateSubnets`<sup>Required</sup> <a name="privateSubnets" id="cdk-vpc-pattern.VpcPattern.property.privateSubnets"></a>

```typescript
public readonly privateSubnets: ISubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISubnet[]

---

##### `publicSubnets`<sup>Required</sup> <a name="publicSubnets" id="cdk-vpc-pattern.VpcPattern.property.publicSubnets"></a>

```typescript
public readonly publicSubnets: ISubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISubnet[]

---

##### `vpcId`<sup>Required</sup> <a name="vpcId" id="cdk-vpc-pattern.VpcPattern.property.vpcId"></a>

```typescript
public readonly vpcId: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---


## Structs <a name="Structs" id="Structs"></a>

### VpcProps <a name="VpcProps" id="cdk-vpc-pattern.VpcProps"></a>

#### Initializer <a name="Initializer" id="cdk-vpc-pattern.VpcProps.Initializer"></a>

```typescript
import { VpcProps } from 'cdk-vpc-pattern'

const vpcProps: VpcProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-vpc-pattern.VpcProps.property.azs">azs</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#cdk-vpc-pattern.VpcProps.property.cidr">cidr</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-vpc-pattern.VpcProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-vpc-pattern.VpcProps.property.privateSubnets">privateSubnets</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#cdk-vpc-pattern.VpcProps.property.publicSubnets">publicSubnets</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#cdk-vpc-pattern.VpcProps.property.databaseSubnets">databaseSubnets</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#cdk-vpc-pattern.VpcProps.property.enableKubernenetes">enableKubernenetes</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-vpc-pattern.VpcProps.property.kubernetesClusterName">kubernetesClusterName</a></code> | <code>string</code> | *No description.* |

---

##### `azs`<sup>Required</sup> <a name="azs" id="cdk-vpc-pattern.VpcProps.property.azs"></a>

```typescript
public readonly azs: string[];
```

- *Type:* string[]

---

##### `cidr`<sup>Required</sup> <a name="cidr" id="cdk-vpc-pattern.VpcProps.property.cidr"></a>

```typescript
public readonly cidr: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-vpc-pattern.VpcProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `privateSubnets`<sup>Required</sup> <a name="privateSubnets" id="cdk-vpc-pattern.VpcProps.property.privateSubnets"></a>

```typescript
public readonly privateSubnets: string[];
```

- *Type:* string[]

---

##### `publicSubnets`<sup>Required</sup> <a name="publicSubnets" id="cdk-vpc-pattern.VpcProps.property.publicSubnets"></a>

```typescript
public readonly publicSubnets: string[];
```

- *Type:* string[]

---

##### `databaseSubnets`<sup>Optional</sup> <a name="databaseSubnets" id="cdk-vpc-pattern.VpcProps.property.databaseSubnets"></a>

```typescript
public readonly databaseSubnets: string[];
```

- *Type:* string[]

---

##### `enableKubernenetes`<sup>Optional</sup> <a name="enableKubernenetes" id="cdk-vpc-pattern.VpcProps.property.enableKubernenetes"></a>

```typescript
public readonly enableKubernenetes: boolean;
```

- *Type:* boolean

---

##### `kubernetesClusterName`<sup>Optional</sup> <a name="kubernetesClusterName" id="cdk-vpc-pattern.VpcProps.property.kubernetesClusterName"></a>

```typescript
public readonly kubernetesClusterName: string;
```

- *Type:* string

---



