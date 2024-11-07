import {useEffect, useState} from 'react'
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
	}, [])
	return (

		<>
		<h1>{libraryItem.name}</h1>
		<img src={`https://image.tmdb.org/t/p/w200/${libraryItem.posterPath}`}></img>
		<p><strong>Overview:</strong> {libraryItem.description}</p>
		<p><strong>Release Year:</strong> {formatDate(libraryItem.publicationDate)}</p>
		<p><strong>Reviews:</strong></p>
		<ul>
							{libraryItem?.reviews?.map((review) => (
								<li key={review._id}>
									<ReviewDisplay review={review} user={user} />
								</li>
							)
						)}
					</ul>
		</>
		
	)
}

export default LibraryItemDisplay
