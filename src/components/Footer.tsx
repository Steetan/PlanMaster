import React from 'react'
import { IArrTask, Value } from '../App'
import { v4 as uuidv4 } from 'uuid'

interface IFooter {
	setArrTask: React.Dispatch<React.SetStateAction<IArrTask[]>>
	selectedDate: Date | Value
	selectedSort: string
	arrTask: IArrTask[]
	setTasksByDate: React.Dispatch<React.SetStateAction<IArrTask[]>>
}

const Footer: React.FC<IFooter> = ({
	setArrTask,
	selectedDate,
	arrTask,
	setTasksByDate,
	selectedSort,
}) => {
	const dateInput = selectedDate instanceof Date ? selectedDate.toLocaleDateString('ru') : ''
	const [inputTitle, setInputTitle] = React.useState<string>('')
	const [inputDesc, setInputDesc] = React.useState<string>('')
	const [inputDate, setInputDate] = React.useState<string>('')

	const createTask = () => {
		if (inputTitle && inputDate && inputDesc) {
			const dateWithoutTime = new Date()
			dateWithoutTime.setHours(0, 0, 0, 0)
			setArrTask((prevItems) => [
				...prevItems,
				{
					id: uuidv4(),
					title: inputTitle,
					description: inputDesc,
					time: inputDate,
					selectedDate: selectedDate instanceof Date ? selectedDate : dateWithoutTime,
					isChecked: false,
				},
			])
			setInputTitle('')
			setInputDesc('')
			setInputDate('')
		} else {
			alert('The fields are not filled in!')
		}
	}

	React.useEffect(() => {
		setTasksByDate(
			arrTask.filter(
				(obj: IArrTask) => new Date(obj.selectedDate).toString() === selectedDate?.toString(),
			),
		)
	}, [arrTask, selectedDate])

	return (
		<div className='footer-wrapper mt-auto mb-2 flex items-center justify-center gap-6'>
			<div className='input-wrapper border-black border-2 border-solid flex gap-8 rounded-xl p-2 px-4'>
				<input
					className='p-2 text-xl border-gray-400 border-b-2 border-solid'
					type='text'
					placeholder='title'
					maxLength={40}
					value={inputTitle}
					onChange={(e) => setInputTitle(e.target.value)}
				/>
				<input
					className='p-2 text-xl border-gray-400 border-b-2 border-solid'
					type='text'
					placeholder='description'
					maxLength={60}
					value={inputDesc}
					onChange={(e) => setInputDesc(e.target.value)}
				/>
			</div>

			<div className='footer-bottom flex gap-6'>
				<div className='border-black border-2 border-solid rounded-xl flex p-2 items-center gap-3'>
					<h3 className='text-xl'>{dateInput.toString()}</h3>
					<div className='min-h-full bg-gray-400 opacity-60' style={{ width: 1 }}></div>
					<input
						className='p-2 text-xl border-gray-400 border-b-2 border-solid'
						type='time'
						value={inputDate}
						onChange={(e) => setInputDate(e.target.value)}
					/>
				</div>

				<button
					className='p-4 px-10 text-xl border-2 border-black border-solid btn-footer rounded-xl'
					onClick={() => createTask()}
				>
					Create
				</button>
			</div>
		</div>
	)
}

export default Footer
