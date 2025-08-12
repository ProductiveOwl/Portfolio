import BottomAllIn from "./projects/pieces/bottomAllIn";
import BottomLeft from "./projects/pieces/bottomLeft";
import BottomRight1 from "./projects/pieces/bottomRight1";
import TopIn1 from "./projects/pieces/topIn1";
import TopLeft from "./projects/pieces/topLeft";
import TopRightOut from "./projects/pieces/topRightOut";

export default function Projects() {
  const projectTitles = [
    "CNN for Bioinformatics", "Mancala", "iGEM Website",
    "GeAn Algorithm", "Game Escape", "Pool",
  ];

  const links = {
    "CNN for Bioinformatics": "#about",
    "Mancala": "#about",
    "iGEM Website": "#about",
    "GeAn Algorithm": "https://github.com/STEM-Fellowship-Indicium/tsp-code",
    "Game Escape": "https://github.com/ProductiveOwl/Game-Escape",
    "Pool": "https://github.com/ProductiveOwl/Pool"
  };

  const projectDescriptions = [
    "An adapted Convoluntional Neural Network to predict soybean phenotypes that I helped test for a conference. The paper and CNN architecture are included.",
    "A Java Swing application that allows two users to play Mancala against each other.",
    "A website for the iGEM Competition to simulate different biological systems with AI. In progress...",
    "Created a custom biological algorithm to solve the Traveling Salesman Problem with a team for the STEM Fellowship Conference.",
    "A Java Swing game that tests the user's ability to get through all the minigames before time runs out.",
    "A full stack project that allows two players to play pool against each other on a local server."
  ];

  // Background colour, outline colour
  const pieceColour = ["#f0b9d1", "#000000", "#FF0000"]

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">Projects</h1>

      {/* Outer container maintains aspect ratio and scales */}
      <div className="relative w-full aspect-[1/0.7] bg-transparent rounded overflow-show">
        {/* Scalable inner grid */}
        <div className="absolute inset-0">
          <div className="absolute top-[0%] w-[52%]">
            <TopLeft title={projectTitles[0]} link={links[projectTitles[0]]} label={projectDescriptions[0]} colour={pieceColour} className="w-full h-auto overflow-visible" />
          </div>
          <div className="absolute top-0 left-[33.1%] w-[52%]">
            <TopIn1 title={projectTitles[1]} link={links[projectTitles[1]]} label={projectDescriptions[1]} colour={pieceColour} className="w-full h-auto overflow-visible" />
          </div>
          <div className="absolute top-0 left-[57.2%] w-[52%]">
            <TopRightOut title={projectTitles[2]} link={links[projectTitles[2]]} label={projectDescriptions[2]} colour={pieceColour} className="w-full h-auto overflow-visible" />
          </div>
          <div className="absolute top-[47.4%] left-[0%] w-[52%]">
            <BottomLeft title={projectTitles[3]} link={links[projectTitles[3]]} label={projectDescriptions[3]} colour={pieceColour} className="w-full h-auto overflow-visible" />
          </div>
          <div className="absolute top-[47.4%] left-[33.1%] w-[52%]">
            <BottomAllIn title={projectTitles[4]} link={links[projectTitles[4]]} label={projectDescriptions[4]} colour={pieceColour} className="w-full h-auto overflow-visible" />
          </div>
          <div className="absolute top-[47.4%] left-[57.2%] w-[52%]">
            <BottomRight1 title={projectTitles[5]} link={links[projectTitles[5]]} label={projectDescriptions[5]} colour={pieceColour} className="w-full h-auto overflow-visible" />
          </div>
        </div>
      </div>
    </section>
  )
}