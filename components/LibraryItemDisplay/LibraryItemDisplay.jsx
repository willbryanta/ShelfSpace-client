import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as libraryItemService from '../../services/libraryItemService'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'

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

	useEffect(() => {
		const fetchLibraryItem = async () => {
			try {
				const item = await libraryItemService.getLibraryItemById(libraryItemId)
				if (item.error) {
					throw new Error(item.error)
				}
				setLibraryItem(item)
			} catch (error) {
				handleError(error.message)
			}
		}
		fetchLibraryItem()
	}, [])
	useEffect(() => {
		console.log(libraryItem)
	}, [])
	return (
		<div>
			<ul>
				<li>Name: {libraryItem.name}</li>
				<li>Description: {libraryItem.description}</li>
				<li>Publication Date: {libraryItem.publicationDate}</li>
				<li>Author: {libraryItem.author.username}</li>
				<li>
					Reviews:
					<ul>
						{libraryItem.reviews?.map((review) => {
							return (
								<li key={review._id}>
									<ReviewDisplay review={review} user={user} />
								</li>
							)
						})}
					</ul>
				</li>
			</ul>
		</div>
	)
}

export default LibraryItemDisplay
