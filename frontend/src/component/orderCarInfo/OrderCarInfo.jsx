import React from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './OrderCarInfo.module.scss'


const LoadingSpinner = () => (
	<svg
		className={styles.loadingSpinner}
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

function OrderCarInfo() {
	const { id } = useParams()
	const [item, setItem] = React.useState(null)
	const [selectedReceiver, setSelectedReceiver] = React.useState(null)
	const [loading, setLoading] = React.useState(true) 
	const navigate = useNavigate()

	React.useEffect(() => {
		async function fetchItem() {
			try {
				const { data } = await axios.get(`http://localhost:8000/api/car/${id}`)
				setItem(data)
			} catch (error) {
				alert('Error when you want to get information :(')
				navigate('/')
			} finally {
				setLoading(false) 
			}
		}

		fetchItem()
	}, [id, navigate])

	React.useEffect(() => {
		if (!item) return 

		const getUserByPhone = () => {
			axios
				.get(`http://localhost:8000/api/getUserByPhone/${item.phone_owner}`)
				.then(response => {
					setSelectedReceiver(response.data)
				})
				.catch(error => {
					console.error('Error fetching user by phone:', error)
				})
		}

		getUserByPhone()
	}, [item]) 

	if (loading) {
		return <LoadingSpinner /> 
	}

	return (
		<>
			<div className={styles.root}>
				<div className={styles.photo}>
					<img
						src={`http://127.0.0.1:8000/products/${item.photo_paths}`}
						alt='123'
					/>
				</div>
				<div className={styles.carTitle}>
					<h1>
						{item.brand} | {item.year}
					</h1>
					<div className={styles.carInfo}>
						<h3>{item.price}</h3>
						<p>Модель: {item.model} </p>
						<p>Розташування: {item.region} </p>
						<p>Кількість власників: {item.number_of_owners} </p>
						<p>Колір: {item.color} </p>
						<p>Паливо: {item.fuel_type} </p>
						<p>Тип кузову: {item.body_type} </p>
						<p>Місто: {item.city} </p>
						<p>VIN: {item.vin_code} </p>

						<h2>Опис для авто</h2>
						<p>{item.description}</p>
					</div>
				</div>
				<div className={styles.button}>
					<button>{item.phone_owner}</button>
					{selectedReceiver && (
						<Link to={`/chatPage/${id}`}>
							<button>Написати</button>
						</Link>
					)}
				</div>
			</div>
		</>
	)
}

export default OrderCarInfo
