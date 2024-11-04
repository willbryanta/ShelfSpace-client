import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import * as usersService from '../../services/usersService'

//* /lists/:listId
const ListShow = (props) => {
	const {user} = props
	const {listId} = useParams()
	const {list, setList} = useState(null)

	useEffect(() => {
		const fetchList = async () => {
			const userId = user.id
			const fetchedList = await usersService.showList(userId, listId)
			setList(fetchedList)
		}
		fetchList()
	}, [listId, user.id])

	
	const handleDeleteListItem = async (itemId) => {
		const deletedListItem = await usersService.deleteListItem(itemId)
		setList({
			...list,
			items: list.items.filter((item) => item.id !== deletedListItem.id),
		})
    }
    
    if(!list) return <p>Can't find your list. Please try again later</p>

	return (
		<div>
			<h1>{list.listName}</h1>
			<ul>
				{list.items.map((item) => (
					<li key={item._id}>
						<h2>{item.name}</h2>
						<h2>{item.description}</h2>
						<h2> Publication Date:{item.publicationDate}</h2>
                        <h2> Author: {item.author}</h2>
                        <h2>Rating: {item.rating} </h2>
						<button onClick={() => handleDeleteListItem(item._id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ListShow

