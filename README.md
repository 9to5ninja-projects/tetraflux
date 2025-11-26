# TETRAFLUX

**Strategic Pyramid Warfare**

Tetraflux is a turn-based strategy game played on a triangular grid. Players place tetrahedral pieces, choosing which face to hide and which to expose. The goal is to have the most pieces with your color hidden (face-down) on the board.

## 🎮 How to Play

1.  **Open the Game**: Open `DESIGN/tetraflux-full.html` in any modern web browser.
2.  **Setup**: Select the number of players and their types (Human or AI).
3.  **Start**: A random roll determines who goes first.
4.  **Turns**:
    *   Click an empty cell to preview a piece.
    *   **R**: Rotate the piece.
    *   **F**: Flip the piece (change the hidden face).
    *   Click again to confirm placement.
5.  **Mechanics**:
    *   **Collision**: If a placed piece's visible face matches an adjacent piece's visible face, the adjacent piece is **repelled** (flips to a new position).
    *   **Cascade**: Repelled pieces can trigger further collisions.
    *   **Exile**: Pieces pushed off the board are removed.
    *   **Destruction**: If a piece cannot flee, it and the attacker are destroyed.

## 🛠 Development

The project is currently a single-file HTML/JS prototype for rapid iteration.

- `DESIGN/tetraflux-full.html`: The main playable prototype.
- `DESIGN/tetraflux-prototype.html`: Earlier version (deprecated).

## 📋 Version History

See [CHANGELOG.md](CHANGELOG.md) for details.
