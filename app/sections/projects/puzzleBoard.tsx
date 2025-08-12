import TopOut1 from "./otherPieces/topOut1";
import TopIn1 from "./pieces/topIn1";
import TopLeft from "./pieces/topLeft";
import TopRight from "./otherPieces/topRight";

import LeftIn1 from "./otherPieces/leftIn1";
import SidesOut from "./otherPieces/sidesOut";
import LeftOut1 from "./otherPieces/leftOut1";
import AllIn from "./otherPieces/allIn";
import VerticalOut from "./otherPieces/verticalOut";
import AllOut from "./otherPieces/allOut";
import RightIn0 from "./otherPieces/rightIn0";
import RightOut0 from "./otherPieces/rightOut0";

import BottomLeft from "./otherPieces/bottomLeftOut";
import BottomOut from "./otherPieces/bottomOut";
import BottomIn from "./otherPieces/bottomIn";
import BottomRight from "./otherPieces/bottomRight";

const verticalSpacing = [
  "0%", "11%", "19%", "33%", "41%", "55%", "63%", "77%", "85%"
];

const horizontalSpacing = [
  "0%", "9.95%", "17.2%", "29.8%", "37%", "49.65%", "56.8%", "69.4%", "76.55%", "89.1%"
];

const topRowPieces = [
  { Component: TopLeft, label: "A1", left: horizontalSpacing[0] },
  { Component: TopIn1, label: "A2", left: horizontalSpacing[1] },
  { Component: TopOut1, label: "A3", left: horizontalSpacing[2] },
  { Component: TopIn1, label: "A4", left: horizontalSpacing[3] },
  { Component: TopOut1, label: "A5", left: horizontalSpacing[4] },
  { Component: TopIn1, label: "A4", left: horizontalSpacing[5] },
  { Component: TopOut1, label: "A5", left: horizontalSpacing[6] },
  { Component: TopIn1, label: "A4", left: horizontalSpacing[7] },
  { Component: TopOut1, label: "A5", left: horizontalSpacing[8] },
  { Component: TopRight, label: "A5", left: horizontalSpacing[9] }
];

// Other rows piece set
const midRowPiecesIn = [
  { Component: LeftIn1, label: "A1", left: horizontalSpacing[0] },
  { Component: AllIn, label: "A2", left: horizontalSpacing[1] },
  { Component: SidesOut, left: horizontalSpacing[2] },
  { Component: AllIn, label: "A4", left: horizontalSpacing[3] },
  { Component: SidesOut, left: horizontalSpacing[4] },
  { Component: AllIn, label: "A4", left: horizontalSpacing[5] },
  { Component: SidesOut, left: horizontalSpacing[6] },
  { Component: AllIn, label: "A4", left: horizontalSpacing[7] },
  { Component: SidesOut, left: horizontalSpacing[8] },
  { Component: RightIn0, label: "A5", left: horizontalSpacing[9] }
];

const midRowPiecesOut = [
  { Component: LeftOut1, label: "A1", left: horizontalSpacing[0] },
  { Component: VerticalOut, label: "A2", left: horizontalSpacing[1] },
  { Component: AllOut, label: "A3", left: horizontalSpacing[2] },
  { Component: VerticalOut, label: "A4", left: horizontalSpacing[3] },
  { Component: AllOut, label: "A5", left: horizontalSpacing[4] },
  { Component: VerticalOut, label: "A4", left: horizontalSpacing[5] },
  { Component: AllOut, label: "A5", left: horizontalSpacing[6] },
  { Component: VerticalOut, label: "A4", left: horizontalSpacing[7] },
  { Component: AllOut, label: "A5", left: horizontalSpacing[8] },
  { Component: RightOut0, label: "A5", left: horizontalSpacing[9] }
];

const bottomRowPiecesOut = [
  { Component: BottomLeft, label: "A1", left: horizontalSpacing[0] },
  { Component: BottomIn, label: "A2", left: horizontalSpacing[1] },
  { Component: BottomOut, label: "A3", left: horizontalSpacing[2] },
  { Component: BottomIn, label: "A4", left: horizontalSpacing[3] },
  { Component: BottomOut, label: "A5", left: horizontalSpacing[4] },
  { Component: BottomIn, label: "A4", left: horizontalSpacing[5] },
  { Component: BottomOut, label: "A5", left: horizontalSpacing[6] },
  { Component: BottomIn, label: "A4", left: horizontalSpacing[7] },
  { Component: BottomOut, label: "A5", left: horizontalSpacing[8] },
  { Component: BottomRight, label: "A5", left: horizontalSpacing[9] }
];

export default function PuzzleBoard() {
  return (
    <div className="relative w-full h-full">
      {verticalSpacing.flatMap((topValue, rowIndex) =>
        (rowIndex === 0 ? topRowPieces :
          rowIndex === 8 ? bottomRowPiecesOut :
            rowIndex % 2 === 1 ? midRowPiecesIn : midRowPiecesOut).map(({ Component, label, left }, pieceIndex) => (
              <div
                key={`${rowIndex}-${pieceIndex}`}
                className="absolute w-[15.5%]"
                style={{
                  top: topValue,
                  left: left
                }}
              >
                <Component label={label} className="w-full h-auto overflow-visible" />
              </div>
            ))
      )}
    </div>
  );
}

