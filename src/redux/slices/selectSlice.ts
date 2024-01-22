import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type typeInitialState = {
	selectedSort: string
	selectedDate: Value
}

type Value = Date | null | [Date | null, Date | null]

const dateWithoutTime = new Date()
dateWithoutTime.setHours(0, 0, 0, 0)

const initialState: typeInitialState = {
	selectedSort: 'All',
	selectedDate: dateWithoutTime,
}

export const selectSlice = createSlice({
	name: 'selectSlice',
	initialState,
	reducers: {
		setSelectedSort: (state, action: PayloadAction<string>) => {
			state.selectedSort = action.payload
		},
		setSelectedDate: (state, action: PayloadAction<Value>) => {
			state.selectedDate = action.payload
		},
	},
})

export const { setSelectedSort, setSelectedDate } = selectSlice.actions

export default selectSlice.reducer
