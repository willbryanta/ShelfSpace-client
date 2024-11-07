import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import * as usersService from '../../services/usersService'
import ListIndexDisplay from '../ListIndexDisplay/ListIndexDisplay'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'
function ProfilePage(props) {
	const {user, handleError} = props
	const navigate = useNavigate()
	const {getProfile, deleteList} = usersService
	const [lists, setLists] = useState([])
	const [reviews, setReviews] = useState([])
	const generateProfile = async () => {
			const profileData = await getProfile(user)
			if (profileData.error) {
				throw new Error(profileData.error)
			}
			setLists(profileData.user.lists)
			setReviews(profileData.reviews)
	}
	useEffect(() => {
		generateProfile()
	}, [])
	return (
		<>
			<h3>Your Lists</h3>
			<ul>
				{lists.map((list) => {
					return (
						<li key={list._id}>
							<ListIndexDisplay
								key={list._id}
								list={list}
								user={user}
								deleteList={deleteList}
								setLists={setLists}
								handleError={handleError}
							/>
						</li>
					)
				})}
			</ul>
			<button
				type="button"
				onClick={() => navigate(`/users/${user._id}/lists/new`)}
			>
				New
			</button>
			<h3>Your Reviews</h3>
			<ul>
				{reviews.map((review) => {
					return (
						<li key={review._id}>
							<ReviewDisplay review={review} user={user} />
							<p>
								<em>
									on{' '}
									<Link to={`/library/${review.libraryItem._id}`}>
										{review.libraryItem.name}
									</Link>
								</em>
							</p>
						</li>
					)
				})}
			</ul>
		</>
	)
}

export default ProfilePage
