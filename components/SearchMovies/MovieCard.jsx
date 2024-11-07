import styles from './MovieCard.module.css';

export default function MovieCard(props) {
    const {movie} = props

    return (
            <li className={styles.movie}>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} className={styles.moviePoster}></img>
                <p className={styles.movieTitle}>{movie.title}</p>
                <button>+</button>
            </li>
    )
}