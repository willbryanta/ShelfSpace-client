const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL
const TOKEN_KEY = import.meta.env.VITE_JWT_KEY

const signUp = async (input) => {
	try {
		const res = await fetch(`${BACKEND_URL}/Auth/Signup`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(input),
		})
		const output = await res.json()
		if (output.err) {
			throw new Error(output.err)
		}
		localStorage.setItem('JWT', output.token)
		return output
	} catch (err) {
		console.log(err)
		throw err
	}
}

const signIn = async (input) => {
	try {
		const res = await fetch(`${BACKEND_URL}/Auth/Signin`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(input),
		})
		const output = await res.json()
		if (output.err) {
			throw new Error(output.err)
		}
		if (output.token) {
			localStorage.setItem(TOKEN_KEY, output.token)
			const user = JSON.parse(atob(output.token.split('.')[1]))
			return user
		}
	} catch (err) {
		console.log(err)
		throw err
	}
}

const getUser = () => {
	const token = localStorage.getItem(TOKEN_KEY)

	if (!token) {
		return null
	}
	const user = JSON.parse(atob(token.split('.')[1]))
	return user
}

const signOut = () => {
	localStorage.removeItem('JWT')
}

export {signUp, signIn, getUser, signOut}
