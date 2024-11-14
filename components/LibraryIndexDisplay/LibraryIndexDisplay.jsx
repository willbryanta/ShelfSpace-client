import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import * as libraryItemService from '../../services/libraryItemService'
import './LibraryIndexDisplay.css'
import styles from './LibraryIndex.module.css'


function LibraryIndexDisplay(props) {
	const {handleError} = props
	const [libraryItems, setLibraryItems] = useState([])

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
		// added per the warning from VSCode
	}, [handleError])

	const allLibraryItems = libraryItems?.map((item) => (
		<li key={item._id} className={styles.item}>
			<Link to={`/library/${item._id}`}>
				{/* opportunity for creating poster <img> as re-usable component */}
				{item.posterPath ? (
					<img
						src={`https://image.tmdb.org/t/p/w200/${item.posterPath}`}
						className={styles.poster} alt={item.name}
					></img>
				) : (
					<img
						src="https://placeholder.pics/svg/300x300/391C0B/391C0B"
						className={styles.poster} alt={`A placeholder for items without a poster`}
					></img>
				)}
			</Link>
			<p className={styles.title}>{item.name}</p>
		</li>
	))

	return <ul className={styles.results}>{allLibraryItems}</ul>
}

export default LibraryIndexDisplay
