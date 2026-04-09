# FML V3 - Floorplan Markup Language

Unofficial, attributed reference repository for the published **FML v3** (Floorplan Markup Language) standard — reorganised into a clearer structure for technical reading and implementation reference.

> Copyright &copy; 2024 FLOORPLANNER.IP B.V. (https://floorplanner.com/) and Contributors. All Rights Reserved. This 'FML standard' is distributed under the FML License (https://floorplanner.com/fml/license.md), WITHOUT ANY WARRANTY including the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. FML standard documentation and code samples are accessible at: https://floorplanner.com/fml/

> This code / documentation has been derived from the FML Standard (https://floorplanner.com/fml/). This change and/or modification is not part of the FML Standard.

---

## About This Repository

This repository contains **unofficial documentation** derived entirely from [Floorplanner's](https://floorplanner.com) published and publicly available sources. It is **not** affiliated with, endorsed by, or part of FLOORPLANNER.IP B.V. or the official FML Standard.

All content has been sourced from:

- The [FML v3.0 Specification](https://floorplanner.readme.io/reference/v30-specification) published by Floorplanner
- The [FML Standard](https://floorplanner.com/fml) and its [documentation site](https://fml.floorplanner.dev)
- The [floorplanner/fml](https://github.com/floorplanner/fml) open-source GitHub repository (RelaxNG schema)
- The [floorplanner/floorplanner-api-php](https://github.com/floorplanner/floorplanner-api-php/wiki) wiki (ProjectFML, DesignFML)
- The [Floorplanner API Reference](https://floorplanner.readme.io/reference/getting-started)
- The [Floorplanner Help Centre](https://help.floorplanner.com/en/articles/8435278-what-is-fml-how-to-use-fml)

The documentation has been restructured and reformatted for clarity. No original specification content has been invented — this is a reorganisation of Floorplanner's own published material.

---

## What is FML?

**FML** (Floorplan Markup Language) is the data format developed and maintained by [FLOORPLANNER.IP B.V.](https://floorplanner.com) (Rotterdam, The Netherlands) to store all relevant data of a Floorplanner project. Originating in 2004, FML is a simple yet powerful way to describe floorplans in JSON format.

FML is an **open format** that can be used to exchange data between Floorplanner and other software and tools. It describes structural elements including walls, doors, windows, rooms, furniture, annotations, and visual properties — anything from basic architectural layouts to fully decorated rooms.

The FML Standard (including documentation and code samples) is provided by FLOORPLANNER.IP B.V. and made available under the [FML License](https://floorplanner.com/fml-license).

## Key Facts

| Property | Value |
|----------|-------|
| Full name | Floorplan Markup Language |
| Created by | FLOORPLANNER.IP B.V., Rotterdam, The Netherlands |
| Origin | 2004 |
| Current version | v3.0 |
| Primary format | JSON |
| Legacy format | XML |
| File extension | `.fml` |
| Coordinate units | Centimetres (JSON), Metres (XML / API import) |
| Coordinate system | X: left-to-right, Y: top-to-bottom, Z: elevation |
| Colour format | `#RRGGBB` hex string |
| Official standard | https://floorplanner.com/fml |
| Official spec | https://floorplanner.readme.io/reference/v30-specification |
| License | [FML License (Version 1, 2024)](https://floorplanner.com/fml-license) |

---

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
| [schema/fml.rng](schema/fml.rng) | RelaxNG schema for FML XML validation (from [floorplanner/fml](https://github.com/floorplanner/fml)) |

## Examples

| File | Description |
|------|-------------|
| [examples/minimal-project.json](examples/minimal-project.json) | Minimal valid FML v3 JSON project |
| [examples/single-room.json](examples/single-room.json) | Single room with walls, door, window, and furniture |
| [examples/minimal-project.xml](examples/minimal-project.xml) | Minimal valid FML XML project (legacy format) |

---

## FML License Notice

The FML Standard is provided by FLOORPLANNER.IP B.V. under the following license. The full text is reproduced here as required by the license terms. The canonical version is available at https://floorplanner.com/fml-license.

---

### FML LICENSE NOTICE (Version 1, 2024)

This 'FML standard' (including documentation and code samples) is being provided by FLOORPLANNER.IP B.V. (hereafter 'FLOORPLANNER') and any Contributor under the following license ('License').

**License**

By using and/or copying the FML Standard, you (the 'Licensee') agree that you have read, understood, and will comply with the following terms and conditions:

- Any floorplan created by using the FML Standard should include the following tag in the floorplan file code:

  *"This floorplan has been created by using the FML Standard (https://floorplanner.com/fml/)"*

Permission to copy, modify, and distribute the FML Standard, with or without modification, for any purpose and without fee or royalty is hereby granted, provided that you include the following on ALL copies of the FML Standard or portions thereof that you use, including changes or modifications:

- The full text of this NOTICE in a location viewable to users of the redistributed or derivative work of the FML Standard;

- The following FML Standard short notice ('copyright tag') should be included in the redistributed or derivative work of the FML Standard:

  *"Copyright &copy; [year] FLOORPLANNER.IP B.V. (https://floorplanner.com/) and Contributors. All Rights Reserved. This 'FML standard' is distributed under the FML License (https://floorplanner.com/fml/license.md), WITHOUT ANY WARRANTY including the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. FML standard documentation and code samples are accessible at: https://floorplanner.com/fml/"*

- Notice of any changes or modifications, with a copyright statement on the changed documentation or in the code sample, clearly stating that it has been derived from the FML Standard, the date of change or modification, and that the change or modification is not part of the FML Standard which includes the following short notice:

  *"This code / documentation has been derived from the FML Standard (https://floorplanner.com/fml/). This change and/or modification is not part of the FML Standard".*

Licensee grants FLOORPLANNER hereby as Contributor the right to copy, modify, and distribute any change or modification to the FML Standard of which Licensee is copyright holder and to include the aforementioned change or modification, with or without further modification, for any purpose and without fee or royalty, in (a new version of) the FML Standard. It is the sole discretion of FLOORPLANNER whether or not to include a change or modification, with or without further modification, in (a new version of) the FML Standard. Each Contributor warrants that the copyright in the changes or modifications Contributor brings to the FML Standard are owned by Contributor or licensed to Contributor and that Contributor has the power and authority to grant the Licence. Contributors will be listed in the FML Standard under the header 'FML Standard Contributors'.

If the Licensee distributes or communicates copies of the FML Standard or derivative works, this distribution or communication will be done under the terms of this Licence or of a later version of this Licence. The Licensee (becoming licensor) cannot offer or impose any additional terms or conditions on the FML Standard or derivative work that alter or restrict the terms of this Licence.

**Disclaimers**

THIS 'FML STANDARD' (INCLUDING DOCUMENTATION AND CODE SAMPLES) IS PROVIDED "AS IS", AND COPYRIGHT HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE 'FML STANDARD' (INCLUDING DOCUMENTATION AND CODE SAMPLES) WILL NOT INFRINGE ANY THIRD PARTY PATENTS, COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.

COPYRIGHT HOLDERS WILL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF ANY USE OF THE 'FML STANDARD' (INCLUDING DOCUMENTATION AND CODE SAMPLES).

COPYRIGHT IN ANY DATA SUBMITTED TO THE FML STANDARD IS NOT CHANGED BY THIS LICENCE.

---

*This repository is an unofficial derivative work. It is not part of the FML Standard. The FML Standard, its documentation, and code samples are the property of FLOORPLANNER.IP B.V. and Contributors.*
