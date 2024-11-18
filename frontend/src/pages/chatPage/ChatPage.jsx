import React, { useState, useEffect } from 'react';
import styles from './ChatPage.module.scss';
import ChatAcc from '../../component/chatAcc/ChatAcc';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ChatPage() {
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [item, setItem] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [userNames, setUserNames] = useState({}); // Стан для зберігання імен користувачів

  // Функція для отримання імені користувача
  const getUserById = async userId => {
    if (userNames[userId]) return userNames[userId]; // Якщо ім'я вже в стані, повертаємо його
    try {
      const { data } = await axios.get(`http://localhost:8000/api/getUserById/${userId}`);
      setUserNames(prevState => ({ ...prevState, [userId]: data.name })); // Оновлюємо стан з іменами
      return data.name;
    } catch (error) {
      console.error(`Error fetching user by ID: ${userId}`, error);
      return 'Unknown User'; // Якщо сталася помилка, повертаємо "Unknown User"
    }
  };

  // Функція для отримання повідомлень
  const getMessages = () => {
    if (!receiverId) return;
    axios
      .get(`http://localhost:8000/api/getMessages/${userInfo.id}/${receiverId.id}/${id}`)
      .then(response => {
        setMessages(response.data);
        getAllMessages();
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  };

  // Функція для отримання всіх повідомлень
  const getAllMessages = () => {
    axios
      .get(`http://localhost:8000/api/getAllMessages/${userInfo.id}`)
      .then(response => {
        setAllMessages(response.data);
        const uniqueUsersSet = new Set(
          response.data.flatMap(message => [message.sender_id, message.receiver_id])
        );
        const uniqueUsersArray = Array.from(uniqueUsersSet).filter(
          userId => userId !== userInfo.id
        );
        setUniqueUsers(uniqueUsersArray);
      })
      .catch(error => {
        console.error('Error fetching all messages:', error);
      });
  };

  // Функція для відправлення повідомлення
  const sendMessage = () => {
    axios
      .post('http://localhost:8000/api/sendMessage', {
        receiver_id: String(receiverId.id),
        content: newMessage,
        sender_id: userInfo.id,
        car_id: id,
      })
      .then(response => {
        setNewMessage('');
        getMessages();
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  // Завантаження інформації про автомобіль
  useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/car/${id}`);
        setItem(data);
      } catch (error) {
        // alert('Error when you want to get information :(')
      }
    }
    fetchItem();
  }, [id]);

  // Завантаження інформації про користувача по номеру телефону
  useEffect(() => {
    if (!item) return;
    const getUserByPhone = () => {
      axios
        .get(`http://localhost:8000/api/getUserByPhone/${item.phone_owner}`)
        .then(response => {
          setReceiverId(response.data);
        })
        .catch(error => {
          console.error('Error fetching user by phone:', error);
        });
    };
    getUserByPhone();
  }, [item]);

  // Завантаження повідомлень та всіх чатових повідомлень
  useEffect(() => {
    getMessages();
    getAllMessages();
  }, [receiverId]);

  // Завантаження імен для всіх унікальних користувачів
  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};
      for (const userId of uniqueUsers) {
        names[userId] = await getUserById(userId);
      }
      setUserNames(names); // Оновлюємо стан з іменами
    };
    if (uniqueUsers.length > 0) {
      fetchUserNames();
    }
  }, [uniqueUsers]); // Викликаємо, коли змінюється список унікальних користувачів

  // Обробка кліку на елемент чату
  const handleChatAccClick = carId => {
    const selectedChat = allMessages.find(message => message.car_id === carId);
    const otherUserId =
      selectedChat.receiver_id === userInfo.id
        ? selectedChat.sender_id
        : selectedChat.receiver_id;
    setReceiverId({ id: otherUserId });
    navigate(`/chatPage/${carId}`);
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.chatNav}>
          {uniqueUsers.map(userId => {
            const userMessages = allMessages.filter(
              message => message.sender_id === userId || message.receiver_id === userId
            );
            const lastMessage = userMessages[userMessages.length - 1];

            // Отримуємо ім'я користувача з стану
            const userName = userNames[userId] || 'Loading...';

            return (
              <div key={userId} onClick={() => handleChatAccClick(lastMessage.car_id)}>
                <ChatAcc name={userName} lastText={lastMessage.content} carId={lastMessage.car_id} />
              </div>
            );
          })}
        </div>
        <div className={styles.chatMain}>
          {messages.map(message => (
            <div
              key={message.id}
              className={
                message.sender_id === userInfo.id ? styles.ownMessage : styles.otherMessage
              }
            >
              <p className={styles.senderName}>
                {message.sender_id === userInfo.id ? 'Ви' : message.sender.name}
              </p>
              <p className={styles.message}>{message.content}</p>
            </div>
          ))}
          <div className={styles.input}>
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Введіть повідомлення..."
            />
            <button onClick={sendMessage}>Надіслати</button>
          </div>
        </div>
        <div className={styles.chatInfo}>
          {item && (
            <>
              <img
                src={`http://127.0.0.1:8000/products/${item.photo_paths}`}
                alt="carPhotoChat"
              />
              <Link to={`/chatPage/${id}`}>
                <h3>
                  {item.brand} | {item.year}
                </h3>
                <div className={styles.carInfo}>
                  <p>{item.model}</p>
                  <p>{item.region}</p>
                  <p>{item.number_of_owners}</p>
                  <p>{item.gearbox}</p>
                  <p>{item.city}</p>
                  <p>{item.body_type}</p>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatPage;
