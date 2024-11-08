import {useEffect, useState, useCallback} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import * as libraryItemService from '../../services/libraryItemService'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'
import {format} from 'date-fns'
import './LibraryItemDisplay.css'

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
				const updatedLibraryItem = await libraryItemService.updateLibraryItem(
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
					<ul className="library-item">
						<li className="item-detail">
							<strong>Name:</strong> {libraryItem.name}
						</li>
						<li className="item-detail">
							<strong>Description:</strong> {libraryItem.description}
						</li>
						<li className="item-detail">
							<strong>Publication Date:</strong>{' '}
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
						<button key="addReview" type="button" onClick={handleAddReview}>
							Add a review
						</button>
					)}
					{user && (
						<>
							<button type="button" onClick={() => setIsEditing(true)}>
								Edit
							</button>
							<button type="button" onClick={handleDeleteClick}>
								Delete
							</button>
						</>
					)}
				</div>
			)}
		</>
	)
}

export default LibraryItemDisplay
