import * as libraryItemService from '../../services/libraryItemService'

import styles from './MovieCard.module.css';

export default function MovieCard(props) {
    const { movie, user, libraryItems } = props

    // const [movieAdded, setMovieAdded] = useState(false)
    const isMovieAdded = libraryItems.find((item) => item.description === movie.overview)

    const addToLibrary = async () => {
        const newMovie = {
            posterPath: movie.poster_path,
            name: movie.title,
            description: movie.overview,
            publicationDate: movie.release_date,
            author: user
        }

        await libraryItemService.createLibraryItem(newMovie)
    }

    return (
        <li className={styles.movie}>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} className={styles.moviePoster}></img>
            <p className={styles.movieTitle}>{movie.title}</p>
            {isMovieAdded ? (<button>✔️</button>)
                :
                (<button onClick={addToLibrary}>+</button>)}
        </li>
    )
}

