import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './OrderCarInfo.module.scss';

const LoadingSpinner = () => (
  <svg
    className={styles.loadingSpinner}
    width="150px"
    height="150px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#007bff"
      strokeWidth="10"
      r="35"
      strokeDasharray="164.93361431346415 56.97787143782138"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        keyTimes="0;1"
        values="0 50 50;360 50 50"
      />
    </circle>
  </svg>
);

function CarPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = localStorage.getItem('user-info')

  // Fetch car information
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/car/${id}`);
        setItem(data);
      } catch (error) {
        alert('Error when fetching information :(');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    console.log(user)
    fetchItem();
  }, [id, navigate]);


  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);


  // Fetch user by phone number
  useEffect(() => {
    if (!item) return;

    const getUserByPhone = () => {
      axios
        .get(`http://localhost:8000/api/getUserByPhone/${item.phone_owner}`)
        .then(response => setSelectedReceiver(response.data))
        .catch(error => console.error('Error fetching user by phone:', error));
    };

    getUserByPhone();
  }, [item]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.carInfoContainer}>
        <div className={styles.carImageContainer}>
          <img
            src={`http://127.0.0.1:8000/products/${item.photo_paths}`}
            alt="Car"
            className={styles.carImage}
          />
        </div>

        <div className={styles.carDetails}>
          <h1 className={styles.carName}>
            {item.brand} | {item.year}
          </h1>
          <div className={styles.priceContainer}>
            <h3 className={styles.price}>Ціна: {item.price} $</h3>
          </div>

          <div className={styles.carAttributes}>
            <p><strong>Модель:</strong> {item.model}</p>
            <p><strong>Розташування:</strong> {item.region}</p>
            <p><strong>Кількість власників:</strong> {item.number_of_owners}</p>
            <p><strong>Колір:</strong> {item.color}</p>
            <p><strong>Паливо:</strong> {item.fuel_type}</p>
            <p><strong>Тип кузову:</strong> {item.body_type}</p>
            <p><strong>Місто:</strong> {item.city}</p>
            <p><strong>VIN:</strong> {item.vin_code}</p>
            <p><strong>Номер телефону:</strong> {item.phone_owner}</p>
          </div>

          <div className={styles.carDescription}>
            <h2>Опис для авто</h2>
            <h4>{item.description}</h4>
          </div>
        </div>
      </div>
      {isLoggedIn && (
      <div className={styles.contactSection}>
        <div className={styles.phoneButtonContainer}>
        </div>

        {selectedReceiver && (
          <Link to={`/chatPage/${id}`}>
            <button className={styles.messageButton}>Написати</button>
          </Link>
        )}
      </div>
      )
      }
    </div>
  );
}

export default CarPage;
