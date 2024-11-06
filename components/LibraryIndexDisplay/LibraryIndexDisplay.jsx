import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import * as libraryItemService from '../../services/libraryItemService'
import {format} from 'date-fns'

const formatDate = (date) => {
	return format(new Date(date), 'yyyy')
}

function LibraryIndexDisplay(props) {
	const {handleError} = props
	const [libraryItems, setLibraryItems] = useState([])

	useEffect(() => {
		const fetchLibraryItems = async () => {
			const items = await libraryItemService.getLibraryItem()
			if (items.error) {
				return handleError(items.error)
			}
			setLibraryItems(items)
		}
		fetchLibraryItems()
	}, [])

	const allLibraryItems = libraryItems.map((libraryItem) => (
		<ul key={libraryItem._id}>
			<li>
				<Link to={`/library/${libraryItem._id}`}>
					<strong>Name:</strong> {libraryItem.name}
				</Link>
			</li>
			<li>
				<strong>Description:</strong> {libraryItem.description}
			</li>
			<li>
				<strong>Publication Date:</strong>{' '}
				{formatDate(libraryItem.publicationDate)}
			</li>
		</ul>
	))

	return (
		<>
			<div>{allLibraryItems}</div>
		</>
	)
}

export default LibraryIndexDisplay
