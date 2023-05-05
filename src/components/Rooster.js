import rooster from "../img/rooster.gif";
import roosterstand from "../img/roosterstand.png";
import whiterooster from "../img/white-rooster.gif";
import whiteroosterstand from "../img/whiteroosterstand.png";
import { useEffect, useRef, useState } from "react";

const Rooster = (props) => {
    const timeoutsRef = useRef([]);

    const [startPoint, setStartPoint] = useState(0);

    const [position, setPosition] = useState(0);
    const positionRef = useRef(position);
    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    const [iswalking, setIsWalking] = useState(false);
    const iswalkingRef = useRef(iswalking);
    useEffect(() => {
        iswalkingRef.current = iswalking;
    }, [iswalking]);

    const roosterRef = useRef();

    const [stand, setStand] = useState(roosterstand);
    const [move, setMove] = useState(rooster);

    const startRoosterMovement = () => {
        if (iswalkingRef.current) {
            return;
        }

        const direction = Math.random() < 0.5 ? -1 : 1;
        if (direction > 0) {
            roosterRef.current.classList.remove("moveright");
        } else {
            roosterRef.current.classList.add("moveright");
        }

        const walkDuration = Math.floor(Math.random() * 3000) + 1000;
        const standDuration = Math.floor(Math.random() * 3000) + 2000;
        const speed = 150;
        const distancePerInterval = (speed * 10) / 1000;

        setIsWalking(true);
        const interval = setInterval(() => {
            setPosition(positionRef.current + distancePerInterval * direction);
        }, 10);

        const stopMovement = () => {
            clearInterval(interval);
            setIsWalking(false);
        };

        const walkTimeout = setTimeout(() => {
            stopMovement();

            const standTimeout = setTimeout(() => {
                startRoosterMovement();
            }, standDuration);

            timeoutsRef.current.push(standTimeout);
        }, walkDuration);

        timeoutsRef.current.push(walkTimeout);

        return stopMovement;
    };


    useEffect(() => {
        if (props.isWhite) {
            setStand(whiteroosterstand);
            setMove(whiterooster);
        }

        setStartPoint(Math.floor(Math.random() * 1000) + 250)

        const cleanup = startRoosterMovement();

        const showTimeout = setTimeout(() => {
            roosterRef.current.classList.remove("hidden");
        }, 1000);

        timeoutsRef.current.push(showTimeout);

        return () => {
            cleanup();
            timeoutsRef.current.forEach((timeout) => {
                clearTimeout(timeout);
            });
        };
    }, []);

    return (
        <img
            src={iswalking ? move : stand}
            alt=""
            ref={roosterRef}
            className="rooster hidden"
            style={{
                right: positionRef.current + startPoint,
            }}
        />
    );
};

export default Rooster;
