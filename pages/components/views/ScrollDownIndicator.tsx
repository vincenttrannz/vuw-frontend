import React from "react";
import Lottie from "react-lottie";
import * as ScrollDownLottieData from "../../../public/lotties/ScrollDown.json";

export default function ScrollDownIndicator() {
  // Configuration for Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ScrollDownLottieData,
  };
  return (
    <div className="scrolldown">
      <span className="scrolldown__text">SCROLL</span>
      <Lottie
        options={defaultOptions}
        width={16}
        height={80}
        style={{
          backgroundColor: "#333333",
          cursor: "auto"
        }}
      />
    </div>
  );
}
