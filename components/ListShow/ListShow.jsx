import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import * as usersService from '../../services/usersService'

const ListShow = (props) => {
	const {user} = props
	const {listId} = useParams()
	const [list, setList] = useState({listName: '', items: []})
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		const fetchList = async () => {
			const fetchedList = await usersService.showList(user, listId)
			setList(fetchedList)
		}

		fetchList()
		console.log(list)
	}, [])

	const handleDeleteListItem = async (itemId) => {
		const deletedListItem = await usersService.deleteListItem(user, itemId)
		setList({
			...list,
			items: list.items.filter((item) => item._id !== deletedListItem._id),
		})
	}

	const handleTextFieldChange = (event) => {
		const inputName = event.target.name
		const inputValue = event.target.value
		setList({
			...list,
			[inputName]: inputValue,
		})
	}

	const handleSaveClick = async (event) => {
		event.preventDefault()
		const packagedListData = {updatedList: list}
		const updatedListResponse = await usersService.updateList(
			user,
			list._id,
			packagedListData
		)

		setList(updatedListResponse)

		setIsEditing(false)
	}

	return (
		<div>
			<h1>
				{isEditing ? (
					<form onSubmit={(event) => event.preventDefault()}>
						<label htmlFor="listName">Title:</label>
						<input
							id="listName"
							type="text"
							name="listName"
							value={list.listName}
							onChange={handleTextFieldChange}
						/>
					</form>
				) : (
					list.listName
				)}
			</h1>
			<ul>
				{list.items.map((item) => (
					<li key={item._id}>
						<h2>
							{item.name} ({item.publicationDate}){' '}
						</h2>
						<button onClick={() => handleDeleteListItem(item._id)}>X</button>
					</li>
				))}
				<button type="button"> + </button>
			</ul>

			{!isEditing && (
				<button onClick={() => setIsEditing(true)}>Edit List Name</button>
			)}

			{isEditing && (
				<button type="button" onClick={handleSaveClick} disabled={!isEditing}>
					{' '}
					Save{' '}
				</button>
			)}
		</div>
	)
}

export default ListShow
