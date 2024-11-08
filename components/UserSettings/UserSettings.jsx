import { useState } from 'react'
import styles from './UserSettings.module.css';

function UserSettings(props) {
	const { user, handleSetUser, authService, handleError } = props
	const { updateUser } = authService
	const [formData, setFormData] = useState({
		username: user.username,
		currentPassword: '',
		password: '',
		confirmPassword: '',
	})
	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const userPayload = await updateUser({ user, formData })
			if (userPayload.error) {
				throw new Error(userPayload.error)
			}
			handleSetUser(userPayload.user)
			setFormData({
				username: userPayload.user.username,
				currentPassword: '',
				password: '',
				confirmPassword: '',
			})
		} catch (error) {
			handleError(error.message)
		}
	}
	const isFormInvalid = () => {
		const { username, password, confirmPassword, currentPassword } = formData
		return !(username && currentPassword && password === confirmPassword)
	}
	const handleInputChange = (event) => {
		const inputName = event.target.name
		const inputvalue = event.target.value
		setFormData({
			...formData,
			[inputName]: inputvalue,
		})
	}
	return (
		<>
			<h1 className={styles.title}>Account Settings</h1>
			<form onSubmit={handleSubmit}>
				<div className={styles.elements}>
					<h2>Update Username and/or Password</h2>
					<label>
						Username:
						<input
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							className={styles.input}
						/>
					</label>
					<label>
						Current Password:
						<input
							type="password"
							name="currentPassword"
							value={formData.currentPassword}
							onChange={handleInputChange}
							className={styles.input}
						/>
					</label>
					<label>
						New Password:
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							className={styles.input}
						/>
					</label>
					<label>
						Confirm New Password:
						<input
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleInputChange}
							className={styles.input}
						/>
					</label>
					<button type="submit" disabled={isFormInvalid()} className={styles.button}>
						Submit
					</button>
				</div>
			</form>
		</>
	)
}

export default UserSettings
