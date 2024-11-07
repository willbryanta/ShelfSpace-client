import {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as libraryItemService from '../../services/libraryItemService'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'
import {format} from 'date-fns'

const formatDate = (date) => {
	return format(new Date(date), 'yyyy')
}
function LibraryItemDisplay(props) {
	const {user, handleError} = props
	const {libraryItemId} = useParams()
	const [libraryItem, setLibraryItem] = useState({
		name: '',
		description: '',
		publicationDate: 0,
		author: '',
		reviews: [],
	})
	
	const handleAddReview = () => {
		const reviewArray = [...libraryItem.reviews]
		reviewArray.push({
			title: '',
			description: '',
			author: user,
			libraryItem: libraryItem,
			isNew: true
		})
		setLibraryItem({...libraryItem, reviews: reviewArray})
	}

	const fetchLibraryItem = useCallback( async () => {
		try {
			const item = await libraryItemService.getLibraryItemById(libraryItemId)
			if (item.error) {
				throw new Error(item.error)
			}
			setLibraryItem(item)
		} catch (error) {
			handleError(error.message)
		}
	},[handleError, libraryItemId])

	useEffect(() => {
		fetchLibraryItem()
	}, [fetchLibraryItem])
	
	return (
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
					{user &&
						<button key="addReview" type="button" onClick={handleAddReview}>Add a review</button>
					}
					<ul>
						{libraryItem?.reviews?.map((review) => (
							<li key={review._id}>
								<ReviewDisplay
									review={review}
									user={user}
									handleError={handleError}
									libraryItem={libraryItem}
									refreshParent={fetchLibraryItem}
								/>
							</li>
						))}
					</ul>
				</li>
			</ul>
		</div>
	)
}

export default LibraryItemDisplay
