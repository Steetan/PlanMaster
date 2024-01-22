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
	selectedDate: string
	isChecked: boolean
}

type ValuePiece = Date | null

export type Value = ValuePiece | [ValuePiece, ValuePiece]

function App() {
	const dateWithoutTime = new Date()
	dateWithoutTime.setHours(0, 0, 0, 0)
	const [selectedDate, setSelectedDate] = React.useState<Value>(dateWithoutTime)

	return (
		<div className='App max-w-screen-xl mx-auto px-2'>
			<Header />
			<Home />
			<Footer />
		</div>
	)
}

export default App
