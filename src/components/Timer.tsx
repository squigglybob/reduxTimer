import React, { useEffect } from 'react'

import {
    startTimer,
    pauseTimer,
    stopTimer,
    finishTimer,
    changeTimer,
    interval,
    timerStates,
    step,
    oneSecond,
} from 'slices/timer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'slices'

export default function Timer() {

    const dispatch = useDispatch()
    const {
        timerLength,
        timerState,
        elapsedTime } = useSelector(
            (state: RootState) => state.timer
        )
    /*     const [timerLength, setTimerLength] = useState(10)
        const [timerState, setTimerState] = useState(timerStates.STOPPED)
        const [currentTime, setCurrentTime] = useState(timerLength*oneSecond)
     */
    useEffect(() => {
        const tick = setInterval(() => {
            if (timerState === timerStates.PLAYING && elapsedTime < timerLength*oneSecond) {
                dispatch(interval())
            } else if (elapsedTime >= timerLength*oneSecond) {
                dispatch(finishTimer())
            }
        }, step)
        return () => {
            clearInterval(tick)
        }
    }, [timerState, elapsedTime, dispatch, timerLength])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTimerLength: number = parseInt(e.target.value)
        dispatch(changeTimer({timerLength: newTimerLength}))
    }

    const handleStart = () => {
        dispatch(startTimer())
    }

    const handlePause = () => {
        dispatch(pauseTimer())
    }

    const handleStop = () => {
        dispatch(stopTimer())
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
                {timerLength ? timerLength*oneSecond - elapsedTime : '--'}
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
