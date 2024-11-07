import EmojiConvertor from 'emoji-js'

const emoji = new EmojiConvertor()
//* help to convert emoji shortcodes like :books: into their respective emoji characters

emoji.init_env()
//* helps to prepare the emoji instance to start converting shortcodes. basically to Initialize it

//* emoji.replace_colons(':books:')
//*Looks for :books: and replaces it with the actual bookshelf emoji

const LandingPage = () => {
	return (
		<>
			<h1>Welcome to ShelfSpace! {emoji.replace_colons(':books:')}</h1>
			<p>
				Let's make your movie experience better!{' '}
				{emoji.replace_colons(':rocket:')}
			</p>
			<p>
				Your personal movie community awaits. {emoji.replace_colons(':star:')}
			</p>
			<p>
				Discover new movies, create personalized watch lists, and share your
				reviews with others! {emoji.replace_colons(':clapper:')}
			</p>
			<p>
				Join the community and make your movie experience even better!{' '}
				{emoji.replace_colons(':tada:')}
			</p>
		</>
	)
}

export default LandingPage
