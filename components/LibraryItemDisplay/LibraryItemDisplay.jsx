import {useEffect, useState, useCallback} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import * as libraryItemService from '../../services/libraryItemService'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'
import {format} from 'date-fns'
import './LibraryItemDisplay.css'
import styles from './LibraryItem.module.css'

const formatDate = (date) => {
	return format(new Date(date), 'yyyy')
}

function LibraryItemDisplay(props) {
	const {user, handleError} = props
	const {libraryItemId} = useParams()
	const [isAdding, setIsAdding] = useState(false)
	const isNew = libraryItemId === 'new'
	const [isEditing, setIsEditing] = useState(isNew)
	const [unsavedChanges, setUnsavedChanges] = useState(false)
	const [libraryItem, setLibraryItem] = useState({
		name: '',
		description: '',
		publicationDate: '2024-01-01',
		author: '',
		reviews: [],
	})

	const [formData, setFormData] = useState(
		{
			name: '',
			description: '',
			publicationDate: '2024-01-01',
		},
		[]
	)

	const handleAddReview = () => {
		const reviewArray = [...libraryItem.reviews]
		reviewArray.push({
			title: '',
			description: '',
			author: user._id,
			libraryItem: libraryItem,
			isNew: true,
		})
		setLibraryItem({...libraryItem, reviews: reviewArray})
		setIsAdding(true)
	}

	const fetchLibraryItem = useCallback(async () => {
		try {
			if (!isNew) {
				const item = await libraryItemService.getLibraryItemById(libraryItemId)
				if (item.error) {
					throw new Error(item.error)
				}
				setLibraryItem(item)
				setIsAdding(false)
				setFormData(item)
			}
		} catch (error) {
			handleError(error.message)
		}
	}, [handleError, libraryItemId, isNew])

	const navigate = useNavigate()

	const transformDateForUI = (input) => {
		const date = new Date(input)
		return date.toISOString().slice(0, 10)
	}

	// The relationship between the client and server is bridged by the "service". The client technically has no clue about the server, let alone the DB.
	// The only contract the client should be aware of is what is required by the service.
	// nitpick: consider transformDateForLibraryItemService
	const transformDateForDB = (date) => {
		return new Date(date)
	}

	useEffect(() => {
		fetchLibraryItem()
	}, [fetchLibraryItem])

	const handleCancelClick = () => {
		if (isNew) {
			navigate('/library')
		}
		fetchLibraryItem()
		setIsEditing(false)
		setUnsavedChanges(false)
	}

	const handleSaveClick = async (event) => {
		event.preventDefault()
		try {
			if (isNew) {
				const createdLibraryItem = await libraryItemService.createLibraryItem(
					user,
					formData
				)
				navigate(`/library/${createdLibraryItem._id}`)
			} else {
				// as updatedLibraryItem is not used, feel free to not assert the expression without assignging it to a variable
				await libraryItemService.updateLibraryItem(
					libraryItemId,
					formData
				)
				fetchLibraryItem()
			}
			setIsEditing(false)
			setUnsavedChanges(false)
		} catch (error) {
			handleError(error)
		}
	}

	const handleTextInputChange = (event) => {
		const inputName = event.target.name
		const inputValue = event.target.value
		setFormData({...formData, [inputName]: inputValue})
		setUnsavedChanges(true)
	}

	const handleDateInputChange = (event) => {
		const inputName = event.target.name
		const inputValue = transformDateForDB(event.target.value)
		setFormData({...formData, [inputName]: inputValue})
		setUnsavedChanges(true)
	}

	const handleDeleteClick = async () => {
		try {
			await libraryItemService.deleteLibraryItem(user, libraryItemId)
			navigate('/library')
		} catch (error) {
			handleError(error)
		}
	}

	return (
		<>
			{isEditing ? (
				<form onSubmit={handleSaveClick}>
					<label htmlFor="name">
						<strong>Name:</strong>
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleTextInputChange}
					/>
					<label htmlFor="description">
						<strong>Description:</strong>
					</label>
					<input
						type="text"
						id="description"
						name="description"
						value={formData.description}
						onChange={handleTextInputChange}
					/>
					<label htmlFor="publicationDate">
						<strong>Release Year:</strong>
					</label>
					<input
						type="date"
						id="publicationDate"
						name="publicationDate"
						value={transformDateForUI(formData.publicationDate)}
						onChange={handleDateInputChange}
					/>
					<button type="submit" disabled={!unsavedChanges}>
						Save
					</button>{' '}
					<button type="button" onClick={handleCancelClick}>
						Cancel
					</button>
				</form>
			) : (
				<div>
					<h1>{libraryItem.name}</h1>
					{/* improvement opportunity: the <img> across the LibraryItemIndex, LibraryItemDisplay, and search experience were fairly consistent - there was a missed opportunity to create a re-usable component for image itself */}
					{/* one of the requirement that was not reached 100% is due to the lack of alt text in img below. If a re-usable img component was used for poster and applied consistently throughout the app, you could ensure the img component was built correctly to spec (with alt text) and re-use throughout the whole application to reap the reward. */}
					{libraryItem.posterPath ? (
								<img
									src={`https://image.tmdb.org/t/p/w200/${libraryItem.posterPath}`}
									className={styles.poster}
								></img>
							) : (
								<img
									src="https://placeholder.pics/svg/300x300/391C0B/391C0B"
									className={styles.poster}
								></img>
							)}
					<ul className="library-item">
						<li className="item-detail">
							<strong>Overview:</strong> {libraryItem.description}
						</li>
						<li className="item-detail">
							<strong>Release Year:</strong>{' '}
							{formatDate(libraryItem.publicationDate)}
						</li>
						<li className="item-detail">
							<strong>Author:</strong> {libraryItem?.author?.username}
						</li>
						<li className="item-detail">
							<strong>Reviews:</strong>
							<ul>
								{libraryItem?.reviews?.map((review, i) => (
									<li key={review._id ? review._id : `${i}`}>
										{/* well done on getting a review element on 'edit' mode in your SPA :) */}
										<ReviewDisplay
											review={review}
											user={user}
											handleError={handleError}
											libraryItem={libraryItem}
											refreshParent={fetchLibraryItem}
											isNew={review.isNew ? true : false}
										/>
									</li>
								))}
							</ul>
						</li>
					</ul>
					{user && !isAdding && (
						<button key="addReview" type="button" onClick={handleAddReview} className={styles.button}>
							Add a review
						</button>
					)}
					{user && (
						<button type="button" onClick={() => setIsEditing(true)} className={styles.button}>
							Edit
						</button>
					)}
					{user && libraryItem.author && user._id === libraryItem.author._id && (
						<button type="button" onClick={handleDeleteClick} className={styles.button}>
							Delete
						</button>
					)}
				</div>
			)}
		</>
	)
}

export default LibraryItemDisplay
