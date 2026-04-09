# FML V3 Overview

## What is FML?

**FML** (Floorplan Markup Language) is a standard format for storing detailed information about architectural floor plans. It is the data format developed and maintained by [Floorplanner B.V.](https://floorplanner.com) (Rotterdam, Netherlands) to store all relevant data of a floorplanner project.

FML is an **open format** that can be used to exchange data between Floorplanner and other software and tools.

## History

FML originated in **2004** when Floorplanner needed a defined storage format for their web-based floorplan creation solution. Over time it has evolved through multiple versions:

| Version | Format | Notes |
|---------|--------|-------|
| v1/v2 | XML | Legacy format using the Flash-based editor |
| v3.0 | JSON (primary), XML (legacy) | Current version, used with the HTML5 editor and API v2 |

The XML format is now considered **legacy**. JSON is the primary format going forward, though XML is still supported for import.

## Format Overview

FML v3 uses **JSON** (JavaScript Object Notation) as its foundation. FML files use the `.fml` extension but are plain JSON with a different extension.

### Persistent vs Runtime Format

Floorplanner distinguishes between two representations:

- **Runtime format** — The in-memory JavaScript object used by the editor at runtime. This is what the editor's JavaScript API returns.
- **Persistent format** — The serialised JSON written when a floorplan is saved or exported. This is what the FML v3 specification defines.

Key differences:

| Aspect | Runtime | Persistent |
|--------|---------|------------|
| Asset references | `asset` object | `refid` string |
| Resolution | Already resolved | Resolved on load |

When writing FML files for import, use the **persistent** format with `refid` references.

## Core Concepts

### Hierarchy

An FML document is structured as a hierarchy:

```
Project
├── Settings (optional)
├── Floor[]  (one or more)
│   ├── Drawing (optional)
│   ├── Camera[] (zero or more)
│   └── Design[]  (one or more, also called "Floorplan")
│       ├── Settings (optional)
│       ├── Wall[]
│       │   └── Opening[] (doors, windows)
│       ├── Area[]
│       ├── Surface[]
│       ├── Item[]
│       ├── Label[]
│       ├── Line[]
│       └── Dimension[]
```

### Coordinate System

| Axis | Direction | Description |
|------|-----------|-------------|
| X | Left → Right | Horizontal position |
| Y | Top → Bottom | Vertical position (screen space) |
| Z | Up | Elevation / height |

### Units

| Context | Unit |
|---------|------|
| JSON coordinates | Centimetres (cm) |
| XML/API import coordinates | **Metres** (m) |
| Texture offsets | Pixels |
| Rotation | Degrees |
| Field of view | Degrees |
| Texture scale | Percentage (%) |

> **Important:** When using the API import endpoint, coordinates must be in **metres**, not centimetres. To set a coordinate to 160 cm, use `1.6`.

### Colour Format

Colours are represented as hex strings: `#RRGGBB` (six hex digits) or `#RGB` (three hex digits, XML only).

```
#FF0000  → Red
#00FF00  → Green
#FFFFFF  → White
```

### Asset References

Objects in FML reference assets (3D models, textures, door/window types) using a `refid` string — an alphanumeric identifier that must **start with a letter** (cannot start with a digit).

## Capabilities

FML can describe:

- **Structural elements** — Walls (straight and curved), doors, windows
- **Spatial areas** — Rooms (auto-generated from closed wall configurations), custom areas, surfaces
- **Furniture and fixtures** — Positioned 3D objects with rotation, mirroring, and material variants
- **Annotations** — Text labels, dimension lines, drawing lines (solid, dashed, dotted)
- **Visual properties** — Colours, materials, textures on walls, floors, and ceilings
- **Cameras** — Orbital and walkthrough camera positions for 3D rendering
- **Floor drawings** — Background images (blueprints, site plans) for tracing

## Current Limitations

The FML v3 specification does **not** currently support:

- Roof configurations
- Garden and hedge features (beyond basic surfaces)
- Electrical wiring and plumbing layouts

## Sources

- [FML v3.0 Specification](https://floorplanner.readme.io/reference/v30-specification)
- [FML Standard](https://floorplanner.com/fml)
- [FML Standard Documentation](https://fml.floorplanner.dev)
- [Floorplanner Help: What is FML?](https://help.floorplanner.com/en/articles/8435278-what-is-fml-how-to-use-fml)
