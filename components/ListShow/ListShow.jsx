import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import * as usersService from '../../services/usersService'

const ListShow = (props) => {
	const {user} = props
	const {listId} = useParams()
	const [list, setList] = useState(null)
	const [isEditing, setIsEditing] = useState(false)
	const [editFormData, setEditFormData] = useState(null)

	useEffect(() => {
		const fetchList = async () => {
			const userId = user._id
			const fetchedList = await usersService.showList(userId, listId)
			setList(fetchedList)
		}
		fetchList()
	}, [listId, user._id])

	const handleDeleteListItem = async (itemId) => {
		const deletedListItem = await usersService.deleteListItem(itemId)
		setList({
			...list,
			items: list.items.filter((item) => item._id !== deletedListItem._id),
		})
	}

	const handleEditClick = () => {
		setEditFormData({listName: list.listName})
		setIsEditing(true)
	}

	const handleEditChange = (event) => {
		const inputName = event.target.name
		const inputValue = event.target.value
		setEditFormData({
			...editFormData,
			[inputName]: inputValue,
		})
	}

	const handleEditSubmit = async (event) => {
		event.preventDefault()
		const updatedList = await usersService.updateList(
			user._id,
			list._id,
			editFormData.listName
		)
		setList({
			...list,
			listName: updatedList.listName,
		})
		setIsEditing(false)
		setEditFormData(null)
	}

	if (!list) return <p>Can't find your list. Please try again later</p>

	return (
		<div>
			<h1>
				{isEditing ? (
					<form onSubmit={handleEditSubmit}>
						<label htmlFor="listName">Title</label>
						<input
							type="text"
							name="listName"
							value={editFormData.listName}
							onChange={handleEditChange}
						/>
						<button type="submit">Save</button>
						<button type="button" onClick={() => setIsEditing(false)}>
							Cancel
						</button>
					</form>
				) : (
					list.listName
				)}
			</h1>
			<ul>
				{list.items.map((item) => (
					<li key={item._id}>
						<h2>{item.name}</h2>

						<h4>Publication Date: {item.publicationDate}</h4>

						<button onClick={() => handleDeleteListItem(item._id)}>X</button>
					</li>
				))}
			</ul>
			{!isEditing && <button onClick={handleEditClick}>Edit List Name</button>}
		</div>
	)
}

export default ListShow
