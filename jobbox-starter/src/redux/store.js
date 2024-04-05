import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authSlice from './features/Auth/authSlice'
import apiSlice from './features/Api/apiSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducer]:apiSlice.reducer,
    auth:authSlice,
  },

  middleware: getDefaultMiddleware().concat(apiSlice.middleware),
})