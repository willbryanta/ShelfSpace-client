import {Link} from 'react-router-dom'

function ListIndexDisplay(props) {
	const {user, list} = props
	const {listName, _id} = list
	return (
		<>
			<Link to={`/users/${user._id}/lists/${_id}`}>{listName}</Link>
		</>
	)
}

export default ListIndexDisplay
