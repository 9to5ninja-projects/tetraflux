import React, { useState, useCallback, useMemo } from 'react';

const COLORS = {
  0: '#ef4444', // Red
  1: '#3b82f6', // Blue  
  2: '#22c55e', // Green
  3: '#eab308', // Yellow
};

const COLOR_NAMES = ['Red', 'Blue', 'Green', 'Yellow'];

// Generate triangular grid cells for a hex board
function generateHexGrid(size) {
  const cells = [];
  let id = 0;
  
  // Simplified hex grid with triangular cells
  // We'll create a smaller demo grid for prototyping
  for (let row = 0; row < size * 2 - 1; row++) {
    const rowWidth = row < size ? size + row : size * 3 - 2 - row;
    const offset = Math.abs(size - 1 - row);
    
    for (let col = 0; col < rowWidth * 2; col++) {
      const isUpward = col % 2 === 0;
      cells.push({
        id: id++,
        row,
        col,
        offset,
        isUpward,
        x: offset * 25 + col * 25,
        y: row * 43,
      });
    }
  }
  return cells;
}

// Tetrahedron faces - each face index corresponds to a color
// When placed, one face is down (hidden), three are visible
function getVisibleFaces(hiddenFace, rotation) {
  const allFaces = [0, 1, 2, 3];
  const visible = allFaces.filter(f => f !== hiddenFace);
  // Rotate the visible faces based on rotation (0, 1, 2)
  const rotated = [...visible];
  for (let i = 0; i < rotation; i++) {
    rotated.push(rotated.shift());
  }
  return rotated; // [left, right, back] or [left, right, front] depending on orientation
}

function Triangle({ cell, piece, isSelected, onClick, isValidTarget, isHovered, onHover }) {
  const { x, y, isUpward } = cell;
  const size = 50;
  const height = size * Math.sqrt(3) / 2;
  
  const points = isUpward
    ? `${x + size/2},${y} ${x},${y + height} ${x + size},${y + height}`
    : `${x},${y} ${x + size},${y} ${x + size/2},${y + height}`;
  
  let fill = '#1e293b';
  let stroke = '#334155';
  let strokeWidth = 1;
  
  if (isValidTarget) {
    fill = '#164e63';
    stroke = '#22d3ee';
    strokeWidth = 2;
  }
  
  if (isSelected) {
    stroke = '#f59e0b';
    strokeWidth = 3;
  }
  
  if (isHovered && isValidTarget) {
    fill = '#0e7490';
  }

  return (
    <g 
      onClick={onClick} 
      onMouseEnter={() => onHover(cell.id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: isValidTarget ? 'pointer' : 'default' }}
    >
      <polygon
        points={points}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {piece && (
        <PieceDisplay 
          piece={piece} 
          x={x + size/2} 
          y={isUpward ? y + height * 0.6 : y + height * 0.4}
          isUpward={isUpward}
        />
      )}
    </g>
  );
}

