# API Integration

This document describes how to import and export FML data via the Floorplanner REST API (v2).

## Environments

| Environment | Base URL |
|-------------|----------|
| Sandbox | `https://floorplanner.dev/api/v2/` |
| Production | `https://floorplanner.com/api/v2/` |

Different API keys are required for each environment.

## Authentication

The API uses **HTTP Basic Authentication**. API keys are obtained from the enterprise or partner admin account dashboard.

```
Authorization: Basic <base64(api_key:)>
```

---

## Export FML (JSON)

Download the FML representation of a project in JSON format.

| Property | Value |
|----------|-------|
| Method | `GET` |
| Endpoint | `/projects/{id}/fml` |
| Response | FML JSON |

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `number` | Yes | Project ID |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Success — returns project FML in JSON |
| 403 | Access denied |
| 404 | Project not found |

### Example

```bash
curl -u "YOUR_API_KEY:" \
  https://floorplanner.com/api/v2/projects/42/fml
```

The response is a complete FML v3 JSON document containing the project, its floors, and all designs with their elements.

---

## Export FML (XML — Legacy)

Download the FML representation of a project in XML format.

| Property | Value |
|----------|-------|
| Method | `GET` |
| Endpoint | `/projects/{id}/download.json` |
| Response | FML XML |

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `number` | Yes | Project ID |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Success — returns project FML in XML |
| 403 | Access denied |
| 404 | Project not found |

### Example

```bash
curl -u "YOUR_API_KEY:" \
  https://floorplanner.com/api/v2/projects/42/download.json
```

---

## Import FML

Import a project from an FML document (JSON or XML).

| Property | Value |
|----------|-------|
| Method | `POST` |
| Endpoint | `/projects/import.json` |
| Content-Type | `application/json` or `application/xml` |

### Request Body

The request body is a complete FML document (project with floors and designs).

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Success — project imported |
| 403 | Access denied |

### Example

```bash
curl -u "YOUR_API_KEY:" \
  -X POST \
  -H "Content-Type: application/json" \
  -d @project.fml \
  https://floorplanner.com/api/v2/projects/import.json
```

> **Important:** When importing, the `x`, `y`, and `z` coordinates must be specified in **metres** instead of centimetres. To set a coordinate to 160 cm, use `1.6`.

---

## Export as Images

Export floor designs as 2D or 3D rendered images.

| Property | Value |
|----------|-------|
| Method | `POST` |
| Endpoint | `/projects/{id}/export.json` |

### Request Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | `string` | Export type (see below) |
| `fmt` | `string[]` | Output format specifications |
| `designs` | `number[]` | Specific design IDs to export |
| `include_fml` | `boolean` | Include FML file in 2D exports |
| `zip` | `boolean` | Compress into ZIP (2D only) |
| `zip_filename` | `string` | ZIP filename (without extension) |
| `callback` | `string` | Webhook URL or email for completion notification |
| `template_id` | `number` | Override project template |

### Export Types

| Type | Description |
|------|-------------|
| `2d` | 2D floorplan image |
| `3d` | Standard 3D render |
| `3d_iray` | Photorealistic 3D render (iray) |
| `photo_iray` | Photo-quality iray render |
| `panorama_iray` | 360° panorama iray render |
| `stereo_iray` | Stereoscopic iray render |
| `photopanorama` | Photo panorama |
| `stereo` | Stereoscopic render |
| `baked` | Virtual staging render |
| `mesh` | 3D GLB mesh export |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Export initiated |
| 403 | Access denied |
| 404 | Project not found |
| 422 | Request throttled |

> **Note:** When exporting a project, only the first design (variant) of each floor is exported by default. To export specific designs, use the `designs` parameter.

---

## Other Relevant Endpoints

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/projects` | List projects |
| `POST` | `/projects` | Create project |
| `GET` | `/projects/{id}` | Get project details |
| `PUT` | `/projects/{id}` | Update project |
| `DELETE` | `/projects/{id}` | Delete project |
| `POST` | `/projects/{id}/duplicate` | Duplicate project |

### Floors

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/projects/{id}/floors` | List floors |
| `POST` | `/projects/{id}/floors` | Create floor |
| `PUT` | `/projects/{id}/floors/{fid}` | Update floor |
| `DELETE` | `/projects/{id}/floors/{fid}` | Delete floor |

### Designs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/projects/{id}/floors/{fid}/designs` | List designs |
| `POST` | `/projects/{id}/floors/{fid}/designs` | Create design |
| `PUT` | `/projects/{id}/floors/{fid}/designs/{did}` | Update design |
| `DELETE` | `/projects/{id}/floors/{fid}/designs/{did}` | Delete design |

### Floor Drawings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/projects/{id}/floors/{fid}/drawing` | Get drawing |
| `POST` | `/projects/{id}/floors/{fid}/drawing` | Create/upload drawing |
| `PUT` | `/projects/{id}/floors/{fid}/drawing` | Update drawing |
| `DELETE` | `/projects/{id}/floors/{fid}/drawing` | Delete drawing |

### Floor Cameras

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/projects/{id}/floors/{fid}/cameras` | List cameras |
| `POST` | `/projects/{id}/floors/{fid}/cameras` | Create camera |
| `PUT` | `/projects/{id}/floors/{fid}/cameras/{cid}` | Update camera |
| `DELETE` | `/projects/{id}/floors/{fid}/cameras/{cid}` | Delete camera |

---

## Coordinate Unit Summary

| Context | Unit |
|---------|------|
| FML JSON (export) | Centimetres |
| FML JSON (runtime) | Centimetres |
| FML XML (legacy export) | Metres |
| API import (JSON or XML) | **Metres** |

This is a common source of confusion: the JSON export uses centimetres, but the import endpoint expects **metres**.

## Sources

- [Floorplanner API Reference](https://floorplanner.readme.io/reference/getting-started)
- [Import Project](https://floorplanner.readme.io/reference/importproject)
- [Download FML JSON](https://floorplanner.readme.io/reference/fmlproject)
- [Download FML XML (Legacy)](https://floorplanner.readme.io/reference/downloadproject)
- [Export Project](https://floorplanner.readme.io/reference/exportproject)
