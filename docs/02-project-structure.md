# Project Structure

This document describes the top-level hierarchy of an FML v3 document: **Project**, **Floor**, and **Design** (Floorplan).

## Project

The `Project` is the root object of every FML document.

```typescript
interface Project {
  id: number;
  name: string;
  public: boolean;
  settings?: ProjectSettings;
  floors: Floor[];
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | Export only | Unique project identifier (assigned by Floorplanner) |
| `name` | `string` | Yes | Project name |
| `public` | `boolean` | No | Whether the project is publicly visible |
| `settings` | `ProjectSettings` | No | Project-wide configuration (see [Settings](09-settings.md)) |
| `floors` | `Floor[]` | Yes | One or more floor levels |

### XML representation (legacy)

```xml
<project>
  <name>My Project</name>
  <description>Optional description</description>
  <public>true</public>
  <external-identifier>myref123</external-identifier>
  <!-- system fields (export only) -->
  <id>42</id>
  <created-at>2024-01-15T10:30:00Z</created-at>
  <updated-at>2024-01-15T12:00:00Z</updated-at>
  <project-url>https://floorplanner.com/projects/42</project-url>

  <floor>...</floor>
  <floor>...</floor>
</project>
```

Additional XML-only properties:

| Element | Type | Description |
|---------|------|-------------|
| `description` | `string` | Project description |
| `external-identifier` | `string` | External reference ID (must start with a letter) |
| `element-library-id` | `integer` | Element library selection |
| `enable-autosave` | `boolean` | Auto-save toggle |
| `grid-cell-size` | `decimal` | Grid cell size |
| `grid-sub-cell-size` | `decimal` | Grid sub-cell size |

---

## Floor

A `Floor` represents one storey of the building.

```typescript
interface Floor {
  id: number;
  name: string;
  level: number;
  height: number;
  designs: Floorplan[];
  cameras: Camera[];
  drawing?: Drawing;
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | Export only | Unique floor identifier |
| `name` | `string` | Yes | Floor name (e.g. "Ground Floor") |
| `level` | `number` | Yes | Floor level index (0 = ground, 1 = first floor, -1 = basement) |
| `height` | `number` | Yes | Default wall height for this floor, in cm |
| `designs` | `Floorplan[]` | Yes | One or more design variants |
| `cameras` | `Camera[]` | No | Camera positions for 3D rendering |
| `drawing` | `Drawing` | No | Background drawing/blueprint |

### XML representation (legacy)

```xml
<floor>
  <name>Ground Floor</name>
  <level>0</level>
  <height>280.0</height>
  <!-- system fields (export only) -->
  <id>101</id>
  <created-at>2024-01-15T10:30:00Z</created-at>
  <updated-at>2024-01-15T12:00:00Z</updated-at>

  <design>...</design>
</floor>
```

---

## Design (Floorplan)

A `Design` (also called `Floorplan`) is the core object that contains all the architectural and decorative elements of a floor layout. Each floor can have multiple design **variants**.

```typescript
interface Floorplan {
  id: number;
  name: string;
  walls: Wall[];
  areas: Area[];
  surfaces: Surface[];
  dimensions: Dimension[];
  items: Item[];
  labels: Label[];
  lines: Line[];
  settings?: DesignSettings;
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | Export only | Unique design identifier |
| `name` | `string` | Yes | Design/variant name |
| `walls` | `Wall[]` | No | Wall segments |
| `areas` | `Area[]` | No | Room areas (often auto-generated from closed wall loops) |
| `surfaces` | `Surface[]` | No | Freeform surfaces (roofs, cutouts, garden areas) |
| `dimensions` | `Dimension[]` | No | Custom dimension lines |
| `items` | `Item[]` | No | Furniture, fixtures, and objects |
| `labels` | `Label[]` | No | Text annotations |
| `lines` | `Line[]` | No | Drawing lines (solid, dashed, dotted, dash-dotted) |
| `settings` | `DesignSettings` | No | Design-specific configuration |

### XML representation (legacy)

```xml
<design>
  <name>Main Design</name>
  <!-- system fields (export only) -->
  <id>201</id>
  <design-type>save</design-type>
  <thumb-url>https://...</thumb-url>
  <project-id>42</project-id>
  <floor-id>101</floor-id>
  <created-at>2024-01-15T10:30:00Z</created-at>
  <updated-at>2024-01-15T12:00:00Z</updated-at>

  <!-- assets (XML only — defines referenced resources) -->
  <asset id="chair01">
    <name>Office Chair</name>
    <url2d>https://...</url2d>
    <url3d>https://...</url3d>
    <layer>3</layer>
  </asset>

  <!-- design content -->
  <object>...</object>
  <line>...</line>
  <area>...</area>
</design>
```

XML-only `design-type` values:

| Value | Description |
|-------|-------------|
| `save` | Regular save |
| `save_as` | Save-as copy |
| `save_and_mail` | Save and email notification |

---

## Complete Hierarchy Diagram

```
Project
│
├── name: "My Home"
├── public: true
├── settings: { ... }
│
├── floors[0]: Floor
│   ├── name: "Ground Floor"
│   ├── level: 0
│   ├── height: 280
│   ├── drawing: { url: "blueprint.png", ... }
│   ├── cameras[]: [Camera, ...]
│   │
│   └── designs[0]: Design
│       ├── name: "Main Layout"
│       ├── walls[]: [Wall, Wall, ...]
│       │   └── openings[]: [Door, Window, ...]
│       ├── areas[]: [Area, ...]
│       ├── surfaces[]: [Surface, ...]
│       ├── items[]: [Item, ...]
│       ├── labels[]: [Label, ...]
│       ├── lines[]: [Line, ...]
│       ├── dimensions[]: [Dimension, ...]
│       └── settings: { ... }
│
└── floors[1]: Floor
    ├── name: "First Floor"
    ├── level: 1
    └── ...
```

## Sources

- [FML v3.0 Specification](https://floorplanner.readme.io/reference/v30-specification)
- [ProjectFML Wiki](https://github.com/floorplanner/floorplanner-api-php/wiki/ProjectFML)
- [DesignFML Wiki](https://github.com/floorplanner/floorplanner-api-php/wiki/DesignFML)
