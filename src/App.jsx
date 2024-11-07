import {Route, Routes} from 'react-router-dom'
import {useEffect, useState} from 'react'
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
import * as libraryItemService from '../services/libraryItemService'

function App() {
	const [user, setUser] = useState(authService.getUser())
	const [errorModalOpen, setErrorModalOpen] = useState(false)
	const [message, setMessage] = useState({})
	const [libraryItems, setLibraryItems] = useState([])
	const handleSetUser = (user) => setUser(user)
	const handleError = (message) => {
		setMessage(message)
		setErrorModalOpen(true)
	}

	useEffect(() => {
		const fetchLibraryItems = async () => {
			try {
				const items = await libraryItemService.getLibraryItem()
				if (items.error) {
					throw new Error(items.error)
				}
				setLibraryItems(items)
			} catch (error) {
				handleError(error.message)
			}
		}
		fetchLibraryItems()
	}, [])

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
					element={<LibraryItemDisplay />}
				/>
				<Route path="/search-movies" element={<SearchMovies 
					user={user}
					handleError={handleError}
					libraryItems={libraryItems} />} />
				<Route path="/library" element={<LibraryIndexDisplay libraryItems={libraryItems} />} />
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
