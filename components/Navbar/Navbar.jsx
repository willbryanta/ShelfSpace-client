import {Link, useNavigate} from 'react-router-dom'
import './Navbar.css'

function Navbar(props) {
	const {user, signOut} = props
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
						<Link to="/users/:userId">Profile</Link>
					</li>
					<li>
						<a
							href="/"
							onClick={(e) => {
								e.preventDefault()
								signOut()
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
