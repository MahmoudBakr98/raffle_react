import { useEffect, useRef } from "react";

import Slice from "./slice";

import type { Raffle } from "@/contracts/Raffle/types/RaffleAPIType";

export default function Wheel({
  players,
  animate = false,
  winner,
}: {
  players: Raffle.LotPlayerStruct[];
  animate?: boolean;
  winner?: number;
}) {
  const wheelRef = useRef<SVGSVGElement>(null);

  const anglePerSlice = 360 / players.length;

  function spin() {
    if (wheelRef.current && winner != undefined && winner >= 0) {
      const fullRotationCount = 5 * 360;
      const rotationOffset = -90 - (winner * anglePerSlice + anglePerSlice / 2);
      wheelRef.current.style.transform = `rotate(${fullRotationCount + rotationOffset}deg)`;
    }
  }

  useEffect(() => {
    if (winner! >= 0) {
      setTimeout(() => {
        spin();
      }, 500);
    }
  }, [winner]);

  return (
    <div className="w-[400px] mx-auto ">
      <div className="mx-auto relative top-[10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-red-500"></div>{" "}
      <svg className="w-full h-auto" viewBox="0 0 200 200">
        <g
          id="wheel"
          ref={wheelRef}
          className={
            (animate ? "animate-[spin_8s_linear_reverse_infinite]" : "") +
            " " +
            "origin-center transition-transform duration-[4000ms] ease-out"
          }
        >
          {players.map(({ name, color }, i) => (
            <Slice
              key={name + color}
              {...{ i, name, color, anglePerSlice, center: 100, radius: 100 }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
