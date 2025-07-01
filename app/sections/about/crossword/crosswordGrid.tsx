'use client'

import { useState } from 'react'
import { crosswordData } from './crosswordData'
import Clues from './clues'

// Generate clue number map for grid cells
function getClueNumbers() {
  const map: Record<string, number> = {}
  crosswordData.clues.across.forEach(({ number, row, col }) => {
    map[`${row}-${col}`] = number
  })
  crosswordData.clues.down.forEach(({ number, row, col }) => {
    map[`${row}-${col}`] = number
  })
  return map
}

// Get all cell keys covered by a clue
function getClueCells(clue, direction): string[] {
  const cells: string[] = []

  for (let i = 0; i < clue.answer.length; i++) {
    const r = direction === 'across' ? clue.row : clue.row + i
    const c = direction === 'across' ? clue.col + i : clue.col
    cells.push(`${r}-${c}`)
  }

  return cells
}

// Find the clue that a cell belongs to, for a given direction
function getClueAt(row, col, direction) {
  return crosswordData.clues[direction].find((clue) =>
    getClueCells(clue, direction).includes(`${row}-${col}`)
  )
}

export default function Crossword() {
  const [gridState, setGridState] = useState<string[][]>(
    crosswordData.grid.map((row) =>
      row.map((cell) => (cell === ' ' ? ' ' : ''))
    )
  )

  const [highlightedCells, setHighlightedCells] = useState<string[]>([])
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null)
  const [direction, setDirection] = useState<'across' | 'down'>('across')
  const [activeClue, setActiveClue] = useState<{ number: number; direction: 'across' | 'down' } | null>(null)

  const clueNumbers = getClueNumbers()

  // Click handler for a cell
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const key = `${rowIndex}-${colIndex}`
    const currentCell = activeCell
    let newDirection = direction

    // Toggle direction if same cell clicked again
    if (currentCell?.row === rowIndex && currentCell?.col === colIndex) {
      newDirection = direction === 'across' ? 'down' : 'across'
      setDirection(newDirection)
    }

    setActiveCell({ row: rowIndex, col: colIndex })

    const clue = getClueAt(rowIndex, colIndex, newDirection)
    if (clue) {
      setHighlightedCells(getClueCells(clue, newDirection))
      setActiveClue({ number: clue.number, direction: newDirection })
    } else {
      setHighlightedCells([])
      setActiveClue(null)
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Crossword Grid */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${crosswordData.grid[0].length}, 3rem)`,
          width: '100%',
        }}
      >
        {crosswordData.grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const key = `${rowIndex}-${colIndex}`
            const isEmpty = cell === ' '
            const number = clueNumbers[key]
            const isHighlighted = highlightedCells.includes(key)

            // Check if this cell belongs to clue 1 (in either direction)
            const isClue1 =
              getClueAt(rowIndex, colIndex, 'across')?.number === 1 ||
              getClueAt(rowIndex, colIndex, 'down')?.number === 1

            // Check if clue 1 is currently active (My name)
            const isClue1Active = activeClue?.number === 1

            // Compose cell class
            const baseClass = isEmpty
              ? 'bg-gray-400'
              : isHighlighted && isClue1 && isClue1Active
                ? 'bg-purple-300 text-purple-900' // Change name to a different colour to stand out
                : isHighlighted
                  ? 'bg-blue-200'
                  : isClue1
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-white text-gray-800'


            return (
              <div
                key={key}
                className={`relative aspect-square border border-black flex items-start justify-start p-0.5 ${baseClass}`}
                onClick={() => !isEmpty && handleCellClick(rowIndex, colIndex)}
              >
                {/* Clue number in top left corner */}
                {number && (
                  <div className="absolute text-[0.8rem] top-0 left-0 ml-1 mt-0.5 text-black">
                    {number}
                  </div>
                )}

                {/* Letter inside the square */}
                {!isEmpty && (
                  <div className="flex w-full h-full items-center justify-center text-lg font-medium select-none">
                    {cell}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      <Clues
        direction={direction}
        setDirection={setDirection}
        activeClue={activeClue}
        setActiveClue={setActiveClue}
        setHighlightedCells={setHighlightedCells}
        getClueCells={getClueCells}
      />

    </div>
  )
}
