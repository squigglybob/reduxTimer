import { createSlice } from '@reduxjs/toolkit'

export const step: number = 10
const oneSecond: number = 1000

export enum timerStates {
    FINISHED = 0,
    STOPPED = 1,
    PLAYING = 2,
    PAUSED = 3,
}

let initialState = {
    timerLength: 10,
    timerLengthMs: 10*oneSecond,
    timerState: timerStates.STOPPED,
    elapsedTime: 0
}

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        startTimer(state) {
            state.timerState = timerStates.PLAYING
        },
        pauseTimer(state) {
            state.timerState = timerStates.PAUSED
        },
        stopTimer(state) {
            state.timerState = timerStates.STOPPED
            state.elapsedTime = 0
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
            state.elapsedTime = state.elapsedTime + step
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