import {useEffect, useState} from 'react'
import * as usersService from '../../services/usersService'
import ListIndexDisplay from '../ListIndexDisplay/ListIndexDisplay'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'
import UserSettings from '../UserSettings/UserSettings'
import { Link } from 'react-router-dom'
function ProfilePage(props) {
	const {user, handleSetUser, authService} = props
	const {getProfile, updateUser} = usersService
	const [lists, setLists] = useState([])
	const [reviews, setReviews] = useState([])
	const generateProfile = async () => {
		const profileData = await getProfile(user)
		setLists(profileData.user.lists)
		setReviews(profileData.reviews)
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
						<ListIndexDisplay key={list._id} list={list} user={user} />
					</li>
				)
			})}
			<ul>
				{reviews.map((review) => {
					return (
						<li key={review._id}>
							<p><Link to={`/library/${review.libraryItem._id}`}>{review.libraryItem.name} </Link>Review:</p>
							<ReviewDisplay review={review} />
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
