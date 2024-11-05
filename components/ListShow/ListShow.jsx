import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import * as usersService from '../../services/usersService'
import * as libraryItemService from '../../services/libraryItemService'

const ListShow = (props) => {
	const {user} = props
	const {listId} = useParams()
	const [list, setList] = useState({listName: '', items: []})
	const [isEditing, setIsEditing] = useState(false)
	const [unsavedChanges, setUnsavedChanges] = useState(false)
	const [availableMovies, setAvailableMovies] = useState([])
	const [selectedMovie, setSelectedMovie] = useState('')
	const [showDropdown, setShowDropdown] = useState(false)

	const fetchList = async () => {
		const fetchedList = await usersService.showList(user, listId)
		setList(fetchedList)
	}

	useEffect(() => {
		fetchList()
	}, [listId])

	const fetchMovies = async () => {
		const movies = await libraryItemService.getLibraryItem()
		filterMovies(movies)
	}

	const filterMovies = (movies) => {
		const filteredMovies = movies.filter(
			(movie) => !list.items.some((item) => item._id === movie._id)
		)
		setAvailableMovies(filteredMovies)
	}

	useEffect(() => {
		fetchMovies()
	}, [list])

	const handleDeleteListItem = async (itemId) => {
		setList({
			...list,
			items: list.items.filter((item) => item._id !== itemId),
		})
		setUnsavedChanges(true)
	}

	const handleTextFieldChange = (event) => {
		const inputName = event.target.name
		const inputValue = event.target.value
		setList({
			...list,
			[inputName]: inputValue,
		})
		setUnsavedChanges(true)
	}

	const handleSaveClick = async (event) => {
		event.preventDefault()
		const packagedListData = {updatedList: list}
		const updatedListResponse = await usersService.updateList(
			user,
			list._id,
			packagedListData
		)

		setList(updatedListResponse)
		setIsEditing(false)
		setUnsavedChanges(false)
	}

	const handleCancelClick = () => {
		fetchList()
		setIsEditing(false)
		setUnsavedChanges(false)
	}

	const handleAddItem = () => {
		const movieToAdd = availableMovies.find(
			(movie) => movie._id === selectedMovie
		)
		if (movieToAdd) {
			setList({
				...list,
				items: [...list.items, movieToAdd],
			})
			setShowDropdown(false)
			setUnsavedChanges(true)
		}
	}

	const toggleDropdownVisibility = () => {
		setShowDropdown((currentState) => !currentState)
	}

	return (
		<div>
			<h1>
				{isEditing ? (
					<form onSubmit={(event) => event.preventDefault()}>
						<input
							type="text"
							name="listName"
							value={list.listName}
							onChange={handleTextFieldChange}
						/>
					</form>
				) : (
					list.listName
				)}
			</h1>
			<button onClick={() => setIsEditing(true)}>Edit</button>
			<ul>
				{list.items.map((item) => (
					<li key={item._id}>
						<h2>
							{item.name} ({item.publicationDate})
						</h2>
						<button onClick={() => handleDeleteListItem(item._id)}>X</button>
					</li>
				))}
			</ul>

			{!selectedMovie && availableMovies.length > 0 && (
				<div>No movie selected. Click "+" to add a movie!</div>
			)}

			{availableMovies.length > 0 && !selectedMovie && (
				<button type="button" onClick={toggleDropdownVisibility}>
					+
				</button>
			)}

			{showDropdown && (
				<div>
					<select
						value={selectedMovie}
						onChange={(event) => setSelectedMovie(event.target.value)}
						disabled={false}
					>
						<option value="" disabled selected>Select a Movie</option>
						{availableMovies.map((movie) => (
							<option key={movie._id} value={movie._id}>
								{movie.name}
							</option>
						))}
					</select>
					<button
						type="button"
						onClick={handleAddItem}
						disabled={!selectedMovie}
					>
						Add Movie
					</button>
				</div>
			)}

			{availableMovies.length === 0 && <div>You have seen all the movies!</div>}

			<button
				type="button"
				onClick={handleSaveClick}
				disabled={!unsavedChanges}
			>
				Save
			</button>
			<button
				type="button"
				onClick={handleCancelClick}
				disabled={!isEditing && !unsavedChanges}
			>
				Cancel
			</button>
		</div>
	)
}

export default ListShow
