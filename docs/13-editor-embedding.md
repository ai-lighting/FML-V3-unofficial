# Editor Embedding & JavaScript API

Floorplanner provides an embeddable HTML5 editor that can be integrated into third-party web applications. This document describes the embedding process and the JavaScript API available for interacting with the editor.

> This documentation is derived from Floorplanner's published embedding guides and API wiki. It is **not** part of the FML Standard. Always refer to the [official embedding documentation](https://floorplanner.readme.io/reference/embedding-the-editor-v2) for the latest details.

---

## Embedding the Editor (v2 — HTML5)

### Script Tag

```html
<script
  data-floorplanner-editor
  src="https://fp-editor-cdn.floorplanner.com/embed.js"
  crossorigin="anonymous">
</script>
```

### Initialisation

```javascript
initFPEditor({
  projectId: 12345,                    // required: project ID (number, not string)
  mountSelector: '#fp-editor-container', // required: CSS selector for container
  user: {
    id: 67890,
    auth_token: "YOUR_TOKEN",
    permissions: ['save']
  },
  language: 'en-US'
}).then(api => {
  window.api = api;  // store for later use
});
```

### Container Requirements

- **Minimum size:** 1000px width, 800px height
- Must use explicit `width` and `height` (not `min-height`)
- Cannot run over `file:///` — requires a web server

---

## Authentication

### User-Based Authentication

For internal systems where the editor is tied to a single user.

```javascript
initFPEditor({
  projectId: 12345,
  mountSelector: '#fp-editor-container',
  user: {
    id: 67890,
    auth_token: "TOKEN",
    permissions: ['save']
  }
});
```

Retrieve the auth token via the API:

```bash
curl -u YOUR_API_KEY:x https://floorplanner.com/api/v2/users/token.json
```

> Always request a **fresh token** each time you load the editor.

### Project-Based Authentication

For multi-actor access to a single project.

```javascript
initFPEditor({
  projectId: 12345,
  projectAccessToken: "PROJECT_TOKEN",
  permissions: ['save'],
  language: 'en-US'
});
```

---

## Configuration Options

| Parameter | Type | Description |
|-----------|------|-------------|
| `projectId` | `number` | Project ID to load (**required**) |
| `mountSelector` | `string` | CSS selector for the container element |
| `apiDomain` | `string` | `"sandbox.floorplanner.com"` or `"floorplanner.com"` |
| `language` | `string` | UI language (see supported languages below) |
| `useMetric` | `boolean` | Toggle metric / imperial measurements |
| `templateId` | `number` | Apply a template's styling and settings |
| `brandingId` | `number\|string` | Apply branding styles |
| `kind` | `string` | Editor mode (see editor kinds below) |
| `autoSetup` | `boolean` | Auto-configure based on `kind` |
| `roomplannerSubdomain` | `string` | Subdomain for roomplanner mode |
| `helpCenterLinkUrl` | `string` | Custom help centre URL |
| `newRoomplan` | `boolean` | Create new project on save (roomplanner) |
| `wizardRoomtypeId` | `number` | Room type for Magic Layout (roomplanner) |
| `wizardRoomstyleId` | `number` | Room style for Magic Layout (roomplanner) |
| `embedPrefix` | `string` | CDN prefix override for development |

### Editor Kinds

| Value | Description |
|-------|-------------|
| `'editor'` | Full floorplan editor |
| `'viewer'` | Read-only viewer |
| `'spaceplanner'` | Space planning mode |
| `'roomplanner'` | Single-room planner |

### Supported Languages

`zh-Hans-CN`, `da-DK`, `nl-NL`, `en-US`, `fr-FR`, `de-DE`, `it-IT`, `ja-JP`, `ko-KR`, `fa-IR`, `pl-PL`, `pt-BR`, `es-ES`

### Permissions

| Permission | Description |
|------------|-------------|
| `'save'` | Enable save functionality |
| `'no-export'` | Hide export buttons |
| `'hide-email'` | Hide email field in export dialogs |
| `'no-back-to-dashboard'` | Hide dashboard navigation |
| `'ntl'` | Remove render cooldown timer |
| `'disable_3d'` | Hide 3D view button |
| `'disable_upload'` | Hide background image upload |

### Hideable UI Components

These strings can be passed to hide specific UI elements:

`'clear-design-button'`, `'save-button'`, `'duplicate-design-button'`, `'delete-design-button'`, `'duplicate-floor-button'`, `'restore-floor-button'`, `'delete-floor-button'`, `'add-floor-button'`, `'help-sidebar'`, `'project-sidebar'`, `'styleboards-sidebar'`, `'exports-sidebar'`, `'objects-sidebar'`, `'designs-sidebar'`, `'help-center-link'`, `'thumb-view-toggle'`

---

## JavaScript API Methods

The `api` object returned by `initFPEditor` provides these methods:

