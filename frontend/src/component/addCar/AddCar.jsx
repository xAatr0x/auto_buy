import AddNewPhoto from '../../assets/svg/AddNewPhoto'
import './AddCar.css'
function AddCar() {

	return (
		<>
			<div className='addCarBlock'>
				<div className='getInfo'>
					<div>
						<ul>
							<li>
								<input type='text' placeholder='Введіть привід' />
							</li>
							<li>
								<input type='text' placeholder='Введіть розташування' />
							</li>
							<li>
								<input type='text' placeholder='Введіть ціну' />
							</li>
							<li>
								<input type='text' placeholder='Введіть пробіг' />
							</li>
							<li>
								<input type='text' placeholder='Введіть кількість власників' />
							</li>
							<li>
								<input
									type='text'
									placeholder='Введіть VIN код для перевірки'
								/>
							</li>
							<li>
								<input
									type='text'
									id='des'
									placeholder='Введіть опис для авто'
								/>
							</li>
						</ul>
					</div>
					<div>
						<ul>
							<li>
								<input type='text' placeholder='Введіть марку' />
							</li>
							<li>
								<input type='text' placeholder='Введіть рік' />
							</li>
							<li>
								<input type='text' placeholder='Введіть двигун' />
							</li>
							<li>
								<input type='text' placeholder='Введіть тип коробки' />
							</li>
							<li>
								<input type='text' placeholder='Введіть колір' />
							</li>
						</ul>
					</div>
					<div className='addNewPhoto'>
						<AddNewPhoto />
						<p>Додайте фото</p>
					</div>
					<div>	</div>
					<div className='btnAddCar'>
						
						<button className='addCarAplly'>Виставити авто</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default AddCar
