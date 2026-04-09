# Walls & Openings

Walls are the primary structural elements in FML. They define the geometry of rooms and support **openings** (doors and windows).

## Wall

A wall is a line segment from point **A** to point **B**, with optional curvature, thickness, and vertical extent.

```typescript
interface Wall extends GenericLine {
  c?: Point | null;       // control point for curved walls
  az: Endpoint3D;         // vertical extent at point A
  bz: Endpoint3D;         // vertical extent at point B
  thickness: number;      // wall thickness in cm
  balance: number;        // left/right distribution (0..1)
  openings: Opening[];    // doors and windows
  decor: WallDecor;       // wall surface decoration
}
```

### Base Types

```typescript
interface Point {
  x: number;  // horizontal position (cm)
  y: number;  // vertical position (cm)
}

interface GenericLine {
  a: Point;   // start point
  b: Point;   // end point
}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `a` | `Point` | Start point of the wall segment |
| `b` | `Point` | End point of the wall segment |
| `c` | `Point \| null` | Control point for curved walls (quadratic Bezier). `null` or absent for straight walls |
| `az` | `Endpoint3D` | Vertical extent at endpoint A |
| `bz` | `Endpoint3D` | Vertical extent at endpoint B |
| `thickness` | `number` | Wall thickness in centimetres |
| `balance` | `number` | Distribution of thickness to left/right of the centre line. Range `0.0` to `1.0`. A value of `0.5` centres the wall on the line |
| `openings` | `Opening[]` | Array of doors and windows placed on this wall |
| `decor` | `WallDecor` | Surface decoration for left and right sides |

### Left and Right Sides

"Left" and "right" are determined by **standing at endpoint A and looking toward endpoint B**:

```
          LEFT SIDE
    A ─────────────────► B
          RIGHT SIDE
```

This convention applies to both `balance` and `decor` properties.

---

## Endpoint3D

Defines the vertical extent of a wall at one of its endpoints.

```typescript
interface Endpoint3D {
  z: number;  // elevation of the bottom edge (cm)
  h: number;  // elevation of the top edge (cm)
}
```

| Property | Type | Description |
|----------|------|-------------|
| `z` | `number` | Bottom elevation in cm (typically `0` for ground-level walls) |
| `h` | `number` | Top elevation in cm (typically the floor's default wall height, e.g. `280`) |

This allows for walls with varying heights (e.g. a wall that slopes from 280 cm at one end to 200 cm at the other).

---

## Curved Walls

Curved walls are defined using a **quadratic Bezier curve** with three points:

- `a` — Start point
- `b` — End point
- `c` — Control point (defines the curvature)

```
        c (control point)
       ╱ ╲
      ╱   ╲
    A ╌╌╌╌╌╌╌ B
     (actual curve)
```

When `c` is `null` or absent, the wall is a straight line.

---

## Openings

Openings are doors and windows placed along a wall. They share a common base interface.

### Generic Opening

```typescript
interface GenericOpening {
  refid: string;          // asset reference for the door/window model
  width: number;          // opening width in cm
  z: number;              // bottom elevation in cm
  z_height: number;       // opening height in cm
  t: number;              // position on wall (0..1)
  frameColor?: Color;     // optional frame colour (#RRGGBB)
}
```

| Property | Type | Description |
|----------|------|-------------|
| `refid` | `string` | Asset reference ID for the door/window 3D model |
| `width` | `number` | Width of the opening in cm |
| `z` | `number` | Elevation of the bottom edge in cm (e.g. `0` for a door, `90` for a window) |
| `z_height` | `number` | Height of the opening in cm |
| `t` | `number` | Relative position along the wall, from `0.0` (at point A) to `1.0` (at point B) |
| `frameColor` | `Color` | Optional frame colour as `#RRGGBB` hex string |

### Door

```typescript
interface Door extends GenericOpening {
  type: 'door';
  mirrored: [0 | 1, 0 | 1];  // [vertical, horizontal] flip
  doorColor?: Color;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'door'` | Discriminator |
| `mirrored` | `[0\|1, 0\|1]` | Flip flags: `[vertical, horizontal]`. `[0,0]` = no flip, `[1,0]` = flip vertically, etc. |
| `doorColor` | `Color` | Optional door panel colour |

### Window

```typescript
interface Window extends GenericOpening {
  type: 'window';
}
```

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'window'` | Discriminator |

---

## Wall Decoration

Each wall has a `decor` object that defines the surface appearance of both sides.

```typescript
interface WallDecor {
  left: WallSideDecor;
  right: WallSideDecor;
}
```

A side's decoration can be one of four types:

```typescript
type WallSideDecor =
  | null                  // no decoration (default)
  | WallSideWithColor     // solid colour
  | WallSideWithMaterial  // material reference
  | WallSideWithTexture;  // custom texture image
```

### Solid Colour

```typescript
interface WallSideWithColor {
  color: Color;  // e.g. "#E8D4B8"
}
```

### Material Reference

```typescript
interface WallSideWithMaterial {
  refid: string;  // asset reference to a material
}
```

### Custom Texture

```typescript
interface WallSideWithTexture {
  texture: WallTexture;
}

interface WallTexture {
  src: string;    // image URL
  fit: WallTextureFit;
  tlx: number;   // top-left X coordinate on wall surface
  tly: number;   // top-left Y coordinate on wall surface
  brx: number;   // bottom-right X coordinate on wall surface
  bry: number;   // bottom-right Y coordinate on wall surface
}
```

### Texture Fit Modes

| Value | Description |
|-------|-------------|
| `'free'` | Free placement and scaling |
| `'no-stretch'` | Maintain aspect ratio, no stretching |
| `'fill'` | Fill the entire wall surface |
| `'contain'` | Fit within the wall surface, maintaining aspect ratio |
| `'tile-horizontally'` | Tile the texture horizontally |
| `'tile-vertically'` | Tile the texture vertically |
| `'tile-both'` | Tile the texture in both directions |

---

## Example

```json
{
  "a": { "x": 0, "y": 0 },
  "b": { "x": 500, "y": 0 },
  "c": null,
  "az": { "z": 0, "h": 280 },
  "bz": { "z": 0, "h": 280 },
  "thickness": 20,
  "balance": 0.5,
  "openings": [
    {
      "type": "door",
      "refid": "door_single_left",
      "width": 90,
      "z": 0,
      "z_height": 210,
      "t": 0.3,
      "mirrored": [0, 0]
    },
    {
      "type": "window",
      "refid": "window_double",
      "width": 120,
      "z": 90,
      "z_height": 120,
      "t": 0.7,
      "frameColor": "#FFFFFF"
    }
  ],
  "decor": {
    "left": { "color": "#F5F5DC" },
    "right": null
  }
}
```

## Sources

- [FML v3.0 Specification](https://floorplanner.readme.io/reference/v30-specification)
