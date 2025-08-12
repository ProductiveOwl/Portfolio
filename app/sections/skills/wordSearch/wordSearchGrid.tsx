'use client'

import { useState, useEffect } from 'react'
import { wordSearchData } from './wordSearchData'
import WordBank from './wordBank'

/* All possible directions for each word */
type Direction =
    | 'across'
    | 'down'
    | 'diagonal-up' //bottom-left to top-right
    | 'diagonal-down' //top-left to bottom-right

//Depending on the direction, this will output the correct rotation for the stripe
const rotationMap: Record<Direction, number> = {
    across: 0,
    down: 90,
    'diagonal-up': -45,
    'diagonal-down': 45,
}

//Depending on the direction, this will output the correct translation for the first letter of the stripe
const translationMapFirst: Record<Direction, string> = {
    across: "-50%, -50%",
    down: "-50%, -50%",
    'diagonal-up': "-40%, -75%",
    'diagonal-down': "-40%, -25%",
}

//Depending on the direction, this will output the correct translation for the last letter of the stripe
const translationMapLast: Record<Direction, string> = {
    across: "-50%, -50%",
    down: "-50%, -50%",
    'diagonal-up': "-60%, -25%",
    'diagonal-down': "-60%, -75%",
}

/* Gets all of the cells for a word based on the answer*/
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
    //This keeps track of all the cells for a word, its stripe colour, the direction, and the clue number
    type HighlightedWord = { cells: string[]; colour: string; direction: Direction; number: number }

    const [highlightedWords, setHighlightedWords] = useState<HighlightedWord[]>([])
    const [activeWord, setActiveWord] = useState<string[] | null>(null)
    const [cellClickState, setCellClickState] = useState<Record<string, number>>({})

    useEffect(() => {
        const allWords: HighlightedWord[] = []
        for (const dir in wordSearchData.clues) {
            const direction = dir as Direction
            wordSearchData.clues[direction].forEach((clue) => {
                const cells = getClueCells(clue, direction)
                const colour = clue.colour || 'bg-green-300 text-green-900'
                allWords.push({ cells, colour, direction, number: clue.number })
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
                            const matches = highlightedWords.filter((word) => word.cells.includes(key))
                            const isActive = activeWord?.includes(key)

                            const stripes = matches.map((m) => ({
                                //When the word is selected, its stripe colour will change to purple
                                colour: activeWord && activeWord.join(',') === m.cells.join(',') ? 'bg-purple-400' : m.colour,
                                direction: m.direction,
                                cells: m.cells,
                                number: m.number,
                            }))

                            {/* Cell*/ }
                            return (
                                <div
                                    key={key}
                                    className="relative aspect-square w-full flex items-center justify-center text-sm sm:text-base font-medium select-none bg-white text-black"
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
                                    {/* Stripe overlay */}
                                    {stripes.map((stripe, idx) => {
                                        const word = stripe

                                        let borderRadiusStyle = {} //First and last letters need rounded strip borders
                                        let stripeWidth = 'w-full'
                                        let cellTranslation = 'translate(-50%, -50%)'

                                        if (word) {
                                            const indexInWord = word.cells.indexOf(key)
                                            const isFirst = indexInWord === 0
                                            const isLast = indexInWord === word.cells.length - 1

                                            //Diagonal stripes need to be longer than the width of the cell
                                            stripeWidth = ((word.direction === 'diagonal-up' || word.direction === 'diagonal-down')) ? 'w-[150%]' : 'w-full'

                                            //The ends of the first and last letters need to be translated slightly to account for the extra width
                                            if (isFirst) {
                                                cellTranslation = `translate(${translationMapFirst[stripe.direction]})`
                                            } else if (isLast) {
                                                cellTranslation = `translate(${translationMapLast[stripe.direction]})`
                                            } else {
                                                cellTranslation = 'translate(-50%, -50%)'
                                            }

                                            //Borders need to be rounded for the first and last letters
                                            const roundness = '1000px'
                                            borderRadiusStyle = {
                                                borderTopLeftRadius: isFirst ? roundness : 0,
                                                borderBottomLeftRadius: isFirst ? roundness : 0,
                                                borderTopRightRadius: isLast ? roundness : 0,
                                                borderBottomRightRadius: isLast ? roundness : 0,
                                            }
                                        }

                                        return (
                                            <div
                                                key={idx}
                                                className={`absolute ${stripeWidth} h-[60%] ${stripe.colour}`}
                                                style={{
                                                    top: '50%',
                                                    left: '50%',
                                                    /*opacity: '70%',*/
                                                    cursor: 'pointer',
                                                    transform: `${cellTranslation} rotate(${rotationMap[stripe.direction]}deg)`,
                                                    pointerEvents: 'none',
                                                    zIndex: stripe.number,
                                                    ...borderRadiusStyle,
                                                }}
                                            />
                                        )
                                    })}
                                    {/*Large z-index to always display the letters over the stripe */}
                                    <span className="relative z-40">{cell}</span>
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
