import { useState } from "react";
import MovieCard from "./MovieCard";
import styles from './MovieCard.module.css';

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL

function SearchMovies(props) {

    const { libraryItems } = props

    const [movies, setMovies] = useState([])

    const fetchMovies = (search) => {
        
        const url = `${BACKEND_URL}/search-movies/${search}`

        fetch(url)
            .then(res => res.json())
            .then(data => setMovies(data.filter(movie => movie.poster_path)))
            .catch(err => console.error(err));
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const search = formData.get('search')
        fetchMovies(search)
    }

    return (
        <>
            <h1>Search Movies</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="search" placeholder="Search for a movie" />
                <button type="submit">Search</button>
            </form>
            <ul className={styles.movieResults}>
                {movies.map(
                    (movie, index) => (
                        <MovieCard movie={movie} key={index} libraryItems={libraryItems} />
                    )
                )}
            </ul>
        </>
    )
}

export default SearchMovies