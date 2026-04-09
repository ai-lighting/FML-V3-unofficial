# XML Legacy Format

FML was originally designed as an XML format. While JSON is now the primary format, the XML representation is still supported for import and export via the API. This document describes the XML format and its formal schema.

## Overview

A complete floor plan is described in FML XML as a combination of `<project>`, `<floor>`, and `<design>` tags nested hierarchically:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
  <name>My Project</name>
  <floor>
    <name>Ground Floor</name>
    <level>0</level>
    <height>2.8</height>
    <design>
      <name>Main Design</name>
      <!-- assets, objects, lines, areas -->
    </design>
  </floor>
</project>
```

> **Important:** All coordinates in XML are in **metres**, not centimetres.

---

## Document Structure

### Project Element

```xml
<project>
  <!-- Required -->
  <name>string</name>

  <!-- Optional (import) -->
  <description>string</description>
  <public>boolean</public>
  <external-identifier>string</external-identifier>
  <element-library-id>integer</element-library-id>
  <enable-autosave>boolean</enable-autosave>
  <grid-cell-size>decimal</grid-cell-size>
  <grid-sub-cell-size>decimal</grid-sub-cell-size>

  <!-- System fields (export only) -->
  <id>integer</id>
  <created-at>dateTime</created-at>
  <updated-at>dateTime</updated-at>
  <project-url>anyURI</project-url>

  <!-- One or more floors -->
  <floor>...</floor>
</project>
```

The `external-identifier` must start with a letter (cannot start with a digit).

### Floor Element

```xml
<floor>
  <!-- Required -->
  <name>string</name>
  <level>integer</level>
  <height>float</height>

  <!-- System fields (export only) -->
  <id>integer</id>
  <created-at>dateTime</created-at>
  <updated-at>dateTime</updated-at>

  <!-- One or more designs -->
  <design>...</design>
</floor>
```

### Design Element

```xml
<design>
  <!-- Required -->
  <name>string</name>

  <!-- Optional -->
  <design-type>save | save_as | save_and_mail</design-type>

  <!-- System fields (export only) -->
  <id>integer</id>
  <project-id>integer</project-id>
  <floor-id>integer</floor-id>
  <thumb-url>anyURI</thumb-url>
  <created-at>dateTime</created-at>
  <updated-at>dateTime</updated-at>

  <!-- Content (zero or more of each) -->
  <asset id="...">...</asset>
  <object>...</object>
  <line>...</line>
  <area>...</area>
</design>
```

---

## Assets

Assets are resource definitions referenced by objects, areas, and lines. They are defined within the `<design>` element. There are three types:

### Object Asset (3D Model)

```xml
<asset id="chair01">
  <name>Office Chair</name>
  <url2d>https://example.com/2d/chair.svg</url2d>
  <url3d>https://example.com/3d/chair.dae</url3d>
  <layer>3</layer>
  <filter-value>office</filter-value>  <!-- optional -->
</asset>
```

### Texture Asset

```xml
<asset id="floor_oak">
  <name>Oak Floor</name>
  <color>#D2B48C</color>
  <url2d>https://example.com/textures/oak.png</url2d>
</asset>
```

### Line Asset

```xml
<asset id="fence_wood">
  <type>fence</type>
  <color>#8B4513</color>
  <url2d>https://example.com/2d/fence.svg</url2d>
  <thickness>5.0</thickness>
</asset>
```

### Asset ID Rules

- The `id` attribute is a string identifier
- Must start with a letter (regex: `[a-zA-Z].*`)
- Referenced via `refid` attribute in objects, lines, and areas

---

## Objects

### Furniture / Item

```xml
<object>
  <asset refid="chair01"/>
  <type>furniture</type>
  <points>2.5 3.0 0.0</points>
  <size>0.6 0.6 1.0</size>
  <rotation>0.0 0.0 45.0</rotation>
  <mirrored>false false false</mirrored>
  <color>#FFFFFF</color>
  <locked>false</locked>
</object>
```

| Element | Format | Description |
|---------|--------|-------------|
| `<asset refid="..."/>` | reference | Asset reference |
| `<type>` | `furniture \| text \| opening` | Object type |
| `<points>` | `x y z` (floats) | Position in metres |
| `<size>` | `w h d` (floats) | Width, height, depth in metres |
| `<rotation>` | `rx ry rz` (floats) | Rotation per axis in degrees |
| `<mirrored>` | `bx by bz` (booleans) | Mirror flags per axis |
| `<color>` | `#RRGGBB` | Object colour |
| `<locked>` | `boolean` | Prevent editing |

