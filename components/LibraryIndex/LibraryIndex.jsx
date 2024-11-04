function LibraryIndex(props) {
	const {libraryItems} = props

	const allLibraryItems = libraryItems.map((libraryItem, index) => (
		<ul key={index}>
			<li>Name: {libraryItem.name}</li>
			<li>Description: {libraryItem.description}</li>
			<li>Publication Date: {libraryItem.publicatioDate}</li>
			<li>Author: {libraryItem.author}</li>
			<li>
				Reviews: <li>Description: {libraryItem.review.description}</li>
				<li>Rating: {libraryItem.review.rating}</li>
			</li>
		</ul>
	))

	return (
		<>
			<div>{allLibraryItems}</div>
		</>
	)
}

export default LibraryIndex
