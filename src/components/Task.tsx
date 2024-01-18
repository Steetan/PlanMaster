import React from 'react'
import { IArrTask } from '../App'
import { Checkbox } from 'antd'

interface ITask {
	propsTask: IArrTask
	arrTask: IArrTask[]
	index: number
	setArrTask: React.Dispatch<React.SetStateAction<IArrTask[]>>
	idTask: string
}

const Task: React.FC<ITask> = ({ propsTask, index, arrTask, setArrTask, idTask }) => {
	const [isChecked, setIsChecked] = React.useState<boolean>(false)

	const deleteTask = (idTask: string) => {
		const answer: boolean = window.confirm('Вы уверены что хотите удалить эту задачу?')
		if (answer) {
			setArrTask(arrTask.filter((task) => task.id !== idTask))
		}
	}

	const changeCheck = (idTask: string) => {
		const taskIndex = arrTask.findIndex((task) => task.id === idTask)

		if (taskIndex !== -1) {
			setIsChecked(!isChecked)

			const updatedArrTask = [...arrTask]
			updatedArrTask[taskIndex].isChecked = !updatedArrTask[taskIndex].isChecked

			setArrTask(updatedArrTask)
		}
	}

	return (
		<div className='task flex justify-between p-2 items-center border-2 border-black border-solid rounded-xl w-full'>
			<div className='task-header flex gap-3 items-center'>
				<h3 className='text-3xl'>{propsTask.time}</h3>
				<div>
					<h2 className='task-title text-3xl'>{propsTask.title}</h2>
					<h4 className='task-text'>{propsTask.description}</h4>
				</div>
			</div>
			<div className='flex items-center gap-2'>
				<Checkbox
					className='checkbox-task custom-checkbox min-w-10 h-6 cursor-pointer'
					type='checkbox'
					checked={propsTask.isChecked}
					onChange={() => changeCheck(idTask)}
				/>
				<div className='deleteBody-task cursor-pointer' onClick={() => deleteTask(idTask)}>
					<div className='delete-task'></div>
				</div>
			</div>
		</div>
	)
}

export default Task
