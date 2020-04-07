import React, { useEffect } from 'react'

import {
    startTimer,
    pauseTimer,
    stopTimer,
    finishTimer,
    changeTimer,
    interval,
    step,
    isFinished,
    isPaused,
    isPlaying,
    isStopped,
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
    } = useSelector((state: RootState) => state.timer)


    useEffect(() => {
        let tick: number | undefined = undefined
        if (isPlaying(timerState)) {
            tick = window.setInterval(() => {
                if (isPlaying(timerState) && elapsedTime < timerLengthMs) {
                    dispatch(interval())
                } else if (elapsedTime >= timerLengthMs) {
                    dispatch(finishTimer())
                }

                console.log(timerLengthMs, elapsedTime);
            }, step)
        }
        if (isFinished(timerState)) {
            clearInterval(tick)
        }
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
            {(isPaused(timerState) || isStopped(timerState)) && (
                <button
                    onClick={handleStart}
                >
                    Start
                </button>
            )}
            {(isPlaying(timerState)) && (
                <button
                    onClick={handlePause}
                >
                    Pause
                </button>

            )
            }
            {(!isStopped(timerState)) && <button
                onClick={handleStop}
            >
                Reset
            </button>
            }
        </section>
    )
}
