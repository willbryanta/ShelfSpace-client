import {useParams, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import * as usersService from '../../services/usersService'
import * as libraryItemService from '../../services/libraryItemService'
import {format} from 'date-fns'
// import './ListShow.css'

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

	const formatDate = (date) => {
		return format(new Date(date), 'yyyy')
	}
	//* this is a helper function that helps to format the date
	//* new Date() is used to convert the input date into valid JS Date object. This makes sure even if the input is a string, number, or an already existing Date object that it will be transformed into a proper date object

	const fetchList = async () => {
		if (!isNew) {
			try {
				const fetchedList = await usersService.showList(user, listId)
				if (fetchedList.error) {
					throw new Error(fetchedList.error)
				}
				setList(fetchedList)
			} catch (error) {
				handleError(error.message)
			}
		}
	}

	const fetchMovies = async () => {
		try {
			const movies = await libraryItemService.getLibraryItem()
			if (movies.error) {
				throw new Error(movies.error)
			}
			filterMovies(movies)
		} catch (error) {
			handleError(error.message)
		}
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
			try {
				const newListData = {
					newList: {listName: list.listName, items: list.items},
				}
				const newListResponse = await usersService.createList(user, newListData)
				if (newListResponse.error) {
					throw new Error(newListResponse.error)
				}
				setList(newListResponse)
				setIsEditing(false)
				setUnsavedChanges(false)
				navigate(`/users/${user._id}/lists/${newListResponse._id}`)
			} catch (error) {
				handleError(error.message)
			}
		} else {
			try {
				const packagedListData = {updatedList: list}
				const updatedListResponse = await usersService.updateList(
					user,
					list._id,
					packagedListData
				)
				if (updatedListResponse.error) {
					throw new Error(updatedListResponse.error)
				}
				setList(updatedListResponse)
				setIsEditing(false)
				setUnsavedChanges(false)
			} catch (error) {
				handleError(error.message)
			}
		}
	}

	const handleCancelClick = () => {
		if (isNew) {
			navigate(`/users/${user._id}`)
		} else {
			fetchList()
			setIsEditing(false)
			setUnsavedChanges(false)
		}
	}

	useEffect(() => {
		fetchList()
	}, [])

	useEffect(() => {
		fetchMovies()
	}, [list])

	return (
		<div className="list-show-container">
			{isEditing ? (
				<form onSubmit={(event) => event.preventDefault()}>
					<label htmlFor="listTitle">
						<strong>List Title:</strong>
					</label>
					<input
						id="listTitle"
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
				{list.items.map((item) => {
					const formattedDate = formatDate(item.publicationDate)
					return (
						<li key={item._id}>
							<p>
								<strong>
									<Link to={`/library/${item._id}`}>{item.name}</Link>
								</strong>
								({formattedDate})
							</p>
							<button
								className="delete-button"
								onClick={() => handleDeleteListItem(item._id)}
							>
								X
							</button>
						</li>
					)
				})}
			</ul>

			<div className="add-movie-container">
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
						className="add-movie-button"
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
