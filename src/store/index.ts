import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import profileReducer from './profile'
import settingsReducer from './settings'
import stepsReducer from './steps'
import multiRowsReducer from './multirows'
import singleRowReducer from './singlerow'
import modalsStateReducer from './modals'

const rootReducer = combineReducers({
  profile: profileReducer,
  settings: settingsReducer,
  steps: stepsReducer,
  multiRows: multiRowsReducer,
  singleRow: singleRowReducer,
  modalsState: modalsStateReducer
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
