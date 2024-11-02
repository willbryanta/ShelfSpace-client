import * as userService from '../../services/usersService'
import UserSettings from '../UserSettings/UserSettings'
async function ProfilePage(props) {
	const {handleSetUser, user} = props
	const {getProfile, updateUser} = userService
	const profile = await getProfile(user)
	return (
		<>
			{profile.lists.map((list) => {
				;<ListDisplay list={list} />
			})}
			{profile.ownedReviews.map((review) => {
				;<ReviewDisplay review={review} />
			})}
			<UserSettings
				handleSetUser={handleSetUser}
				updateUser={updateUser}
				user={user}
			/>
		</>
	)
}

export default ProfilePage
