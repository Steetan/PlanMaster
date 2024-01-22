import { selectSlice } from './slices/selectSlice'
import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './slices/taskSlice'

export const store = configureStore({
	reducer: {
		taskSlice,
		selectSlice: selectSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
