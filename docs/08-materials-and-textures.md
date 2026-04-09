# Materials & Textures

FML supports applying colours, materials, and textures to walls, floors (areas), and surfaces.

## Colour Model

All colours in FML use the **hex string** format:

```
#RRGGBB    (six hex digits — JSON and XML)
#RGB       (three hex digits — XML only, shorthand)
```

Examples:
```
#FF0000  → Red
#00FF00  → Green
#0000FF  → Blue
#FFFFFF  → White
#000000  → Black
#E8D4B8  → Warm beige
```

The formal regex pattern (from the RelaxNG schema) is:

```
#([a-fA-F\d]{3}|[a-fA-F\d]{6})
```

---

## Wall Decoration

Each wall has a `decor` object with `left` and `right` sides. See [Walls & Openings](03-walls-and-openings.md) for full details.

A wall side can be decorated with:

| Type | Description |
|------|-------------|
| `null` | No decoration (default appearance) |
| Solid colour | A single `color` property |
| Material reference | A `refid` pointing to a material asset |
| Custom texture | A `texture` object with image URL and fit settings |

### Wall Texture

```typescript
interface WallTexture {
  src: string;         // image URL
  fit: WallTextureFit; // how the image fills the wall
  tlx: number;         // top-left X on the wall surface
  tly: number;         // top-left Y on the wall surface
  brx: number;         // bottom-right X on the wall surface
  bry: number;         // bottom-right Y on the wall surface
}
```

### Wall Texture Fit Modes

| Mode | Description |
|------|-------------|
| `'free'` | Freely positioned and scaled |
| `'no-stretch'` | Maintains aspect ratio without stretching |
| `'fill'` | Fills the entire wall surface (may crop) |
| `'contain'` | Fits within the wall surface (may letterbox) |
| `'tile-horizontally'` | Repeats horizontally |
| `'tile-vertically'` | Repeats vertically |
| `'tile-both'` | Repeats in both directions |

---

## Area / Surface Textures

Areas and surfaces share the `TextureProps` interface for controlling how floor/surface textures are displayed:

```typescript
interface TextureProps {
  rotation?: number;  // texture rotation in degrees
  tx?: number;        // horizontal offset in pixels
  ty?: number;        // vertical offset in pixels
  sx?: number;        // horizontal scale in %
  sy?: number;        // vertical scale in %
}
```

Combined with `AreaProps`:

```typescript
interface AreaProps extends TextureProps {
  refid?: string;  // texture/material asset reference
  color: Color;    // base colour
  // ... other properties
}
```

### How textures work on areas

1. The `color` property provides the **base colour** for the area.
2. If `refid` is set, the referenced **texture asset** is overlaid on the base colour.
3. The texture can be adjusted with `rotation`, `tx`, `ty`, `sx`, and `sy`.

| Property | Unit | Description |
|----------|------|-------------|
| `rotation` | degrees | Rotates the texture pattern |
| `tx` | pixels | Shifts the texture horizontally |
| `ty` | pixels | Shifts the texture vertically |
| `sx` | % | Horizontal scale (100 = original size) |
| `sy` | % | Vertical scale (100 = original size) |

---

## Smart Materials (Items)

3D objects (items) can have customisable material slots via the `materials` property:

```typescript
interface SmartMaterials {
  [materialName: string]: number;
}
```

Each key is a **material slot name** (defined by the 3D model), and the value is a **variant index** selecting a specific material option.

```json
{
  "materials": {
    "fabric": 2,
    "wood": 0,
    "metal": 1
  }
}
```

The available slot names and variant indices are determined by the specific asset/model.

---

## Asset References

Materials and textures are referenced using **asset IDs** (`refid`). Asset IDs are alphanumeric strings that must **start with a letter** (the `fp.digitLess` constraint in the schema):

```
Pattern: [a-zA-Z].*
```

Valid: `wood_oak`, `tile_marble_01`, `fabric_blue`
Invalid: `01_wood`, `123abc`

### XML Asset Definitions

In the XML format, assets are defined within the `<design>` element and referenced by objects, areas, and lines:

```xml
<!-- Texture asset -->
<asset id="floor_wood">
  <name>Oak Wood Floor</name>
  <color>#D2B48C</color>
  <url2d>https://example.com/textures/oak.png</url2d>
</asset>

<!-- Object asset -->
<asset id="sofa_modern">
  <name>Modern Sofa</name>
  <url2d>https://example.com/2d/sofa.svg</url2d>
  <url3d>https://example.com/3d/sofa.dae</url3d>
  <layer>3</layer>
</asset>

<!-- Line asset -->
<asset id="fence_wooden">
  <type>fence</type>
  <color>#8B4513</color>
  <url2d>https://example.com/2d/fence.svg</url2d>
  <thickness>5.0</thickness>
</asset>
```

### Asset Types (XML)

| Type | Properties | Description |
|------|-----------|-------------|
| Object asset | `name`, `url2d`, `url3d`, `layer` | 3D model with 2D icon |
| Texture asset | `name`, `url2d`, `color` | Floor/wall texture |
| Line asset | `type`, `url2d`, `color`, `thickness` | Line/fence appearance |

---

## Roomstyles

A **roomstyle** is a coordinated set of items, materials, and colours that can be applied to an area. When a roomstyle is applied, the area's `roomstyle_id` property is set.

Roomstyles are a feature of Floorplanner Pro and higher accounts. The FML format stores only the reference; the roomstyle content is resolved by the Floorplanner platform.

## Sources

- [FML v3.0 Specification](https://floorplanner.readme.io/reference/v30-specification)
- [DesignFML Wiki](https://github.com/floorplanner/floorplanner-api-php/wiki/DesignFML)
