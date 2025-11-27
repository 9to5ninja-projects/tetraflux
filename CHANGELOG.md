# Changelog

All notable changes to this project will be documented in this file.

## [v1.0.0] - 2025-11-26
### Added
- **Castle Mode Complete**:
    - **First Piece Rule**: The first piece placed by each player is marked as their "Castle" (indicated by a 👑 crown).
    - **Elimination**: If a player's Castle is destroyed or exiled, that player is immediately eliminated from the game.
    - **Last Man Standing**: In Castle Mode, if only one player remains, they win automatically.
- **Keyboard Controls**:
    - **D-Pad Navigation**: Use Arrow Keys to move the selection cursor across the board.
    - **Flee Selection**: Arrow keys can now be used to cycle through flee options.
    - **Shortcuts**: `R` to Rotate, `F` to Flip, `ENTER` to Place.
- **Interactive Flee Selection**: Players can now choose flee directions by clicking board cells or using keyboard (TAB/ENTER).
- **Board Size Selector**: Added support for 4 board sizes: Small (6), Medium (24), Large (54), and X-Large (96).

### Fixed
- **Board Size Bug**: Fixed an issue where the board size would revert to default when resetting the game.
- **Player Restoration**: Eliminated players are now correctly restored when starting a new game.

### Changed
- **Board Layout**: Completely overhauled grid generation to create a perfect "Flat Top" hexagon with 4 distinct zones (Center + 3 Rings).
- **Flee Rules**: When a piece is forced to flee, the player to the **left of the attacker** now decides the direction (unless it's a Castle).
- **Triangle Orientation**: Fixed row alignment so top half rows start/end with Upward triangles and bottom half with Downward triangles for perfect meshing.

## [v0.2.1] - 2025-11-26
### Added
- First player determination mechanic ("Roll for initiative").
- Keyboard shortcuts for piece manipulation (R = Rotate, F = Flip/Cycle Hidden Face).
- Configurable player count (2-4 players) and types (Human/AI).

### Changed
- **Grid Generation**: Updated to remove "jagged teeth" (cells with < 2 neighbors) from the board perimeter to prevent edge-case vulnerabilities.
- **Interaction**: Replaced the orientation picker modal with an interactive "ghost piece" placement system.

## [v0.2.0] - 2025-11-26
### Added
- Full prototype with PvP and AI modes.
- Cascade mechanics (repel, flip, chain reactions).
- Exile and Destruction mechanics.
- Game statistics and scoring.
- "Teeth" on board edges (removed in v0.2.1).

## [v0.1.0] - 2025-11-26
### Added
- Initial prototype.
- Basic board rendering.
- Simple placement and collision detection.
