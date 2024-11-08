import {useState, useEffect} from 'react'
import MovieCard from './MovieCard'
import styles from './MovieCard.module.css'
import * as libraryItemService from '../../services/libraryItemService'

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL

function SearchMovies(props) {
	const {list, setList, user, setUpdated, handleError} = props
	const [libraryItems, setLibraryItems] = useState([])
	const [movies, setMovies] = useState([])

	useEffect(() => {
		const fetchLibraryItems = async () => {
			try {
				const items = await libraryItemService.getLibraryItem()
				if (items.error) {
					throw new Error(items.error)
				}
				setLibraryItems(items)
			} catch (error) {
				handleError(error.message)
			}
		}
		fetchLibraryItems()
	}, [])

	const fetchMovies = (search) => {
		const url = `${BACKEND_URL}/search-movies/${search}`

		fetch(url)
			.then((res) => res.json())
			.then((data) => setMovies(data.filter((movie) => movie.poster_path)))
			.catch((err) => console.error(err))
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		const formData = new FormData(event.target)
		const search = formData.get('search')
		fetchMovies(search)
	}

	return (
		<>
			<h1 className={styles.pageTitle}>ShelfSpace</h1>
            <h2 className={styles.pageTitle2}>Explore our collection of movies and create personalised lists.</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
				<input type="text" name="search" placeholder="Title" className={styles.input}/>
				<button type="submit">Search</button>
			</form>
			<ul className={styles.movieResults}>
				{movies.map((movie, index) => (
					<MovieCard
						movie={movie}
						key={index}
						libraryItems={libraryItems}
						list={list}
						setList={setList}
						user={user}
						setUpdated={setUpdated}
					/>
				))}
			</ul>
		</>
	)
}

export default SearchMovies
