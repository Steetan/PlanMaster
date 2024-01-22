import React from 'react'
import Task from './Task'
import { Calendar, TileArgs } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { IArrTask, Value } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setTasksByDate } from '../redux/slices/taskSlice'
import { setSelectedDate } from '../redux/slices/selectSlice'

const Home: React.FC = () => {
	const { arrTask, tasksByDate } = useSelector((state: RootState) => state.taskSlice)
	const { selectedSort, selectedDate } = useSelector((state: RootState) => state.selectSlice)

	const dispatch = useDispatch()

	React.useEffect(() => {
		const filteredTasks = arrTask.filter(
			(obj: IArrTask) => new Date(obj.selectedDate).toString() === selectedDate?.toString(),
		)
		dispatch(setTasksByDate(filteredTasks))
	}, [selectedDate])

	let filteredTasksBySort = tasksByDate

	if (selectedSort === 'Completed') {
		filteredTasksBySort = tasksByDate.filter((obj: IArrTask) => obj.isChecked)
	} else if (selectedSort === 'Not completed') {
		filteredTasksBySort = tasksByDate.filter((obj: IArrTask) => !obj.isChecked)
	}

	const calendarContent = (date: TileArgs) => {
		const tasksCount = arrTask.filter(
			(item) => new Date(item.selectedDate).toISOString() === date.date.toISOString(),
		).length

		if (tasksCount) {
			return (
				<div className='border-t-2 font-bold border-gray-400 border-solid' style={{ fontSize: 11 }}>
					{tasksCount} tasks
				</div>
			)
		}
	}
	console.log(arrTask)

	return (
		<div className='home flex gap-10 items-start mt-5'>
			<Calendar
				className='calendar mx-auto mt-2 rounded-3xl'
				onChange={(ev) => dispatch(setSelectedDate(ev))}
				value={selectedDate}
				locale='en'
				tileContent={calendarContent}
			/>
			<div className='tasks mb-3 flex flex-col gap-3 w-full relative'>
				{filteredTasksBySort.map((item, index) => (
					<Task key={index} idTask={item.id} propsTask={item} />
				))}
				{!filteredTasksBySort.length && (
					<div className='text-3xl overflow-hidden text-center'>No tasks😱</div>
				)}
			</div>
		</div>
	)
}

export default Home
