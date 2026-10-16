# AeroARC HTML FPS

AeroARC is a browser FPS testbed built with Three.js and Cannon.js.

## Maps

Map modules live in `assets/models/js_maps/` and register a builder on `window.AeroARCMaps`. The engine loads the selected file before the game script, then calls its builder with `THREE`, `CANNON`, `scene`, `world`, `groundMaterial`, and `collidableMeshes`. Return a `spawn`, a `weaponSpawns` array, and optional `launchPads`; the current map is `openArena` in `open_arena.js`.

## Controls

- `WASD`: move and air-strafe
- `Space`: jump, double-jump, and hold to bunnyhop
- `Shift` or `Caps Lock`: sprint
- `C`: slide above 20 MPH
- `Q`: air dash
- `E`: pick up a nearby weapon
- `1` / `2` or mouse wheel: switch weapon
- Hold and release `P`: throw the equipped weapon
- `R`: reload
- Mouse click: fire
