import { combineReducers } from '@reduxjs/toolkit'

import timerReducer from 'slices/timer'

const rootReducer = combineReducers({
    timer: timerReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer