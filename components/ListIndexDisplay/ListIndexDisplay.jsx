import {Link} from 'react-router-dom'

function ListIndexDisplay(props) {
	const {user, list, deleteList, setLists} = props
	const {listName, _id} = list
	const handleDelete = async () => {
		const updatedUser = await deleteList(user, _id)
		setLists(updatedUser.lists)
	}
	return (
		<>
			<Link to={`/users/${user._id}/lists/${_id}`}>{listName}</Link>
			<button type="button" onClick={() => handleDelete()}>
				Delete
			</button>
		</>
	)
}

export default ListIndexDisplay
