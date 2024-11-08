import { useState, useEffect } from 'react';
import * as libraryItemService from '../../services/libraryItemService'
import * as usersService from '../../services/usersService'

import styles from './MovieCard.module.css';

export default function MovieCard(props) {
    const { movie, user, libraryItems, list, setList } = props

    const [movieAdded, setMovieAdded] = useState(false)

    
    useEffect(() => {
        const isMovieInLibrary = libraryItems.some((item) => item.description === movie.overview);
        setMovieAdded(isMovieInLibrary);
    }, [libraryItems, movie.overview]);

    const newMovie = {
        posterPath: movie.poster_path,
        name: movie.title,
        description: movie.overview,
        publicationDate: movie.release_date,
        author: user
    }
    
    const addToLibrary = async () => {

        await libraryItemService.createLibraryItem(user, newMovie)
        setMovieAdded(true)
    }

    const createDefaultList = async () => {
        const defaultList = {
            newList: {listName: 'To Watch', items: []},
        }
        const newListResponse = await usersService.createList(user, defaultList)
        console.log(newListResponse)
        setList(newListResponse)
    }

    const updateDefaultList = async (newListResponse) => {
            const updatedList = {...newListResponse,  
            items: [newListResponse.items, newMovie]  
        };

        const updatedListResponse = await usersService.updateList(user, newListResponse._id, { updatedList });
        console.log(updatedListResponse)
        setList(updatedListResponse);
    }


    return (
        <li className={styles.movie}>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} className={styles.moviePoster}></img>
            <p className={styles.movieTitle}>{movie.title}</p>
            {movieAdded ? (<button className={styles.addToLib}>✔️</button>)
                :
                (<button onClick={addToLibrary} className={styles.addToLib}>Add to Library</button>)}
            <button onClick={createDefaultList}>Create a 'To Watch' list</button>
        </li>
    )
}



