import countdown from "../img/countdown/countdown.png";
import countdown0 from "../img/countdown/countdown0.png";
import countdown1 from "../img/countdown/countdown1.png";
import countdown2 from "../img/countdown/countdown2.png";
import countdown3 from "../img/countdown/countdown3.png";
import countdown4 from "../img/countdown/countdown4.png";
import countdown5 from "../img/countdown/countdown5.png";
import countdown6 from "../img/countdown/countdown6.png";
import countdown7 from "../img/countdown/countdown7.png";
import countdown8 from "../img/countdown/countdown8.png";

import { useEffect, useRef, useState } from "react";

const Countdown = (props) => {
    const [frame, setFrame] = useState(countdown);

    const frameRef = useRef();

    const countdownAnimation = () => {
        frameRef.current.classList.remove("hide");
        let intervalDuration = 150;
      
        const updateFrame = () => {
          setFrame((frame) => {
            switch (frame) {
                case countdown:
                    return countdown0;
                case countdown0:
                    intervalDuration = 450; 
                    return countdown1;
                case countdown1:
                    intervalDuration = 150;
                    return countdown2;
                case countdown2:
                    return countdown3;
                case countdown3:
                    intervalDuration = 450;
                    return countdown4;
                case countdown4:
                    intervalDuration = 150;
                    return countdown5;
                case countdown5:
                    return countdown6;
                case countdown6:
                    intervalDuration = 450;
                    return countdown7;
                case countdown7:
                    return countdown8;
                case countdown8:
                    frameRef.current.classList.add("hide");
                    props.setCountdown(false);
                    props.setStart(true)
                    return countdown;
                default:
                    return countdown;
            }
          });
      
          if (frameRef.current.classList.contains("hide")) {
            return; // Stop the animation
          }
      
          setTimeout(updateFrame, intervalDuration);
        };
      
        updateFrame();
      };
      

    useEffect(() => {
        if (props.countdown) {
            countdownAnimation();
        }
    }, [props.countdown]);

    return (
        <img ref={frameRef} src={frame} alt="countdown" className="countdown" />
    );
};

export default Countdown;
