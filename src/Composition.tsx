import { AbsoluteFill, useCurrentFrame } from "remotion";
import { loadFont, fontFamily } from "@remotion/google-fonts/Outfit";
import { getLength, getPointAtLength } from "@remotion/paths";
import React from "react";

const GRADIENT = [
  "white",
  "#F796D3",
  "#FF1BB7",
  "#ED1C2C",
  "#7C0E04",
  "#4B0802",
  "black",
  "black",
];

loadFont();

const path1 = "M1 1L315.5 71L436 14";
const path2 = "M1 168.5L134.5 251.5L210 168.5L409.5 201.5";
const itemsPerLine = 22;
const fontSize = 150;

export const RotatingThing: React.FC<{
  text: string;
  path: string;
  rotation: number;
  scale: number;
}> = ({ text, path, scale, rotation }) => {
  const frame = useCurrentFrame();

  return new Array(itemsPerLine)
    .fill(true)
    .map((_, i) => i)
    .reverse()
    .map((i) => {
      const length = getLength(path);
      const pointAtLength = getPointAtLength(path, (i / itemsPerLine) * length);

      return (
        <div
          style={{
            position: "relative",
          }}
        >
          <div
            className="font-sans"
            style={{
              fontSize,
              fontWeight: "bolder",
              fontFamily,
              backgroundImage: `linear-gradient(30deg, ${GRADIENT.join(", ")})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
              left: pointAtLength.x,
              top: pointAtLength.y - fontSize / 2,
              position: "absolute",
              rotate: i * 0.05 + rotation + (frame / 30 + i * 0.01) + "rad",
              scale: String(scale - i * 0.04),
              filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.3))",
            }}
          >
            {text}
          </div>
        </div>
      );
    });
};

export const MyComposition = () => {
  return (
    <AbsoluteFill className="bg-black">
      <RotatingThing rotation={0} scale={1.1} text="4" path={path1} />
      <AbsoluteFill style={{ marginTop: 20 }}>
        <RotatingThing
          rotation={-Math.PI / 2}
          scale={1.3}
          text="2"
          path={path2}
        />
      </AbsoluteFill>
      <AbsoluteFill
        className="justify-center items-center text-white"
        style={{
          fontFamily,
        }}
      >
        <div
          style={{
            fontWeight: "bolder",
            marginTop: -30,
            fontSize: 24,
          }}
        >
          Your 2024 Wrapped is here
        </div>
        <div
          style={{
            fontSize: 10,
            marginTop: 5,
          }}
        >
          What ruled your listening this year?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
