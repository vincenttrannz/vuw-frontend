import React, { useState, useEffect, useRef } from 'react';
import { Button } from "react-bootstrap";
import Lottie from "react-lottie";
import * as ArrowLeftLottieData from "../../../public/lotties/ArrowLeft.json";
import * as ArrowRightLottieData from "../../../public/lotties/ArrowRight.json";

type VicButtonProps = {
  ClickFunc?: () => void;
  className?: string;
  variant?: string;
  btnType?: string;
  btnText?: string;
  disable?: boolean;
}

export default function VicButton({ClickFunc, className, variant, btnType, btnText, disable}: VicButtonProps) {
  const [playLottie, setPlayLottie] = useState(true);
  const ButtonRef = useRef<HTMLButtonElement>(null);
  // Configuration for Lottie
  const ArrowLeftDefaultOptions = {
    loop: false,
    autoplay: false,
    animationData: ArrowLeftLottieData,
  };
  const ArrowRightDefaultOptions = {
    loop: false,
    autoplay: false,
    animationData: ArrowRightLottieData,
  };

  useEffect(() => {
    disable 
    ? ButtonRef.current?.setAttribute("disabled", "true")
    : ButtonRef.current?.removeAttribute("disabled")
  }, [disable])

  return (
   <Button
    ref={ButtonRef}
    onClick={ClickFunc}
    className={className}
    variant={variant}
    onMouseEnter={() => setPlayLottie(false)}
    onMouseLeave={() => setPlayLottie(true)}
   >
    {
      (btnType == "prev") && 
      <div className='arrow me-2'>
        <Lottie
          options={ArrowLeftDefaultOptions}
          width={30}
          height={30}
          style={{
            margin: "0"
          }}
          speed={1.4}
          // direction={!playLottie ? 1 : -1}
          isStopped={playLottie}
        />
      </div>
    }
    {
      (btnType == "next")
      ?
      <span className='btn-text'>{btnText}</span>
      :
      (btnType == "prev")
      ?
      <span className='btn-text'>{btnText}</span>
      : ""
    }
    {
      (btnType == "next") &&
      <div className='arrow ms-2'>
        <Lottie
          options={ArrowRightDefaultOptions}
          width={30}
          height={30}
          style={{
            margin: "0"
          }}
          speed={1.4}
          isStopped={playLottie}
        />
      </div>
    }
   </Button>
  )
}