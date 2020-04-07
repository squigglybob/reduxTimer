import React, { useEffect } from 'react'

import {
    startTimer,
    pauseTimer,
    stopTimer,
    finishTimer,
    transitionTimer,
    /*     changeTimer, */
    interval,
    step,
    isFinished,
    isPaused,
    isPlaying,
    isStopped,
    Segment as SegmentType,
} from 'slices/activeTimer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'slices'
import Segment from './Segment'

export default function Timer() {

    const dispatch = useDispatch()
    const {
        timerState,
        segments,
        activeSegmentIndex,
    } = useSelector((state: RootState) => state.activeTimer)

    useEffect(() => {
        let tick: number | undefined = undefined
        if (isPlaying(timerState)) {
            console.log(segments, activeSegmentIndex);

            const activeSegment: SegmentType = segments[activeSegmentIndex]
            tick = window.setInterval(() => {
                if (isPlaying(timerState) && activeSegment.elapsedTime < activeSegment.timer.timerLengthMs) {
                    dispatch(interval())
                } else if (activeSegment.elapsedTime >= activeSegment.timer.timerLengthMs) {
                    if (activeSegmentIndex === segments.length - 1) {
                        dispatch(finishTimer())
                    } else {
                        const nextSegmentIndex: number = activeSegmentIndex + 1
                        dispatch(transitionTimer(nextSegmentIndex))
                        dispatch(startTimer())
                    }
                }
            }, step)
        }
        if (isFinished(timerState)) {
            clearInterval(tick)
        }
        return () => {
            clearInterval(tick)
        }
    }, [timerState, dispatch, segments, activeSegmentIndex])

    /*     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newTimerLength: number = parseInt(e.target.value)
            dispatch(changeTimer({ timerLength: newTimerLength }))
        } */

    const handleStart = () => {
        dispatch(startTimer())
    }

    const handlePause = () => {
        dispatch(pauseTimer())
    }

    const handleStop = () => {
        dispatch(stopTimer())
    }

    const isActive = (segmentIndex: number) => activeSegmentIndex === segmentIndex

    return (
        <section>
            <h2>Timer Test</h2>
            {/*             <input
                type="number"
                name="timerLength"
                value={timerLength}
                onChange={onChange}
            /> */}
            {segments.map((segment, i) =>
                <Segment key={i} segment={segment} active={isActive(i)} />
            )}
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
