import './KatalogCar.css'
import Heading from '../../component/heading/Heading'
import ItemBlock from '../../component/itemBlock/ItemBlock'


import React from 'react'
import { useState } from 'react'
import SearchSvg from '../../assets/svg/SearchSvg'
import axios from 'axios'



const LoadingSpinner = () => (
	<svg
		className='loadingSpinner'
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

function KatalogCar() {
	
		const [cars, setCars] = React.useState([])
		const [loading, setLoading] = React.useState(true)
	
		const [type, setType] = useState('')
		const [is_sold, setIsSold] = useState(true)
		const [region, setRegion] = useState('')
		const [brand, setBrand] = useState('')
		const [yearFrom, setYearFrom] = useState('')
		const [yearTo, setYearTo] = useState('')
		const [model, setModel] = useState('')
		const [priceFrom, setPriceFrom] = useState('')
		const [priceTo, setPriceTo] = useState('')
		const [verifiedVIN, setVerifiedVIN] = useState(true)
		const [sortField, setSortField] = useState('price')
		const [sortOrder, setSortOrder] = useState('asc')
	
		const handleYearFromChange = e => setYearFrom(e.target.value)
		const handleYearToChange = e => setYearTo(e.target.value)
		const handlePriceFromChange = e => setPriceFrom(e.target.value)
		const handlePriceToChange = e => setPriceTo(e.target.value)
		console.log(type)
		
		const handleSubmit = async e => {
			e.preventDefault()
			try {
				let url = 'http://127.0.0.1:8000/api/list?verified_vin=1&is_sold=0'
	
				url += `?verified_vin=${verifiedVIN ? 1 : 0}`
	
				if (type) url += `&type=${encodeURIComponent(type)}`
				if (region) url += `&region=${encodeURIComponent(region)}`
				if (brand) url += `&brand=${encodeURIComponent(brand)}`
				if (model) url += `&model=${encodeURIComponent(model)}`
				if (yearFrom) url += `&year_from=${yearFrom}`
				if (yearTo) url += `&year_to=${yearTo}`
				if (priceFrom) url += `&minPrice=${priceFrom}`
				if (priceTo) url += `&maxPrice=${priceTo}`
				if (sortField) url += `&sortField=${sortField}`
				if (sortOrder) url += `&sortOrder=${sortOrder}`
	
				const response = await axios.get(url)
	
				setCars(response.data)
				setLoading(false)
				console.log('API response:', response.data)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
	
		React.useEffect(() => {
			const fetchCars = async () => {
				try {
					const url = 'http://127.0.0.1:8000/api/list?verified_vin=1&is_sold=0';
					
					const response = await fetch(url, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});
		
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
		
					const data = await response.json();
		
					setCars(data);
					setLoading(false);
					console.log('API response:', data);
				} catch (error) {
					console.error('Error fetching cars:', error);
				}
			};
		
			fetchCars();
		}, []);

	React.useEffect(() => {
		const fetchCars = async () => {
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/list?is_sold=0')
				setCars(response.data)
			} catch (error) {
				console.error('Помилка при отриманні списку машин:', error)
			}
		}

		fetchCars()
	}, [])
  return (
		<>
		<div className='searchBlock'>
				<form className='formBlock' onSubmit={handleSubmit}>
					<select
						name='type'
						className='selects'
						id='typeOfCarSelect'
						value={type}
						onChange={e => setType(e.target.value)}
					>
						<option value="" disabled selected>Класифікація</option>
						<option value=''>Будь-який</option>
						<option value='Легкові'>Легкові</option>
						<option value='Мото'>Мото</option>
						<option value='Вантажівки'>Вантажівки</option>
						<option value='Спецтехніка'>Спецтехніка</option>
						<option value='Автобуси'>Автобуси</option>
					</select>
					<span className='verifiedVINCheck'>
						<p><font  color="black">Перевіреній VIN</font></p>
						<input
							className='checkboxInput'
							type='checkbox'
							checked={verifiedVIN}
							onChange={e => setVerifiedVIN(e.target.checked)}
						/>
					</span>
					<select
						name='region'
						className='selects'
						id='regionSelect'
						value={region}
						onChange={e => setRegion(e.target.value)}
					>
						<option value="" disabled selected>Оберіть регіон</option>
						<option value=''>Будь-який</option>
						<option value='м. Київ'>м. Київ</option>
						<option value='Вінницька'>Вінницька</option>
						<option value='Волинська'>Волинська</option>
						<option value='Дніпропетровська'>Дніпропетровська</option>
						<option value='Донецька'>Донецька</option>
						<option value='Житомирська'>Житомирська</option>
						<option value='Закарпатська'>Закарпатська</option>
						<option value='Запорізька'>Запорізька</option>
						<option value='Івано-Франківська'>Івано-Франківська</option>
						<option value='Київська'>Київська</option>
						<option value='Кіровоградська'>Кіровоградська</option>
						<option value='Луганська'>Луганська</option>
						<option value='Львівська'>Львівська</option>
						<option value='Миколаївська'>Миколаївська</option>
						<option value='Одеська'>Одеська</option>
						<option value='Полтавська'>Полтавська</option>
						<option value='Рівненська'>Рівненська</option>
						<option value='Сумська'>Сумська</option>
						<option value='Тернопільська'>Тернопільська</option>
						<option value='Харківська'>Харківська</option>
						<option value='Херсонська'>Херсонська</option>
						<option value='Хмельницька'>Хмельницька</option>
						<option value='Черкаська'>Черкаська</option>
						<option value='Чернівецька'>Чернівецька</option>
						<option value='Чернігівська'>Чернігівська</option>
					</select>
					<input
						name='brand'
						className='selects'
						id='brandSelect'
						placeholder="Введіть марку"
						value={brand}
						onChange={e => setBrand(e.target.value)}
					/>

					<div className='verifiedYear'>
						<p><font  color="black" >Рік</font></p>
						<div className='inputVidDo'>
							<input
								id='VidYear'
								onChange={handleYearFromChange}
								type='number'
								placeholder='Від'
								value={yearFrom}
							/>
							<input
								id='doYear'
								onChange={handleYearToChange}
								type='number'
								placeholder='До'
								value={yearTo}
							/>
						</div>
					</div>
					<input
						name='model'
						className='selects'
						id='modelSelect'
						placeholder="Введіть модель"
						value={model}
						onChange={e => setModel(e.target.value)}
					/>
					<span className='verifiedPrice'>
						<p><font  color="black" >Ціна</font></p>
						<div className='inputVidDo'>
							<input
								id='VidPrice'
								onChange={handlePriceFromChange}
								type='number'
								placeholder='Від'
								value={priceFrom}
							/>
							<input
								id='doPrice'
								onChange={handlePriceToChange}
								type='number'
								placeholder='До'
								value={priceTo}
							/>
						</div>
					</span>
					<button className='buttonSearch' type='submit'>
						<p className='svgSearch'>
							<SearchSvg />
						</p>
						Пошук
					</button>
				</form>
			</div>
			<Heading title={'Виставлені авто'} />
			{loading ? (
				<div className='loadingContainer'>
					<LoadingSpinner />
				</div>
			) : (
			<div className='katalogCarColection'>
				
				{cars.map(obj => (
					<ItemBlock key={obj.id} {...obj} />
				))}
			</div>)}
		</>
	)
}

export default KatalogCar
