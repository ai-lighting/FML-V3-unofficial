# Items & Objects

**Items** represent all placeable objects in a floorplan: furniture, fixtures, appliances, decorative elements, and any other 3D objects.

## Item

```typescript
interface Item extends Point3D {
  refid: string;              // asset reference ID
  width: number;              // width in cm
  height: number;             // depth in cm
  z_height: number;           // vertical height in cm
  rotation: number;           // rotation in degrees
  mirrored?: [0 | 1, 0];     // horizontal mirror flag
  light?: Light;              // optional light source
  materials?: SmartMaterials; // optional material overrides
}
```

### Base Type

```typescript
interface Point3D {
  x: number;  // horizontal position (cm)
  y: number;  // vertical position (cm)
  z: number;  // elevation (cm)
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `x` | `number` | Yes | Horizontal position in cm |
| `y` | `number` | Yes | Vertical position in cm |
| `z` | `number` | Yes | Elevation in cm (e.g. `0` for floor-standing, `90` for wall-mounted) |
| `refid` | `string` | Yes | Asset reference ID for the 3D model |
| `width` | `number` | Yes | Item width in cm |
| `height` | `number` | Yes | Item depth in cm |
| `z_height` | `number` | Yes | Item vertical height in cm |
| `rotation` | `number` | Yes | Rotation angle in degrees |
| `mirrored` | `[0\|1, 0]` | No | Mirror flags: `[horizontal, 0]`. `[1, 0]` = mirrored horizontally |
| `light` | `Light` | No | Light source configuration (for lamps, light fixtures) |
| `materials` | `SmartMaterials` | No | Material variant overrides |

---

## Light

Items that represent light fixtures can include a `light` property to configure their lighting behaviour in 3D rendering.

```typescript
interface Light {
  on: boolean;    // whether the light is turned on
  color: Color;   // light colour (#RRGGBB)
  watt: number;   // light intensity (0..200)
}
```

| Property | Type | Description |
|----------|------|-------------|
| `on` | `boolean` | Whether the light is active in 3D renders |
| `color` | `Color` | Light colour as `#RRGGBB` hex string |
| `watt` | `number` | Light intensity from `0` (off) to `200` (maximum brightness) |

---

## Smart Materials

Smart Materials allow customising the appearance of specific parts of a 3D model. Each key is a **material slot name** defined by the asset, and the value is a **numeric index** selecting a material variant.

```typescript
interface SmartMaterials {
  [materialName: string]: number;
}
```

### Example

```json
{
  "materials": {
    "fabric": 3,
    "legs": 1,
    "cushion": 0
  }
}
```

In this example, the item's 3D model has three customisable material slots: `fabric`, `legs`, and `cushion`. Each numeric value selects a specific variant (e.g. variant `3` might be blue fabric, variant `1` might be chrome legs).

The available material slot names and variant indices depend on the specific asset.

---

## XML Representation (Legacy)

In the XML format, items are represented as `<object>` elements:

```xml
<object>
  <asset refid="sofa_modern"/>
  <type>furniture</type>
  <points>2.5 3.0 0.0</points>
  <size>2.0 0.9 0.85</size>
  <rotation>0.0 0.0 90.0</rotation>
  <mirrored>false false false</mirrored>
  <color>#8B4513</color>
  <locked>false</locked>
</object>
```

### XML Object Types

| Type | Description |
|------|-------------|
| `furniture` | Furniture and fixture items |
| `text` | Text label objects (see [Annotations](06-annotations.md)) |
| `opening` | Door/window openings (alternative representation) |

### XML coordinate format

In the XML format, `<points>`, `<size>`, and `<rotation>` each contain **three space-separated float values** representing X, Y, and Z:

```xml
<points>x y z</points>     <!-- position in metres -->
<size>w h d</size>          <!-- width, height, depth in metres -->
<rotation>rx ry rz</rotation>  <!-- rotation around each axis in degrees -->
```

> **Note:** XML coordinates are in **metres**, not centimetres.

---

## Examples

### Floor-standing furniture (JSON)

```json
{
  "x": 250,
  "y": 300,
  "z": 0,
  "refid": "dining_table_round",
  "width": 120,
  "height": 120,
  "z_height": 75,
  "rotation": 0
}
```

### Wall-mounted item with light (JSON)

```json
{
  "x": 100,
  "y": 0,
  "z": 180,
  "refid": "wall_sconce_modern",
  "width": 15,
  "height": 10,
  "z_height": 25,
  "rotation": 0,
  "light": {
    "on": true,
    "color": "#FFF5E1",
    "watt": 60
  }
}
```

### Item with smart materials (JSON)

```json
{
  "x": 350,
  "y": 200,
  "z": 0,
  "refid": "armchair_classic",
  "width": 85,
  "height": 80,
  "z_height": 95,
  "rotation": 45,
  "mirrored": [0, 0],
  "materials": {
    "upholstery": 2,
    "frame": 0
  }
}
```

## Sources

- [FML v3.0 Specification](https://floorplanner.readme.io/reference/v30-specification)
- [DesignFML Wiki](https://github.com/floorplanner/floorplanner-api-php/wiki/DesignFML)
