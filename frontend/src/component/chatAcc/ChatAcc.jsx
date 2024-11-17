import React from 'react'
import './ChatAcc.css'
import avatarProfiveIcon from '../../assets/image/avatarProfiveIcon.png'

function ChatAcc({ name, lastText, carId, onClick }) {
	const handleClick = () => {
		onClick(carId) // Передача carId при кліці на компонент
	}

	return (
		<div className='chatAccBlock' onClick={handleClick}>
			<div className='chatAccProfilePhoto'>
				<img src={avatarProfiveIcon} alt='profilePhoto' />
			</div>
			<div className='chatAccMainInfo'>
				<div className='chatAccName'>{name}</div>
				<div className='chatAccLastMessage'>{lastText}</div>
			</div>
			<div className='chatAccTime'>11:10</div>
		</div>
	)
}

export default ChatAcc
