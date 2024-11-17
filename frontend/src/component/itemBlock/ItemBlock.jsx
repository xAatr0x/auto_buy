import './ItemBlock.css'
import carPhotoSvg from '../../assets/image/carPhoto.png'
import { Link } from 'react-router-dom'
function ItemBlock({
	id,
	brand,
	body_type,
	year,
	model,
	gearbox,
	color,
	fuel_type,
	city,
	runs,
	number_of_owners,
	price,
	photo_paths,
}) {
	return (
		<>
			<Link className='itemBlockDisplay' to={`/CarPage/${id}`}>
				<img
					className='itemBlockPhoto'
					src={`http://127.0.0.1:8000/products/${photo_paths}`}
					alt='carPhoto'
				/>
				<div className='itemBlockTitle'>
					{brand} | {year}
				</div>
				<div className='itemBlockInfo'>
					<p>Модель: {model}</p> <p>Розташування: {city}</p>
				</div>
				<div className='horizontalLine'></div>
				<div className='itemBlockInfo'>
					<p> Власники: {number_of_owners}</p> <p>Коробка: {gearbox}</p>
				</div>
				<div className='horizontalLine'></div>
				<div className='itemBlockInfo'>
					<p>Колір: {color}</p> <p>Пробіг: {runs}</p>
				</div>
				<div className='horizontalLine'></div>
				<div className='itemBlockInfo'>
					<p>Вид палива: {fuel_type}</p> <p>Кузов: {body_type}</p>
				</div>
				<div className='horizontalLine'></div>

				<button className='btnOrder'>{price}$</button>
			</Link>
		</>
	)
}

export default ItemBlock