function PieceDisplay({ piece, x, y, isUpward }) {
  const { hiddenFace, rotation } = piece;
  const visible = getVisibleFaces(hiddenFace, rotation);
  const radius = 12;
  
  // Draw a small triangle showing the three visible colors
  const innerSize = 20;
  const innerHeight = innerSize * Math.sqrt(3) / 2;
  
  return (
    <g>
      {/* Center dot showing hidden color */}
      <circle 
        cx={x} 
        cy={y} 
        r={6} 
        fill={COLORS[hiddenFace]}
        stroke="#000"
        strokeWidth={2}
      />
      {/* Three colored edges showing visible faces */}
      {visible.map((face, i) => {
        const angle = (i * 120 - 90) * Math.PI / 180;
        const x1 = x + Math.cos(angle) * 8;
        const y1 = y + Math.sin(angle) * 8;
        const x2 = x + Math.cos(angle) * 16;
        const y2 = y + Math.sin(angle) * 16;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={COLORS[face]}
            strokeWidth={4}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

function OrientationSelector({ onSelect, onCancel, playerColor }) {
  const options = [];
  for (let hidden = 0; hidden < 4; hidden++) {
    for (let rot = 0; rot < 3; rot++) {
      options.push({ hidden, rotation: rot });
    }
  }
  
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800 p-4 rounded-lg shadow-xl border border-slate-600 z-10">
      <h3 className="text-white font-bold mb-3 text-center">Choose Orientation</h3>
      <p className="text-slate-400 text-sm mb-3 text-center">
        Center dot = hidden face (your goal: hide {COLOR_NAMES[playerColor]})
      </p>
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map(hidden => (
          <div key={hidden} className="flex flex-col items-center">
            <span className="text-xs text-slate-400 mb-1">Hide {COLOR_NAMES[hidden]}</span>
            {[0, 1, 2].map(rot => {
              const visible = getVisibleFaces(hidden, rot);
              return (
                <button
                  key={rot}
                  onClick={() => onSelect(hidden, rot)}
                  className={`w-14 h-14 rounded border-2 m-1 flex items-center justify-center
                    ${hidden === playerColor ? 'border-yellow-400 bg-slate-700' : 'border-slate-600 bg-slate-900'}
                    hover:border-cyan-400 transition-colors`}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="6" fill={COLORS[hidden]} stroke="#000" strokeWidth={1}/>
                    {visible.map((face, i) => {
                      const angle = (i * 120 - 90) * Math.PI / 180;
                      return (
                        <line
                          key={i}
                          x1={20 + Math.cos(angle) * 8}
                          y1={20 + Math.sin(angle) * 8}
                          x2={20 + Math.cos(angle) * 16}
                          y2={20 + Math.sin(angle) * 16}
                          stroke={COLORS[face]}
                          strokeWidth={3}
                          strokeLinecap="round"
                        />
                      );
                    })}
                  </svg>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <button 
        onClick={onCancel}
        className="mt-3 w-full py-2 bg-slate-700 text-slate-300 rounded hover:bg-slate-600"
      >
        Cancel
      </button>
    </div>
  );
}

function findAdjacentCells(cellId, cells) {
  const cell = cells.find(c => c.id === cellId);
  if (!cell) return [];
  
  return cells.filter(c => {
    if (c.id === cellId) return false;
    const dx = Math.abs(c.x - cell.x);
    const dy = Math.abs(c.y - cell.y);
    // Adjacent triangles share an edge
    return (dx <= 30 && dy <= 50 && (dx + dy) < 70);
  });
}

function checkCollision(newPiece, existingPiece, newCellId, existingCellId, cells) {
  // Get visible faces for both pieces
  const newVisible = getVisibleFaces(newPiece.hiddenFace, newPiece.rotation);
  const existingVisible = getVisibleFaces(existingPiece.hiddenFace, existingPiece.rotation);
  
  // Check if any visible faces match
  for (const nf of newVisible) {
    for (const ef of existingVisible) {
      if (nf === ef) return nf; // Return the colliding color
    }
  }
  return null;
}

export default function TetrafluxGame() {
  const gridSize = 4; // Smaller for prototype
  const cells = useMemo(() => generateHexGrid(gridSize), [gridSize]);
  
  const [pieces, setPieces] = useState({}); // cellId -> piece
  const [currentPlayer, setCurrentPlayer] = useState(0); // 0 = Red, 1 = Blue
  const [selectedCell, setSelectedCell] = useState(null);
  const [showOrientationPicker, setShowOrientationPicker] = useState(false);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [gameLog, setGameLog] = useState([]);
  const [cascadeQueue, setCascadeQueue] = useState([]);

  const addLog = useCallback((message) => {
    setGameLog(prev => [...prev.slice(-9), message]);
  }, []);

  const calculateScores = useCallback(() => {
    const scores = { 0: 0, 1: 0, 2: 0, 3: 0 };
    Object.values(pieces).forEach(piece => {
      scores[piece.hiddenFace]++;
    });
    return scores;
  }, [pieces]);

  const handleCellClick = useCallback((cell) => {
    if (pieces[cell.id]) return; // Cell occupied
    
    setSelectedCell(cell.id);
    setShowOrientationPicker(true);
  }, [pieces]);

  const handleOrientationSelect = useCallback((hiddenFace, rotation) => {
    if (selectedCell === null) return;
    
    const newPiece = { 
      hiddenFace, 
      rotation, 
      owner: currentPlayer,
      placedBy: currentPlayer 
    };
    
    // Check for collisions with adjacent pieces
    const adjacent = findAdjacentCells(selectedCell, cells);
    const collisions = [];
    
    adjacent.forEach(adjCell => {
      if (pieces[adjCell.id]) {
        const collision = checkCollision(newPiece, pieces[adjCell.id], selectedCell, adjCell.id, cells);
        if (collision !== null) {
          collisions.push({ cellId: adjCell.id, color: collision });
        }
      }
    });

    setPieces(prev => ({
      ...prev,
      [selectedCell]: newPiece
    }));

    const colorName = COLOR_NAMES[hiddenFace];
    addLog(`${COLOR_NAMES[currentPlayer]} placed piece (hiding ${colorName})`);

    if (collisions.length > 0) {
      addLog(`⚡ Collision detected! ${collisions.length} piece(s) repelled`);
      // For prototype, just log collisions - full cascade system would go here
      collisions.forEach(c => {
        addLog(`  → ${COLOR_NAMES[c.color]} face collision at cell ${c.cellId}`);
      });
    }

    setShowOrientationPicker(false);
    setSelectedCell(null);
    setCurrentPlayer(prev => (prev + 1) % 2);
  }, [selectedCell, currentPlayer, cells, pieces, addLog]);

  const emptyCells = cells.filter(c => !pieces[c.id]);
  const scores = calculateScores();

  // Calculate viewBox to fit the grid
  const maxX = Math.max(...cells.map(c => c.x)) + 60;
  const maxY = Math.max(...cells.map(c => c.y)) + 60;

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-2">TETRAFLUX</h1>
        <p className="text-slate-400 text-center mb-4">Prototype v0.1</p>
        
        <div className="flex gap-4">
          {/* Game Board */}
          <div className="flex-1 bg-slate-800 rounded-lg p-4 relative">
            {showOrientationPicker && (
              <OrientationSelector
                onSelect={handleOrientationSelect}
                onCancel={() => {
                  setShowOrientationPicker(false);
                  setSelectedCell(null);
                }}
                playerColor={currentPlayer}
              />
            )}
            
            <svg 
              viewBox={`-10 -10 ${maxX + 20} ${maxY + 20}`}
              className="w-full"
              style={{ maxHeight: '500px' }}
            >
              {cells.map(cell => (
                <Triangle
                  key={cell.id}
                  cell={cell}
                  piece={pieces[cell.id]}
                  isSelected={selectedCell === cell.id}
                  isValidTarget={!pieces[cell.id] && !showOrientationPicker}
                  isHovered={hoveredCell === cell.id}
                  onClick={() => !showOrientationPicker && handleCellClick(cell)}
                  onHover={setHoveredCell}
                />
              ))}
            </svg>
          </div>

          {/* Side Panel */}
          <div className="w-64 space-y-4">
            {/* Current Player */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h2 className="text-slate-400 text-sm mb-2">Current Turn</h2>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: COLORS[currentPlayer] }}
                />
                <span className="text-white font-bold">{COLOR_NAMES[currentPlayer]}</span>
              </div>
            </div>

            {/* Scores */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h2 className="text-slate-400 text-sm mb-2">Hidden Face Count</h2>
              <div className="space-y-2">
                {[0, 1].map(player => (
                  <div key={player} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: COLORS[player] }}
                      />
                      <span className="text-white">{COLOR_NAMES[player]}</span>
                    </div>
                    <span className="text-white font-mono">{scores[player]}</span>
                  </div>
                ))}
                <hr className="border-slate-700" />
                <p className="text-slate-500 text-xs">Neutral colors:</p>
                {[2, 3].map(color => (
                  <div key={color} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: COLORS[color] }}
                      />
                      <span className="text-slate-400 text-sm">{COLOR_NAMES[color]}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-sm">{scores[color]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Log */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h2 className="text-slate-400 text-sm mb-2">Game Log</h2>
              <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
                {gameLog.length === 0 ? (
                  <p className="text-slate-500 italic">Click a cell to place a piece</p>
                ) : (
                  gameLog.map((log, i) => (
                    <p key={i} className="text-slate-300">{log}</p>
                  ))
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h2 className="text-slate-400 text-sm mb-2">Piece Legend</h2>
              <div className="text-xs text-slate-300 space-y-1">
                <p>• Center dot = Hidden face</p>
                <p>• Colored lines = Visible faces</p>
                <p>• Goal: Hide YOUR color</p>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setPieces({});
                setCurrentPlayer(0);
                setGameLog([]);
                setSelectedCell(null);
                setShowOrientationPicker(false);
              }}
              className="w-full py-2 bg-red-900 text-red-200 rounded hover:bg-red-800 transition-colors"
            >
              Reset Game
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 bg-slate-800 rounded-lg p-4">
          <h3 className="text-white font-bold mb-2">Quick Rules</h3>
          <div className="text-slate-300 text-sm grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-slate-200">Placement:</p>
              <p>Click empty cell → Choose which face to hide + rotation</p>
            </div>
            <div>
              <p className="font-semibold text-slate-200">Scoring:</p>
              <p>Count your color in the hidden (center dot) position across ALL pieces</p>
            </div>
            <div>
              <p className="font-semibold text-slate-200">Collision (visual only in prototype):</p>
              <p>Matching visible colors touching = repulsion logged</p>
            </div>
            <div>
              <p className="font-semibold text-slate-200">Strategy:</p>
              <p>Hide your color. Expose opponent's. Neutrals are tools.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
