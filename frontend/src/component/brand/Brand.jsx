import './Brand.css'

function Brand({ imgUrl, title, altName }) {
	return (
		<>
			<div className='brandBlock'>
				<div className='content'>
					<h1>{title}</h1>
				</div>
				<img src={imgUrl} alt={altName} />
			</div>
		</>
	)
}

export default Brand
