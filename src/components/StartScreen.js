import logo from "../img/chickendancelogo.png"
import bg from "../img/startscreenbg.png"
import maplelogo from "../img/maplelogo.png"
import startnormal from "../img/startbtn.png"

const StartScreen = (props) => {

    const handleStart = () => {
        document.querySelector(".start-screen").classList.add("hide");
        props.setCountdown(true);
        props.bgm.play();
    }

    return (
        <div className="start-screen">
        <div className="start-screen-inner">
            <img src={maplelogo} alt="" className="maplelogo"/>
            <img src={logo} alt="" className="logo"/>

            <div className="start-btn" onClick={handleStart}></div>
        </div>

            <img src={bg} alt="" className="start-screen-bg" />
        </div>
    );
}
 
export default StartScreen;