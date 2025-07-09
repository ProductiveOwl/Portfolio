'use client'

import { useState, useEffect } from 'react'
import { wordSearchData } from './wordSearchData'
import WordBank from './wordBank'

type Direction =
    | 'across'
    | 'down'
    | 'diagonal-up'
    | 'diagonal-down'

function getClueCells(clue, direction: Direction): string[] {
    const cells: string[] = []
    for (let i = 0; i < clue.answer.length; i++) {
        let r = clue.row
        let c = clue.col
        switch (direction) {
            case 'across':
                c += i
                break
            case 'down':
                r += i
                break
            case 'diagonal-up':
                r -= i
                c += i
                break
            case 'diagonal-down':
                r += i
                c += i
                break
        }
        cells.push(`${r}-${c}`)
    }
    return cells
}

export default function WordSearch() {
    type HighlightedWord = { cells: string[]; colour: string }

    const [highlightedWords, setHighlightedWords] = useState<HighlightedWord[]>([])
    const [activeWord, setActiveWord] = useState<string[] | null>(null)
    const [cellClickState, setCellClickState] = useState<Record<string, number>>({})

    useEffect(() => {
        const allWords: HighlightedWord[] = []
        for (const dir in wordSearchData.clues) {
            const direction = dir as Direction
            wordSearchData.clues[direction].forEach((clue) => {
                const cells = getClueCells(clue, direction)
                const colour = clue.colour || 'bg-green-300 text-green-900' // default
                allWords.push({ cells, colour })
            })
        }
        setHighlightedWords(allWords)
    }, [])


    return (
        <div className="flex flex-col md:flex-row md:items-start gap-4 w-full items-center justify-center">
            {/* Grid */}
            <div className="w-full max-w-[600px]">
                <div
                    className="grid"
                    style={{
                        gridTemplateColumns: `repeat(${wordSearchData.grid[0].length}, 1fr)`,
                        width: '100%',
                        maxWidth: '700px',
                    }}
                >
                    {wordSearchData.grid.map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                            const key = `${rowIndex}-${colIndex}`
                            const match = highlightedWords.find((word) => word.cells.includes(key))
                            const isActive = activeWord?.includes(key)

                            let baseClass = 'bg-white text-black'
                            if (isActive) {
                                baseClass = 'bg-blue-300 text-blue-900 rounded-xl' //Background colour changes to blue when the user click on it
                            } else if (match) {
                                baseClass = `${match.colour} rounded-xl` //Set the correct background colour
                            }


                            return (
                                <div
                                    key={key}
                                    className={`relative aspect-square w-full border border-black flex items-center justify-center text-sm sm:text-base font-medium select-none ${baseClass}`}
                                    onClick={() => {
                                        const matches = highlightedWords.filter((word) => word.cells.includes(key))
                                        if (matches.length === 0) {
                                            setActiveWord(null)
                                            return
                                        }

                                        const currentIndex = cellClickState[key] ?? -1
                                        const nextIndex = (currentIndex + 1) % matches.length
                                        const nextWord = matches[nextIndex].cells

                                        if (activeWord === nextWord) {
                                            setActiveWord(null)
                                            return
                                        }

                                        setActiveWord(nextWord)
                                        setCellClickState((prev) => ({ ...prev, [key]: nextIndex }))
                                    }}
                                >
                                    {cell}
                                </div>
                            )
                        })
                    )}
                </div>
            </div>

            {/* Word Bank */}
            <div className="w-full md:w-[400px]">
                <WordBank
                    setActiveWord={setActiveWord}
                    highlightedWords={highlightedWords}
                    wordSearchData={wordSearchData}
                    getClueCells={getClueCells}
                />
            </div>
        </div>
    )
}
