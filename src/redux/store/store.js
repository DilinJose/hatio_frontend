import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../slice/counterSlice'
import ProjectSlice from '../slice/projectSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    projects: ProjectSlice
  },
})