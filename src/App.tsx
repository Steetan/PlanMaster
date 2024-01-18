import React from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer'
import './App.css'

export interface IArrTask {
	id: string
	title: string
	description: string
	time: string
	selectedDate: Date
	isChecked: boolean
}

type ValuePiece = Date | null

export type Value = ValuePiece | [ValuePiece, ValuePiece]

function App() {
	const dateWithoutTime = new Date()
	dateWithoutTime.setHours(0, 0, 0, 0)
	const [arrTask, setArrTask] = React.useState<IArrTask[]>([])
	const [selectedDate, setSelectedDate] = React.useState<Value>(dateWithoutTime)
	const [tasksByDate, setTasksByDate] = React.useState<IArrTask[]>([])
	const [selectedSort, setSelectedSort] = React.useState<string>('All')

	return (
		<div className='App max-w-screen-xl mx-auto px-2'>
			<Header selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
			<Home
				arrTask={arrTask}
				setArrTask={setArrTask}
				setSelectedDate={setSelectedDate}
				selectedDate={selectedDate}
				setTasksByDate={setTasksByDate}
				tasksByDate={tasksByDate}
				selectedSort={selectedSort}
			/>
			<Footer
				arrTask={arrTask}
				setArrTask={setArrTask}
				selectedDate={selectedDate}
				setTasksByDate={setTasksByDate}
				selectedSort={selectedSort}
			/>
		</div>
	)
}

export default App
