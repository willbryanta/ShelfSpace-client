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
		if (!res.ok) {
			throw new Error(res.error)
		}
		return await res.json()
	} catch (error) {
		return {error}
	}
}

const createList = async (user, listFormData) => {
	try {
		const res = await fetch(`${BACKEND_URL}/users/${user._id}/lists`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
				'Content-Type': 'application/json',
			},
			user,
			body: JSON.stringify(listFormData),
		})
		if (!res.ok) {
			throw new Error(res.error)
		}
		return await res.json()
	} catch (error) {
		return {error}
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
		if (!res.ok) {
			throw new Error(res.error)
		}
		return await res.json()
	} catch (error) {
		return {error}
	}
}

const updateList = async (user, listId, listFormData) => {
	try {
		const res = await fetch(
			`${BACKEND_URL}/users/${user._id}/lists/${listId}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(listFormData),
				user,
			}
		)
		if (!res.ok) {
			throw new Error(res.error)
		}
		return await res.json()
	} catch (error) {
		return {error}
	}
}

const addToDefaultList = async (user, addedFilm) => {
	try {
		const res = await fetch(
			`${BACKEND_URL}/users/${user._id}/lists/default`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
					'Content-Type': 'application/json',
			},
			body: JSON.stringify({addedFilm}),
			user,
			}
		)
		if (!res.ok) {
			throw new Error(res.error)
		}
		const data = await res.json()
		return data
	} catch (error) {
		return {error}
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
		if (!res.ok) {
			throw new Error(res.error)
		}
		return await res.json()
	} catch (error) {
		return {error}
	}
}

export {
	getProfile,
	createList,
	showList,
	updateList,
	deleteList,
	addToDefaultList,
}
