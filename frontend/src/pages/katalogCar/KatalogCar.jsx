import './KatalogCar.css'
import Search from '../../component/search/Search'
import Heading from '../../component/heading/Heading'
import ItemBlock from '../../component/itemBlock/ItemBlock'

import Header from '../../component/header/Header'
import React from 'react'
import axios from 'axios'
function KatalogCar() {
	const [cars, setCars] = React.useState([])

	React.useEffect(() => {
		const fetchCars = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/list')
				setCars(response.data)
			} catch (error) {
				console.error('Помилка при отриманні списку машин:', error)
			}
		}

		fetchCars()
	}, [])
  return (
		<>
			<Search />
			<Heading title={'Виставлені авто'} />
			<div className='katalogCarColection'>
				{cars.map(obj => (
					<ItemBlock key={obj.id} {...obj} />
				))}
			</div>
		</>
	)
}

export default KatalogCar
