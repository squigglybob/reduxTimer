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
} from 'slices/timer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'slices'

export default function Timer() {

    const dispatch = useDispatch()
    const {
        timerLength,
        timerLengthMs,
        timerState,
        elapsedTime,
    } = useSelector(
        (state: RootState) => state.timer
    )

    useEffect(() => {
        const tick = setInterval(() => {
            if (timerState === timerStates.PLAYING && elapsedTime < timerLengthMs) {
                dispatch(interval())
            } else if (elapsedTime >= timerLengthMs) {
                dispatch(finishTimer())
            }
        }, step)
        return () => {
            clearInterval(tick)
        }
    }, [timerState, elapsedTime, dispatch, timerLengthMs])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTimerLength: number = parseInt(e.target.value)
        dispatch(changeTimer({ timerLength: newTimerLength }))
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
                {timerLength ? `${((timerLengthMs - elapsedTime) / 1000).toFixed(3)}s` : '--'}
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
