import { useState, useEffect } from 'react';
import * as libraryItemService from '../../services/libraryItemService'

import styles from './MovieCard.module.css';

export default function MovieCard(props) {
    const { movie, user, libraryItems } = props

    const [movieAdded, setMovieAdded] = useState(false)
    
    useEffect(() => {
        const isMovieInLibrary = libraryItems.some((item) => item.description === movie.overview);
        setMovieAdded(isMovieInLibrary);
    }, [libraryItems, movie.overview]);

    const addToLibrary = async () => {
        const newMovie = {
            posterPath: movie.poster_path,
            name: movie.title,
            description: movie.overview,
            publicationDate: movie.release_date,
            author: user
        }

        await libraryItemService.createLibraryItem(newMovie)
        setMovieAdded(true)
    }

    return (
        <li className={styles.movie}>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} className={styles.moviePoster}></img>
            <p className={styles.movieTitle}>{movie.title}</p>
            {movieAdded ? (<button className={styles.addToLib}>✔️</button>)
                :
                (<button onClick={addToLibrary} className={styles.addToLib}>Add to Library</button>)}
        </li>
    )
}
