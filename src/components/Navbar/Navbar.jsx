import { Link } from "react-router-dom"

function Navbar() {
	return (
		<nav>
			<Link to="/library">Library</Link>
			<Link to="/Users/Signup">Sign Up</Link>
			<Link to="/Users/Signin">Sign In</Link>
			<Link to="/Users/:userId">Profile</Link>
			<a href="/" onClick={(e) => e.preventDefault()}>
				Sign Out
			</a>
		</nav>
	)
}

export default Navbar
