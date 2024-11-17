import './MyProfile.css'
import Heading from '../../component/heading/Heading'
import ItemBlock from '../../component/itemBlock/ItemBlock'
// import Profile from '../../component/profile/Profile'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DontHaveCar from '../../assets/svg/DontHaveCar'
import avatarProfiveIcon from '../../assets/image/avatarProfiveIcon.png'
import styles from './Profile.module.scss'
import EditBtn from '../../assets/svg/EditBtn'
import SoldBtn from '../../assets/svg/SoldBtn'

function MyProfile() {
	const user = localStorage.getItem('user-info')
	const infoUser = JSON.parse(user)
	console.log(infoUser.number)
const LoadingSpinner = () => (
	<svg
		className='loadingSpinner'
		width='250px'
		height='250px'
		viewBox='0 0 100 100'
		preserveAspectRatio='xMidYMid'
	>
		<circle
			cx='50'
			cy='50'
			fill='none'
			stroke='#007bff'
			strokeWidth='10'
			r='35'
			strokeDasharray='164.93361431346415 56.97787143782138'
		>
			<animateTransform
				attributeName='transform'
				type='rotate'
				repeatCount='indefinite'
				dur='1s'
				keyTimes='0;1'
				values='0 50 50;360 50 50'
			></animateTransform>
		</circle>
	</svg>
)

	const [cars, setCars] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchCars = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/list')
				const carsMatchingUser = response.data.filter(
					car => car.phone_owner === infoUser.number
				)
				setCars(carsMatchingUser)
				setLoading(false) 
			} catch (error) {
				console.error('Помилка при отриманні списку машин:', error)
			}
		}

		fetchCars()
	}, [infoUser.number])

	return (
		<>
			<div className={styles.root}>
				<div className={styles.avatarAcc}>
					<img src={avatarProfiveIcon} alt='avatar' />
					<button>Додати фото</button>
				</div>
				<div className={styles.infoUser}>
					<p>Ім'я: {infoUser.name}</p>
					<p>Пошта: {infoUser.email}</p>
					<p>Номер Телефону: {infoUser.number}</p>
				</div>
				<div className={styles.soldInfo}>
					<p>Виставлені цим продавцем</p>
					<p>Продано</p>
				</div>
				<div className={styles.btn}>
					<button>
						{' '}
						<EditBtn />
						Редагувати
					</button>
					<button>
						<SoldBtn /> Продано
					</button>
				</div>
			</div>
			{loading ? (
				<div className='loadingContainer'>
					<LoadingSpinner />
				</div>
			) : (
				<>
					{cars.length > 0 && <Heading title='Виставлені авто' />}
					<div className='exhibitedCarsCollection'>
						{cars.length === 0 ? (
							<DontHaveCar />
						) : (
							cars.map(obj => <ItemBlock key={obj.id} id={obj.id} {...obj} />)
						)}
					</div>
				</>
			)}
		</>
	)
}

export default MyProfile
