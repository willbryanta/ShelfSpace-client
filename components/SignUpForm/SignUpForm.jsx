import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import * as authService from '../../services/authService'

const SignUpForm = (props) => {
	const {handleSetUser} = props
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		confirmPassword: '',
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
		const {username, password, confirmPassword} = formData
		return !(username && password && password === confirmPassword)
	}

	const onFormSubmit = async (event) => {
		event.preventDefault()
		try {
			const responseData = await authService.signUp({
				username: formData.username,
				password: formData.password,
			})

			handleSetUser(responseData.user)
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<main>
			<h1>Sign up Page</h1>
			<form onSubmit={onFormSubmit}>
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
				<div>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={onFormInputChange}
					/>
				</div>
				<button type="submit" disabled={isFormInvalid()}>
					Sign Up
				</button>
			</form>
		</main>
	)
}

export default SignUpForm
