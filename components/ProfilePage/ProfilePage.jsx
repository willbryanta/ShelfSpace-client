import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as usersService from '../../services/usersService'
import ListIndexDisplay from '../ListIndexDisplay/ListIndexDisplay'
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay'
import styles from './ProfilePage.module.css'

function ProfilePage(props) {
	const { user, handleError } = props
	const navigate = useNavigate()
	const { getProfile, deleteList } = usersService
	const [lists, setLists] = useState([])
	const [reviews, setReviews] = useState([])

	console.log(lists)

	const generateProfile = useCallback(async () => {
		try {
			const profileData = await getProfile(user)
			if (profileData.error) {
				throw new Error(profileData.error)
			}
			setLists(profileData.user.lists)
			setReviews(profileData.reviews)
		} catch (error) {
			handleError(error.message)
		}
	}, [getProfile, handleError, user])

	useEffect(() => {
		generateProfile()
	}, [generateProfile])
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
							<ul className={styles.movie}>
									{list.items && list.items.length > 0 ? (
										list.items.map((item) => (
											<li key={item._id} className={styles.movie}>
												<Link to={`/library/${item._id}`}>
												<img
													src={item.posterPath
														? `https://image.tmdb.org/t/p/w200/${item.posterPath}`
														: "https://placeholder.pics/svg/300x300/391C0B/391C0B"}
														className={styles.poster}
														alt={item.name || 'A placeholder for items without a poster'}
														/>
												</Link>
											</li>
										))
									) : (
										<li>No items available</li>
									)}

							</ul>
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
							<ReviewDisplay
								review={review}
								user={user}
								libraryItem={review.libraryItem}
								handleError={handleError}
								refreshParent={generateProfile}
							/>
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
