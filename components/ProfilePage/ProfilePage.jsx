import * as userService from '../../services/usersService'
import ListDisplay from '../ListDisplay/ListDisplay'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'
import UserSettings from '../UserSettings/UserSettings'
async function ProfilePage(props) {
	const {handleSetUser, user} = props
	const {getProfile, updateUser} = userService
	const profile = await getProfile(user)
	return (
		<>
			{profile.lists.map((list) => {
				return <ListDisplay key={list._id} list={list} />
			})}
			{profile.ownedReviews.map((review) => {
				return <ReviewDisplay key={review._id} review={review} />
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
