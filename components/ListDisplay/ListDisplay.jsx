import {useParams, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import * as usersService from '../../services/usersService'
import * as libraryItemService from '../../services/libraryItemService'

const ListDisplay = (props) => {
	const {user, handleError} = props
	const {listId} = useParams()
	const isNew = listId === 'new'
	const navigate = useNavigate()

	const [list, setList] = useState({listName: '', items: []})
	const [isEditing, setIsEditing] = useState(isNew)
	const [unsavedChanges, setUnsavedChanges] = useState(false)
	const [availableMovies, setAvailableMovies] = useState([])
	const [isAdding, setIsAdding] = useState(false)

	const fetchList = async () => {
		if (!isNew) {
			const fetchedList = await usersService.showList(user, listId)
			if (fetchedList.error) {
				return handleError(fetchedList.error)
			}
			setList(fetchedList)
		}
	}

	const fetchMovies = async () => {
		const movies = await libraryItemService.getLibraryItem()
		if (movies.error) {
			return handleError(movies.error)
		}
		filterMovies(movies)
	}

	const filterMovies = (movies) => {
		const filteredMovies = movies.filter(
			(movie) => !list.items.some((item) => item._id === movie._id)
		)
		setAvailableMovies(filteredMovies)
	}

	const handleAddMovie = (event) => {
		const movieToAdd = JSON.parse(event.target.value)
		const updatedItems = [...list.items, movieToAdd]
		setList({...list, items: updatedItems})
		setUnsavedChanges(true)
		setIsAdding(false)
	}

	const handleDeleteListItem = (itemId) => {
		const updatedItems = list.items.filter((item) => item._id !== itemId)
		setList({...list, items: updatedItems})
		setUnsavedChanges(true)
	}

	const handleTextFieldChange = (event) => {
		const {name, value} = event.target
		setList({...list, [name]: value})
		setUnsavedChanges(true)
	}

	const handleSaveClick = async (event) => {
		event.preventDefault()
		if (isNew) {
			const newListData = {
				newList: {listName: list.listName, items: list.items},
			}
			const newListResponse = await usersService.createList(user, newListData)
			setList(newListResponse)
			setIsEditing(false)
			setUnsavedChanges(false)
			navigate(`/users/${user._id}/lists/${newListResponse._id}`)
		} else {
			const packagedListData = {updatedList: list}
			const updatedListResponse = await usersService.updateList(
				user,
				list._id,
				packagedListData
			)
			if (updatedListResponse.error) {
				return handleError(updatedListResponse.error)
			}

			setList(updatedListResponse)
			setIsEditing(false)
			setUnsavedChanges(false)
		}
	}

	const handleCancelClick = () => {
		fetchList()
		setIsEditing(false)
		setUnsavedChanges(false)
	}

	useEffect(() => {
		fetchList()
	}, [])

	useEffect(() => {
		fetchMovies()
	}, [list])

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
				<>
					<h1>{isNew ? 'New List' : list.listName}</h1>
					<button onClick={() => setIsEditing(true)}>Edit</button>
				</>
			)}

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
					<select defaultValue={{}} onChange={handleAddMovie}>
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
						onClick={() => setIsAdding(true)}
						disabled={isAdding}
					>
						+
					</button>
				)}
			</div>

			<div>
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
		</div>
	)
}

export default ListDisplay
