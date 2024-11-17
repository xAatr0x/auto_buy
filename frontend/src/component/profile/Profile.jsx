import React from 'react'
import avatarProfiveIcon from '../../assets/image/avatarProfiveIcon.png'
import styles from './Profile.module.scss'
import EditBtn from '../../assets/svg/EditBtn'
import SoldBtn from '../../assets/svg/SoldBtn'


function Profile() {
	const user = localStorage.getItem('user-info')
	const infoUser = JSON.parse(user)
	console.log(infoUser)
	return (
		<>
			<div className={styles.root}>
				<div className={styles.avatarAcc}>
					<img src={avatarProfiveIcon} alt='avatar' />
					<button >Додати фото</button>
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
					<button> <EditBtn/>Редагувати</button>
					<button><SoldBtn/> Продано</button>
				</div>
			</div>
		</>
	)
}

export default Profile
