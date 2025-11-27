# TETRAFLUX

**Strategic Pyramid Warfare**

Tetraflux is a turn-based strategy game played on a triangular grid. Players place tetrahedral pieces, choosing which face to hide and which to expose. The goal is to have the most pieces with your color hidden (face-down) on the board.

## 🎮 How to Play

1.  **Open the Game**: Open `DESIGN/tetraflux-full.html` in any modern web browser.
2.  **Setup**: Select the number of players and their types (Human or AI).
3.  **Start**: A random roll determines who goes first.
4.  **Turns**:
    *   **Mouse**: Click an empty cell to preview a piece.
    *   **Keyboard**: Use **Arrow Keys** to move the selection cursor.
    *   **R**: Rotate the piece.
    *   **F**: Flip the piece (change the hidden face).
    *   **ENTER** or **Click**: Confirm placement.
5.  **Mechanics**:
    *   **Collision**: If a placed piece's visible face matches an adjacent piece's visible face, the adjacent piece is **repelled**.
    *   **Fleeing**: The player to the **left of the attacker** decides where the repelled piece moves (unless it is a Castle).
    *   **Cascade**: Repelled pieces can trigger further collisions.
    *   **Castle Defense**: If a piece is designated as a Castle, the OWNER always decides where it flees. **Warning**: If your Castle is exiled or destroyed, you are ELIMINATED!
    *   **Exile**: Pieces pushed off the board are removed.
    *   **Destruction**: If a piece cannot flee, it and the attacker are destroyed.

## 🛠 Development

The project is currently a single-file HTML/JS prototype for rapid iteration.

- `DESIGN/tetraflux-full.html`: The main playable prototype.
- `DESIGN/tetraflux-prototype.html`: Earlier version (deprecated).

## 📋 Version History

See [CHANGELOG.md](CHANGELOG.md) for details.

## 📄 License

Copyright (c) 2025 9to5ninja-projects. All Rights Reserved.

