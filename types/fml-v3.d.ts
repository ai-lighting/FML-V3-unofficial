/**
 * FML v3 — Floorplan Markup Language Type Definitions
 *
 * Copyright © 2024 FLOORPLANNER.IP B.V. (https://floorplanner.com/) and Contributors.
 * All Rights Reserved. This 'FML standard' is distributed under the FML License
 * (https://floorplanner.com/fml/license.md), WITHOUT ANY WARRANTY including the
 * implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * FML standard documentation and code samples are accessible at:
 * https://floorplanner.com/fml/
 *
 * This code / documentation has been derived from the FML Standard
 * (https://floorplanner.com/fml/). This change and/or modification is not part
 * of the FML Standard.
 *
 * BEST-EFFORTS NOTICE: These type definitions are an unofficial, best-efforts
 * recreation derived from the published FML v3.0 Specification. They may be
 * incomplete or inaccurate. Validate against the official specification at:
 * https://floorplanner.readme.io/reference/v30-specification
 *
 * @see https://floorplanner.readme.io/reference/v30-specification
 */

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

/** Hex colour string in #RRGGBB format */
export type Color = string;

/** 2D coordinate (centimetres) */
export interface Point {
  x: number;
  y: number;
}

/** 3D coordinate (centimetres) */
export interface Point3D extends Point {
  z: number;
}

/** Line segment between two 2D points */
export interface GenericLine {
  a: Point;
  b: Point;
}

// ---------------------------------------------------------------------------
// Project
// ---------------------------------------------------------------------------

export interface Project {
  id?: number;
  name: string;
  public?: boolean;
  settings?: ProjectSettings;
  floors: Floor[];
}

export interface ProjectSettings {
  // Wall defaults
  wallHeight?: number;
  wallSectionHeight?: number;
  wallThickness?: number;
  wallOuterThickness?: number;

  // Units & grid
  useMetric?: boolean;
  showGrid?: boolean;

  // Dimensions
  showDims?: boolean;
  showShortDims?: boolean;
  showAreaDims?: boolean;
  generateOuterDimension?: boolean;

  // 2D visual toggles
  showDropShadows?: boolean;
  showObjects?: boolean;
  showFixtures?: boolean;
  showItemOutline?: boolean;
  showObjectColour?: boolean;
  showStructuralColour?: boolean;
  showFloorsBelow?: boolean;
  showObjectMono?: boolean;
  showLights?: boolean;
  showLabels?: boolean;
  showTexts?: boolean;

  // 3D settings
  showObjects3d?: boolean;
  useSection3D?: boolean;
  showShadows3D?: boolean;
  exportOrtho3D?: boolean;
  exportLabels3D?: boolean;

  // Area labels
  areaLabelOutline?: boolean;
  areaLabelLetterSpacing?: number;

  // Dimension lines
  dimLineLabelHorizontal?: boolean;
  arrowHeadType?: ArrowHeadType;
  dimLineFont?: string;

  // Visual mode
  visuals?: VisualMode;
  blueprintMode?: boolean;

  // North arrow
  northArrowRotation?: number;
  northArrowKind?: number;

  // Item visibility
  hideItemsAbove?: boolean;
  hideItemsAboveHeight?: number;
}

export type ArrowHeadType =
  | 'arrow-stop'
  | 'stop'
  | 'reverse-arrow-stop'
  | 'arrow';

export type VisualMode = 'ALL' | 'BW' | 'BWC';

// ---------------------------------------------------------------------------
// Floor
// ---------------------------------------------------------------------------

export interface Floor {
  id?: number;
  name: string;
  level: number;
  height: number;
  designs: Floorplan[];
  cameras?: Camera[];
  drawing?: Drawing;
}

// ---------------------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------------------

export interface Drawing {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  url: string;
  rotation: number;
  alpha: number;
  depth?: DrawingDepth;
}

export type DrawingDepth = 'LOW' | 'HIGH';

// ---------------------------------------------------------------------------
// Camera
// ---------------------------------------------------------------------------

export interface Camera {
  id?: number;
  name: string;
  type_name: CameraType;
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
  background_image: PresetSky | UserDefinedSky | Record<string, never>;
}

export type CameraType = 'orbital' | 'walkthrough';

export interface CameraLightSettings {
  altitude: number;
  azimuth: number;
  day: boolean;
  intensity: number;
  profile: boolean;
}

export interface PresetSky {
  sky_id: number;
  url: string;
  type_name: 'sphere';
}

export interface UserDefinedSky {
  url: string;
  type_name: 'plane';
}

// ---------------------------------------------------------------------------
// Floorplan (Design)
// ---------------------------------------------------------------------------

