import TopOut1 from "./otherPieces/topOut1";
import TopIn1 from "./pieces/topIn1";
import ProjectTable from "./projectTable";
import TopLeft from "./pieces/topLeft";
import TopRight from "./otherPieces/topRight";
import LeftIn0 from "./otherPieces/leftIn0";
import BottomLeft from "./otherPieces/bottomLeftOut";
import SidesOut from "./otherPieces/sidesOut";
import LeftOut1 from "./otherPieces/leftOut1";
import LeftIn1 from "./otherPieces/leftIn1";
import PuzzleBoard from "./puzzleBoard";

export default function ProjectsOld() {
  return (
    <section className="py-8">
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">Projects</h1>
      <p className="mb-6 text-white-600">This puzzle scales as a unit</p>

      {/* 🔲 Outer container maintains aspect ratio and scales */}
      <div className="relative w-full aspect-[1/0.9] bg-gray-100 rounded shadow overflow-hidden">
        {/* 🧩 Scalable inner grid */}
        <div className="absolute inset-0">
          {/*<div className="relative w-full h-full">
             First row (overlapping pieces using absolute positioning) 
            <div className="absolute top-0 w-[15.5%] h-auto">
              <TopLeft label="A1" className="w-full h-auto" />
            </div>
            <div className="absolute top-0 left-[9.9%] w-[15.5%]">
              <TopIn1 label="A2" className="w-full h-auto" />
            </div>
            <div className="absolute top-0 left-[17.1%] w-[15.5%]">
              <TopOut1 label="A3" className="w-full h-auto" />
            </div>
            <div className="absolute top-0 left-[29.75%] w-[15.5%]">
              <TopIn1 label="A4" className="w-full h-auto" />
            </div>
            <div className="absolute top-0 left-[36.9%] w-[15.5%]">
              <TopOut1 label="A5" className="w-full h-auto" />
            </div>
            <div className="absolute top-0 left-[49.5%] w-[15.5%]">
              <TopIn1 label="A4" className="w-full h-auto" />
            </div>
            <div className="absolute top-0 left-[56.7%] w-[15.5%]">
              <TopOut1 label="A5" className="w-full h-auto" />
            </div>
            <div className="absolute top-0 left-[69.3%] w-[15.5%]">
              <TopIn1 label="A4" className="w-full h-auto" />
            </div>
            <div className="absolute top-0 left-[76.55%] w-[15.5%]">
              <TopOut1 label="A5" className="w-full h-auto" />
            </div>
            <div className="absolute top-0 left-[89.2%] w-[15.5%]">
              <TopRight label="A5" className="w-full h-auto" />
            </div>*/}

            <PuzzleBoard/>

            {/* ROW 2 
            <div className="absolute top-[11%] left-[0%] w-[15.5%]">
              <LeftIn1 label="B3" className="w-full h-auto overflow-visible"/>
            </div>
            <div className="absolute top-[11%] left-[17.1%] w-[15.5%]">
              <SidesOut label="C3" className="w-full h-auto overflow-visible"/>
            </div>*/}

            {/* ROW 3 
            <div className="absolute top-[19%] left-[0%] w-[15.5%]">
              <LeftOut1 label="B2" className="w-full h-auto overflow-visible"/>
            </div>*/}
            {/* ROW 4 
            <div className="absolute top-[33%] left-[0%] w-[15.5%]">
              <LeftIn1 label="B3" className="w-full h-auto overflow-visible"/>
            </div>
            <div className="absolute top-[41%] left-[0%] w-[15.5%]">
              <LeftOut1 label="B4" className="w-full h-auto overflow-visible"/>
            </div>
            <div className="absolute top-[55%] left-[0%] w-[15.5%]">
              <LeftIn0 label="B5" className="w-full h-auto overflow-visible"/>
            </div>
            <div className="absolute top-[63%] left-[0%] w-[15.5%]">
              <LeftOut1 label="B6" className="w-full h-auto overflow-visible"/>
            </div>
            <div className="absolute top-[77%] left-[0%] w-[15.5%]">
              <LeftIn0 label="B5" className="w-full h-auto overflow-visible"/>
            </div>
            <div className="absolute top-[88%] left-[0%] w-[15.5%]">
              <BottomLeft label="B10" className="w-full h-auto overflow-visible"/>
            </div>*/}

            {/* 📝 Centered puzzle design text 
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none text-2xl font-bold text-black opacity-80">
              My Projects
            </div>

          <ProjectTable/>

          </div>*/}
          <ProjectTable/>
        </div>
      </div >
    </section >
  );
}
