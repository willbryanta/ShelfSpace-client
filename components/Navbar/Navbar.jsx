import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'

function Navbar(props) {
	const {user, authService, handleSetUser} = props
	const {signOut} = authService
	const navigate = useNavigate()
	return (
		<nav>
			{!user ? (
				<ul>
					<li>
						<Link to="/search-movies">Search</Link>
					</li>
					<li>
						<Link to="/library">Library</Link>
					</li>
					<li>
						<Link to="/users/signup">Sign Up</Link>
					</li>
					<li>
						<Link to="/users/signin">Sign In</Link>
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<Link to="/search-movies">Search</Link>
					</li>
					<li>
						<Link to="/library">Library</Link>
					</li>
					<li>
							<Link to={`/users/${user._id}`}> {user.username}</Link>
					</li>
					<li>
						<Link to={`/users/${user._id}/settings`}>Settings</Link>
					</li>
					<li>
						<a
							href="/"
							onClick={(e) => {
								e.preventDefault()
								signOut()
								handleSetUser(null)
								navigate('/')
							}}
						>
							Sign Out
						</a>
					</li>
				</ul>
			)}
		</nav>
	)
}

export default Navbar
