import './ChatBox.css'

const ChatBox = () => {
	return (
		<div className='chat-box'>
			<div className='user-info'>
				<div className='statusOnlineOfline'>
					<img
						src='https://via.placeholder.com/50'
						alt='User Avatar'
						className='user-avatar'
					/>
					<div>Alex is online</div>
				</div>
				<div className='user-status'>
					<input className='comments' type="textarea" placeholder='start texting'/>
				</div>
			</div>
			<button className='send-message'>Send message</button>
		</div>
	)
}

export default ChatBox
