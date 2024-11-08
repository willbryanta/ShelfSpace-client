import {Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import * as libraryItemService from '../../services/libraryItemService'
import {format} from 'date-fns'
import './LibraryIndexDisplay.css'
import styles from './LibraryIndex.module.css'

const formatDate = (date) => {
	return format(new Date(date), 'yyyy')
}

function LibraryIndexDisplay(props) {
	const {libraryItems} = props

	const allLibraryItems = libraryItems?.map((item) => (
		<li key={libraryItems._id} className={styles.item}>
			<Link to= {`/library/${item._id}`}>
				{	(item.posterPath) ?
					<img src={`https://image.tmdb.org/t/p/w200/${item.posterPath}`} className={styles.poster}></img>
					: <img src="https://placeholder.pics/svg/300x300/391C0B/391C0B" className={styles.poster}></img>
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
