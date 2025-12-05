import { motion, useAnimate } from "motion/react";

import HomeHeader from "./header";
import HomeCards from "./cards";
import Wheel from "@/components/wheel";
import { ChevronDown } from "lucide-react";

export default function LandingScreen() {
  const [scope, animate] = useAnimate();

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full  bg-black"
      ref={scope}
      drag={"y"}
      dragConstraints={{ bottom: 0 }}
      dragMomentum={false}
      onDragEnd={() => {
        animate(scope.current, { y: "-300%" }, { duration: 0.4 });
      }}
    >
      <HomeHeader />
      <HomeCards />
      <Wheel
        players={[
          { name: "Mahmoud", color: "#471396" },
          { name: "Bakr", color: "#b13bff" },
          { name: "WEB3", color: "#090040" },
          { name: "Developer", color: "#393e46" },
        ]}
        animate
      />
      <ChevronDown
        className="m-auto animate-pulse mt-4 cursor-pointer"
        size={40}
        onClick={() => {
          animate(scope.current, { y: "-100%" }, { duration: 0.4 });
        }}
      />
    </motion.div>
  );
}
