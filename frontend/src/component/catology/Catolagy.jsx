import Brand from '../brand/Brand'
import './Catolagy.css'
import { brand, brand2, brand3 } from '../../constants/index'
function Catolagy() {
  return (
		<>
			<div>
				<div className='categoryHeaderGermany'>
					<></>
				</div>

				<div className='brandCar'>
					{brand.map(item => (
						<div className='CategoryCard' key={item.id}>
							<Brand
								title={item.title}
								imgUrl={item.imgUrl}
								altName={item.altName}
							/>
						</div>
					))}
				</div>
				<div className='categoryHeaderJapan'>
					<></>
				</div>
				<div className='brandCar'>
					{brand2.map(item => (
						<div className='CategoryCard' key={item.id}>
							<Brand
								title={item.title}
								imgUrl={item.imgUrl}
								altName={item.altName}
							/>
						</div>
					))}
				</div>
				<div className='categoryHeaderUSA'>
					<></>
				</div>
				<div className='brandCar'>
					{brand3.map(item => (
						<div className='CategoryCard' key={item.id}>
							<Brand
								title={item.title}
								imgUrl={item.imgUrl}
								altName={item.altName}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default Catolagy
