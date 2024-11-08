import {useState, useEffect} from 'react'
import * as libraryItemService from '../../services/libraryItemService'
import * as usersService from '../../services/usersService'

import styles from './MovieCard.module.css'

export default function MovieCard(props) {
	const {movie, user, libraryItems, setUpdated} = props

	const [movieAdded, setMovieAdded] = useState(false)

	useEffect(() => {
		const isMovieInLibrary = libraryItems.some(
			(item) => item.description === movie.overview
		)
		setMovieAdded(isMovieInLibrary)
	}, [libraryItems, movie.overview])

	const newMovie = {
		posterPath: movie.poster_path,
		name: movie.title,
		description: movie.overview,
		publicationDate: movie.release_date,
		author: user,
	}

	const addToLibrary = async () => {
		await libraryItemService.createLibraryItem(user, newMovie)
		setMovieAdded(true)
		setUpdated(true)
	}

	return (
		<li className={styles.movie}>
			<img
				src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
				alt={movie.name}
				className={styles.moviePoster}
			></img>
			<p className={styles.movieTitle}>{movie.title}</p>
			<div>
				{movieAdded ? (
					<button className={styles.addToLib}>✔️</button>
				) : (
					<button onClick={addToLibrary} className={styles.addToLib}>
						Add to Library
					</button>
				)}
			</div>
		</li>
	)
}
