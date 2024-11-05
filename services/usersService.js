const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL
const TOKEN_KEY = import.meta.env.VITE_JWT_KEY

const getProfile = async (user) => {
	try {
		const res = await fetch(`${BACKEND_URL}/users/${user._id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
			},
			user,
		})
		return await res.json()
	} catch (error) {
		console.log('Error getting your profile', error)
		return {error: 'Error getting your profile!'}
	}
}

const createList = async (user, ListFormData) => {
	try {
		const res = await fetch(`${BACKEND_URL}/${user._id}/lists`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
				'Content-Type': 'application/json',
			},
			user,
			body: JSON.stringify(ListFormData),
		})
		return await res.json()
	} catch (error) {
		console.log('Error creating list:', error)
		return {error: 'Error creating list'}
	}
}

const showList = async (user, listId) => {
	try {
		const res = await fetch(
			`${BACKEND_URL}/users/${user._id}/lists/${listId}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
				},
				user,
			}
		)
		return await res.json()
	} catch (error) {
		console.log('Error getting that list:', error)
		return {error: 'Error getting that list '}
	}
}

const updateList = async (user, listId, ListFormData) => {
	try {
		const res = await fetch(
			`${BACKEND_URL}/users/${user._id}/lists/${listId}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(ListFormData),
				user,
			}
		)
		return await res.json()
	} catch (error) {
		console.log('Error updating list:', error)
		return {error: `Error updating list `}
	}
}

const deleteList = async (user, listId) => {
	try {
		const res = await fetch(
			`${BACKEND_URL}/users/${user._id}/lists/${listId}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
					user,
				},
			}
		)
		return await res.json()
	} catch (error) {
		console.log('Error deleting list:', error)
		return {error: `Error deleting list`}
	}
}

const deleteListItem = async (user, listId, itemId) => {
	try {
		console.log('🚀 ~ deleteListItem ~ itemId:', itemId)
		console.log('🚀 ~ deleteListItem ~ listId:', listId)
		const res = await fetch(
			`${BACKEND_URL}/users/${user._id}/lists/${listId}/items/${itemId}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
				},
				user,
			}
		)
		return res.json()
	} catch (error) {
		console.log(error)
	}
}

export {
	getProfile,
	createList,
	showList,
	updateList,
	deleteList,
	deleteListItem,
}
