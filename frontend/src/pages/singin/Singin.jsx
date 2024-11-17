import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Login from '../login/Login'
import './Singin.css'

function Singin() {
	const [name, setName] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [number, setNumber] = React.useState('')

	const navigate = useNavigate()
	const [isRightPanelActive, setIsRightPanelActive] = React.useState(false)

	const handleGhostButtonClick = () => {
		setIsRightPanelActive(prevState => !prevState)
	}

	const validate = () => {
		const newErrors = []
		if (!name) newErrors.push("Ім'я є обов'язковим")
		if (!email) newErrors.push("Пошта є обов'язковою")
		else if (!/\S+@\S+\.\S+/.test(email)) newErrors.push('Некоректна пошта')
		if (!password) newErrors.push("Пароль є обов'язковим")
		else if (password.length < 2)
			newErrors.push('Пароль має бути не менше 6 символів')
		if (!number) newErrors.push("Номер телефона є обов'язковим")
		else if (!/^\d+$/.test(number)) newErrors.push('Некоректний номер телефона')
		return newErrors
	}

	const singUp = async e => {
		e.preventDefault()
		const validationErrors = validate()
		if (validationErrors.length > 0) {
			alert(validationErrors.join('\n'))
			return
		}
		try {
			const response = await axios.post(
				'http://localhost:8000/api/register',
				{
					name: name,
					email: email,
					number: number,
					password: password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			localStorage.setItem('user-info', JSON.stringify(response.data))
			navigate('/')
		} catch (error) {
			console.error('error!', error)
			alert('Виникла помилка при реєстрації. Спробуйте ще раз.')
		}
	}

	return (
		<>
			<div className='singin_page'>
				<div
					className={`container ${
						isRightPanelActive ? 'right-panel-active' : ''
					}`}
					id='container'
				>
					<div className='form-container sign-up-container'>
						<form onSubmit={singUp}>
							<h1>Створити акаунт</h1>
							<input
								className='form_input'
								type='text'
								placeholder='Імя'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							<input
								className='form_input'
								type='email'
								placeholder='Пошта'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
							<input
								className='form_input'
								type='password'
								placeholder='Пароль'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<input
								className='form_input'
								type='text'
								placeholder='Номер телефона'
								value={number}
								onChange={e => setNumber(e.target.value)}
							/>
							<button className='form_btn' type='submit'>
								Зареєструватися
							</button>
						</form>
					</div>
					<div className='main_login'>
						<Login />
						<div className='overlay-container'>
							<div className='overlay'>
								<div className='overlay-panel overlay-left'>
									<h1>З поверненням!</h1>
									<p>
										Щоб залишатися на зв'язку з нами, увійдіть,
										<br /> використовуючи свої дані
									</p>
									<button
										className='form_btn ghost'
										onClick={handleGhostButtonClick}
									>
										Авторизуватися
									</button>
								</div>
								<div className='overlay-panel overlay-right'>
									<h1>Привіт друже!</h1>
									<p>Введіть свої дані та продовжуйте подорож з нами</p>
									<button
										className='form_btn ghost'
										onClick={handleGhostButtonClick}
									>
										Зареєструватися
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Singin
