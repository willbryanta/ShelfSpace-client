import {Link} from 'react-router-dom'

function ListIndexDisplay(props) {
	const {user, list, deleteList, setLists, handleError} = props
	const {listName, _id} = list
	const handleDelete = async () => {
		try {
			const updatedUser = await deleteList(user, _id)
			if (updatedUser.error) {
				throw new Error(updatedUser.error)
			}
			setLists(updatedUser.lists)
		} catch (error) {
			handleError(error.message)
		}
	}
	return (
		<>
			<Link to={`/users/${user._id}/lists/${_id}`}>{listName}</Link>
			{listName !== 'To Watch' && (
				<button type="button" onClick={() => handleDelete()}>
					Delete
				</button>
			)}
		</>
	)
}

export default ListIndexDisplay
