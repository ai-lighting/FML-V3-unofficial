# Settings & Configuration

FML supports two levels of settings: **Project settings** (global) and **Design settings** (per-design).

## Project Settings

```typescript
interface ProjectSettings {
  // Wall defaults
  wallHeight: number;
  wallSectionHeight: number;
  wallThickness: number;
  wallOuterThickness: number;

  // Unit and grid
  useMetric: boolean;
  showGrid: boolean;

  // Dimension display
  showDims: boolean;
  showShortDims: boolean;
  showAreaDims: boolean;
  generateOuterDimension: boolean;

  // Visual toggles
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
  showLabels: boolean;
  showTexts: boolean;

  // 3D settings
  useSection3D: boolean;
  showShadows3D: boolean;
  exportOrtho3D: boolean;
  exportLabels3D: boolean;
  showCeilings3D: boolean;

  // Area labels
  areaLabelOutline: boolean;
  areaLabelLetterSpacing: number;

  // Dimension lines
  dimLineLabelHorizontal: boolean;
  arrowHeadType: ArrowHeadType;
  dimLineFont: string;

  // Visual mode
  visuals: 'ALL' | 'BW' | 'BWC';
  blueprintMode: boolean;

  // North arrow
  northArrowRotation: number;
  northArrowKind: number;

  // Item visibility
  hideItemsAbove: boolean;
  hideItemsAboveHeight: number;
}
```

### Wall Defaults

| Property | Type | Unit | Description |
|----------|------|------|-------------|
| `wallHeight` | `number` | cm | Default height for new walls |
| `wallSectionHeight` | `number` | cm | Wall section height for 2D cross-section views |
| `wallThickness` | `number` | cm | Default interior wall thickness |
| `wallOuterThickness` | `number` | cm | Default exterior/outer wall thickness |

### Unit and Grid

| Property | Type | Description |
|----------|------|-------------|
| `useMetric` | `boolean` | Use metric units (`true`) or imperial (`false`) |
| `showGrid` | `boolean` | Display background grid |

### Dimension Display

| Property | Type | Description |
|----------|------|-------------|
| `showDims` | `boolean` | Show dimension lines |
| `showShortDims` | `boolean` | Show short/inline dimension labels |
| `showAreaDims` | `boolean` | Show area measurement labels |
| `generateOuterDimension` | `boolean` | Auto-generate outer dimension lines around the plan |

### Visual Toggles

| Property | Type | Description |
|----------|------|-------------|
| `showDropShadows` | `boolean` | Show drop shadows on objects |
| `showObjects` | `boolean` | Show furniture/items in 2D view |
| `showFixtures` | `boolean` | Show fixture items |
| `showItemOutline` | `boolean` | Show outlines around items |
| `showObjectColour` | `boolean` | Render objects in colour (vs monochrome) |
| `showStructuralColour` | `boolean` | Render structural elements in colour |
| `showFloorsBelow` | `boolean` | Show ghost view of floors below |
| `showObjects3d` | `boolean` | Show objects in 3D view |
| `showObjectMono` | `boolean` | Render objects in monochrome |
| `showLights` | `boolean` | Show light fixture indicators |
| `showLabels` | `boolean` | Show text labels |
| `showTexts` | `boolean` | Show text annotations |

### 3D Settings

| Property | Type | Description |
|----------|------|-------------|
| `useSection3D` | `boolean` | Use cross-section in 3D view |
| `showShadows3D` | `boolean` | Show shadows in 3D rendering |
| `exportOrtho3D` | `boolean` | Use orthographic projection for 3D exports |
| `exportLabels3D` | `boolean` | Include labels in 3D exports |

### Area Label Settings

| Property | Type | Description |
|----------|------|-------------|
| `areaLabelOutline` | `boolean` | Show outline around area labels |
| `areaLabelLetterSpacing` | `number` | Letter spacing for area labels |

### Dimension Line Settings

| Property | Type | Description |
|----------|------|-------------|
| `dimLineLabelHorizontal` | `boolean` | Force dimension labels to display horizontally |
| `arrowHeadType` | `string` | Arrow head style (see values below) |
| `dimLineFont` | `string` | Font for dimension line labels |

### Arrow Head Types

| Value | Description |
|-------|-------------|
| `'arrow-stop'` | Arrow with stop bar (default) |
| `'stop'` | Stop bar only |
| `'reverse-arrow-stop'` | Reversed arrow with stop bar |
| `'arrow'` | Arrow only |

### Visual Modes

| Value | Description |
|-------|-------------|
| `'ALL'` | Full colour rendering |
| `'BW'` | Black and white |
| `'BWC'` | Black and white with colour accents |

### Blueprint Mode

| Property | Type | Description |
|----------|------|-------------|
| `blueprintMode` | `boolean` | Render the plan in blueprint style (blue lines on dark background) |

### North Arrow

| Property | Type | Description |
|----------|------|-------------|
| `northArrowRotation` | `number` | Rotation of the north arrow in degrees |
| `northArrowKind` | `number` | North arrow visual style index |

### Item Visibility Filter

| Property | Type | Description |
|----------|------|-------------|
| `hideItemsAbove` | `boolean` | Enable height-based item filtering |
| `hideItemsAboveHeight` | `number` | Hide items above this elevation (cm) |

---

## Design Settings

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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `engineAutoThickness` | `boolean` | `false` | Legacy: auto-adjust wall thickness (always `false`) |
| `engineAutoDims` | `boolean` | — | Auto-generate dimension lines |
| `areaLabelMultiplier` | `number` | — | Scale factor for area label text size |
| `scaleMultiplierDimensions` | `number` | — | Scale factor for dimension text size |
| `scaleMultiplierComments` | `number` | — | Scale factor for label/comment text size |
| `showCeilings3D` | `boolean` | — | Show ceilings in 3D view |
| `minWallLength` | `number` | `4` | Minimum wall length in cm; shorter walls are discarded |

---

## Settings Hierarchy

Design settings override project settings where applicable. For example, `showCeilings3D` can be set at both levels:

1. **Project settings** — Apply to all designs in the project
2. **Design settings** — Override project settings for a specific design variant

## Sources

- [FML v3.0 Specification](https://floorplanner.readme.io/reference/v30-specification)
