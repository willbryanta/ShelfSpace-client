import {Route, Routes} from 'react-router-dom'
import {useState} from 'react'
import * as authService from '../services/authService'
import Navbar from '../components/Navbar/Navbar'
import SignUpForm from '../components/SignUpForm/SignUpForm'
import SignInForm from '../components/SignInForm/SignInForm'
import LibraryIndex from '../components/LibraryIndex/LibraryIndex'
import ProfilePage from '../components/ProfilePage/ProfilePage'

function App() {
	const [user, setUser] = useState(authService.getUser())
	const handleSetUser = (user) => setUser(user)
	return (
		<>
			<Navbar user={user} signOut={authService.signOut} />
			<Routes>
				<Route path="/library" element={<LibraryIndex />} />
				<Route
					path="/users/signup"
					element={<SignUpForm handleSetUser={handleSetUser} />}
				/>
				<Route
					path="/users/signin"
					element={<SignInForm handleSetUser={handleSetUser} />}
				/>
				<Route
					path="/users/:userId"
					element={<ProfilePage handleSetUser={handleSetUser} user={user} />}
				/>
			</Routes>
		</>
	)
}

export default App
