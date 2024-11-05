import {DialogActions, DialogContent, DialogContentText} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ErrorModal = (props) => {
	const {errorModalOpen, setErrorModalOpen, message, error} = props

	return (
		<Dialog onClose={setErrorModalOpen(false)} open={errorModalOpen}>
			<DialogTitle>Oh dip!</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Something went wrong... {message} If you want the techy bits you can
					have a look below:
				</DialogContentText>
				<Accordion>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} />
					Error:
					<AccordionDetails>{error}</AccordionDetails>
				</Accordion>
            </DialogContent>
            <DialogActions>
                <button onClick={setErrorModalOpen(false)}>Ok</button>
            </DialogActions>
		</Dialog>
	)
}

export default ErrorModal