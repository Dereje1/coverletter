import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DeleteIcon from '@mui/icons-material/Delete';

interface APIKeyDialogProps {
    handleClose: () => void
    open: boolean
}

type api_keys = {
    key: string
    isActive: boolean
    id: number
}

const getFromLocalStorage = () => {
    const inLocalStorage = localStorage.getItem('api_keys');
    if (inLocalStorage) {
        const keys = JSON.parse(inLocalStorage);
        return keys;
    }
    return []
}

const saveToLocalStorage = (api_key: api_keys) => {
    const inLocalStorage = getFromLocalStorage();
    localStorage.setItem('api_keys', JSON.stringify([...inLocalStorage, api_key]))
    updateLocalStorage(api_key.id)
}

const removeFromLocalStorage = (api_key: api_keys) => {
    const inLocalStorage = getFromLocalStorage();
    const updatedKeys = inLocalStorage.filter((a: api_keys) => a.id !== api_key.id)
    localStorage.setItem('api_keys', JSON.stringify(updatedKeys))
}

// makes api key active
const updateLocalStorage = (api_key_id: number) => {
    const inLocalStorage = getFromLocalStorage();
    const updatedKeys = inLocalStorage.map((a: api_keys) => ({
        ...a,
        isActive: a.id === api_key_id
    }))
    localStorage.setItem('api_keys', JSON.stringify(updatedKeys))
}

const localStorageKeysInitial: api_keys[] = []

export default function APIKeyDialog({ open, handleClose }: APIKeyDialogProps) {
    const [api_key, setapi_key] = useState('');
    const [stored_api_keys, setStored_api_keys] = useState(localStorageKeysInitial);

    useEffect(() => {
        setStored_api_keys(getFromLocalStorage());
    }, [])

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Manage OpenAI API keys</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 350, height: 40, alignItems: 'center' }}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="API Key"
                            label="Add API Key"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setapi_key(e.target.value)}
                            value={api_key}
                        />
                        <IconButton
                            onClick={() => {
                                saveToLocalStorage({ key: api_key, isActive: false, id: Date.now() })
                                setStored_api_keys(getFromLocalStorage());
                                setapi_key('')
                            }}
                            color='success'
                            disabled={!api_key.trim().length}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Box>
                    <br />
                    {
                        Boolean(stored_api_keys.length) &&
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Stored Keys</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={() => stored_api_keys.filter(a => a.isActive)[0].id}
                                name="radio-buttons-group"
                            >
                                {
                                    stored_api_keys.map(api_key => {
                                        return (
                                            <Box key={api_key.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <FormControlLabel
                                                    value={api_key.id}
                                                    control={
                                                        <Radio
                                                            onClick={() => {
                                                                updateLocalStorage(api_key.id)
                                                                setStored_api_keys(getFromLocalStorage());
                                                            }}
                                                            checked={api_key.isActive}
                                                        />
                                                    }
                                                    label={api_key.key} />
                                                <IconButton
                                                    onClick={() => {
                                                        removeFromLocalStorage(api_key)
                                                        setStored_api_keys(getFromLocalStorage());
                                                    }}
                                                    color='error'
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    }

                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
