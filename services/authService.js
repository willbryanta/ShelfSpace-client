const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL

const signup = async (inputData) => {
	try {
		const res = await fetch(`${BACKEND_URL}/Auth/Signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(inputData),
		})
		const json = await res.json()
		if (json.err) {
			throw new Error(json.err)
		}
	} catch (err) {
		console.log(err)
		throw err
	}
}

const signin = async () => {
	console.log("signin test")
}

const getUser = async () => {
	console.log("getUser test")
}

export { signup, signin, getUser }
