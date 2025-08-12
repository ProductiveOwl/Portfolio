export default function ProjectTable() {
  const content = [
    "Research & Analysis", "Applications", "Web Design",
    "CNN for Bioinformatics", "Mancala", "iGEM Website",
    "An adapted Convoluntional Neural Network to predict soybean phenotypes that I helped test for a conference.",
    "A Java Swing application that allows two users to play Mancala against each other.",
    "A website for the iGEM Competition to simulate different biological systems with AI. In progress...",
    "GeAn Algorithm", "Game Escape", "Pool",
    "Created a custom biological algorithm to solve the Traveling Salesman Problem with a team for the STEM Fellowship Conference.",
    "A Java Swing game that tests the user's ability to get through all the minigames before time runs out.",
    "A full stack project that allows two players to play pool against each other on a local server."
  ];

  const links = {
    "CNN for Bioinformatics": "https://example.com/cnn",
    "Mancala": "https://example.com/mancala",
    "iGEM Website": "#about",
    "GeAn Algorithm": "https://example.com/gean",
    "Game Escape": "https://example.com/game-escape",
    "Pool": "https://example.com/pool"
  };

  return (
    <div className="absolute inset-0 z-40 flex top-[12%] justify-center">
      <div className="w-[80%] h-[75%]">
        <div
          className="grid w-full h-full text-black text-center font-semibold"
          style={{
            gridTemplateRows: '0.2fr 0.1fr 0.5fr 0.1fr 0.5fr',
            gridTemplateColumns: 'repeat(3, 1fr)'
          }}
        >
          {content.map((text, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;

            const projectCategories = row === 0;
            const projectName = row === 1 || row === 3;
            const isLink = projectName && links[text];

            const borderClasses = [
              'border-t-transparent', // top border = pink
              row === 0 ? 'border-b-black' : 'border-b-transparent', // bottom border = pink
              col === 1 ? 'border-l-black' : 'border-l-transparent', // left vertical
              col === 1 ? 'border-r-black' : 'border-r-transparent'  // right vertical
            ];

            return (
              <div
                key={i}
                className={[
                  "flex justify-center items-center text-wrap leading-snug text-[clamp(0.5rem,1.4vw,1.5rem)]",
                  "border-t border-b border-l border-r", // enables per-side border
                  ...borderClasses,
                  projectCategories ? 'font-bold' : projectName ? 'items-end' : 'items-start px-1',
                  col === 1 ? 'bg-amber-300/50' : ''
                ].join(' ')}
              >
                {isLink ? (
  <div className="flex items-center gap-1">
    <a
      href={links[text]}
      target="_blank"
      className="underline text-black hover:text-blue-500"
    >
      <span
        className={
          !projectCategories && !projectName
            ? "bg-green-200/50 rounded-md px-1 py-0.5"
            : ""
        }
      >
        {text}
      </span>
    </a>
    <span className="text-sm no-underline">🔗</span>
  </div>
) : (
  <span
    className={
      !projectCategories && !projectName
        ? "bg-blue-200/50 rounded-md px-1 py-0.5"
        : ""
    }
  >
    {text}
  </span>
)}

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
