import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface WarningiDialogProps {
    handleClose: () => void
    open: boolean
    deleteResume: () => void
    localResume: {
        name: string
        resume: string
        id: number
    } | null
}

export default function FormDialog({ open, handleClose, deleteResume, localResume }: WarningiDialogProps) {
    if(!open) return null;
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: { width: 250 }
                }}
            >
                <DialogTitle>{`Delete '${localResume?.name}' from local storage?`}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteResume}>Delete</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
