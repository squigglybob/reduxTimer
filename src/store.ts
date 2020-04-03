import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import rootReducer, { RootState } from 'slices'

const store = configureStore({
    reducer: rootReducer
})

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('slices', () => {
        const newRootReducer = require('slices').default
        store.replaceReducer(newRootReducer)
    })
}

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store