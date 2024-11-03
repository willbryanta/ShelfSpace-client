import {useState} from 'react'

function UserSettings(props) {
	const {user, updateUser, handleSetUser} = props
	const [formData, setFormData] = useState({
		username: user.username,
		oldPassword: '',
		password: '',
		confirmPassword: '',
	})
	const handleSubmit = async (event) => {
		event.preventDefault()
		const userPayload = await updateUser(formData)
		handleSetUser(userPayload)
		setFormData({
			username: user.username,
			oldPassword: '',
			password: '',
			confirmPassword: '',
		})
	}
	const isFormInvalid = () => {
		const {username, password, confirmPassword, oldPassword} = formData
		return !(
			username &&
			oldPassword &&
			password === confirmPassword
		)
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
						Old Password:
						<input
							type="password"
							name="oldPassword"
							value={formData.username}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						New Password:
						<input
							type="password"
							name="password"
							value={formData.username}
							onChange={handleInputChange}
						/>
					</label>
					<label>
						Confirm New Password:
						<input
							type="password"
							name="confirmPassword"
							value={formData.username}
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
