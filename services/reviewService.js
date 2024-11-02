const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL
const TOKEN_KEY = import.meta.env.VITE_JWT_KEY

const createReview = async () => {
	try {
		const res = await fetch(`${BACKEND_URL}/reviews`)
		const data = await res.json()
		return data
	} catch (error) {
		console.log(error)
		throw error
	}
}

export {createReview}
