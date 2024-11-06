import {Route, Routes} from 'react-router-dom'
import {useState} from 'react'
import * as authService from '../services/authService'
import Navbar from '../components/Navbar/Navbar'
import SignUpForm from '../components/SignUpForm/SignUpForm'
import SignInForm from '../components/SignInForm/SignInForm'
import ProfilePage from '../components/ProfilePage/ProfilePage'
import LibraryIndexDisplay from '../components/LibraryIndexDisplay/LibraryIndexDisplay'
import ListDisplay from '../components/ListDisplay/ListDisplay'
import ErrorModal from '../components/ErrorModal/ErrorModal'

function App() {
	const [user, setUser] = useState(authService.getUser())
	const [errorModalOpen, setErrorModalOpen] = useState(false)
	const [error, setError] = useState({})
	const handleSetUser = (user) => setUser(user)
	const handleError = (error) => {
		setError(error)
		setErrorModalOpen(true)
	}
	return (
		<>
			<Navbar
				user={user}
				authService={authService}
				handleSetUser={handleSetUser}
			/>
			<ErrorModal
				errorModalOpen={errorModalOpen}
				setErrorModalOpen={setErrorModalOpen}
				error={error}
			/>
			<Routes>
				<Route path="/library" element={<LibraryIndexDisplay />} />
				<Route
					path="/users/signup"
					element={
						<SignUpForm
							handleSetUser={handleSetUser}
							handleError={handleError}
						/>
					}
				/>
				<Route
					path="/users/signin"
					element={
						<SignInForm
							handleSetUser={handleSetUser}
							handleError={handleError}
						/>
					}
				/>
				<Route
					path="/users/:userId"
					element={
						<ProfilePage
							authService={authService}
							handleSetUser={handleSetUser}
							user={user}
							handleError={handleError}
						/>
					}
				/>
				<Route
					path="/users/:userId/lists/:listId"
					element={<ListDisplay user={user} handleError={handleError} />}
				/>
			</Routes>
		</>
	)
}

export default App
