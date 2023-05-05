import success from "../img/success-result.png"
import failed from "../img/failed-result.png"
import bg from "../img/result-bg.png"
import { useEffect, useState } from "react";

const Result = (props) => {
    const [resultHeader, setResultHeader] = useState(success)

    const handleStart = () => {
        props.setResult(false);
        document.querySelector(".result").classList.add("hide");
        props.setCountdown(true);
        setTimeout(() => {
            document.querySelector(".result").classList.add("none");
        }, 500);
    }

    useEffect(() => {
        console.log(props.result)
        if (props.result == true) {
            document.querySelector(".result").classList.remove("none");
            document.querySelector(".result").classList.remove("hide");
        }
    }, [props.result])

    return (
        <div className="result hide none">
            <img src={props.didClear ? success : failed} alt="" className="result-header" />
            <img src={bg} alt="" className="result-bg"/>
            <p className="result-time">{props.resultTime}</p>
            <p className="result-time stage">{props.stage}</p>

            <div className="start-btn" onClick={handleStart}></div>
        </div>
    );
}
 
export default Result;