### Text Label

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

Lines represent walls, fences, hedges, dimension lines, and drawing annotations.

```xml
<line>
  <asset refid="fence_wood"/>
  <type>fence</type>
  <points>1.0 2.0 0.0 5.0 2.0 0.0</points>
  <color>#8B4513</color>
  <thickness>3.0</thickness>
  <height>1.5</height>
  <custom-text>Property boundary</custom-text>
</line>
```

### Points Format

The `<points>` element contains either **6 or 9** space-separated float values:

| Count | Format | Description |
|-------|--------|-------------|
| 6 | `x1 y1 z1 x2 y2 z2` | Start and end point (straight line) |
| 9 | `x1 y1 z1 x2 y2 z2 cx cy cz` | Start, end, and Bezier control point (curved line) |

---

## Areas

Areas represent rooms and floor surfaces.

```xml
<area>
  <line>
    <type>generated_area</type>
    <points>0 0 0 5 0 0 5 4 0 0 4 0</points>
    <color>#D2B48C</color>
    <asset refid="floor_oak"/>
    <rotation>0.0 0.0 0.0</rotation>
  </line>
</area>
```

Each `<area>` contains one or more `<line>` child elements (note: these are area boundary segments, not the same as top-level `<line>` elements).

### Area Types

| Value | Description |
|-------|-------------|
| `generated_area` | Auto-generated from closed wall loops |
| `custom_area` | Manually defined |

---

## Custom Data Types

The RelaxNG schema defines several custom data types:

### fp.color

Hex colour string.

```
Pattern: #([a-fA-F\d]{3}|[a-fA-F\d]{6})
Examples: #FFF, #FF0000, #abc123
```

### fp.threeFloats

A list of exactly three float values (space-separated).

```
Example: 2.5 3.0 0.0
Used by: <points>, <size>, <rotation>
```

### fp.threeBools

A list of exactly three boolean values (space-separated).

```
Example: true false false
Used by: <mirrored>
```

### fp.digitLess

A string that must start with a letter.

```
Pattern: [a-zA-Z].*
Used by: asset id, external-identifier
```

### fp.sixOrNineFloats

A list of either 6 or 9 float values (space-separated).

```
6 values: x1 y1 z1 x2 y2 z2
9 values: x1 y1 z1 x2 y2 z2 cx cy cz
Used by: line <points>
```

---

## RelaxNG Schema

The formal schema for FML XML is defined in RelaxNG format. A copy is available at [`schema/fml.rng`](../schema/fml.rng) in this repository.

The schema was sourced from the [floorplanner/fml](https://github.com/floorplanner/fml/blob/master/xml/fml.rng) repository.

---

## JSON vs XML Comparison

| Aspect | JSON (v3) | XML (Legacy) |
|--------|-----------|-------------|
| Coordinate units | Centimetres | Metres |
| Walls | `walls[]` array with endpoints | `<line>` elements with point lists |
| Doors/Windows | `openings[]` within walls | `<object type="opening">` |
| Furniture | `items[]` array | `<object type="furniture">` |
| Labels | `labels[]` array | `<object>` with `<text>` child |
| Areas | `areas[]` with `poly` points | `<area>` with `<line>` children |
| Surfaces | `surfaces[]` array | Not directly supported |
| Cameras | `cameras[]` on Floor | Not in XML schema |
| Drawings | `drawing` on Floor | Not in XML schema |
| Asset definitions | Inline / by refid | Explicit `<asset>` elements |
| Settings | `settings` object | Not in XML schema |

## Sources

- [floorplanner/fml RelaxNG Schema](https://github.com/floorplanner/fml/blob/master/xml/fml.rng)
- [DesignFML Wiki](https://github.com/floorplanner/floorplanner-api-php/wiki/DesignFML)
- [ProjectFML Wiki](https://github.com/floorplanner/floorplanner-api-php/wiki/ProjectFML)
- [Download FML XML (Legacy)](https://floorplanner.readme.io/reference/downloadproject)
