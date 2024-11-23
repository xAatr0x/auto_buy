import React from 'react';
import styles from './CarModal.module.scss';

function CarModal({ cars, onClose, onEdit }) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    Закрити
                </button>
                <h2>Ваші автомобілі</h2>
                <ul className={styles.carList}>
                    {cars.map(car => (
                        <li
                            key={car.id}
                            className={styles.carItem}
                            onClick={() => onEdit(car.id)}
                        >
                            <p>Модель: {car.model}</p>
                            <p>Ціна: {car.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CarModal;
