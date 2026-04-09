# Cameras & Drawings

Floors can have **cameras** (viewpoints for 3D rendering) and **drawings** (background images for tracing).

## Cameras

Cameras define viewpoints used to render 3D views of the floorplan.

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

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | Export only | Unique camera identifier |
| `name` | `string` | Yes | Camera name |
| `type_name` | `string` | Yes | Camera type: `'orbital'` or `'walkthrough'` |
| `x` | `number` | Yes | Camera position X (cm) |
| `y` | `number` | Yes | Camera position Y (cm) |
| `z` | `number` | Yes | Camera position Z / elevation (cm) |
| `ux` | `number` | Yes | Up-vector X component |
| `uy` | `number` | Yes | Up-vector Y component |
| `uz` | `number` | Yes | Up-vector Z component |
| `dx` | `number` | Yes | Look-direction X component |
| `dy` | `number` | Yes | Look-direction Y component |
| `dz` | `number` | Yes | Look-direction Z component |
| `fov` | `number` | Yes | Field of view in degrees |
| `lightSettings` | `CameraLightSettings` | Yes | Lighting configuration |
| `background_image` | `object` | Yes | Background/sky configuration |

### Camera Types

| Type | Description |
|------|-------------|
| `orbital` | Birds-eye / orbiting camera that rotates around a focal point |
| `walkthrough` | First-person walkthrough camera at human eye level |

### Camera Vectors

The camera orientation is defined by three vectors:

- **Position** (`x`, `y`, `z`) — Where the camera is located
- **Direction** (`dx`, `dy`, `dz`) — Where the camera is looking
- **Up** (`ux`, `uy`, `uz`) — Which direction is "up" for the camera

```
         uz (up)
          ↑
          │
          │   dz (look direction)
          │  ╱
          │ ╱
  camera ─┼────────► dx
         ╱
        ╱
      ux
```

---

## Camera Light Settings

```typescript
interface CameraLightSettings {
  altitude: number;
  azimuth: number;
  day: boolean;
  intensity: number;
  profile: boolean;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `altitude` | `number` | Sun altitude angle |
| `azimuth` | `number` | Sun azimuth angle (compass direction) |
| `day` | `boolean` | Day/night toggle |
| `intensity` | `number` | Light intensity |
| `profile` | `boolean` | Use lighting profile |

---

## Camera Background Images

The `background_image` property can be one of three types:

### Preset Sky

A pre-defined sky image from Floorplanner's library.

```typescript
interface PresetSky {
  sky_id: number;
  url: string;
  type_name: 'sphere';
}
```

| Property | Type | Description |
|----------|------|-------------|
| `sky_id` | `number` | Preset sky identifier |
| `url` | `string` | Sky image URL |
| `type_name` | `'sphere'` | Spherical projection |

### User-Defined Sky

A custom background image uploaded by the user.

```typescript
interface UserDefinedSky {
  url: string;
  type_name: 'plane';
}
```

| Property | Type | Description |
|----------|------|-------------|
| `url` | `string` | Custom background image URL |
| `type_name` | `'plane'` | Flat plane projection |

### No Background

An empty object `{}` indicates no background image.

---

## Drawings

A drawing is a background image attached to a floor — typically a blueprint, site plan, or architectural drawing that serves as a tracing reference.

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

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `x` | `number` | Yes | Horizontal position (cm) |
| `y` | `number` | Yes | Vertical position (cm) |
| `width` | `number` | Yes | Display width in cm |
| `height` | `number` | Yes | Display height in cm |
| `visible` | `boolean` | Yes | Whether the drawing is visible |
| `url` | `string` | Yes | Image URL |
| `rotation` | `number` | Yes | Rotation in degrees |
| `alpha` | `number` | Yes | Opacity (0 = fully transparent, 1 = fully opaque) |
| `depth` | `string` | No | Render order: `'LOW'` = below floorplan, `'HIGH'` = above floorplan |

### Depth Values

| Value | Description |
|-------|-------------|
| `'LOW'` | Drawing is rendered **below** the floorplan elements (default for tracing) |
| `'HIGH'` | Drawing is rendered **above** the floorplan elements |

---

## Examples

### Camera (JSON)

```json
{
  "id": 1,
  "name": "Living Room View",
  "type_name": "walkthrough",
  "x": 300,
  "y": 250,
  "z": 170,
  "ux": 0,
  "uy": 0,
  "uz": 1,
  "dx": 1,
  "dy": 0,
  "dz": 0,
  "fov": 60,
  "lightSettings": {
    "altitude": 45,
    "azimuth": 180,
    "day": true,
    "intensity": 1.0,
    "profile": false
  },
  "background_image": {
    "sky_id": 5,
    "url": "https://example.com/sky_clear.jpg",
    "type_name": "sphere"
  }
}
```

### Drawing (JSON)

```json
{
  "x": -50,
  "y": -50,
  "width": 1200,
  "height": 900,
  "visible": true,
  "url": "https://example.com/blueprint.png",
  "rotation": 0,
  "alpha": 0.3,
  "depth": "LOW"
}
```

## Sources

- [FML v3.0 Specification](https://floorplanner.readme.io/reference/v30-specification)
