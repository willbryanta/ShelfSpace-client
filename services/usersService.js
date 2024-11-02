const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL
const TOKEN_KEY = import.meta.env.VITE_JWT_KEY

//* This functions gets all the info of the user
const userProfile = async () => {
	try {
		const response = await fetch('BACKEND_URL/users/:userId')
        const data = await response.json()
        console.log(data)
		return data
	} catch (error) {
		console.log(error)
	}
}

export {userProfile}
