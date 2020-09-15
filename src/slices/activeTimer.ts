import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const step: number = 10
const oneSecond: number = 1000

export enum timerStates {
    FINISHED = 0,
    STOPPED = 1,
    PLAYING = 2,
    PAUSED = 3,
    TRANSITION_SEGMENT = 4,
}

export const isFinished = (timerState: timerStates) => timerState === timerStates.FINISHED
export const isStopped = (timerState: timerStates) => timerState === timerStates.STOPPED
export const isPlaying = (timerState: timerStates) => timerState === timerStates.PLAYING
export const isPaused = (timerState: timerStates) => timerState === timerStates.PAUSED
export const isTransitioning = (timerState: timerStates) => timerState === timerStates.TRANSITION_SEGMENT

interface Timer {
    timerLength: number,
    title: string,
    description: string,
}

interface TimerLengthMs {
    timerLengthMs: number,
}

export interface Segment {
    timer: Timer & TimerLengthMs,
    start: number,
    elapsedTime: number,
    elapsedTimeAtStart: number,
}

const firstCaterTimer: Timer[] = [
    {
        timerLength: 1,
        title: "1. Warm up",
        description: "Time to warm up",
    },
    {
        timerLength: 2,
        title: "2. Exercise",
        description: "Time to exercise",
    },
    {
        timerLength: 3,
        title: "3. Cool Down",
        description: "Time to cool down buddy",
    },
]

let initialState = {
    /*     timerLength: 10,
        timerLengthMs: 10 * oneSecond, */
    timerState: timerStates.STOPPED,
    /*     elapsedTime: 0,
        start: 0,
        elapsedTimeAtStart: 0, */
    activeSegmentIndex: 0,
    segments: firstCaterTimer.map((timer) => ({
        timer: { ...timer, timerLengthMs: timer.timerLength * oneSecond },
        start: 0,
        elapsedTime: 0,
        elapsedTimeAtStart: 0,
    })),
}

const activeTimerSlice = createSlice({
    name: 'activeTimer',
    initialState,
    reducers: {
        startTimer(state) {
            state.timerState = timerStates.PLAYING
            const activeSegment = state.segments[state.activeSegmentIndex]
            activeSegment.start = new Date().getTime()
            activeSegment.elapsedTimeAtStart = activeSegment.elapsedTime
        },
        pauseTimer(state) {
            state.timerState = timerStates.PAUSED
        },
        stopTimer(state) {
            state.timerState = timerStates.STOPPED
            state.segments.forEach(segment => {
                segment.elapsedTime = 0
                segment.elapsedTimeAtStart = 0
                segment.start = 0
            })
            state.activeSegmentIndex = 0
        },
        finishTimer(state) {
            state.timerState = timerStates.FINISHED
        },
        transitionTimer(state, action: PayloadAction<number>) {
            const index = action.payload
            state.timerState = timerStates.TRANSITION_SEGMENT
            if ( index < state.segments.length ) {
                state.activeSegmentIndex = index
            }
        },
        /*         changeTimer(state, action) {
                    const { timerLength } = action.payload
                    state.timerState = timerStates.STOPPED
                    state.timerLength = timerLength
                    state.timerLengthMs = timerLength * oneSecond
                    state.elapsedTime = 0
                }, */
        interval(state) {
            const currentTime = new Date().getTime()
            const activeSegment = state.segments[state.activeSegmentIndex]
            const diff = currentTime - activeSegment.start
            activeSegment.elapsedTime = activeSegment.elapsedTimeAtStart + diff
            if (activeSegment.elapsedTime > activeSegment.timer.timerLengthMs) {
                activeSegment.elapsedTime = activeSegment.timer.timerLengthMs
            }
        },
    }
})

export const {
    startTimer,
    pauseTimer,
    stopTimer,
    finishTimer,
    transitionTimer,
    /*     changeTimer, */
    interval,
} = activeTimerSlice.actions

export default activeTimerSlice.reducer