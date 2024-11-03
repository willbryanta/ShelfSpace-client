const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL

const getProfile = async () => {
	try {
		const res = await fetch(`${BACKEND_URL}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		return res.json()
	} catch (error) {
		console.log('Error getting your profile', error)
		return {error: 'Error getting your profile!'}
	}
}

const updateUser = async (userId, profileData) => {
	try {
		const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(profileData),
		})
		return await res.json()
	} catch (error) {
		console.log(error, 'Error updating your profile')
		return {error: 'Error updating your profile'}
	}
}

const createList = async (userId, ListFormData) => {
	try {
		const res = await fetch(`${BACKEND_URL}/${userId}/lists`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(ListFormData),
		})
		return res.json()
	} catch (error) {
		console.log('Error creating list:', error)
		return {error: 'Error creating list'}
	}
}


const showList = async (userId, listId) => {
	try {
		const res = await fetch(`${BACKEND_URL}/${userId}/lists/${listId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		return res.json()
	} catch (error) {
		console.log('Error getting that list:', error)
		return {error: 'Error getting that list '}
	}
}

const updateList = async (userId, listId, ListFormData) => {
	try {
		const res = await fetch(`${BACKEND_URL}/${userId}/lists/${listId}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(ListFormData),
		})
		return res.json()
	} catch (error) {
		console.log('Error updating list:', error)
		return {error: `Error updating list `}
	}
}

const deleteList = async (userId, listId) => {
	try {
		const res = await fetch(`${BACKEND_URL}/${userId}/lists/${listId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		return res.json()
	} catch (error) {
		console.log('Error deleting list:', error)
		return {error: `Error deleting list`}
	}
}

export {getProfile,updateUser, createList, showList, updateList, deleteList}
