import {useState} from 'react'

function UserSettings(props) {
	const {user, updateUser, handleSetUser, authService} = props
	const {validatePassword} = authService
	const [formData, setFormData] = useState({
		username: user.username,
		currentPassword: '',
		password: '',
		confirmPassword: '',
	})
	const handleSubmit = async (event) => {
		event.preventDefault()
		if (await validatePassword({user, password: formData.currentPassword})) {
			const userPayload = await updateUser(user, formData)
			handleSetUser(userPayload.targetUser)
			setFormData({
				username: user.username,
				currentPassword: '',
				password: '',
				confirmPassword: '',
			})
		}
	}
	const isFormInvalid = () => {
		const {username, password, confirmPassword, currentPassword} = formData
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
			<div className="update-user">
				<form onSubmit={handleSubmit}>
					<h2>Update Username and Password:</h2>
					<label>
						Username:
						<input
							name="username"
							value={formData.username}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Current Password:
						<input
							type="password"
							name="currentPassword"
							value={formData.currentPassword}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						New Password:
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Confirm New Password:
						<input
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleInputChange}
						/>
					</label>
					<button type="submit" disabled={isFormInvalid()}>
						Submit
					</button>
				</form>
			</div>
		</>
	)
}

export default UserSettings
