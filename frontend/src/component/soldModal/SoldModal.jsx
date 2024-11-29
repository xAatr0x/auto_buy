import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SoldModal.module.scss';

function SoldModal({ cars, onClose, onMarkSold }) {
    const [formData, setFormData] = useState({
        is_sold: 0, 
        verified_vin: 0, 
    });

    useEffect(() => {
        if (cars.length > 0) {
            const car = cars.find(car => !car.is_sold); 
            if (car) {
                setFormData({ is_sold: car.is_sold ? 1 : 0 });
            }
        }
    }, [cars]);

    const handleMarkSold = async (id) => {
        try {
            const updatedData = { is_sold: 1, verified_vin: 1 }; 
            console.log('Відправляємо дані:', updatedData);

            const response = await axios.put(`http://localhost:8000/api/cars/${id}`, updatedData);
            console.log('Автомобіль позначено як проданий:', response.data);
            onMarkSold(id); 
        } catch (error) {
            console.error('Помилка оновлення статусу авто:', error);
        }
    };

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <h2>Позначення проданих авто</h2>
                <button className={styles.closeBtn} onClick={onClose}>
                    Закрити
                </button>
                {cars.length === 0 ? (
                    <p>Немає автомобілів для відображення.</p>
                ) : (
                    <ul className={styles.carList}>
                        {cars.map((car) => (
                            <li key={car.id} className={styles.carItem}>
                                <div>
                                    <p><strong>Модель:</strong> {car.name}</p>
                                    <p><strong>Ціна:</strong> {car.price}</p>
                                    <p>
                                        <strong>Статус:</strong>{' '}
                                        {car.is_sold ? (
                                            <span className={styles.sold}>Продано</span>
                                        ) : (
                                            <span className={styles.available}>Доступно</span>
                                        )}
                                    </p>
                                </div>
                                {!car.is_sold && (
                                    <button
                                        className={styles.markSoldBtn}
                                        onClick={() => handleMarkSold(car.id)}
                                    >
                                        Позначити як продане
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default SoldModal;
