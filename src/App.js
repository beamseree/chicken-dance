import "./App.css";
import bgimg from "./img/chicken-dance-bg.png";
import ui from "./img/ui.png";
import { useState, useEffect, useRef } from "react";

import bg from "./audio/bgmusic.mp3";
import arrowdownsound from "./audio/arrowdown.mp3";
import arrowupsound from "./audio/arrowup.mp3";
import arrowrightsound from "./audio/arrowright.mp3";
import arrowleftsound from "./audio/arrowleft.mp3";
import Arrow from "./components/Arrow";

import frito from "./img/frito.gif";
import Rooster from "./components/Rooster";
import Start from "./components/Start";
import Clear from "./components/Clear";
import Countdown from "./components/Countdown";
import Result from "./components/Result";

import arrowcontainerleft from "./img/arrowcontainerleft.png";
import arrowcontainerright from "./img/arrowcontainerright.png";

import cursoridle from "./img/cursor/cursor_idle.png";
import cursorclick from "./img/cursor/cursor_click.png";
import StartScreen from "./components/StartScreen";
import Fail from "./components/Fail";

const bgm = new Audio(bg);
bgm.volume = 0.1;
bgm.loop = true;

function App() {
    const appRef = useRef();

    const [cursor, setCursor] = useState(cursoridle);
    const cursorRef = useRef(cursor);

    const [arrowPattern, setArrowPattern] = useState([]);

    const arrowPatternRef = useRef(arrowPattern);
    useEffect(() => {
        arrowPatternRef.current = arrowPattern;
        setArrowStatus(arrowPatternRef.current.map(() => -1));
    }, [arrowPattern]);

    const uiRef = useRef();
    const arrowRef = useRef();

    const [stage, setStage] = useState(0);
    const stageRef = useRef(stage);
    useEffect(() => {
        stageRef.current = stage;
    }, [stage]);

    const [arrowIndex, setArrowIndex] = useState(0);
    const arrowIndexRef = useRef(arrowIndex);
    useEffect(() => {
        arrowIndexRef.current = arrowIndex;
    }, [arrowIndex]);

    const [time, setTime] = useState(60000);
    const timeRef = useRef(time);
    useEffect(() => {
        timeRef.current = time;
    }, [time]);

    const [arrowStatus, setArrowStatus] = useState([]);
    const arrowStatusRef = useRef(arrowStatus);
    useEffect(() => {
        arrowStatusRef.current = arrowStatus;
    }, [arrowStatus]);

    const [start, setStart] = useState(false);
    const [clear, setClear] = useState(false);
    const [fail, setFail] = useState(false);
    const [countdown, setCountdown] = useState(false);

    const [spawnRooster, setSpawnRooster] = useState(false);

    const [resultTime, setResultTime] = useState(60000);
    const [result, setResult] = useState(false);
    const resultRef = useRef(result);
    useEffect(() => {
        resultRef.current = result;
    }, [result]);
    const [didClear, setDidClear] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const isPlayingRef = useRef(isPlaying);
    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    const startGame = () => {
        arrowRef.current.classList.remove("none");
        setTime(60000);
        setStage(0);
        createArrowPattern(0);
        setIsPlaying(true);
        setArrowIndex(0);
        setArrowStatus([]);
        arrowRef.current.classList.remove("hide");
        setTimeout(() => {
            uiRef.current.classList.remove("none");
            setTime(60000);
            uiRef.current.classList.remove("hide");
            setSpawnRooster(true);

            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 7);
                if (timeRef.current <= 0 && isPlayingRef.current) {
                    clearInterval(timer);
                    setTime(0.0);
                    setDidClear(false);
                    setResultTime(0);
                    setFail(true);
                    endGame();
                } else if (resultRef.current) {
                    clearInterval(timer);
                }
            }, 10);
        }, 200);
    };

    const createArrowPattern = (stage) => {
        const arrowPatternTemp = [];
        let arrowNum = 0;
        switch (stage) {
            case 0:
                arrowNum = 4;
                break;
            case 1:
                arrowNum = 6;
                break;
            case 2:
                arrowNum = 7;
                break;
            case 3:
                arrowNum = 7;
                break;
            case 4:
                arrowNum = 7;
                break;
            case 5:
                arrowNum = 8;
                break;
            case 6:
                arrowNum = 8;
                break;
            case 7:
                arrowNum = 8;
                break;
            case 8:
                arrowNum = 10;
                break;
            case 9:
                arrowNum = 10;
                break;
            case 10:
                arrowNum = 10;
                break;
            default:
                arrowNum = 4;
                break;
        }
        if (stage !== 10) {
            for (let i = 0; i < arrowNum; i++) {
                const arrow = Math.floor(Math.random() * 4);
                arrowPatternTemp.push(arrow);
            }

            setArrowPattern(arrowPatternTemp);
        }
    };

    const checkArrow = (arrow) => {
        // console.log(arrowPatternRef.current)
        // console.log(arrow, arrowPatternRef.current[arrowIndexRef.current])
        if (arrow === arrowPatternRef.current[arrowIndexRef.current]) {
            setArrowIndex(arrowIndexRef.current + 1);
            updateArrowStatus(arrowIndexRef.current, 1);
            if (arrowIndexRef.current === arrowPatternRef.current.length - 1) {
                if (stageRef.current === 9) {
                    setStage(stageRef.current + 1);
                    setTimeout(() => {
                        // alert("You win!");
                        setIsPlaying(false);
                        setDidClear(true);
                        setClear(true);
                        setResultTime(timeRef.current);
                        endGame();
                    }, 100);
                    // setStage(0);
                    // setArrowIndex(0);
                    // setArrowPattern([]);
                    // setArrowStatus([]);
                } else {
                    setTimeout(() => {
                        setArrowStatus([]);
                        setStage(stageRef.current + 1);
                        setArrowIndex(0);
                        createArrowPattern(stageRef.current + 1);
                    }, 100);
                }
            }
        } else {
            updateArrowStatus(arrowIndexRef.current, 0);
            setTimeout(() => {
                setArrowStatus([]);
                setStage(stageRef.current);
                setArrowIndex(0);
                createArrowPattern(stageRef.current);
            }, 150);
        }
    };

    const endGame = () => {
        setIsPlaying(false);
        setStart(false);
        setCountdown(false);
        setArrowIndex(0);
        setTimeout(() => {
            uiRef.current.classList.add("hide");
            arrowRef.current.classList.add("hide");
            setTimeout(() => {
                setSpawnRooster(false);
                setArrowPattern([]);
                setArrowStatus([]);
                uiRef.current.classList.add("none");
                arrowRef.current.classList.add("none");
                setResult(true);
            }, 800);
        }, 2000);
    };

    const handleArrow = (event) => {
        if (!isPlayingRef.current) {
            return;
        }
        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                const upsound = new Audio(arrowupsound);
                upsound.volume = 0.1;
                upsound.play();
                checkArrow(0);
                // Perform any action for the up arrow key
                break;
            case "ArrowDown":
                event.preventDefault();
                const downsound = new Audio(arrowdownsound);
                downsound.volume = 0.1;
                downsound.play();
                checkArrow(1);
                // Perform any action for the down arrow key
                break;
            case "ArrowLeft":
                event.preventDefault();
                const leftsound = new Audio(arrowleftsound);
                leftsound.volume = 0.1;
                leftsound.play();
                checkArrow(2);
                // Perform any action for the left arrow key
                break;
            case "ArrowRight":
                event.preventDefault();
                const rightsound = new Audio(arrowrightsound);
                rightsound.volume = 0.1;
                rightsound.play();
                checkArrow(3);
                // Perform any action for the right arrow key
                break;
            default:
                break;
        }
    };

    const updateArrowStatus = (index, status) => {
        setArrowStatus((prevState) => {
            const updatedStatus = [...prevState];
            updatedStatus[index] = status;
            return updatedStatus;
        });
    };

    useEffect(() => {
        appRef.current.addEventListener("mousedown", handleClick);
        appRef.current.addEventListener("mouseup", handleUnclick);
        document.addEventListener("keydown", handleArrow);
        appRef.current.addEventListener("mousemove", moveCursor);
        // setCountdown(true);

        return () => {
            appRef.current.removeEventListener("mousedown", handleClick);
            appRef.current.removeEventListener("mouseup", handleUnclick);
            appRef.current.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("keydown", handleArrow);
        };
    }, []);

    const formatTime = (time) => {
        const seconds = Math.floor(time / 1000);
        const milliseconds = time % 1000;
        return `${seconds}.${milliseconds.toString().substring(0, 2)}`;
    };

    const moveCursor = (e) => {
        const divRect = appRef.current.getBoundingClientRect();

        const mouseY = e.clientY - divRect.top - 4;
        const mouseX = e.clientX - divRect.left - 4;

        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const handleClick = (event) => {
        setCursor(cursorclick);
        // Perform any action you'd like to do when a click occurs
    };

    const handleUnclick = (event) => {
        setCursor(cursoridle);
        // Perform any action you'd like to do when a click occurs
    };

    return (
        <div className="App">
            <img src={bgimg} alt="" className="bg-blur" />

            <div className="chicken-dance" ref={appRef}>
                <img className="cursor" src={cursor} alt="" ref={cursorRef} />

                <img className="background" src={bgimg} alt="" />

                <StartScreen setCountdown={setCountdown} bgm={bgm} />

                <div ref={uiRef} className="ui-container none">
                    <img className="ui-img" src={ui} alt="" />
                    <p className="time">{formatTime(time)}</p>
                    <p className="stage">{stage}</p>
                </div>

                <div className="arrow-container none" ref={arrowRef}>
                    <img
                        src={arrowcontainerleft}
                        alt=""
                        className="arrow-edge"
                    />
                    <div className="arrow-inner">
                        {arrowPattern.map((arrow, index) => (
                            <Arrow
                                key={index}
                                arrow={arrow}
                                status={arrowStatus[index]}
                            />
                        ))}
                    </div>
                    <img
                        src={arrowcontainerright}
                        alt=""
                        className="arrow-edge"
                    />
                </div>

                <Result
                    didClear={didClear}
                    resultTime={formatTime(resultTime)}
                    result={result}
                    stage={stage}
                    setCountdown={setCountdown}
                    setResult={setResult}
                />

                <img src={frito} alt="" className="frito" />
                {spawnRooster && (
                    <>
                        <Rooster isWhite={true} />
                        <Rooster isWhite={true} />
                        <Rooster isWhite={true} />
                        <Rooster isWhite={false} />
                        <Rooster isWhite={false} />
                        <Rooster isWhite={false} />
                    </>
                )}

                <Start
                    start={start}
                    setStart={setStart}
                    startGame={startGame}
                />
                <Clear clear={clear} setClear={setClear} />
                <Fail fail={fail} setFail={setFail} />
                <Countdown
                    countdown={countdown}
                    setCountdown={setCountdown}
                    setStart={setStart}
                />
            </div>
        </div>
    );
}

export default App;
