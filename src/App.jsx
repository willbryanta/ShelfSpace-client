import {Route, Routes} from 'react-router-dom'
import {useState} from 'react'
import authService from './services/authService'
import Navbar from './components/Navbar/Navbar'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'
import LibraryIndex from './components/LibraryIndex/LibraryIndex'
import Profile from './components/Profile/Profile'

function App() {
	const [user, setUser] = useState(authService.getUser())
	const handleSetUser = (user) => setUser(user)
	return (
		<>
			<Navbar user={user} />
			<Routes>
				<Route path="/library" element={<LibraryIndex />} />
				<Route
					path="/Users/Signup"
					element={<Signup handleSetUser={handleSetUser} />}
				/>
				<Route
					path="/Users/Signin"
					element={<Signin handleSetUser={handleSetUser} />}
				/>
				<Route path="/Users/:userId" element={<Profile />} />
			</Routes>
		</>
	)
}

export default App
