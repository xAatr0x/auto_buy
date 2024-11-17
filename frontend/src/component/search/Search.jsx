import { useState } from 'react'
import SearchSvg from '../../assets/svg/SearchSvg'
import './Search.css'
import React from 'react'
import axios from 'axios'

function Search( ) {
	const [type, setType] = useState('')
	const [region, setRegion] = useState('')
	const [brand, setBrand] = useState('')
	const [yearFrom, setYearFrom] = useState('')
	const [yearTo, setYearTo] = useState('')
	const [model, setModel] = useState('')
	const [priceFrom, setPriceFrom] = useState('')
	const [priceTo, setPriceTo] = useState('')
	const [verifiedVIN, setVerifiedVIN] = useState(false)
	const [sortField, setSortField] = useState('price')
	const [sortOrder, setSortOrder] = useState('asc')

	const handleYearFromChange = e => setYearFrom(e.target.value)
	const handleYearToChange = e => setYearTo(e.target.value)
	const handlePriceFromChange = e => setPriceFrom(e.target.value)
	const handlePriceToChange = e => setPriceTo(e.target.value)

	// const handleSortFieldChange = e => setSortField(e.target.value)
	// const handleSortOrderChange = e => setSortOrder(e.target.value)

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await axios.get('http://127.0.0.1:8000/api/list', {
				params: {
					verified_vin: verifiedVIN ? 1 : 0,
					type,
					region,
					brand,
					model,
					year_from: yearFrom,
					year_to: yearTo,
					minPrice: priceFrom,
					maxPrice: priceTo,
					sortField,
					sortOrder,
				},
			})
			console.log('API response:', response.data)
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	return (
		<div className='searchBlock'>
			<form className='formBlock' onSubmit={handleSubmit}>
				<select
					name='type'
					className='selects'
					id='typeOfCarSelect'
					value={type}
					onChange={e => setType(e.target.value)}
				>
					<option value=''>Будь-який</option>
					<option value='Легкові'>Легкові</option>
					<option value='Мото'>Мото</option>
					<option value='Вантажівки'>Вантажівки</option>
					<option value='Причепи'>Причепи</option>
					<option value='Спецтехніка'>Спецтехніка</option>
					<option value='Автобуси'>Автобуси</option>
				</select>
				<span className='verifiedVINCheck'>
					<p>Перевіреній VIN</p>
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
					<option value=''>Будь-який</option>
					<option value='Одеса'>Одеса</option>
					<option value='Львів'>Львів</option>
					<option value='Харків'>Харків</option>
					<option value='Івано-Франківськ'>Івано-Франківськ</option>
				</select>
				<select
					name='brand'
					className='selects'
					id='brandSelect'
					value={brand}
					onChange={e => setBrand(e.target.value)}
				>
					<option value=''>Будь-який</option>
					<option value='BMW'>BMW</option>
					<option value='Audi'>Audi</option>
					<option value='Mercedes-Benz'>Mercedes-Benz</option>
					<option value='Opel'>Opel</option>
					<option value='Porche'>Porche</option>
					<option value='Volkswagen'>Volkswagen</option>
				</select>
				<div className='verifiedYear'>
					<p>Рік</p>
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
				<select
					name='model'
					className='selects'
					id='modelSelect'
					value={model}
					onChange={e => setModel(e.target.value)}
				>
					<option value=''>Спочатку виберіть марку</option>
					<option value='A6'>A6</option>
					<option value='5 Series'>5 Series</option>
					<option value='Golf'>Golf</option>
					<option value='Insignia'>Insignia</option>
					<option value='Passat'>Passat</option>
				</select>
				<span className='verifiedPrice'>
					<p>Ціна</p>
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
				{/* <div className='sortOptions'>
					<p>Сортувати за</p>
					<select
						name='sortField'
						className='selects'
						id='sortFieldSelect'
						value={sortField}
						onChange={handleSortFieldChange}
					>
						<option value='price'>Ціна</option>
						<option value='type_of_transport'>Тип</option>
						<option value='region'>Регіон</option>
						<option value='year'>Рік</option>
						<option value='verified_vin'>Перевірений VIN</option>
						<option value='brand'>Марка</option>
						<option value='model'>Модель</option>
					</select>
					<select
						name='sortOrder'
						className='selects'
						id='sortOrderSelect'
						value={sortOrder}
						onChange={handleSortOrderChange}
					>
						<option value='asc'>За зростанням</option>
						<option value='desc'>За спаданням</option>
					</select>
				</div> */}
				<button className='buttonSearch' type='submit'>
					<p className='svgSearch'>
						<SearchSvg />
					</p>
					Пошук
				</button>
			</form>
		</div>
	)
}

export default Search
