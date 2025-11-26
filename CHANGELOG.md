# Changelog

All notable changes to this project will be documented in this file.

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
