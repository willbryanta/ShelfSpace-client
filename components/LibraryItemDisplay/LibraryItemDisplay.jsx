import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as libraryItemService from '../../services/libraryItemService'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'

function LibraryItemDisplay(props) {
	const {user, handleError} = props
	const {libraryItemId} = useParams()
	const [libraryItem, setLibraryItem] = useState(null)

	useEffect(() => {
		const fetchLibraryItem = async () => {
			try {
				const item = await libraryItemService.getLibraryItemById(libraryItemId)
				setLibraryItem(item)
			} catch (error) {
				handleError(error.message)
			}
		}
		fetchLibraryItem()
	}, [])

	return (
		<div>
			<ul>
				<li>Name: {libraryItem.name}</li>
				<li>Description: {libraryItem.description}</li>
				<li>Publication Date: {libraryItem.publicationDate}</li>
				<li>Author: {libraryItem.author}</li>
				<li>
					Reviews:
					{
						<ul>
							{libraryItem?.reviews?.map((review) => (
								<li key={review._id}>
									<ReviewDisplay review={review} user={user} />
								</li>
							))}
						</ul>
					}
				</li>
			</ul>
		</div>
	)
}

export default LibraryItemDisplay
