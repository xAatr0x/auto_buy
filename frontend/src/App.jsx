import './App.css'
import Main from './pages/main/Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import KatalogCar from './pages/katalogCar/KatalogCar'
import AddCarPage from './pages/addCarPage/AddCarPage'
import MyProfile from './pages/myProfile/MyProfile'
import CarPage from './pages/carPage/CarPage'
import Singin from './pages/singin/Singin'
import AdminMain from './pages/adminMain/AdminMain'
import Header from './component/header/Header'
import ChatPage from './pages/chatPage/ChatPage'
import Login from './pages/login/Login'

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/KatalogCar' element={<KatalogCar />} />
					<Route path='/MyProfile' element={<MyProfile />} />
					<Route path='/CarPage/:id' element={<CarPage />} />
					<Route path='/chatPage/:id' element={<ChatPage />} />
					<Route path='/Singin' element={<Singin />} />
					<Route path='/login' element={<Login />} />
					<Route path='/AdminMain' element={<AdminMain />} />
					<Route path='/addCarPage' element={<AddCarPage />} />
					<Route path='/chatPage' element={<ChatPage />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
