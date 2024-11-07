const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL
const TOKEN_KEY = import.meta.env.VITE_JWT_KEY

const createLibraryItem = async (libraryItem) => {
	try {
		const res = await fetch(`${BACKEND_URL}/library`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify(libraryItem),
		})
		const data = await res.json()
		if (data.error) {
			throw new Error(data.error)
		}
		return data
	} catch (error) {
		return {error}
	}
}

const getLibraryItem = async () => {
	try {
		const res = await fetch(`${BACKEND_URL}/library`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
			},
		})
		if (!res.ok) {
			const errorData = await res.json()
			throw new Error(errorData.err)
		}
		const data = await res.json()
		return data
	} catch (error) {
		return {error}
	}
}

const getLibraryItemById = async (libraryItemId) => {
	try {
		const res = await fetch(`${BACKEND_URL}/library/${libraryItemId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
			},
		})
		if (!res.ok) {
			const errorData = await res.json()
			throw new Error(errorData.error)
		}
		const data = await res.json()
		return data
	} catch (error) {
		return {error}
	}
}

const updateLibraryItem = async (libraryItemId, libraryItemFormData) => {
	try {
		const res = await fetch(`${BACKEND_URL}/library/${libraryItemId}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(libraryItemFormData),
		})
		if (!res.ok) {
			throw new Error(res.error)
		}
		return res.json()
	} catch (error) {
		return {error}
	}
}

const deleteLibraryItem = async (libraryItemId) => {
	try {
		const res = await fetch(`${BACKEND_URL}/library/${libraryItemId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
			},
		})
		if (!res.ok) {
			throw new Error(res.error)
		}
		return res.json()
	} catch (error) {
		return {error}
	}
}

export {
	createLibraryItem,
	getLibraryItem,
	getLibraryItemById,
	deleteLibraryItem,
	updateLibraryItem,
}
