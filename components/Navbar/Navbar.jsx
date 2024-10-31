import {Link} from 'react-router-dom'

function Navbar(props) {
	const {user, signOut} = props
	return (
		<nav>
			{user ? (
				<ul>
					<li>
						<Link to="/library">Library</Link>
					</li>
					<li>
						<Link to="/Users/Signup">Sign Up</Link>
					</li>
					<li>
						<Link to="/Users/Signin">Sign In</Link>
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<Link to="/library">Library</Link>
					</li>
					<li>
						<Link to="/Users/:userId">Profile</Link>
					</li>
					<li>
						<a
							href="/"
							onClick={(e) => {
								e.preventDefault()
								signOut()
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
