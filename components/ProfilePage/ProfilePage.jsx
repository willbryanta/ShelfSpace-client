import {useEffect, useState} from 'react'
import * as usersService from '../../services/usersService'
import ListIndexDisplay from '../ListIndexDisplay/ListIndexDisplay'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'
import UserSettings from '../UserSettings/UserSettings'
function ProfilePage(props) {
	const {user, handleSetUser, authService} = props
	const {getProfile, updateUser} = usersService
	const [lists, setLists] = useState([])
	const [reviews, setReviews] = useState([])
	const generateProfile = async () => {
		const profile = await getProfile(user)
		console.log("🚀 ~ generateProfile ~ profile:", profile)
		setLists(profile.lists)
		console.log("🚀 ~ ProfilePage ~ lists:", lists)
		setReviews(profile.ownedReviews)
		console.log("🚀 ~ ProfilePage ~ reviews:", reviews)
	}
	useEffect(() => {
		generateProfile()
	}, [])
	return (
		<>
			{lists.map((list) => {
				return <ListIndexDisplay key={list._id} list={list} />
			})}
			{reviews.map((item) => {
				return (
					<>
						<p>{item.filmTitle} Review:</p>{' '}
						<ReviewDisplay key={item.review._id} review={item} />
					</>
				)
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
