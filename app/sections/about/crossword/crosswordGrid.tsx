'use client'

import { useState } from 'react'
import { crosswordData } from './crosswordData'
import Clues from './clues'

// Utility functions...
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

function getClueCells(clue, direction): string[] {
  const cells: string[] = []
  for (let i = 0; i < clue.answer.length; i++) {
    const r = direction === 'across' ? clue.row : clue.row + i
    const c = direction === 'across' ? clue.col + i : clue.col
    cells.push(`${r}-${c}`)
  }
  return cells
}

function getClueAt(row, col, direction) {
  return crosswordData.clues[direction].find((clue) =>
    getClueCells(clue, direction).includes(`${row}-${col}`)
  )
}

export default function Crossword() {
  const [gridState, setGridState] = useState<string[][]>(
    crosswordData.grid.map((row) => row.map((cell) => (cell === ' ' ? ' ' : '')))
  )

  const [highlightedCells, setHighlightedCells] = useState<string[]>([])
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null)
  const [direction, setDirection] = useState<'across' | 'down'>('down') // My name appears under the "down" column -> down is the default
  const [activeClue, setActiveClue] = useState<{ number: number; direction: 'across' | 'down' } | null>({ number: 1, direction: 'down', }) //Defaults to the first clue which is my name

  const clueNumbers = getClueNumbers()

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const currentCell = activeCell
    let newDirection = direction

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
    <div className="flex flex-col md:flex-row md:items-start gap-4 w-full items-center justify-center">
      {/* Responsive Auto-Scaling Grid */}
      <div className="w-full max-w-[600px]">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${crosswordData.grid[0].length}, 1fr)`,
            width: '100%',
            maxWidth: '700px',
          }}
        >
          {crosswordData.grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const key = `${rowIndex}-${colIndex}`
              const isEmpty = cell === ' '
              const number = clueNumbers[key]
              const isHighlighted = highlightedCells.includes(key)

              const isClue1 =
                getClueAt(rowIndex, colIndex, 'across')?.number === 1 ||
                getClueAt(rowIndex, colIndex, 'down')?.number === 1
              const isClue1Active = activeClue?.number === 1

              const baseClass = isEmpty
                ? 'bg-gray-400'
                : isHighlighted && isClue1 && isClue1Active
                  ? 'bg-purple-300 text-purple-900'
                  : isHighlighted
                    ? 'bg-blue-200'
                    : isClue1
                      ? 'bg-purple-400 text-white'
                      : 'bg-white text-gray-800'

              return (
                <div
                  key={key}
                  className={`leading-none relative aspect-square w-full border border-black flex items-center justify-center text-sm sm:text-base font-medium select-none ${baseClass}`}
                  onClick={() => !isEmpty && handleCellClick(rowIndex, colIndex)}
                >
                  {number && (
                    <div className="absolute text-[0.65rem] sm:text-[0.75rem] top-0 left-0 ml-1 mt-0.5 text-black">
                      {number}
                    </div>
                  )}
                  <div className="flex w-full h-full items-center justify-center text-sm sm:text-base font-medium select-none">
                    {!isEmpty ? cell : ''}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Clues */}
      <div className="w-full md:w-[400px]">
        <Clues
          direction={direction}
          setDirection={setDirection}
          activeClue={activeClue}
          setActiveClue={setActiveClue}
          setHighlightedCells={setHighlightedCells}
          getClueCells={getClueCells}
        />
      </div>
    </div>
  )
}
