import {useState} from 'react'
import * as usersService from '../../services/usersService'
import ListDisplay from '../ListDisplay/ListDisplay'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'
import UserSettings from '../UserSettings/UserSettings'
function ProfilePage(props) {
	const {user, handleSetUser, authService} = props
	const {getProfile, updateUser} = usersService
	const [lists, setLists] = useState([])
	const [reviews, setReviews] = useState([])
	async () => {
		const profile = await getProfile(user)
		setLists(profile.lists)
		setReviews(profile.ownedReviews)
	}
	return (
		<>
			{lists.map((list) => {
				return <ListDisplay key={list._id} list={list} />
			})}
			{reviews.map((review) => {
				return <ReviewDisplay key={review._id} review={review} />
			})}
			<UserSettings
				handleSetUser={handleSetUser}
				updateUser={updateUser}
				user={user}
				authService={authService}
			/>
		</>
	)
}

export default ProfilePage
