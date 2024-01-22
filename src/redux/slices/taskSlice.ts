import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type typeArrTask = {
	id: string
	title: string
	description: string
	time: string
	selectedDate: string
	isChecked: boolean
}

type typeInitialState = {
	arrTask: typeArrTask[]
	tasksByDate: typeArrTask[]
}

const initialState: typeInitialState = {
	arrTask: [],
	tasksByDate: [],
}

export const taskSlice = createSlice({
	name: 'taskSlice',
	initialState,
	reducers: {
		updateArrTask: (state, action: PayloadAction<typeArrTask>) => {
			const serializedTask = {
				...action.payload,
				selectedDate: action.payload.selectedDate.toString(),
			}
			state.arrTask = [...state.arrTask, serializedTask]
		},
		checkArrTask: (state, action: PayloadAction<string>) => {
			const taskIndex = state.arrTask.findIndex((task) => task.id === action.payload)
			const updatedArrTask = [...state.arrTask]
			updatedArrTask[taskIndex].isChecked = !updatedArrTask[taskIndex].isChecked

			state.arrTask = updatedArrTask
		},
		newArrTask: (state, action: PayloadAction<typeArrTask[]>) => {
			state.arrTask = action.payload
		},
		setTasksByDate: (state, action: PayloadAction<typeArrTask[]>) => {
			state.tasksByDate = action.payload
		},
	},
})

export const { updateArrTask, checkArrTask, newArrTask, setTasksByDate } = taskSlice.actions

export default taskSlice.reducer
