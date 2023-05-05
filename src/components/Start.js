import start0 from "../img/start/start0.png";
import start1 from "../img/start/start1.png";
import start2 from "../img/start/start2.png";
import start3 from "../img/start/start3.png";
import start4 from "../img/start/start4.png";
import start5 from "../img/start/start5.png";
import start6 from "../img/start/start6.png";
import start7 from "../img/start/start7.png";
import start8 from "../img/start/start8.png";
import start9 from "../img/start/start9.png";
import start10 from "../img/start/start10.png";

import { useEffect, useRef, useState } from "react";

const Start = (props) => {
    const [frame, setFrame] = useState(start0);

    const frameRef = useRef();

    const startAnimation = () => {
        frameRef.current.classList.remove("hide");
        const interval = setInterval(() => {
            setFrame((frame) => {
                switch (frame) {
                    case start0:
                        return start1;
                    case start1:
                        return start2;
                    case start2:
                        return start3;
                    case start3:
                        return start4;
                    case start4:
                        return start5;
                    case start5:
                        return start6;
                    case start6:
                        return start7;
                    case start7:
                        return start8;
                    case start8:
                        return start9;
                    case start9:
                        return start10;
                    case start10:
                        clearInterval(interval);
                        frameRef.current.classList.add("hide");
                        props.setStart(false)
                        props.startGame()
                        return start0;
                    default:
                        return start0;
                }
            });
        }, 110);
    };

    useEffect(() => {
        if (props.start) {
            startAnimation();
        }
    }, [props.start]);

    return <img ref={frameRef} src={frame} alt="start" className="start" />;
};

export default Start;
