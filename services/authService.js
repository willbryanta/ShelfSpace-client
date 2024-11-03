const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL
const TOKEN_KEY = import.meta.env.VITE_JWT_KEY

const signUp = async (input) => {
	try {
		const res = await fetch(`${BACKEND_URL}/auth/signup`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(input),
		})
		const output = await res.json()
		if (output.err) {
			throw new Error(output.err)
		}
		localStorage.setItem(TOKEN_KEY, output.token)
		return output
	} catch (err) {
		console.log(err)
		throw err
	}
}

const signIn = async (input) => {
	try {
		const res = await fetch(`${BACKEND_URL}/auth/signin`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(input),
		})
		const output = await res.json()
		if (output.err) {
			throw new Error(output.err)
		}
		localStorage.setItem(TOKEN_KEY, output.token)
		const user = JSON.parse(atob(output.token.split('.')[1]))
		return user
	} catch (err) {
		console.log(err)
		throw err
	}
}

const signOut = () => {
	localStorage.removeItem(TOKEN_KEY)
}

const getUser = () => {
	const token = localStorage.getItem(TOKEN_KEY)
	const user = token ? JSON.parse(atob(token.split('.')[1])) : null
	return user
}

const validatePassword = async (input) => {
	try {
		const res = await fetch(`${BACKEND_URL}/auth/password/${input.user._id}`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(input),
		})
		const output = await res.json()
		if (output.err) {
			throw new Error(output.err)
		}
		return output
	} catch (err) {
		console.log(err)
		throw err
	}
}

export {signUp, signIn, signOut, getUser, validatePassword}
