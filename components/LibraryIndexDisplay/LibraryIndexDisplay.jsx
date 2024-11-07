import {Link} from 'react-router-dom'
import {format} from 'date-fns'

const formatDate = (date) => {
	return format(new Date(date), 'yyyy')
}

function LibraryIndexDisplay(props) {
	const {libraryItems} = props


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
		</>
	)
}

export default LibraryIndexDisplay
