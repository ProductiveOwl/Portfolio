export const wordSearchData = {
  grid: [
    ['J', 'A', 'V', 'A', 'S', 'T', 'U', 'D', 'E', 'N', 'T'],
    [' ', ' ', ' ', 'D', ' ', 'P', ' ', ' ', 'Y', ' ', ' '],
    [' ', ' ', 'S', 'A', ' ', 'Y', 'Y', ' ', ' ', 'T', ' '],
    [' ', 'S', ' ', ' ', ' ', 'W', ' ', 'T', ' ', ' ', 'H'],
    ['C', ' ', ' ', ' ', ' ', 'C', ' ', ' ', 'H', ' ', ' '],
    ['R', 'E', 'S', 'E', 'A', 'S', 'C', 'H', 'T', 'O', ' '],
    [' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', 'M', ' ', 'N'],
    [' ', ' ', 'P', 'U', 'Z', 'Z', 'L', 'E', 'L', ' ', ' '],
  ],
  /*List the left-most row and column number for each word */
  clues: {
    across: [
      {
        number: 1,
        clue: 'Java',
        row: 0,
        col: 0,
        answer: 'JAVA',
        colour: 'bg-orange-300 text-black',
      },
    ],
    down: [
      {
        number: 5,
        clue: 'Ada',
        row: 0,
        col: 3,
        answer: 'ADA',
        colour: 'bg-yellow-300 text-black',
      },
      {
        number: 8,
        clue: 'HTML',
        row: 4,
        col: 8,
        answer: 'HTML',
        colour: 'bg-red-300 text-black',
      },
    ],
    'diagonal-up': [
      {
        number: 6,
        clue: 'CSS',
        row: 4,
        col: 0,
        answer: 'CSS',
        colour: 'bg-blue-300 text-black',
      },
    ],
    'diagonal-down': [
      {
        number: 7,
        clue: 'Python',
        row: 1,
        col: 5,
        answer: 'PYTHON',
        colour: 'bg-blue-600 text-black',
      },
    ],
  },
}

