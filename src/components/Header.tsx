import React from 'react'
import '../index.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setSelectedSort } from '../redux/slices/selectSlice'

const Header: React.FC = () => {
	const [date, setDate] = React.useState(new Date())
	const [isVisible, setIsVisible] = React.useState(false)

	const selectedSort = useSelector((state: RootState) => state.selectSlice.selectedSort)
	const dispatch = useDispatch()

	const arrSort = ['All', 'Completed', 'Not completed']

	React.useEffect(() => {
		const now = new Date()
		const tomorrow = new Date(now)
		tomorrow.setDate(tomorrow.getDate() + 1)
		tomorrow.setHours(0, 0, 0, 0)

		const timeout = setTimeout(() => {
			setDate(new Date())
		}, tomorrow.getTime() - now.getTime())

		return () => clearTimeout(timeout)
	}, [date])

	const dateDay = date.getDay() > 10 ? `0${date.getDate()}` : `${date.getDate()}`
	const dateMonth = date.toLocaleString('en-US', { month: 'long' })
	const dateYear = date.getFullYear()

	return (
		<div className='border-2 border-solid border-black p-4 flex items-center justify-between mt-2 rounded-xl relative'>
			<div className='flex gap-2'>
				<img className='max-w-10' src={require('../assets/todoLogo.png')} />
				<h1 className='title-logo text-2xl'>PlanMaster</h1>
			</div>
			<div className='flex items-center gap-2'>
				<input
					placeholder='search'
					type='text'
					className='search-input border-2 border-solid border-black p-2 text-xl rounded-lg'
				/>
				<div
					className='sort-list relative w-52 cursor-pointe h-full'
					onClick={() => setIsVisible(!isVisible)}
				>
					<div className='border-2 border-solid border-black py-2 px-2 text-xl flex items-center text-right justify-between rounded-lg'>
						<h2>{selectedSort}</h2>
						<img
							className={isVisible ? 'max-w-5 arrow-active' : 'max-w-5 arrow-hide'}
							src={require('../assets/arrow.png')}
							alt=''
						/>
					</div>
					{isVisible && (
						<div className='absolute top-14 bg-white border-black border-2 border-solid p-2 w-full text-xl rounded-lg z-10'>
							{arrSort.map((item, index) => (
								<h2
									key={index}
									className='option-sort'
									onClick={() => dispatch(setSelectedSort(arrSort[index]))}
								>
									{item}
								</h2>
							))}
						</div>
					)}
				</div>
			</div>
			<div className='current-date text-2xl text-right'>
				{dateDay} <b>{dateMonth}</b>
				<br />
				{dateYear}
			</div>
		</div>
	)
}

export default Header
