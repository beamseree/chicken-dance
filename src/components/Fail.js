import fail from "../img/fail/fail.png";
import fail0 from "../img/fail/fail0.png";
import fail1 from "../img/fail/fail1.png";
import fail2 from "../img/fail/fail2.png";
import fail3 from "../img/fail/fail3.png";
import fail4 from "../img/fail/fail4.png";
import fail5 from "../img/fail/fail5.png";
import fail6 from "../img/fail/fail6.png";
import fail7 from "../img/fail/fail7.png";
import fail8 from "../img/fail/fail8.png";
import fail9 from "../img/fail/fail9.png";
import fail10 from "../img/fail/fail10.png";
import fail11 from "../img/fail/fail11.png";
import fail12 from "../img/fail/fail12.png";
import fail13 from "../img/fail/fail13.png";
import fail14 from "../img/fail/fail14.png";
import fail15 from "../img/fail/fail15.png";
import fail16 from "../img/fail/fail16.png";
import fail17 from "../img/fail/fail17.png";

import { useEffect, useRef, useState } from "react";

const Fail = (props) => {
    const [frame, setFrame] = useState(fail);

    const frameRef = useRef();

    const failAnimation = () => {
        frameRef.current.classList.remove("hide");
        const interval = setInterval(() => {
            setFrame((frame) => {
                switch (frame) {
                    case fail:
                        return fail0;
                    case fail0:
                        return fail1;
                    case fail1:
                        return fail2;
                    case fail2:
                        return fail3;
                    case fail3:
                        return fail4;
                    case fail4:
                        return fail5;
                    case fail5:
                        return fail6;
                    case fail6:
                        return fail7;
                    case fail7:
                        return fail8;
                    case fail8:
                        return fail9;
                    case fail9:
                        return fail10;
                    case fail10:
                        return fail11;
                    case fail11:
                        return fail12;
                    case fail12:
                        return fail13;
                    case fail13:
                        return fail14;
                    case fail14:
                        return fail15;
                    case fail15:
                        return fail16;
                    case fail16:
                        return fail17;
                    case fail17:
                        clearInterval(interval);
                        frameRef.current.classList.add("hide");
                        props.setFail(false);
                    default:
                        return fail;
                }
            });
        }, 125);
    };

    useEffect(() => {
        if (props.fail) {
            failAnimation();
        }
    }, [props.fail]);

    return <img ref={frameRef} src={frame} alt="fail" className="fail" />;
};

export default Fail;
