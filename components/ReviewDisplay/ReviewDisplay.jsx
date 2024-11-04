function ReviewDisplay(props) {
	const {reivew} = props
	const {title, description, author, rating} = reivew
	const renderRating = (rating) => {
		for (let i = rating; i > 0; i--) {
			return <span>&#11088;</span>
		}
	}
	return (
		<>
			<h2>{title}</h2>
			{renderRating(rating)}
			<p>{description}</p>
			<p>Author: {author}</p>
		</>
	)
}

export default ReviewDisplay
