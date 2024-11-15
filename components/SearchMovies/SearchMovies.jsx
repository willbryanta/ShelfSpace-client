import {useState, useEffect} from 'react'
import MovieCard from './MovieCard'
import styles from './MovieCard.module.css'
import * as libraryItemService from '../../services/libraryItemService'

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL

function SearchMovies(props) {
	const {list, setList, user, handleError} = props
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
					// opportunity: MovieCard in the most optimal state, should simply be a react component containing the UI elements as well as functions required to compose a MovieCard. The detail of the function can be lifted up to the parent component (in this case, SearchMovies).
					// the benefit for doing this is so that MovieCard becomes extremely generic without being tightly coupled with the LibraryItem service.
					// This gives you the flexibility to re-use MovieCard and integrate with other service and not constraint only to LibraryItem Service
					<MovieCard
						movie={movie}
						key={index}
						libraryItems={libraryItems}
						list={list}
						setList={setList}
						user={user}
						handleError={handleError}
					/>
				))}
			</ul>
		</>
	)
}

export default SearchMovies
