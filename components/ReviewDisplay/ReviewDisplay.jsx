import {useEffect, useState} from 'react'
import * as reviewService from '../../services/reviewService'

function ReviewDisplay(props) {
	const {review, user, handleError, refreshParent, isNew} = props
	const {title, description, author, rating} = review
	const [isEditing, setIsEditing] = useState(isNew)
	const [unsavedChanges, setUnsavedChanges] = useState(false)
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		rating: 0,
	})
	const renderRating = (rating) => {
		const starsArray = []
		let gold = rating
		for (let i = 5; i > 0; i--) {
			if (gold > 0) {
				starsArray.push(<span>&#11088;</span>)
				gold--
			} else {
				starsArray.push(<span>&#9734;</span>)
			}
		}
		return starsArray
	}

	useEffect(() => {
		setFormData(review)
	}, [review])

	const handleSaveClick = async (event) => {
		event.preventDefault()
		try {
			if (isNew) {
				const createdReview = await reviewService.createReview(user, formData)
				if (createdReview.error) {
					throw new Error(createdReview.error)
				}
			} else {
				const updatedReview = await reviewService.updateReview(
					user,
					review._id,
					formData
				)
				if (updatedReview.error) {
					throw new Error(updatedReview.error)
				}
			}
			refreshParent()
			setIsEditing(false)
			setUnsavedChanges(false)
		} catch (error) {
			handleError(error.message)
		}
	}

	const handleInputChange = (event) => {
		const inputName = event.target.name
		const inputValue = event.target.value
		setFormData({...formData, [inputName]: inputValue})
		setUnsavedChanges(true)
	}

	const handleCancelClick = () => {
		if (isNew) {
			refreshParent()
		}
		setFormData(review)
		setIsEditing(false)
	}
	const handleDeleteClick = async () => {
		try {
			const updatedReview = await reviewService.deleteReview(user, review._id)
			if (updatedReview.error) {
				throw new Error(updatedReview.error)
			}
			refreshParent()
		} catch (error) {
			handleError(error.message)
		}
	}

	return (
		<>
			{isEditing ? (
				<form onSubmit={handleSaveClick}>
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						value={formData.title}
						onChange={handleInputChange}
						id="title"
						name="title"
					/>
					<label htmlFor="description">Description:</label>
					<textarea
						value={formData.description}
						onChange={handleInputChange}
						id="description"
						name="description"
					/>
					<label htmlFor="rating">Rating:</label>
					<select
						defaultValue={formData.rating ? formData.rating : 0}
						onChange={handleInputChange}
						id="rating"
						name="rating"
					>
						<option value={0}>0</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
						<option value={5}>5</option>
					</select>
					<button type="submit" disabled={!unsavedChanges}>
						Save
					</button>
					<button
						type="button"
						disabled={!isEditing}
						onClick={handleCancelClick}
					>
						Cancel
					</button>
				</form>
			) : (
				<>
					<h4>{title}</h4>
					{renderRating(rating)}
					<p>{description}</p>
					<p>Author: {author.username}</p>
					<button type="button" onClick={() => setIsEditing(true)}>
						Edit
					</button>
					{user?._id === author?._id && !isEditing && (
						<button type="button" onClick={handleDeleteClick}>
							Delete
						</button>
					)}
				</>
			)}
		</>
	)
}

export default ReviewDisplay
