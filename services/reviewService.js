const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL
const TOKEN_KEY = import.meta.env.VITE_JWT_KEY

const createReview = async (review) => {
	try {
		const res = await fetch(`${BACKEND_URL}/reviews`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify(review),
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

const getReview = async (review) => {
	try {
		const res = await fetch(`${BACKEND_URL}/reviews`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify(review),
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

const updateReview = async (reviewId, reviewFormData) => {
	try {
		const res = await fetch(`${BACKEND_URL}/reviews/${reviewId}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reviewFormData),
		})
		return res.json()
	} catch (error) {
		console.log(error)
	}
}

const deleteReview = async (reviewId) => {
	try {
		const res = await fetch(`${BACKEND_URL}/reviews/${reviewId}`, {
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

export {createReview, getReview, updateReview, deleteReview}
