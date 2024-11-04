function ReviewDisplay(props) {
	const {review} = props
	const {title, description, author, rating} = review
	const renderRating = (rating) => {
		for (let i = rating; i > 0; i--) {
			return <span>&#11088;</span>
		}
	}
	return (
		<>
			<h4>{title}</h4>
			{renderRating(rating)}
			<p>{description}</p>
			<p>Author: {author.username}</p>
		</>
	)
}

export default ReviewDisplay