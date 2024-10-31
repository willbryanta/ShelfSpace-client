import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Signup from "./components/Signup/Signup"
import Signin from "./components/Signin/Signin"
import LibraryIndex from "./components/LibraryIndex/LibraryIndex"
import Profile from "./components/Profile/Profile"

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/library" element={<LibraryIndex />} />
				<Route path="/Users/Signup" element={<Signup />} />
				<Route path="/Users/Signin" element={<Signin />} />
				<Route path="/Users/:userId" element={<Profile />} />
			</Routes>
		</>
	)
}

export default App
