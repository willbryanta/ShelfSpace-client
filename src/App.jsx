import {Route, Routes} from 'react-router-dom'
import {useState} from 'react'
import * as authService from '../services/authService'
import Navbar from '../components/Navbar/Navbar'
import SignUpForm from '../components/SignUpForm/SignUpForm'
import SignInForm from '../components/SignInForm/SignInForm'
import ProfilePage from '../components/ProfilePage/ProfilePage'
import LibraryIndexDisplay from '../components/LibraryIndexDisplay/LibraryIndexDisplay'
import LibraryItemDisplay from '../components/LibraryItemDisplay/LibraryItemDisplay'
import ListDisplay from '../components/ListDisplay/ListDisplay'
import ErrorModal from '../components/ErrorModal/ErrorModal'
import LandingPage from '../components/LandingPage/LandingPage'
import SearchMovies from '../components/SearchMovies/SearchMovies'
import UserSettings from '../components/UserSettings/UserSettings'

function App() {
	const [user, setUser] = useState(authService.getUser())
	const [errorModalOpen, setErrorModalOpen] = useState(false)
	const [message, setMessage] = useState({})
	const handleSetUser = (user) => setUser(user)
	const handleError = (message) => {
		setMessage(message)
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
				message={message}
			/>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route
					path="/library/:libraryItemId"
					element={<LibraryItemDisplay handleError={handleError} user={user} />}
				/>
				<Route path="/search-movies" element={<SearchMovies 
					user={user}
					handleError={handleError} />} />
				<Route
					path="/library"
					element={<LibraryIndexDisplay handleError={handleError} />}
				/>
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
					element={<ListDisplay user={user} handleError={handleError}  />}
				/>
				<Route 
					path="/users/:userId/settings" 
					element={<UserSettings 
						handleSetUser={handleSetUser}
						user={user}
						authService={authService}
						handleError={handleError} />}
				/>
			</Routes>
		</>
	)
}

export default App
