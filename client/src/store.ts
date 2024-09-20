import { teamsReducer } from '@/redux/teams/slice'
import { matchesReducer } from '@/redux/matches/slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { rankingsReducer } from '@/redux/rankings/slice'
import { notificationsReducer } from '@/redux/notifications/slice'
import { authReducer } from '@/redux/auth/slice'

const rootReducer = combineReducers({
  teams: teamsReducer,
  matches: matchesReducer,
  rankings: rankingsReducer,
  notifications: notificationsReducer,
  auth: authReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;