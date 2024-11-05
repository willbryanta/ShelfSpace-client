import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import * as usersService from '../../services/usersService'
import * as libraryItemService from '../../services/libraryItemService'

const ListDisplay = (props) => {
	const {user} = props
	const {listId} = useParams()
	const [list, setList] = useState({listName: '', items: []})
	const [isEditing, setIsEditing] = useState(false)
	const [unsavedChanges, setUnsavedChanges] = useState(false)
	const [availableMovies, setAvailableMovies] = useState([])
	const [isAdding, setIsAdding] = useState(false)

	const fetchList = async () => {
		const fetchedList = await usersService.showList(user, listId)
		//Error handling
		setList(fetchedList)
	}

	useEffect(() => {
		fetchList()
	}, [])

	const fetchMovies = async () => {
		const movies = await libraryItemService.getLibraryItem()
		//Error handling
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
		//Error handling

		setList(updatedListResponse)
		setIsEditing(false)
		setUnsavedChanges(false)
	}

	const handleCancelClick = () => {
		fetchList()
		setIsEditing(false)
		setUnsavedChanges(false)
	}

	const handleAddMovie = (event) => {
		const updatedItems = [...list.items]
		updatedItems.push(JSON.parse(event.target.value))
		setList({...list, items: updatedItems})
		setUnsavedChanges(true)
		setIsAdding(false)
	}

	return (
		<div>
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
				<h1>{list.listName}</h1>
			)}

			<button onClick={() => setIsEditing(true)}>Edit</button>
			<ul>
				{list.items.map((item) => (
					<li key={item._id}>
						<p>
							{item.name} ({item.publicationDate})
						</p>
						<button onClick={() => handleDeleteListItem(item._id)}>X</button>
					</li>
				))}
			</ul>
			<div>
				{isAdding && availableMovies.length > 0 && (
					<select defaultValue={{}} onChange={(event) => handleAddMovie(event)}>
						<option key="default" value={{}} disabled>
							Select a movie
						</option>
						{availableMovies.map((movie) => {
							return (
								<option key={movie._id} value={JSON.stringify(movie)}>
									{movie.name}
								</option>
							)
						})}
					</select>
				)}
				{!isAdding && availableMovies.length > 0 && (
					<button
						type="button"
						disabled={isAdding}
						onClick={() => setIsAdding(true)}
					>
						+
					</button>
				)}
			</div>
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

export default ListDisplay
