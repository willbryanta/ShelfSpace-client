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
		setLists(profile.lists)
		setReviews(profile.ownedReviews)
	}
	useEffect(() => {
		generateProfile()
	}, [])
	return (
		<>
			<ul></ul>
			{lists.map((list) => {
				return (
					<li key={list._id}>
						<ListIndexDisplay key={list._id} list={list} />
					</li>
				)
			})}
			<ul>
				{reviews.map((item) => {
					return (
						<li key={item.review._id}>
							<p>{item.filmTitle} Review:</p>
							<ReviewDisplay review={item.review} />
						</li>
					)
				})}
			</ul>
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
