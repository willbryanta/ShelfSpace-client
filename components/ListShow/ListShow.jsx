import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import * as usersService from '../../services/usersService'

const ListShow = (props) => {
	const {user} = props
	const {listId} = useParams()
	const [list, setList] = useState({listName: '', items: []})
	const [isEditing, setIsEditing] = useState(false)

	const fetchList = async () => {
		const fetchedList = await usersService.showList(user, listId)
		setList(fetchedList)
	}

	useEffect(() => {
		fetchList()
	}, [])

	const handleDeleteListItem = async (itemId) => {
		setList({
			...list,
			items: list.items.filter((item) => item._id !== itemId),
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

	const handleCancelClick = () => {
		fetchList()
		setIsEditing(false)
	}

	return (
		<div>
			<h1>
				{isEditing ? (
					<form onSubmit={(event) => event.preventDefault()}>
						<input
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
			<button onClick={() => setIsEditing(true)}>Edit</button>
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

			<button type="button" onClick={handleSaveClick}>
				{' '}
				Save{' '}
			</button>
			<button type="button" onClick={handleCancelClick} disabled={!isEditing}>
				{' '}
				Cancel{' '}
			</button>
		</div>
	)
}

export default ListShow
