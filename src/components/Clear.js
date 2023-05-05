import clear from "../img/clear/clear.png";
import clear0 from "../img/clear/clear0.png";
import clear1 from "../img/clear/clear1.png";
import clear2 from "../img/clear/clear2.png";
import clear3 from "../img/clear/clear3.png";
import clear4 from "../img/clear/clear4.png";
import clear5 from "../img/clear/clear5.png";
import clear6 from "../img/clear/clear6.png";
import clear7 from "../img/clear/clear7.png";
import clear8 from "../img/clear/clear8.png";
import clear9 from "../img/clear/clear9.png";

import { useEffect, useRef, useState } from "react";

const Clear = (props) => {
    const [frame, setFrame] = useState(clear);

    const frameRef = useRef();

    const clearAnimation = () => {
        frameRef.current.classList.remove("hide");
        const interval = setInterval(() => {
            setFrame((frame) => {
                switch (frame) {
                    case clear:
                        return clear0;
                    case clear0:
                        return clear1;
                    case clear1:
                        return clear2;
                    case clear2:
                        return clear3;
                    case clear3:
                        return clear4;
                    case clear4:
                        return clear5;
                    case clear5:
                        return clear6;
                    case clear6:
                        return clear7;
                    case clear7:
                        return clear8;
                    case clear8:
                        return clear9;
                    case clear9:
                        clearInterval(interval);
                        frameRef.current.classList.add("hide");
                        props.setClear(false)
                        return clear;
                    default:
                        return clear;
                }
            });
        }, 110);
    };

    useEffect(() => {
        if (props.clear) {
            clearAnimation();
        }
    }, [props.clear]);

    return <img ref={frameRef} src={frame} alt="clear" className="clear" />;
};

export default Clear;
