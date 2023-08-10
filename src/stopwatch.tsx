import styles from './Stopwatch.module.css'
import { useEffect } from "react";

type StopwatchProps = {
    time: number
    setTime: (num: number) => void
    isRunning: boolean
}

export function Stopwatch({ time, setTime, isRunning }: StopwatchProps) {
    useEffect(() => {
        let intervalId: NodeJS.Timer;
        if (isRunning) {
            intervalId = setInterval(() => setTime(time + 1 / 10), 100);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    return <div className={styles.timer}>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:{("0" + Math.floor(time % 60)).slice(-2)} {!isRunning ? "Win" : ""}</div>
}