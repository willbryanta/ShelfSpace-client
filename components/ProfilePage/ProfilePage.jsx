import * as usersService from '../../services/usersService'
import ListDisplay from '../ListDisplay/ListDisplay'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'
import UserSettings from '../UserSettings/UserSettings'
function ProfilePage(props) {
	const {user, handleSetUser} = props
	const {getProfile, updateUser} = usersService
	const profile = await getProfile(user._id, user)
	//Investigate how to await within React components as per Brian's istructions
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
