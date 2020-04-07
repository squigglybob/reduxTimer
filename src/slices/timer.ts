import { createSlice } from '@reduxjs/toolkit'

export const step: number = 10
const oneSecond: number = 1000

export enum timerStates {
    FINISHED = 0,
    STOPPED = 1,
    PLAYING = 2,
    PAUSED = 3,
}

export const isFinished = (timerState: timerStates) => timerState === timerStates.FINISHED
export const isStopped = (timerState: timerStates) => timerState === timerStates.STOPPED
export const isPlaying = (timerState: timerStates) => timerState === timerStates.PLAYING
export const isPaused = (timerState: timerStates) => timerState === timerStates.PAUSED


let initialState = {
    timerLength: 10,
    timerLengthMs: 10*oneSecond,
    timerState: timerStates.STOPPED,
    elapsedTime: 0,
    start: 0,
    elapsedTimeAtStart: 0,
}

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        startTimer(state) {
            state.timerState = timerStates.PLAYING
            state.start = new Date().getTime()
            state.elapsedTimeAtStart = state.elapsedTime
        },
        pauseTimer(state) {
            state.timerState = timerStates.PAUSED
        },
        stopTimer(state) {
            state.timerState = timerStates.STOPPED
            state.elapsedTime = 0
            state.elapsedTimeAtStart = 0
            state.start = 0
        },
        finishTimer(state) {
            state.timerState = timerStates.FINISHED
        },
        changeTimer(state, action) {
            const { timerLength } = action.payload
            state.timerState = timerStates.STOPPED
            state.timerLength = timerLength
            state.timerLengthMs = timerLength*oneSecond
            state.elapsedTime = 0
        },
        interval(state) {
            const currentTime = new Date().getTime()
            const diff = currentTime - state.start
            state.elapsedTime = state.elapsedTimeAtStart + diff
            if ( state.elapsedTime > state.timerLengthMs ) {
                state.elapsedTime = state.timerLengthMs
            }
        },
    }
})

export const {
    startTimer,
    pauseTimer,
    stopTimer,
    finishTimer,
    changeTimer,
    interval,
} = timerSlice.actions

export default timerSlice.reducer