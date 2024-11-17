import React, { useState, useEffect } from 'react'
import styles from './ChatPage.module.scss'
import ChatAcc from '../../component/chatAcc/ChatAcc'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

function ChatPage() {
	const { id } = useParams()
	const userInfo = JSON.parse(localStorage.getItem('user-info'))
	const navigate = useNavigate()

	const [messages, setMessages] = useState([])
	const [newMessage, setNewMessage] = useState('')
	const [item, setItem] = useState(null)
	const [receiverId, setReceiverId] = useState(null)
	const [allMessages, setAllMessages] = useState([])
	const [uniqueUsers, setUniqueUsers] = useState([])

	const getMessages = () => {
		if (!receiverId) return
		axios
			.get(
				`http://localhost:8000/api/getMessages/${userInfo.id}/${receiverId.id}/${id}`
			)
			.then(response => {
				setMessages(response.data)
				getAllMessages() 
			})
			.catch(error => {
				console.error('Error fetching messages:', error)
			})
	}

	const getAllMessages = () => {
		axios
			.get(`http://localhost:8000/api/getAllMessages/${userInfo.id}`)
			.then(response => {
				setAllMessages(response.data)
				const uniqueUsersSet = new Set(
					response.data.flatMap(message => [
						message.sender_id,
						message.receiver_id,
					])
				)
				const uniqueUsersArray = Array.from(uniqueUsersSet).filter(
					userId => userId !== userInfo.id
				)
				setUniqueUsers(uniqueUsersArray)
			})
			.catch(error => {
				console.error('Error fetching all messages:', error)
			})
	}

	const sendMessage = () => {
		axios
			.post('http://localhost:8000/api/sendMessage', {
				receiver_id: String(receiverId.id),
				content: newMessage,
				sender_id: userInfo.id,
				car_id: id,
			})
			.then(response => {
				setNewMessage('')
				getMessages() 
			})
			.catch(error => {
				console.error('Error sending message:', error)
			})
	}

	useEffect(() => {
		async function fetchItem() {
			try {
				const { data } = await axios.get(`http://localhost:8000/api/car/${id}`)
				setItem(data)
			} catch (error) {
				alert('Error when you want to get information :(')
			}
		}
		fetchItem()
	}, [id])

	useEffect(() => {
		if (!item) return
		const getUserByPhone = () => {
			axios
				.get(`http://localhost:8000/api/getUserByPhone/${item.phone_owner}`)
				.then(response => {
					setReceiverId(response.data)
				})
				.catch(error => {
					console.error('Error fetching user by phone:', error)
				})
		}
		getUserByPhone()
	}, [item])

	useEffect(() => {
		getMessages()
		getAllMessages()
	}, [receiverId])

	const handleChatAccClick = carId => {
		const selectedChat = allMessages.find(message => message.car_id === carId)
		const otherUserId =
			selectedChat.receiver_id === userInfo.id
				? selectedChat.sender_id
				: selectedChat.receiver_id
		setReceiverId({ id: otherUserId })
		navigate(`/chatPage/${carId}`)
	}

	return (
		<>
			<div className={styles.root}>
				<div className={styles.chatNav}>
					{uniqueUsers.map(userId => {
						const userMessages = allMessages.filter(
							message =>
								message.sender_id === userId || message.receiver_id === userId
						)
						const lastMessage = userMessages[userMessages.length - 1]
						return (
							<div
								key={userId}
								onClick={() => handleChatAccClick(lastMessage.car_id)}
							>
								<ChatAcc
									name={userId}
									lastText={lastMessage.content}
									carId={lastMessage.car_id}
								/>
							</div>
						)
					})}
				</div>
				<div className={styles.chatMain}>
					{messages.map(message => (
						<div key={message.id}>
							<p className={styles.message}>{message.content}</p>
						</div>
					))}
					<div className={styles.input}>
						<input
							type='text'
							value={newMessage}
							onChange={e => setNewMessage(e.target.value)}
							placeholder='Введіть повідомлення...'
						/>
						<button onClick={sendMessage}>Надіслати</button>
					</div>
				</div>
				<div className={styles.chatInfo}>
					{item && (
						<>
							<img
								src={`http://127.0.0.1:8000/products/${item.photo_paths}`}
								alt='carPhotoChat'
							/>
							<Link to={`/chatPage/${id}`}>
								<h3>
									{item.brand} | {item.year}
								</h3>
								<div className={styles.carInfo}>
									<p>{item.model}</p> <p>{item.region}</p>
									<p>{item.number_of_owners}</p> <p>{item.gearbox}</p>
									<p>{item.city}</p> <p>{item.body_type}</p>
								</div>
							</Link>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default ChatPage