export interface Floorplan {
  id?: number;
  name: string;
  walls?: Wall[];
  areas?: Area[];
  surfaces?: Surface[];
  dimensions?: Dimension[];
  items?: Item[];
  labels?: Label[];
  lines?: Line[];
  settings?: DesignSettings;
}

export interface DesignSettings {
  engineAutoThickness?: boolean;
  engineAutoDims?: boolean;
  areaLabelMultiplier?: number;
  scaleMultiplierDimensions?: number;
  scaleMultiplierComments?: number;
  showCeilings3D?: boolean;
  minWallLength?: number;
}

// ---------------------------------------------------------------------------
// Walls
// ---------------------------------------------------------------------------

export interface Wall extends GenericLine {
  c?: Point | null;
  az: Endpoint3D;
  bz: Endpoint3D;
  thickness: number;
  balance: number;
  openings: Opening[];
  decor: WallDecor;
}

export interface Endpoint3D {
  z: number;
  h: number;
}

// ---------------------------------------------------------------------------
// Openings (Doors & Windows)
// ---------------------------------------------------------------------------

export interface GenericOpening {
  refid: string;
  width: number;
  z: number;
  z_height: number;
  t: number;
  frameColor?: Color;
}

export interface Door extends GenericOpening {
  type: 'door';
  mirrored: [0 | 1, 0 | 1];
  doorColor?: Color;
}

export interface Window extends GenericOpening {
  type: 'window';
}

export type Opening = Door | Window;

// ---------------------------------------------------------------------------
// Wall Decoration
// ---------------------------------------------------------------------------

export interface WallDecor {
  left: WallSideDecor;
  right: WallSideDecor;
}

export type WallSideDecor =
  | null
  | WallSideWithColor
  | WallSideWithMaterial
  | WallSideWithTexture;

export interface WallSideWithColor {
  color: Color;
}

export interface WallSideWithMaterial {
  refid: string;
}

export interface WallSideWithTexture {
  texture: WallTexture;
}

export interface WallTexture {
  src: string;
  fit: WallTextureFit;
  tlx: number;
  tly: number;
  brx: number;
  bry: number;
}

export type WallTextureFit =
  | 'free'
  | 'no-stretch'
  | 'fill'
  | 'contain'
  | 'tile-horizontally'
  | 'tile-vertically'
  | 'tile-both';

// ---------------------------------------------------------------------------
// Areas
// ---------------------------------------------------------------------------

export interface TextureProps {
  rotation?: number;
  tx?: number;
  ty?: number;
  sx?: number;
  sy?: number;
}

export interface AreaProps extends TextureProps {
  refid?: string;
  color: Color;
  showSurfaceArea?: boolean;
  showAreaLabel?: boolean;
  name?: string;
  customName?: string;
  role?: number;
  name_x?: number;
  name_y?: number;
}

export interface Area extends AreaProps {
  poly: Point[];
  ceiling?: Ceiling;
  roomstyle_id?: string;
}

/** Ceiling configuration (runtime model — exact shape may vary) */
export interface Ceiling {
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Surfaces
// ---------------------------------------------------------------------------

export interface BezierPoint extends Point {
  cx: number;
  cy: number;
  cz?: number;
}

export type SurfacePoint = Point3D | BezierPoint;

export interface Surface extends AreaProps {
  poly: SurfacePoint[];
  isRoof?: boolean;
  isCutout?: boolean;
  transparency?: number;
}

// ---------------------------------------------------------------------------
// Items
// ---------------------------------------------------------------------------

export interface Item extends Point3D {
  refid: string;
  width: number;
  height: number;
  z_height: number;
  rotation: number;
  mirrored?: [0 | 1, 0];
  light?: Light;
  materials?: SmartMaterials;
}

export interface Light {
  on: boolean;
  color: Color;
  watt: number;
}

export interface SmartMaterials {
  [materialName: string]: number;
}

// ---------------------------------------------------------------------------
// Annotations
// ---------------------------------------------------------------------------

export interface Label extends Point {
  text: string;
  fontFamily: string;
  fontSize: number;
  letterSpacing: number;
  fontColor: Color;
  backgroundColor: Color;
  backgroundAlpha?: number;
  align: LabelAlignment;
  rotation: number;
  outline?: boolean;
  bold?: boolean;
  italic?: boolean;
}

export type LabelAlignment = 'left' | 'center' | 'right';

export interface Line extends GenericLine {
  type: LineType;
  color: Color;
  thickness: number;
}

export type LineType =
  | 'solid_line'
  | 'dashed_line'
  | 'dotted_line'
  | 'dashdotted_line';

export interface Dimension extends GenericLine {
  type: 'custom_dimension';
}