| Method | Returns | Description |
|--------|---------|-------------|
| `api.flush()` | `Promise` | Flush pending autosaves |
| `api.save()` | — | Trigger manual save (deprecated — use `flush()`) |
| `api.zoomIn()` | — | Zoom in on the canvas |
| `api.zoomOut()` | — | Zoom out |
| `api.zoomAll()` | — | Fit entire plan in view |
| `api.dropItem(assetId, {x, y})` | — | Place an item at viewport coordinates |
| `api.switchToCamera(index)` | — | Activate a camera by index |
| `api.createDesign(fml)` | — | Create a new design from FML data |
| `api.unmount()` | — | Remove the editor from the DOM |
| `api.reload()` | — | Reinitialise the editor |

### Readable Properties

| Property | Type | Description |
|----------|------|-------------|
| `api.state` | `object` | Current floorplan state (walls, items, areas) |
| `api.meta` | `object` | Metadata about areas and outer walls |
| `api.project` | `object` | Project data including floors and designs |
| `api.centerPoint` | `Point` | Position of the plan origin |

### Settable Properties

| Property | Type | Description |
|----------|------|-------------|
| `api.view` | `'2D' \| '3D'` | Switch between 2D and 3D views |
| `api.designId` | `number` | Load a specific design by ID |

---

## Event Handlers

### HTML5 Editor (v2) Events

```javascript
// Autosave status changes
api.onAutoSave((status) => {
  // status: 'start', 'success', or 'error'
  console.log('Autosave:', status);
});

// Object selection
api.onSelect((selection) => {
  // selection: { kind: string, obj: object }
  console.log('Selected:', selection.kind);
});

// Floorplan state updated
api.onUpdated = (data) => {
  console.log('Plan updated');
};

// Manual save completed (deprecated)
api.onSave = () => {
  console.log('Saved');
};

// Editor close requested
api.onQuit = () => {
  console.log('User wants to quit');
};

// Export requested
api.onExport = (type) => {
  // type: "interior" or "floorplan"
  console.log('Export type:', type);
};

// Roomplanner save (roomplanner mode only)
api.onSaveRoomplanner = (obj) => {
  // obj: { id: number, name: string }
  console.log('Saved roomplanner:', obj.id);
};
```

### Flash Editor (Legacy) Events

The legacy Flash-based editor used a different event system:

```javascript
var fp = new Floorplanner({ project_id: 12345 });
fp.embed('container_div');

fp.observe('LOADED', function(floorId, designId) { });
fp.observe('FINISHED', function(floorId, designId) { });
fp.observe('SAVED', function(floorId, designId, designName) { });
fp.observe('CHANGED_PROJECT', function() { });
fp.observe('ADDED_OBJECT', function(objectInfo) { });
fp.observe('REMOVED_OBJECT', function(objectInfo) { });
fp.observe('DRAGGED_OBJECT', function() { });
fp.observe('ADDED_AREA', function(areaInfo) { });
fp.observe('REMOVED_AREA', function(areaInfo) { });
fp.observe('SHOW2D', function() { });
fp.observe('SHOW3D', function() { });
```

---

## Legacy Flash Editor (Reference)

The original Flash-based editor used a different initialisation pattern:

```javascript
var fp = new Floorplanner({
  project_id: 12345,
  state: Floorplanner.STATE_EDIT,    // STATE_EDIT | STATE_SHOW | STATE_EMBED
  measurement_system: "metric",       // "metric" | "imperial"
  language: "en",
  first_color: "#F8C663",            // primary UI colour
  second_color: "#3A7BD5",           // secondary UI colour
  demo_project: "0",                  // "1" to disable saving
  empty_project: "0"                  // "1" to start blank
});
fp.embed('div_id');
```

### Legacy Functions

| Function | Description |
|----------|-------------|
| `fp.loadFloor(floorId)` | Load a floor's default design |
| `fp.saveDesign(name)` | Save the current design |
| `fp.printDesign()` | Open print dialog |
| `fp.resetDesign()` | Clear the current design |
| `fp.isModified()` | Check if design has unsaved changes |
| `fp.showForm(name, params)` | Show a named form/dialog |
| `fp.getProject()` | Get project info including floors and designs |

### Legacy Form Names

`SAVE`, `SEND_A_FRIEND`, `CREATE_ACCOUNT`, `SHARE`, `SELECT_DESIGN`, `PROJECT_SETTINGS`, `EXPORT_IMAGE`

---

## Tracking Products

A common use case is tracking which products (furniture items) a user has placed in the plan:

```javascript
// Get all placed items from the current state
const items = api.state.items;

// Build a unique product list
const products = new Map();
for (const item of items) {
  const id = item.asset?.id || item.refid;
  if (!products.has(id)) {
    products.set(id, {
      id,
      name: item.asset?.name,
      count: 0
    });
  }
  products.get(id).count++;
}

console.log([...products.values()]);
```

## Sources

- [Embedding the Editor (v2)](https://floorplanner.readme.io/reference/embedding-the-editor-v2)
- [JavaScript Tutorial Wiki](https://github.com/floorplanner/floorplanner-api-php/wiki/JavascriptTutorial)
- [JavaScript Events Wiki](https://github.com/floorplanner/floorplanner-api-php/wiki/JavascriptEvents)
- [JavaScript Functions Wiki](https://github.com/floorplanner/floorplanner-api-php/wiki/JavascriptFunctions)
- [JavaScript Options Wiki](https://github.com/floorplanner/floorplanner-api-php/wiki/JavascriptOptions)
