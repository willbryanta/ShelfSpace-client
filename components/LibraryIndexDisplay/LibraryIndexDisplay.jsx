import {Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import * as libraryItemService from '../../services/libraryItemService'
import {format} from 'date-fns'
const formatDate = (date) => {
	return format(new Date(date), 'yyyy')
}

function LibraryIndexDisplay(props) {
	const {handleError} = props
	const [libraryItems, setLibraryItems] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const fetchLibraryItems = async () => {
			try {
				const items = await libraryItemService.getLibraryItem()
				if (items.error) {
					throw new Error(items.error)
				}
				setLibraryItems(items)
			} catch (error) {
				handleError(error.message)
			}
		}
		fetchLibraryItems()
	}, [])

	const handleNewClick = () => {
		navigate('/library/new')
	}

	const allLibraryItems = libraryItems?.map((libraryItem) => (
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
			<button type="button" onClick={handleNewClick}>
				Create Library Entry
			</button>
		</>
	)
}

export default LibraryIndexDisplay
