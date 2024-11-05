import {useEffect, useState, useParams} from 'react'
import * as libraryItemService from '../../services/libraryItemService'

function LibraryItem() {
	const {libraryItemId} = useParams()
	const [libraryItem, setLibraryItem] = useState(null)

	useEffect(() => {
		const fetchLibraryItem = async () => {
			if (libraryItemId) {
				const item = await libraryItemService.getLibraryItem(libraryItemId)
				setLibraryItem(item)
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
				<li>Reviews: {libraryItem.reviews}</li>
			</ul>
		</div>
	)
}

export default LibraryItem
