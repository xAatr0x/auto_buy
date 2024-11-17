import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const login = async e => {
		e.preventDefault()
		try {
			const response = await axios.post('http://localhost:8000/api/login', {
				email: email,
				password: password,
			})

			localStorage.setItem('user-info', JSON.stringify(response.data))
			navigate('/')
		} catch (error) {
			console.error('Помилка авторизації:', error)
		}
	}

	return (
		<div className='form-container sign-in-container'>
			<form onSubmit={login}>
				<h1>Увійти</h1>
				<input
					onChange={e => setEmail(e.target.value)}
					value={email}
					className='form_input'
					type='email'
					placeholder='Пошта'
					required
				/>
				<input
					onChange={e => setPassword(e.target.value)}
					value={password}
					className='form_input'
					type='password'
					placeholder='Пароль'
					required
				/>
				<button type='submit' className='form_btn'>
					Увійти
				</button>
			</form>
		</div>
	)
}

export default Login
