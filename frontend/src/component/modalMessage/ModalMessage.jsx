import React from 'react'
import './ModalMessage.css'

const ModalMessage = ({ isOpen, onClose, message }) => {
	if (!isOpen) return null

	return (
		<div className='modalOverlay'>
			<div className='modalContent'>
				<span className='closeButton' onClick={onClose}>
					&times;
				</span>
				<p>{message}</p>
			</div>
		</div>
	)
}

export default ModalMessage
