import {Link} from 'react-router-dom'
import styles from './LibraryIndex.module.css';

function LibraryIndexDisplay(props) {
	const {libraryItems} = props

	const allLibraryItems = libraryItems?.map((item) => (
		<li key={libraryItems._id} className={styles.item}>
			<Link to= {`/library/${item._id}`}>
				{	(item.posterPath) ?
					<img src={`https://image.tmdb.org/t/p/w200/${item.posterPath}`} className={styles.poster}></img>
					: <p className={styles.noPoster}>{item.name}</p>
				}
			</Link>
			<p className={styles.title}>{item.name}</p>
		</li>
	))

	return (
		<ul className={styles.results}>
			{allLibraryItems}
		</ul>
	)
}

export default LibraryIndexDisplay
