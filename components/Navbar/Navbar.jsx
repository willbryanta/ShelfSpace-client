import {Link, useNavigate} from 'react-router-dom'

function Navbar(props) {
	const { user, authService, handleSetUser } = props
	const {signOut} = authService
	const navigate = useNavigate()
	return (
		<nav>
			{!user ? (
				<ul>
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
						<Link to="/library">Library</Link>
					</li>
					<li>
						<Link to="/users/profile">{user.username}</Link>
					</li>
					<li>
						<a
							href="/"
							onClick={(e) => {
								e.preventDefault()
								signOut()
								handleSetUser(null)
								navigate('/users/signup')
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
