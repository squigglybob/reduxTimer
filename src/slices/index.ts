import { combineReducers } from '@reduxjs/toolkit'

import activeTimerReducer from 'slices/activeTimer'

const rootReducer = combineReducers({
    activeTimer: activeTimerReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer