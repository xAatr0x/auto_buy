import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './EditCarPage.module.scss';

function EditCarPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type_of_transport: '',
        brand: '',
        model: '',
        year: '',
        runs: '',
        body_type: '',
        region: '',
        city: '',
        vin_code: '',
        verified_vin: 0,
        number_of_owners: '',
        phone_owner: '',
        description: '',
        gearbox: '',
        fuel_type: '',
        fuel_consumption_city: '',
        fuel_consumption_highway: '',
        fuel_consumption_combined: '',
        engine_power: '',
        number_of_doors: '',
        color: '',
        price: '',
        photo_paths: null,
    });

    // Завантаження даних автомобіля
    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/car/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Помилка завантаження автомобіля:', error);
            }
        };

        fetchCar();
    }, [id]);

    // Обробка сабміту форми
    const handleSubmit = async (e) => {
        e.preventDefault(); // Запобігає перезавантаженню сторінки
    
        // Оновлюємо поле `verified_vin` перед надсиланням
        const updatedFormData = { ...formData, verified_vin: 0 };
    
        try {
            const response = await axios.put(`http://localhost:8000/api/cars/${id}`, updatedFormData);
            console.log('Автомобіль оновлено:', response.data);
            navigate(`/myprofile`); // Переадресація на сторінку профілю після успішного оновлення
        } catch (error) {
            console.error('Помилка оновлення автомобіля:', error);
        }
    };

    // Обробка зміни значень у полях форми
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className={styles.container}>
            <h1>Редагувати автомобіль</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Тип транспорту:
                    <input
                        type="text"
                        name="type_of_transport"
                        value={formData.type_of_transport || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Марка:
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Модель:
                    <input
                        type="text"
                        name="model"
                        value={formData.model || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Рік:
                    <input
                        type="number"
                        name="year"
                        value={formData.year || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Пробіг:
                    <input
                        type="number"
                        name="runs"
                        value={formData.runs || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Тип кузова:
                    <input
                        type="text"
                        name="body_type"
                        value={formData.body_type || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Регіон:
                    <input
                        type="text"
                        name="region"
                        value={formData.region || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Місто:
                    <input
                        type="text"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    VIN-код:
                    <input
                        type="text"
                        name="vin_code"
                        value={formData.vin_code || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Кількість власників:
                    <input
                        type="number"
                        name="number_of_owners"
                        value={formData.number_of_owners || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Телефон власника:
                    <input
                        type="text"
                        name="phone_owner"
                        value={formData.phone_owner || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Опис:
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Коробка передач:
                    <input
                        type="text"
                        name="gearbox"
                        value={formData.gearbox || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Тип пального:
                    <input
                        type="text"
                        name="fuel_type"
                        value={formData.fuel_type || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Витрата пального (місто):
                    <input
                        type="number"
                        name="fuel_consumption_city"
                        value={formData.fuel_consumption_city || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Витрата пального (трасса):
                    <input
                        type="number"
                        name="fuel_consumption_highway"
                        value={formData.fuel_consumption_highway || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Витрата пального (змішаний):
                    <input
                        type="number"
                        name="fuel_consumption_combined"
                        value={formData.fuel_consumption_combined || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Потужність двигуна:
                    <input
                        type="number"
                        name="engine_power"
                        value={formData.engine_power || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Кількість дверей:
                    <input
                        type="number"
                        name="number_of_doors"
                        value={formData.number_of_doors || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Колір:
                    <input
                        type="text"
                        name="color"
                        value={formData.color || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Ціна:
                    <input
                        type="number"
                        name="price"
                        value={formData.price || ''}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Зберегти</button>
            </form>
        </div>
    );
}

export default EditCarPage;
