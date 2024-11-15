import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import * as authService from '../../services/authService'
import styles from './SignUp.module.css'


const SignUpForm = (props) => {
	const {handleSetUser, handleError} = props
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

	// improvement opportunity / challenge: should the form be invalid when password / confirmPassword don't match?
	// it might be confusing to the user why the form is in a disabled state when they thought they have filled in all the fields. What might elevate this experience is to provide an error message why the button is disabled e.g. "your password does not match"
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
			if (responseData.error) {
				throw new Error(responseData.error)
			}
			handleSetUser(responseData.user)
			navigate('/')
		} catch (error) {
			handleError(error.message)
		}
	}

	return (
		<main>
			<h1 className={styles.title}>Sign Up Page</h1>
			<form onSubmit={onFormSubmit}>
				<div className={styles.elements}>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						name="username"
						value={formData.username}
						onChange={onFormInputChange}
						className={styles.input}
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
						className={styles.input}
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
						className={styles.input}
					/>
				</div>
				<button type="submit" disabled={isFormInvalid()} className={styles.button}>
					Sign Up
				</button>
			</form>
		</main>
	)
}

export default SignUpForm
