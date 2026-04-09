# Annotations

FML supports three types of annotations: **Labels** (text), **Lines** (drawing lines), and **Dimensions** (measurement lines).

## Labels

Labels are text annotations placed on the floorplan.

```typescript
interface Label extends Point {
  text: string;
  fontFamily: string;
  fontSize: number;
  letterSpacing: number;
  fontColor: Color;
  backgroundColor: Color;
  backgroundAlpha?: number;
  align: 'left' | 'center' | 'right';
  rotation: number;
  outline?: boolean;
  bold?: boolean;
  italic?: boolean;
}
```

### Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `x` | `number` | Yes | — | Horizontal position in cm |
| `y` | `number` | Yes | — | Vertical position in cm |
| `text` | `string` | Yes | — | Label text content |
| `fontFamily` | `string` | Yes | — | Font family name |
| `fontSize` | `number` | Yes | — | Font size in pixels |
| `letterSpacing` | `number` | Yes | — | Letter spacing in % |
| `fontColor` | `Color` | Yes | — | Text colour (`#RRGGBB`) |
| `backgroundColor` | `Color` | Yes | — | Background colour (`#RRGGBB`) |
| `backgroundAlpha` | `number` | No | — | Background opacity in % (0 = transparent, 100 = opaque) |
| `align` | `string` | Yes | — | Text alignment: `'left'`, `'center'`, or `'right'` |
| `rotation` | `number` | Yes | — | Rotation in degrees |
| `outline` | `boolean` | No | — | Show text outline |
| `bold` | `boolean` | No | — | Bold text |
| `italic` | `boolean` | No | — | Italic text |

### Example (JSON)

```json
{
  "x": 250,
  "y": 200,
  "text": "Master Bedroom",
  "fontFamily": "Arial",
  "fontSize": 24,
  "letterSpacing": 0,
  "fontColor": "#333333",
  "backgroundColor": "#FFFFFF",
  "backgroundAlpha": 0,
  "align": "center",
  "rotation": 0,
  "bold": true
}
```

### XML Representation (Legacy)

In the XML format, text labels are represented as `<object>` elements (not separate label elements):

```xml
<object>
  <text>Master Bedroom</text>
  <font-family>Arial</font-family>
  <font-size>24</font-size>
  <font-color>#333333</font-color>
  <font-bold>true</font-bold>
  <font-italic>false</font-italic>
  <font-underline>false</font-underline>
  <font-outline>false</font-outline>
  <background-color>#FFFFFF</background-color>
  <background-alpha>0</background-alpha>
</object>
```

---

## Lines

Lines are drawing annotations placed on the floorplan for visual markup.

```typescript
interface Line extends GenericLine {
  type: 'solid_line' | 'dashed_line' | 'dotted_line' | 'dashdotted_line';
  color: Color;
  thickness: number;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `a` | `Point` | Yes | Start point |
| `b` | `Point` | Yes | End point |
| `type` | `string` | Yes | Line style (see below) |
| `color` | `Color` | Yes | Line colour (`#RRGGBB`) |
| `thickness` | `number` | Yes | Line thickness in pixels |

### Line Types

| Value | Appearance |
|-------|------------|
| `'solid_line'` | ─────────── |
| `'dashed_line'` | - - - - - - |
| `'dotted_line'` | ··········· |
| `'dashdotted_line'` | -·-·-·-·-·- |

### Example (JSON)

```json
{
  "a": { "x": 100, "y": 100 },
  "b": { "x": 400, "y": 100 },
  "type": "dashed_line",
  "color": "#FF0000",
  "thickness": 2
}
```

### XML Representation (Legacy)

```xml
<line>
  <asset refid="line_dashed"/>
  <type>dashed_line</type>
  <points>1.0 1.0 0.0 4.0 1.0 0.0</points>
  <color>#FF0000</color>
  <thickness>2.0</thickness>
  <height>0.0</height>
</line>
```

In XML, the `<points>` element contains 6 or 9 space-separated float values:

- **6 values:** `x1 y1 z1 x2 y2 z2` (start and end points)
- **9 values:** `x1 y1 z1 x2 y2 z2 cx cy cz` (start, end, and Bezier control point for curved lines)

---

## Dimensions

Dimension lines are measurement annotations showing distances between two points.

```typescript
interface Dimension extends GenericLine {
  type: 'custom_dimension';
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `a` | `Point` | Yes | Start point of the measured span |
| `b` | `Point` | Yes | End point of the measured span |
| `type` | `'custom_dimension'` | Yes | Always `'custom_dimension'` |

Dimension lines display the distance between their two endpoints. The measurement is calculated automatically from the point coordinates.

### Example (JSON)

```json
{
  "a": { "x": 0, "y": 0 },
  "b": { "x": 500, "y": 0 },
  "type": "custom_dimension"
}
```

### XML Representation (Legacy)

In the XML format, dimensions are represented as `<line>` elements with a dimension type and optional custom text:

```xml
<line>
  <type>custom_dimension</type>
  <points>0.0 0.0 0.0 5.0 0.0 0.0</points>
  <custom-text>5.00m</custom-text>
</line>
```

---

## Arrow Head Types

The project settings control the style of arrow heads used on dimension lines:

| Value | Description |
|-------|-------------|
| `'arrow-stop'` | Arrow with stop bar (default) |
| `'stop'` | Stop bar only |
| `'reverse-arrow-stop'` | Reversed arrow with stop bar |
| `'arrow'` | Arrow only |

See [Settings](09-settings.md) for the `arrowHeadType` project setting.

## Sources

- [FML v3.0 Specification](https://floorplanner.readme.io/reference/v30-specification)
- [DesignFML Wiki](https://github.com/floorplanner/floorplanner-api-php/wiki/DesignFML)
