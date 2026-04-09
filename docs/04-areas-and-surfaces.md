# Areas & Surfaces

**Areas** represent rooms and floor regions. **Surfaces** are freeform polygonal shapes used for roofs, cutouts, garden patches, and other non-wall-bounded regions.

## Areas

Areas in FML are typically **auto-generated** whenever walls form closed loops (rooms). They can also be manually defined. Each area describes a floor region with optional texturing and labelling.

### Area Interface

```typescript
interface Area extends AreaProps {
  poly: Point[];            // 2D polygon points on wall edges
  ceiling?: Ceiling;        // optional ceiling configuration
  roomstyle_id?: string;    // optional roomstyle preset reference
}
```

### AreaProps (shared with Surfaces)

```typescript
interface AreaProps extends TextureProps {
  refid?: string;           // texture/material asset reference
  color: Color;             // floor colour (#RRGGBB)
  showSurfaceArea?: boolean;
  showAreaLabel: boolean;   // display area name label
  name?: string;            // standard room type name (e.g. "Living Room")
  customName?: string;      // user-defined custom name
  role?: number;            // room-type identifier
  name_x?: number;          // label X offset in metres
  name_y?: number;          // label Y offset in metres
}
```

### TextureProps

```typescript
interface TextureProps {
  rotation?: number;  // texture rotation in degrees
  tx?: number;        // horizontal offset in pixels
  ty?: number;        // vertical offset in pixels
  sx?: number;        // horizontal scale in %
  sy?: number;        // vertical scale in %
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `poly` | `Point[]` | Yes | Array of 2D points defining the area polygon boundary |
| `refid` | `string` | No | Reference to a texture/material asset |
| `color` | `Color` | Yes | Floor colour as `#RRGGBB` |
| `showSurfaceArea` | `boolean` | No | Show surface area measurement |
| `showAreaLabel` | `boolean` | Yes | Display area name label on the plan |
| `name` | `string` | No | Standard room type name |
| `customName` | `string` | No | Custom name overriding the standard name |
| `role` | `number` | No | Numeric room-type identifier |
| `name_x` | `number` | No | Label X position offset in metres |
| `name_y` | `number` | No | Label Y position offset in metres |
| `rotation` | `number` | No | Texture rotation in degrees |
| `tx` | `number` | No | Texture horizontal offset in pixels |
| `ty` | `number` | No | Texture vertical offset in pixels |
| `sx` | `number` | No | Texture horizontal scale in % |
| `sy` | `number` | No | Texture vertical scale in % |
| `ceiling` | `Ceiling` | No | Ceiling configuration for 3D rendering |
| `roomstyle_id` | `string` | No | Reference to a roomstyle preset |

### Ceiling

Areas can have a ceiling definition for 3D views. (The exact `Ceiling` interface properties are part of the runtime model.)

### Room Types

The `name` property accepts standard room type strings. The `role` property provides a numeric identifier for the room type. Common room type names include:

- Living Room, Bedroom, Kitchen, Bathroom, Hallway, Office, Dining Room, etc.

---

## Surfaces

Surfaces are similar to areas but are drawn **point-by-point** by the user (they are not auto-generated from walls). They serve purposes such as:

- Garden areas (grass, paving)
- Roof structures
- Cutouts (holes in floors)
- Area-like structures without walls

### Surface Interface

```typescript
interface Surface extends AreaProps {
  poly: SurfacePoint[];     // 3D polygon points (may include Bezier curves)
  isRoof?: boolean;         // marks surface as a roof element
  isCutout?: boolean;       // marks surface as a floor cutout
  transparency?: number;    // surface transparency (0..1)
}
```

### Surface Point Types

Surface polygons support both simple 3D points and Bezier curve points:

```typescript
interface Point3D extends Point {
  z: number;  // elevation
}

interface BezierPoint extends Point {
  cx: number;  // Bezier control point X
  cy: number;  // Bezier control point Y
  cz?: number; // Bezier control point Z (optional)
}

type SurfacePoint = Point3D | BezierPoint;
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `poly` | `SurfacePoint[]` | Yes | Array of 3D or Bezier points defining the surface polygon |
| `isRoof` | `boolean` | No | If `true`, the surface represents a roof element |
| `isCutout` | `boolean` | No | If `true`, the surface acts as a hole/cutout in the floor |
| `transparency` | `number` | No | Transparency level from `0` (opaque) to `1` (fully transparent) |

Plus all properties from `AreaProps` and `TextureProps` (see Area section above).

---

## XML Representation (Legacy)

In the XML format, areas are represented differently. Each area contains one or more `<line>` elements (not to be confused with design-level lines):

```xml
<area>
  <line>
    <type>generated_area</type>
    <points>x1 y1 z1 x2 y2 z2 ...</points>
    <color>#CCCCCC</color>
    <asset refid="texture_wood"/>
    <rotation>0 0 0</rotation>
  </line>
</area>
```

Area types in XML:

| Type | Description |
|------|-------------|
| `generated_area` | Auto-generated from closed wall loops |
| `custom_area` | Manually defined area |

---

## Examples

### Area (JSON)

```json
{
  "poly": [
    { "x": 0, "y": 0 },
    { "x": 500, "y": 0 },
    { "x": 500, "y": 400 },
    { "x": 0, "y": 400 }
  ],
  "color": "#D2B48C",
  "refid": "wood_oak_natural",
  "showAreaLabel": true,
  "name": "Living Room",
  "rotation": 45,
  "sx": 100,
  "sy": 100
}
```

### Surface (JSON)

```json
{
  "poly": [
    { "x": 0, "y": 0, "z": 0 },
    { "x": 300, "y": 0, "z": 0 },
    { "x": 300, "y": 200, "z": 0 },
    { "x": 0, "y": 200, "z": 0 }
  ],
  "color": "#4CAF50",
  "showAreaLabel": false,
  "isRoof": false,
  "isCutout": false
}
```

## Sources

- [FML v3.0 Specification](https://floorplanner.readme.io/reference/v30-specification)
