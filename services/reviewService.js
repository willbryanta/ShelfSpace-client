const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL
const TOKEN_KEY = import.meta.env.VITE_JWT_KEY

// Create a review
const createReview = async (input) => {
	try {
		const res = await fetch(`${BACKEND_URL}/reviews`, {
			method: 'POST',
			headers: {'Content-type': 'application/json'},
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
