'use client'

const directionLabels = {
    across: 'Across',
    down: 'Down',
    'diagonal-up': '↗ Diagonal Up',
    'diagonal-down': 'Diagonal Down',
}

export default function WordBank({ setActiveWord, highlightedWords, wordSearchData, getClueCells }) {
    const directions = Object.keys(wordSearchData.clues)

    return (
        <div className="w-full max-w-md bg-white rounded-md border">
            {/* Sectioned Clue Buttons by Direction */}
            {directions.map((direction) => (
                <div key={direction} className="mb-4 px-4">
                    <h3 className="text-md font-semibold text-purple-700 mb-2">
                        {directionLabels[direction] || direction}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {wordSearchData.clues[direction].map((clue) => {
                            const clueCells = getClueCells(clue, direction)
                            const isFound = highlightedWords.some((word) =>
                                word.cells.every((cell) => clueCells.includes(cell))
                            )

                            return (
                                <button
                                    key={`${direction}-${clue.number}`}
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