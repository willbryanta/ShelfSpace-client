const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL
const TOKEN_KEY = import.meta.env.VITE_JWT_KEY

// Create a review
const createLibraryItem = async (libraryItem) => {
	try {
		const res = await fetch(`${BACKEND_URL}/library`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify(libraryItem),
		})
		const data = await res.json()
		if (data.err) {
			throw new Error(data.err)
		}
		return data
	} catch (error) {
		console.log(error)
		throw error
	}
}

const deleteLibraryItem = async (libraryItemId) => {
	try {
		const res = await fetch(`${BACKEND_URL}/library/${libraryItemId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		return res.json()
	} catch (error) {
		console.log(error)
	}
}

const updateLibraryItem = async (libraryItemId, libraryItemFormData) => {
	try {
		const res = await fetch(`${BACKEND_URL}/library/${libraryItemId}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(libraryItemFormData),
		})
		return res.json()
	} catch (error) {
		console.log(error)
	}
}

export {createLibraryItem, deleteLibraryItem, updateLibraryItem}
