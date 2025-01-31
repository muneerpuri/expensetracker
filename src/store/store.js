import { configureStore } from '@reduxjs/toolkit'
import generalReducer  from './reducer/reducer'
export default configureStore({
  reducer: {
    general:generalReducer
  },
})