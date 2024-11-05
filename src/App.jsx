import {Route, Routes} from 'react-router-dom'
import {useState} from 'react'
import * as authService from '../services/authService'
import Navbar from '../components/Navbar/Navbar'
import SignUpForm from '../components/SignUpForm/SignUpForm'
import SignInForm from '../components/SignInForm/SignInForm'
import ProfilePage from '../components/ProfilePage/ProfilePage'
import LibraryIndexDisplay from '../components/LibraryIndexDisplay/LibraryIndexDisplay'
import ListDisplay from '../components/ListDisplay/ListDisplay'

function App() {
	const [user, setUser] = useState(authService.getUser())
	const handleSetUser = (user) => setUser(user)
	return (
		<>
			<Navbar
				user={user}
				authService={authService}
				handleSetUser={handleSetUser}
			/>
			<Routes>
				<Route path="/library" element={<LibraryIndexDisplay />} />
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
					element={
						<ProfilePage
							authService={authService}
							handleSetUser={handleSetUser}
							user={user}
						/>
					}
				/>
				<Route
					path="/users/:userId/lists/:listId"
					element={<ListDisplay user={user} />}
				/>
			</Routes>
		</>
	)
}

export default App
