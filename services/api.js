const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL
const TOKEN_KEY = import.meta.env.VITE_JWT_KEY

// Love this service to abstract the API request! However, it seems it wasn't used by any of the other services?
const api = {
	get: (endpoint) => request(endpoint),
	post: (endpoint, data) => request(endpoint, 'POST', data),
	put: (endpoint, data) => request(endpoint, 'PUT', data),
	delete: (endpoint) => request(endpoint, 'DELETE'),
}

async function request(endpoint, method = 'GET', data = null) {
	try {
		const options = {
			method,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
				'Content-Type': 'application/json',
			},
		}

		if (data) {
			options.body = JSON.stringify(data)
		}

		const res = await fetch(`${BACKEND_URL}${endpoint}`, options)
		if (!res.ok) throw new Error(res.error)
		return await res.json()
	} catch (error) {
		return {error}
	}
}

export default api
