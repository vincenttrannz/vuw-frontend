import React, {useState} from 'react';
import Lottie from "react-lottie";
import * as ScrollDownLottieData from "../../../public/lotties/ArrowLeft.json";

type ArrowLeftProps = {
  OnHover?: boolean;
}

export default function ArrowLeft({OnHover}: ArrowLeftProps) {
  // Configuration for Lottie
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: ScrollDownLottieData,
  };

  return (
    <div className='arrow'>
      <Lottie
        options={defaultOptions}
        width={30}
        height={30}
        speed={1.4}
        isStopped={OnHover ? true : OnHover}
        style={{
          margin: "0"
        }}
      />
    </div>
  )
}