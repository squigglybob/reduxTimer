import React, { useState, useEffect } from 'react'

enum timerStates {
    FINISHED = 0,
    STOPPED = 1,
    PLAYING = 2,
    PAUSED = 3,
}

const step: number = 100
const oneSecond: number = 1000

export default function Timer() {

    const [timerLength, setTimerLength] = useState(10)
    const [timerState, setTimerState] = useState(timerStates.STOPPED)
    const [currentTime, setCurrentTime] = useState(timerLength*oneSecond)

    useEffect(() => {
        const tick = setInterval(() => {
            if (timerState === timerStates.PLAYING && currentTime > 0) {
                setCurrentTime(t => t - step)
            } else if ( currentTime === 0 ) {
                setTimerState(timerStates.FINISHED)
            }
        }, step)
        return () => {
            clearInterval(tick)
        }
    }, [timerState, currentTime])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTimerLength: number = parseInt(e.target.value)
        setTimerLength(newTimerLength)
        setCurrentTime(newTimerLength*oneSecond)
    }

    const handleStart = () => {
        setTimerState(timerStates.PLAYING)
    }

    const handlePause = () => {
        setTimerState(timerStates.PAUSED)
    }

    const handleStop = () => {
        setTimerState(timerStates.STOPPED)
        setCurrentTime(timerLength*oneSecond)
    }

    return (
        <section>
            <h2>Timer Test</h2>
            <input
                type="number"
                name="timerLength"
                value={timerLength}
                onChange={onChange}
            />
            <div style={{ margin: "50px", fontSize: "50px" }}>
                {currentTime}
            </div>
            {(timerState === timerStates.PAUSED || timerState === timerStates.STOPPED) && (
                <button
                    onClick={handleStart}
                >
                    Start
                </button>
            )}
            {(timerState === timerStates.PLAYING) && (
                    <button
                        onClick={handlePause}
                    >
                        Pause
                    </button>

                )
            }
            {(timerState !== timerStates.STOPPED) && <button
                onClick={handleStop}
            >
                Reset
            </button>
            }
        </section>
    )
}
