import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import * as authService from '../../services/authService'

const SignInForm = (props) => {
	const {handleSetUser, handleError} = props
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	})

	const onFormInputChange = (event) => {
		const inputName = event.target.name
		const inputValue = event.target.value

		setFormData({
			...formData,
			[inputName]: inputValue,
		})
	}

	const isFormInvalid = () => {
		const {username, password} = formData
		return !(username && password)
	}

	return (
		<main>
			<h1>Sign in Page</h1>
			<form
				onSubmit={async (event) => {
					event.preventDefault()
					const {username, password} = formData
					const userPayload = await authService.signIn({username, password})
					if (userPayload.error) {
						return handleError(userPayload.error)
					}
					handleSetUser(userPayload)
					navigate('/')
				}}
			>
				<div>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						name="username"
						value={formData.username}
						onChange={onFormInputChange}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={onFormInputChange}
					/>
				</div>
				<button type="submit" disabled={isFormInvalid()}>
					Sign in
				</button>
			</form>
		</main>
	)
}

export default SignInForm
