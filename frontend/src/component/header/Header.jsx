import React, { useState, useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/image/logo.png'
import NewMessage from '../../assets/svg/NewMessage'
import { useNavigate } from 'react-router-dom'
import ModalMessage from '../modalMessage/ModalMessage'
import axios from 'axios'

function Header({ onLogin }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false) 
	const [message, setMessage] = useState('') 
	const user = localStorage.getItem('user-info')
	const infoUser = JSON.parse(user)
	const navigate = useNavigate()

	useEffect(() => {
		const storedUserInfo = localStorage.getItem('user-info')
		setIsLoggedIn(!!storedUserInfo)

		const interval = setInterval(() => {
			const storedUserInfo = localStorage.getItem('user-info')
			setIsLoggedIn(!!storedUserInfo)
		}, 500)

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (isLoggedIn) {
			const fetchNotifications = async () => {
				try {
					const response = await axios.get(
						'http://127.0.0.1:8000/api/notifications'
					)
					if (response.data && response.data.message) {
						setMessage(response.data.message)
						setIsModalOpen(true)
					}
				} catch (error) {
					console.error('Помилка при отриманні повідомлень:', error)
				}
			}

			fetchNotifications()
		}
	}, [isLoggedIn])

	const handleLogout = () => {
		localStorage.removeItem('user-info')
		setIsLoggedIn(false)
		navigate('/')
		onLogin(false)
	}

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setMessage('')
	}

	return (
		<div className='headerBlock'>
			<nav className='navigatorSite'>
				<img src={logo} className='headerLogo' alt='logo' />
				<Link className='navigatorTarget' to={'./'}>
					Головна
				</Link>
				<Link className='navigatorTarget' to={'./KatalogCar'}>
					Всі авто
				</Link>
				{isLoggedIn ? (
				<Link className='navigatorTarget' to={'./MyProfile'}>
					Профіль
				</Link>):("")}
				{isLoggedIn ? (
				<Link className='navigatorTarget' to={`./chatPage`}>
					Повідомлення
				</Link>):("")}
			</nav>
			<div className='headerBtn'>
			{/* <NewMessage onClick={openModal} /> */}
				{isLoggedIn ? (
				<Link to ={'/AdminMain'}>
					{infoUser.is_admin && (<button className='btnAddCar'>Admin</button>)}
				</Link>
				):(
					<button hidden className='btnAdmin'>Admin</button>
				)}
				{isLoggedIn ? (
				<Link to={'./addCarPage'}>
					{!infoUser.is_admin && (<button className='btnAddCar'>Додати авто</button>)}
				</Link>
				) : (
				<button hidden className='btnAddCar'>Додати авто</button>
				)}
				{isLoggedIn ? (
					<button onClick={handleLogout} className='btnLogReg'>
						Вийти
					</button>
				) : (
					<Link to={'/Singin'}>
						<button className='btnLogReg'>Увійти</button>
					</Link>
				)}
			</div>
			<ModalMessage
				isOpen={isModalOpen}
				onClose={closeModal}
				message={message}
			/>{' '}
		</div>
	)
}

export default Header
