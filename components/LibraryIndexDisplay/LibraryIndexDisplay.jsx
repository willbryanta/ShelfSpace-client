import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import * as libraryItemService from '../../services/libraryItemService'

function LibraryIndexDisplay() {
	const [libraryItems, setLibraryItems] = useState([])

	useEffect(() => {
		const fetchLibraryItems = async () => {
			const items = await libraryItemService.getLibraryItem()
			// Error handling
			setLibraryItems(items)
		}
		fetchLibraryItems()
	}, [])

	const allLibraryItems = libraryItems.map((libraryItem) => (
		<ul key={libraryItem._id}>
			<li>
				<Link to={`library/${libraryItem._id}`}>Name: {libraryItem.name}</Link>
			</li>
			<li>Description: {libraryItem.description}</li>
			<li>Publication Date: {libraryItem.publicationDate}</li>
		</ul>
	))

	return (
		<>
			<div>{allLibraryItems}</div>
		</>
	)
}

export default LibraryIndexDisplay
