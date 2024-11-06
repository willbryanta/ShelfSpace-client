import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as libraryItemService from '../../services/libraryItemService'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'

function LibraryItem(props) {
	const {user} = props
	const {libraryItemId} = useParams()
	const [libraryItem, setLibraryItem] = useState(null)

	useEffect(() => {
		const fetchLibraryItem = async () => {
			if (libraryItemId) {
				const item = await libraryItemService.getLibraryItemById(libraryItemId)
				setLibraryItem(item)
			}
		}
		fetchLibraryItem()
	}, [libraryItemId])


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
							{libraryItem.reviews.map((review) => (
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

export default LibraryItem
