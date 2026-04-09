# FML V3 - Floorplan Markup Language

Unofficial, attributed reference repository for the published Floorplanner **FML v3** (Floorplan Markup Language) schema and documentation, organised into a clearer structure for technical reading and implementation reference.

> **Attribution:** All specifications, schemas, and protocol details documented here are derived from [Floorplanner B.V.](https://floorplanner.com)'s published documentation, open-source repositories, and public API references. FML is created and maintained by Floorplanner B.V., Rotterdam, Netherlands. This repository is an unofficial community reference and is not affiliated with or endorsed by Floorplanner B.V.

## What is FML?

**FML** (Floorplan Markup Language) is a standard format for storing detailed information about architectural floor plans. Developed by Floorplanner since 2004, it uses **JSON** as its primary serialisation format (with legacy XML support) to describe structural elements including rooms, walls, doors, windows, furniture, and design annotations.

FML is an **open format** designed for data exchange between Floorplanner and other software tools, making it suitable for integration with BIM systems, visualisation software, cost estimation tools, and 3D model generators.

## Documentation

| Document | Description |
|----------|-------------|
| [Overview & Format](docs/01-overview.md) | Introduction, history, format overview, and key concepts |
| [Project Structure](docs/02-project-structure.md) | Project, Floor, and Design hierarchy |
| [Walls & Openings](docs/03-walls-and-openings.md) | Wall geometry, endpoints, curves, doors, and windows |
| [Areas & Surfaces](docs/04-areas-and-surfaces.md) | Rooms, floor areas, surfaces, ceilings, and textures |
| [Items & Objects](docs/05-items-and-objects.md) | Furniture, fixtures, lighting, and smart materials |
| [Annotations](docs/06-annotations.md) | Labels, dimension lines, and drawing lines |
| [Cameras & Drawings](docs/07-cameras-and-drawings.md) | Camera positions, background images, and floor drawings |
| [Materials & Textures](docs/08-materials-and-textures.md) | Wall decoration, texture properties, and colour model |
| [Settings & Configuration](docs/09-settings.md) | Project-level and design-level settings |
| [API Integration](docs/10-api-integration.md) | REST API endpoints for FML import/export |
| [XML Legacy Format](docs/11-xml-legacy-format.md) | Legacy XML representation and RelaxNG schema |
| [Type Reference](docs/12-type-reference.md) | Complete alphabetical type and interface reference |

## Schema

| File | Description |
|------|-------------|
| [schema/fml.rng](schema/fml.rng) | RelaxNG schema for FML XML validation (from floorplanner/fml) |

## Examples

| File | Description |
|------|-------------|
| [examples/minimal-project.json](examples/minimal-project.json) | Minimal valid FML v3 JSON project |
| [examples/single-room.json](examples/single-room.json) | Single room with walls, door, window, and furniture |
| [examples/minimal-project.xml](examples/minimal-project.xml) | Minimal valid FML XML project (legacy format) |

## Key Facts

| Property | Value |
|----------|-------|
| Format | JSON (primary), XML (legacy) |
| File Extension | `.fml` |
| Coordinate Units | Centimetres (JSON), Metres (XML/API import) |
| Coordinate System | X: left-to-right, Y: top-to-bottom, Z: elevation |
| Colour Format | `#RRGGBB` hex string |
| Origin | Floorplanner B.V., 2004 |
| Current Version | v3.0 |

## Sources

- [Floorplanner FML v3.0 Specification](https://floorplanner.readme.io/reference/v30-specification)
- [FML Standard](https://floorplanner.com/fml)
- [FML Standard Documentation](https://fml.floorplanner.dev)
- [Floorplanner API Reference](https://floorplanner.readme.io/reference/getting-started)
- [floorplanner/fml GitHub Repository](https://github.com/floorplanner/fml) (RelaxNG schema, Ruby FML-to-KML converter)
- [floorplanner/floorplanner-api-php Wiki](https://github.com/floorplanner/floorplanner-api-php/wiki) (ProjectFML, DesignFML)
- [Floorplanner Help: What is FML?](https://help.floorplanner.com/en/articles/8435278-what-is-fml-how-to-use-fml)

## License

This documentation is provided for reference purposes. The FML specification is published by Floorplanner B.V. under their [FML License](https://floorplanner.com/fml-license), which allows anyone to use, copy, and share it freely subject to certain conditions.
