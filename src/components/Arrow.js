import arrowleft from "../img/arrowleft.png";
import arrowright from "../img/arrowright.png";
import arrowup from "../img/arrowup.png";
import arrowdown from "../img/arrowdown.png";
import { useEffect, useState } from "react";

const Arrow = (props) => {
    const [statusClass, setStatusClass] = useState("");

    useEffect(() => {
        setStatusClass(
            props.status === 1 ? "correct" : props.status === 0 ? "wrong" : props.status === -1 ? "" : ""
        );
    }, [props.status]);

    return (
        <>
            {props.arrow === 0 && (
                <img
                    src={arrowup}
                    alt=""
                    className={`arrow up ${statusClass}`}
                />
            )}
            {props.arrow === 1 && (
                <img
                    src={arrowdown}
                    alt=""
                    className={`arrow down ${statusClass}`}
                />
            )}
            {props.arrow === 2 && (
                <img
                    src={arrowleft}
                    alt=""
                    className={`arrow left ${statusClass}`}
                />
            )}
            {props.arrow === 3 && (
                <img
                    src={arrowright}
                    alt=""
                    className={`arrow right ${statusClass}`}
                />
            )}
        </>
    );
};

export default Arrow;
