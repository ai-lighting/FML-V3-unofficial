# Type Reference

Complete alphabetical reference of all FML v3 types and interfaces, extracted from the [v3.0 Specification](https://floorplanner.readme.io/reference/v30-specification).

---

## Area

Room/floor area, typically auto-generated from closed wall loops.

```typescript
interface Area extends AreaProps {
  poly: Point[];
  ceiling?: Ceiling;
  roomstyle_id?: string;
}
```

See: [Areas & Surfaces](04-areas-and-surfaces.md)

---

## AreaProps

Shared properties for Areas and Surfaces.

```typescript
interface AreaProps extends TextureProps {
  refid?: string;
  color: Color;
  showSurfaceArea?: boolean;
  showAreaLabel: boolean;
  name?: string;
  customName?: string;
  role?: number;
  name_x?: number;
  name_y?: number;
}
```

---

## BezierPoint

A point with Bezier curve control coordinates, used in surface polygons.

```typescript
interface BezierPoint extends Point {
  cx: number;
  cy: number;
  cz?: number;
}
```

---

## Camera

Viewpoint for 3D rendering, attached to a Floor.

```typescript
interface Camera {
  id: number;
  name: string;
  type_name: 'orbital' | 'walkthrough';
  x: number;
  y: number;
  z: number;
  ux: number;
  uy: number;
  uz: number;
  dx: number;
  dy: number;
  dz: number;
  fov: number;
  lightSettings: CameraLightSettings;
  background_image: PresetSky | UserDefinedSky | {};
}
```

See: [Cameras & Drawings](07-cameras-and-drawings.md)

---

## CameraLightSettings

Lighting configuration for a camera.

```typescript
interface CameraLightSettings {
  altitude: number;
  azimuth: number;
  day: boolean;
  intensity: number;
  profile: boolean;
}
```

---

## Color

Hex colour string type.

```typescript
type Color = string;  // Format: "#RRGGBB"
```

---

## DesignSettings

Per-design configuration options.

```typescript
interface DesignSettings {
  engineAutoThickness: boolean;
  engineAutoDims: boolean;
  areaLabelMultiplier: number;
  scaleMultiplierDimensions: number;
  scaleMultiplierComments: number;
  showCeilings3D: boolean;
  minWallLength?: number;
}
```

See: [Settings](09-settings.md)

---

## Dimension

Custom dimension/measurement line.

```typescript
interface Dimension extends GenericLine {
  type: 'custom_dimension';
}
```

See: [Annotations](06-annotations.md)

---

## Door

A door opening in a wall.

```typescript
interface Door extends GenericOpening {
  type: 'door';
  mirrored: [0 | 1, 0 | 1];
  doorColor?: Color;
}
```

See: [Walls & Openings](03-walls-and-openings.md)

---

## Drawing

Background image attached to a floor for tracing.

```typescript
interface Drawing {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  url: string;
  rotation: number;
  alpha: number;
  depth?: 'LOW' | 'HIGH';
}
```

See: [Cameras & Drawings](07-cameras-and-drawings.md)

---

## Endpoint3D

Vertical extent of a wall at one endpoint.

```typescript
interface Endpoint3D {
  z: number;
  h: number;
}
```

---

## Floor

One storey of a building.

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

See: [Project Structure](02-project-structure.md)

---

## Floorplan

A design variant (also called "Design"). The core object containing all plan elements.

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

See: [Project Structure](02-project-structure.md)

---

## GenericLine

Base type for line-segment–based elements.

```typescript
interface GenericLine {
  a: Point;
  b: Point;
}
```

---

## GenericOpening

Base type for wall openings (doors and windows).

```typescript
interface GenericOpening {
  refid: string;
  width: number;
  z: number;
  z_height: number;
  t: number;
  frameColor?: Color;
}
```

See: [Walls & Openings](03-walls-and-openings.md)

---

## Item

A placeable object (furniture, fixture, appliance).

```typescript
interface Item extends Point3D {
  refid: string;
  width: number;
  height: number;
  z_height: number;
  rotation: number;
  mirrored?: [0 | 1, 0];
  light?: Light;
  materials?: SmartMaterials;
}
```

See: [Items & Objects](05-items-and-objects.md)

---

## Label

Text annotation on the floorplan.

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

See: [Annotations](06-annotations.md)

---

## Light

Light source configuration for an item.

```typescript
interface Light {
  on: boolean;
  color: Color;
  watt: number;
}
```

See: [Items & Objects](05-items-and-objects.md)

---

## Line

Drawing line annotation.

```typescript
interface Line extends GenericLine {
  type: 'solid_line' | 'dashed_line' | 'dotted_line' | 'dashdotted_line';
  color: Color;
  thickness: number;
}
```

See: [Annotations](06-annotations.md)

---

## Opening

Union type for wall openings.

```typescript
type Opening = Door | Window;
```

---

## Point

2D coordinate.

```typescript
interface Point {
  x: number;
  y: number;
}
```

---

## Point3D

3D coordinate.

```typescript
interface Point3D extends Point {
  z: number;
}
```

---

## PresetSky

Pre-defined sky background for camera views.

```typescript
interface PresetSky {
  sky_id: number;
  url: string;
  type_name: 'sphere';
}
```

---

## Project

Root object of an FML document.

```typescript
interface Project {
  id: number;
  name: string;
  public: boolean;
  settings?: ProjectSettings;
  floors: Floor[];
}
```

See: [Project Structure](02-project-structure.md)

---

## ProjectSettings

Project-wide configuration. See [Settings](09-settings.md) for the full property listing.

```typescript
interface ProjectSettings {
  wallHeight: number;
  wallSectionHeight: number;
  wallThickness: number;
  wallOuterThickness: number;
  useMetric: boolean;
  showGrid: boolean;
  showDims: boolean;
  showShortDims: boolean;
  showAreaDims: boolean;
  generateOuterDimension: boolean;
  showDropShadows: boolean;
  showObjects: boolean;
  showFixtures: boolean;
  showItemOutline: boolean;
  showObjectColour: boolean;
  showStructuralColour: boolean;
  showFloorsBelow: boolean;
  showObjects3d: boolean;
  showObjectMono: boolean;
  showLights: boolean;
  useSection3D: boolean;
  showLabels: boolean;
  areaLabelOutline: boolean;
  areaLabelLetterSpacing: number;
  dimLineLabelHorizontal: boolean;
  exportLabels3D: boolean;
  showShadows3D: boolean;
  exportOrtho3D: boolean;
  visuals: 'ALL' | 'BW' | 'BWC';
  showTexts: boolean;
  arrowHeadType: 'arrow-stop' | 'stop' | 'reverse-arrow-stop' | 'arrow';
  northArrowRotation: number;
  northArrowKind: number;
  blueprintMode: boolean;
  dimLineFont: string;
  hideItemsAboveHeight: number;
  hideItemsAbove: boolean;
}
```

---

## SmartMaterials

Material variant overrides for 3D items.

```typescript
interface SmartMaterials {
  [materialName: string]: number;
}
```

---

## Surface

Freeform polygonal area (not wall-bounded).

```typescript
interface Surface extends AreaProps {
  poly: SurfacePoint[];
  isRoof?: boolean;
  isCutout?: boolean;
  transparency?: number;
}
```

See: [Areas & Surfaces](04-areas-and-surfaces.md)

---

## SurfacePoint

Union type for surface polygon vertices.

```typescript
type SurfacePoint = Point3D | BezierPoint;
```

---

## TextureProps

Texture adjustment properties shared by Areas and Surfaces.

```typescript
interface TextureProps {
  rotation?: number;
  tx?: number;
  ty?: number;
  sx?: number;
  sy?: number;
}
```

---

## UserDefinedSky

Custom background image for camera views.

```typescript
interface UserDefinedSky {
  url: string;
  type_name: 'plane';
}
```

---

## Wall

A wall segment with openings and decoration.

```typescript
interface Wall extends GenericLine {
  c?: Point | null;
  az: Endpoint3D;
  bz: Endpoint3D;
  thickness: number;
  balance: number;
  openings: Opening[];
  decor: WallDecor;
}
```

See: [Walls & Openings](03-walls-and-openings.md)

---

## WallDecor

Wall surface decoration for both sides.

```typescript
interface WallDecor {
  left: WallSideDecor;
  right: WallSideDecor;
}
```

---

## WallSideDecor

Union type for wall-side decoration options.

```typescript
type WallSideDecor =
  | null
  | WallSideWithColor
  | WallSideWithMaterial
  | WallSideWithTexture;
```

---

## WallSideWithColor

Solid colour wall decoration.

```typescript
interface WallSideWithColor {
  color: Color;
}
```

---

## WallSideWithMaterial

Material-referenced wall decoration.

```typescript
interface WallSideWithMaterial {
  refid: string;
}
```

---

## WallSideWithTexture

Custom texture wall decoration.

```typescript
interface WallSideWithTexture {
  texture: WallTexture;
}
```

---

## WallTexture

Custom texture image applied to a wall surface.

```typescript
interface WallTexture {
  src: string;
  fit: 'free' | 'no-stretch' | 'fill' | 'contain' |
       'tile-horizontally' | 'tile-vertically' | 'tile-both';
  tlx: number;
  tly: number;
  brx: number;
  bry: number;
}
```

See: [Materials & Textures](08-materials-and-textures.md)

---

## Window

A window opening in a wall.

```typescript
interface Window extends GenericOpening {
  type: 'window';
}
```

See: [Walls & Openings](03-walls-and-openings.md)

---

## Enum Summary

| Enum | Values |
|------|--------|
| Camera type | `'orbital'`, `'walkthrough'` |
| Opening type | `'door'`, `'window'` |
| Line type | `'solid_line'`, `'dashed_line'`, `'dotted_line'`, `'dashdotted_line'` |
| Dimension type | `'custom_dimension'` |
| Drawing depth | `'LOW'`, `'HIGH'` |
| Wall texture fit | `'free'`, `'no-stretch'`, `'fill'`, `'contain'`, `'tile-horizontally'`, `'tile-vertically'`, `'tile-both'` |
| Arrow head type | `'arrow-stop'`, `'stop'`, `'reverse-arrow-stop'`, `'arrow'` |
| Visuals mode | `'ALL'`, `'BW'`, `'BWC'` |
| Label alignment | `'left'`, `'center'`, `'right'` |
| Sky type | `'sphere'`, `'plane'` |
| Design type (XML) | `'save'`, `'save_as'`, `'save_and_mail'` |
| Area type (XML) | `'generated_area'`, `'custom_area'` |
| Object type (XML) | `'furniture'`, `'text'`, `'opening'` |

## Sources

- [FML v3.0 Specification](https://floorplanner.readme.io/reference/v30-specification)
