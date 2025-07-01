'use client'

import { crosswordData } from './crosswordData'

export default function Clues({ direction, setDirection, activeClue, setActiveClue, setHighlightedCells, getClueCells }) {
    return (
        <div className="mt-6 w-full max-w-md">
            {/* Tab Headers */}
            <div className="flex mb-4 border-b border-white">
                {['Across', 'Down'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setDirection(tab.toLowerCase())
                            setActiveClue(null)
                            setHighlightedCells([])
                        }}
                        className={`flex-1 py-2 text-center border-b-2 ${direction === tab.toLowerCase()
                                ? 'border-blue-600 text-blue-600 font-semibold'
                                : 'border-transparent text-white'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Clue List - Nested Clue Tabs */}
            <div className="flex overflow-x-auto mb-2 space-x-2">
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
                            className={`px-3 py-1 rounded-md border text-sm whitespace-nowrap ${isActive
                                    ? 'bg-blue-600 text-white font-bold'
                                    : isClue1
                                        ? 'bg-purple-100 text-purple-800 border-purple-400'
                                        : 'bg-white text-gray-700 border-gray-300'
                                }`}
                        >
                            {clue.number}
                        </button>
                    )
                })}
            </div>

            {/* Selected Clue Text */}
            {activeClue && (
                <div className="bg-white rounded-md p-4 border border-gray-200 text-sm text-gray-900">
                    <strong>
                        {activeClue.number}.{' '}
                        {
                            crosswordData.clues[activeClue.direction].find(
                                (clue) => clue.number === activeClue.number
                            )?.clue
                        }
                    </strong>
                </div>
            )}
        </div>
    )
}