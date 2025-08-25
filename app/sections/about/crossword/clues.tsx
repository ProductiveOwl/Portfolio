'use client'

import { crosswordData } from './crosswordData'

export default function Clues({ direction, setDirection, activeClue, setActiveClue, setHighlightedCells, getClueCells }) {
    return (
        <div className="mt-6 w-full max-w-md bg-purple-300 rounded-md">
            {/* Tab Headers */}
            <div className="flex mb-4">
                {['Across', 'Down'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setDirection(tab.toLowerCase())
                            setActiveClue(null)
                            setHighlightedCells([])
                        }}
                        className={`flex-1 py-2 text-center border-b-2 ${direction === tab.toLowerCase()
                            ? 'text-purple-700 font-semibold'
                            : 'bg-gray-400 text-white border-b border-gray-400'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Clue List - Nested Clue Tabs */}
            <div className="flex overflow-x-auto mx-2 mb-2 pb-3 space-x-2 bg-purple-300">
                {crosswordData.clues[direction].map((clue) => {
                    const isActive = activeClue?.number === clue.number && activeClue.direction === direction
                    const isClue1 = clue.number === 1
                    return (
                        <button
                            key={clue.number}
                            onClick={() => {
                                setHighlightedCells(getClueCells(clue, direction))
                                setActiveClue({ number: clue.number, direction })
                            }}
                            className={`px-3 py-1 rounded-md shadow-xl text-sm whitespace-nowrap ${isActive
                                ? 'bg-purple-500 text-white font-bold'
                                : isClue1
                                    ? 'bg-purple-400 text-purple-800 border-purple-400'
                                    : 'bg-white text-black border-gray-300'
                                }`}
                        >
                            {clue.number}
                        </button>
                    )
                })}
            </div>

            {/* Selected Clue Text */}
            {activeClue && (
                <div className="bg-purple-300 rounded-md p-4 border border-purple-400 text-sm text-black">
                    {activeClue.number}.{' '}
                    {
                        crosswordData.clues[activeClue.direction].find(
                            (clue) => clue.number === activeClue.number
                        )?.clue
                    }
                </div>
            )}
        </div>
    )
}