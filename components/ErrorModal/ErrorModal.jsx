import {DialogActions, DialogContent, DialogContentText} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

const ErrorModal = (props) => {
	const {errorModalOpen, setErrorModalOpen, message} = props

	return (
		<Dialog onClose={() => setErrorModalOpen(false)} open={errorModalOpen}>
			<DialogTitle>{'Uh oh!'}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Something went wrong. You can find the exact error message below:
					<br />
					{`${message}`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<button onClick={() => setErrorModalOpen(false)}>Ok</button>
			</DialogActions>
		</Dialog>
	)
}

export default ErrorModal
