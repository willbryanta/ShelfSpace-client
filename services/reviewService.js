const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL
const TOKEN_KEY = import.meta.env.VITE_JWT_KEY

// Create a review
const createReview = async (input) => {
	try {
		const res = await fetch(`${BACKEND_URL}/reviews`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify(input),
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

const deleteReview = async (reviewId) => {
	try {
		const res = await fetch(`${BACKEND_URL}/${reviewId}`, {
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

const updateReview = async (reviewId, reviewFormData) => {
	try {
		const res = await fetch(`${BACKEND_URL}/${reviewId}`, {
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

export {createReview, deleteReview, updateReview}