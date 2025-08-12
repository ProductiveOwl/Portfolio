'use client'

import React from 'react'
import { wordSearchData } from './wordSearchData'

type Clue = {
  number: number
  clue: string
  row: number
  col: number
  answer: string
  colour: string
  category: 'Languages' | 'Tools' | 'Operating Systems'
}

const categoryLabels = {
  Languages: 'Languages',
  Tools: 'Tools',
  'Operating Systems': 'Operating Systems',
}

interface WordBankProps {
  setActiveWord: (cells: string[]) => void
  highlightedWords: { cells: string[] }[]
  wordSearchData: typeof wordSearchData
  getClueCells: (clue: Clue, direction: string) => string[]
}

export default function WordBank({
  setActiveWord,
  highlightedWords,
  wordSearchData,
  getClueCells,
}: WordBankProps) {
  // Flatten all clues and add direction info
  const allClues: (Clue & { direction: string })[] = Object.entries(
    wordSearchData.clues as Record<string, Clue[]>
  ).flatMap(([direction, clues]) =>
    clues.map((clue) => ({
      ...clue,
      direction,
    }))
  )

  // Group clues by category
  const categories = ['Languages', 'Tools', 'Operating Systems'] as const
  const cluesByCategory: Record<typeof categories[number], (Clue & { direction: string })[]> =
  {
    Languages: [],
    Tools: [],
    'Operating Systems': [],
  }

  allClues.forEach((clue) => {
    cluesByCategory[clue.category].push(clue)
  })

  return (
    <div className="w-full max-w-md bg-white rounded-md border">
      {/* Center only the main title */}
      <h2 className="text-purple-700 font-bold p-2 text-xl text-center">Word Bank</h2>

      {categories.map((category) => (
        <div key={category} className="mb-4 px-4">
          {/* Force left alignment for category labels */}
          <h3 className="text-md font-semibold text-purple-700 mb-2 text-left">
            {categoryLabels[category]}
          </h3>

          {/* Buttons left-aligned */}
          <div className="flex flex-wrap gap-2 justify-start">
            {cluesByCategory[category].map((clue) => {
              const clueCells = getClueCells(clue, clue.direction)
              const isFound = highlightedWords.some((word) =>
                word.cells.every((cell) => clueCells.includes(cell))
              )

              return (
                <button
                  key={`${clue.direction}-${clue.number}`}
                  onClick={() => setActiveWord(clueCells)}
                  className={`px-3 py-1 rounded-md border text-sm ${isFound
                    ? 'bg-green-300 text-green-900 border-green-400 font-semibold'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-100'
                    }`}
                >
                  {clue.clue}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}