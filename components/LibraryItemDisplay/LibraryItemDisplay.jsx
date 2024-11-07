import {useEffect, useState, useCallback} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import * as libraryItemService from '../../services/libraryItemService'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'
import {format} from 'date-fns'
// import {is} from 'date-fns/locale'
// import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
// import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
// import {DatePicker} from '@mui/x-date-pickers/DatePicker'

const formatDate = (date) => {
	return format(new Date(date), 'yyyy')
}
function LibraryItemDisplay(props) {
	const {user, handleError} = props
	const {libraryItemId} = useParams()
	const isNew = libraryItemId === 'new'
	const [isEditing, setIsEditing] = useState(isNew)
	const [unsavedChanges, setUnsavedChanges] = useState(false)
	const [libraryItem, setLibraryItem] = useState({
		name: '',
		description: '',
		publicationDate: 2024,
		author: '',
		reviews: [],
	})
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		publicationDate: 2024,
	})
	const navigate = useNavigate()

	const fetchLibraryItem = useCallback(async () => {
		try {
			if (!isNew) {
				const item = await libraryItemService.getLibraryItemById(libraryItemId)
				if (item.error) {
					throw new Error(item.error)
				}
				setLibraryItem(item)
				setFormData(item)
			}
		} catch (error) {
			handleError(error.message)
		}
	}, [handleError, isNew, libraryItemId])

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
				setLibraryItem(updatedLibraryItem)
				setIsEditing(false)
				setUnsavedChanges(false)
			}
		} catch (error) {
			handleError(error)
		}
	}

	const handleInputChange = (event) => {
		const inputName = event.target.name
		const inputValue = event.target.value
		setFormData({...formData, [inputName]: inputValue})
		setUnsavedChanges(true)
	}

	const handleDeleteClick = async () => {
		try {
			await libraryItemService.deleteLibraryItem(
				user,
				libraryItemId
			)
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
						onChange={handleInputChange}
					/>
					<label htmlFor="description">
						<strong>Description:</strong>
					</label>
					<input
						type="text"
						id="description"
						name="description"
						value={formData.description}
						onChange={handleInputChange}
					/>
					<label htmlFor="publicationDate">
						<strong>Release Year:</strong>
					</label>
					{/* <LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label="Release Year"
							maxDate={currentYear}
							openTo="year"
							views={['year']}
							yearsOrder="desc"
							sx={{ minWidth: 250 }}
							value={formData.publicationDate}
							onChange={handleTextInputChange}
							name="publicationDate"
						/>
					</LocalizationProvider>{' '} */}
					<input
						type="number"
						id="publicationDate"
						name="publicationDate"
						value={formData.publicationDate}
						onChange={handleInputChange}
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
					<ul>
						<li>
							<strong>Name:</strong> {libraryItem.name}
						</li>
						<li>
							<strong>Description:</strong> {libraryItem.description}
						</li>
						<li>
							<strong>Publication Date:</strong>{' '}
							{formatDate(libraryItem.publicationDate)}
						</li>
						<li>
							<strong>Author:</strong> {libraryItem.author.username}
						</li>
						<li>
							<strong>Reviews:</strong>
							<ul>
								{libraryItem?.reviews?.map((review) => (
									<li key={review._id}>
										<ReviewDisplay review={review} user={user} />
									</li>
								))}
							</ul>
						</li>
					</ul>
					<button type="button" onClick={() => setIsEditing(true)}>
						Edit
					</button>
					<button type="button" onClick={handleDeleteClick}>
						Delete
					</button>
				</div>
			)}
		</>
	)
}

export default LibraryItemDisplay
