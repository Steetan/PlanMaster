import React from 'react'
import Task from './Task'
import { Calendar, TileArgs } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { IArrTask, Value } from '../App'

interface IHome {
	arrTask: IArrTask[]
	setArrTask: React.Dispatch<React.SetStateAction<IArrTask[]>>
	selectedDate: Date | Value
	selectedSort: string
	setSelectedDate: React.Dispatch<React.SetStateAction<Value>>
	setTasksByDate: React.Dispatch<React.SetStateAction<IArrTask[]>>
	tasksByDate: IArrTask[]
}

const Home: React.FC<IHome> = ({
	arrTask,
	setArrTask,
	selectedDate,
	setSelectedDate,
	setTasksByDate,
	tasksByDate,
	selectedSort,
}) => {
	React.useEffect(() => {
		const filteredTasks = arrTask.filter(
			(obj: IArrTask) => new Date(obj.selectedDate).toString() === selectedDate?.toString(),
		)
		setTasksByDate(filteredTasks)
	}, [selectedDate])

	let filteredTasksBySort = tasksByDate

	if (selectedSort === 'Completed') {
		filteredTasksBySort = tasksByDate.filter((obj: IArrTask) => obj.isChecked)
	} else if (selectedSort === 'No completed') {
		filteredTasksBySort = tasksByDate.filter((obj: IArrTask) => !obj.isChecked)
	}

	const calendarContent = (date: TileArgs) => {
		const tasksCount = arrTask.filter(
			(item) => new Date(item.selectedDate).toString() === date.date.toString(),
		).length

		if (tasksCount) {
			return (
				<div className='border-t-2 font-bold border-gray-400 border-solid' style={{ fontSize: 11 }}>
					{tasksCount} tsks
				</div>
			)
		}
	}

	return (
		<div className='home flex gap-10 items-start mt-5'>
			<Calendar
				className='calendar mx-auto mt-2 rounded-3xl'
				onChange={setSelectedDate}
				value={selectedDate}
				locale='en'
				tileContent={calendarContent}
			/>
			<div className='tasks mb-3 flex flex-col gap-3 w-full relative'>
				{filteredTasksBySort.map((item, index) => (
					<Task
						key={index}
						idTask={item.id}
						propsTask={item}
						arrTask={arrTask}
						setArrTask={setArrTask}
					/>
				))}
				{!filteredTasksBySort.length && (
					<div className='text-3xl overflow-hidden text-center'>No tasks😱</div>
				)}
			</div>
		</div>
	)
}

export default Home
