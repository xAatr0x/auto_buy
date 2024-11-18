import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './AdminMain.module.scss'
import ItemBlockAdmin from '../../component/itemBlockAdmin/ItemBlockAdmin'
import ModalWindowAdmin from '../../component/modalWindowAdmin/ModalWindowAdmin'
import { useNavigate } from 'react-router-dom'

function AdminMain() {
	const [isModalOpen, setModalOpen] = useState(false)
	const [cars, setCars] = useState([])
	const [loading, setLoading] = useState(true)
	const [selectedCar, setSelectedCar] = useState(null)
	const [formData, setFormData] = useState({
		type_of_transport: '',
		brand: '',
		model: '',
		year: '',
		runs: '',
		body_type: '',
		region: '',
		city: '',
		vin_code: '',
		verified_vin: '',
		number_of_owners: '',
		phone_owner: '',
		description: '',
		gearbox: '',
		fuel_type: '',
		fuel_consumption_city: '',
		fuel_consumption_highway: '',
		fuel_consumption_combined: '',
		engine_power: '',
		number_of_doors: '',
		color: '',
		price: '',
		photo_paths: '',
	})

	const [isAdmin, setIsAdmin] = useState(false)
	const navigate = useNavigate()

	const user = localStorage.getItem('user-info')
	const infoUser = JSON.parse(user)

	useEffect(() => {
		if (infoUser.is_admin) {
			setIsAdmin(true)
		} else {
			navigate('/')
		}
	}, [navigate])

	const openModal = car => {
		setSelectedCar(car)
		setFormData({ ...car })
		setModalOpen(true)
	}

	const closeModal = () => {
		setSelectedCar(null)
		setModalOpen(false)
	}

	const fetchCars = async () => {
		try {
			const response = await axios.get(
				'http://127.0.0.1:8000/api/list?verified_vin=0'
			)
			setCars(response.data)
			setLoading(false)
		} catch (error) {
			console.error('Помилка при отриманні списку машин:', error)
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchCars()
	}, [])

	const updateCar = async (carId, updatedData) => {
		try {
			const response = await axios.put(
				`http://127.0.0.1:8000/api/cars/${carId}`,
				updatedData
			)
			if (updatedData.verified_vin === '1') {
				await notifyUser(carId)
			}
			fetchCars()
			closeModal()
		} catch (error) {
			console.error('Помилка при оновленні авто:', error)
		}
	}

	const notifyUser = async carId => {
		try {
			await axios.post(`http://127.0.0.1:8000/api/notify/${carId}`)
		} catch (error) {
			console.error('Помилка при відправці повідомлення:', error)
		}
	}

	const handleInputChange = event => {
		const { name, value } = event.target
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}))
	}



	return (
		<>
			<div className={styles.root}>
				<div className={styles.header}>
					<div>
						<button>Admin</button>
						<p>Перевірка VIN коду</p>
						<p>Продані авто</p>
					</div>
				</div>
				<div className={styles.collection}>
					{loading ? (
						<p>Завантаження...</p>
					) : (
						cars.map(car => (
							<ItemBlockAdmin
								key={car.id}
								car={car}
								onClick={() => openModal(car)}
							/>
						))
					)}
				</div>
			</div>
			<ModalWindowAdmin isOpen={isModalOpen} onClose={closeModal}>
				{selectedCar ? (
					<div className={styles.block}>
						<div className={styles.photo}>
							<img
								src={`http://127.0.0.1:8000/products/${selectedCar.photo_paths}`}
								alt='123'
							/>
						</div>
						<div className={styles.carTitle}>
							<h1>
								<input
									type='text'
									name='brand'
									value={formData.brand}
									onChange={handleInputChange}
									placeholder={`Бренд: ${selectedCar.brand}`}
								/>
								{' | '}
								<input
									type='text'
									name='year'
									value={formData.year}
									onChange={handleInputChange}
									placeholder={`Рік: ${selectedCar.year}`}
								/>
							</h1>
							<div className={styles.carInfo}>
								<h3>
									<input
										type='text'
										name='price'
										value={formData.price}
										onChange={handleInputChange}
										placeholder={`Ціна: ${selectedCar.price}`}
									/>
								</h3>
								<p>
									Модель:{' '}
									<input
										type='text'
										name='model'
										value={formData.model}
										onChange={handleInputChange}
										placeholder={`Модель: ${selectedCar.model}`}
									/>
								</p>
								<p>
									Розташування:{' '}
									<input
										type='text'
										name='region'
										value={formData.region}
										onChange={handleInputChange}
										placeholder={`Розташування: ${selectedCar.region}`}
									/>
								</p>
								<p>
									Кількість власників:{' '}
									<input
										type='text'
										name='number_of_owners'
										value={formData.number_of_owners}
										onChange={handleInputChange}
										placeholder={`Кількість власників: ${selectedCar.number_of_owners}`}
									/>
								</p>
								<p>
									Колір:{' '}
									<input
										type='text'
										name='color'
										value={formData.color}
										onChange={handleInputChange}
										placeholder={`Колір: ${selectedCar.color}`}
									/>
								</p>
								<p>
									Паливо:{' '}
									<input
										type='text'
										name='fuel_type'
										value={formData.fuel_type}
										onChange={handleInputChange}
										placeholder={`Паливо: ${selectedCar.fuel_type}`}
									/>
								</p>
								<p>
									Тип кузову:{' '}
									<input
										type='text'
										name='body_type'
										value={formData.body_type}
										onChange={handleInputChange}
										placeholder={`Тип кузову: ${selectedCar.body_type}`}
									/>
								</p>
								<p>
									Місто:{' '}
									<input
										type='text'
										name='city'
										value={formData.city}
										onChange={handleInputChange}
										placeholder={`Місто: ${selectedCar.city}`}
									/>
								</p>
								<p>
									VIN:{' '}
									<input
										type='text'
										name='vin_code'
										value={formData.vin_code}
										onChange={handleInputChange}
										placeholder={`VIN: ${selectedCar.vin_code}`}
									/>
								</p>
								<p>
									verified_vin:{' '}
									<input
										type='text'
										name='verified_vin'
										value={formData.verified_vin}
										onChange={handleInputChange}
										placeholder={`VIN: ${selectedCar.verified_vin}`}
									/>
								</p>
								<h2>Опис для авто</h2>
								<p>
									<textarea
										name='description'
										value={formData.description}
										onChange={handleInputChange}
										placeholder={`Опис: ${selectedCar.description}`}
									/>
								</p>
							</div>
						</div>
						<div className={styles.button}>
							<button onClick={() => updateCar(selectedCar.id, formData)}>
								Оновити авто
							</button>
						</div>
					</div>
				) : (
					<p>Немає даних для відображення</p>
				)}
			</ModalWindowAdmin>
		</>
	)
}

export default AdminMain
