import EmojiConvertor from 'emoji-js'
import styles from './LandingPage.module.css'

const emoji = new EmojiConvertor()
//* help to convert emoji shortcodes like :books: into their respective emoji characters

emoji.init_env()
//* helps to prepare the emoji instance to start converting shortcodes. This step is required to call first to initialize emoji 

//* emoji.replace_colons(':books:')
//*Looks for :books: and replaces it with the actual bookshelf emoji

const LandingPage = () => {
	return (
		<>
			<h1 className={styles.title}>Welcome to ShelfSpace! {emoji.replace_colons(':books:')}</h1>
			<div className={styles.pTag}>
			<p>
				Let's make your movie experience better!{' '}
				{emoji.replace_colons(':rocket:')}
			</p>
			<p>
				Your personal movie community awaits. {emoji.replace_colons(':star:')}
			</p>
			<p>
				Discover new movies, create personalised watch lists, and share your
				reviews with others! {emoji.replace_colons(':clapper:')}
			</p>
			<p>
				Join the community and make your movie experience even better!{' '}
				{emoji.replace_colons(':tada:')}
			</p>
			</div>
		</>
	)
}

export default LandingPage
