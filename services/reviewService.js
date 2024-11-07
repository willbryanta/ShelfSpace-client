const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL
const TOKEN_KEY = import.meta.env.VITE_JWT_KEY

const createReview = async (review) => {
	try {
		const res = await fetch(`${BACKEND_URL}/reviews`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify(review),
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

const getReview = async (review) => {
	try {
		const res = await fetch(`${BACKEND_URL}/reviews`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify(review),
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

const updateReview = async (user, reviewId, reviewFormData) => {
	try {
		const res = await fetch(`${BACKEND_URL}/reviews/${reviewId}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reviewFormData),
			user
		})
		if (!res.ok) {
			throw new Error(res.error)
		}

		return res.json()
	} catch (error) {
		return {error}
	}
}

const deleteReview = async (user, reviewId) => {
	try {
		const res = await fetch(`${BACKEND_URL}/reviews/${reviewId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
			},
			user
		})
		if (!res.ok) {
			throw new Error(res.error)
		}
		return res.json()
	} catch (error) {
		return {error}
	}
}

export {createReview, getReview, updateReview, deleteReview}
