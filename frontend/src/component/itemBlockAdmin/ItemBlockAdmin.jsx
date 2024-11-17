import React from 'react'
import styles from './ItemBlockAdmim.module.scss'
const ItemBlockAdmin = ({ car, onClick, photo_paths }) => (
	<div className={styles.root} onClick={onClick} style={{ cursor: 'pointer' }}>
		<img
			src={`http://127.0.0.1:8000/products/${car.photo_paths}`}
			alt='123'
		/>
		<div>
			<h3>
				{car.brand} {car.model}
			</h3>

			<p>Перевірка VIN: {car.verified_vin ? 'Так' : 'Ні'}</p>
		</div>
		<button>Перевірка</button>
	</div>
)

export default ItemBlockAdmin
