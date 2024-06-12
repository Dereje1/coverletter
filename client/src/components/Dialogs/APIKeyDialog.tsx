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
import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from '../../utils/localstorage';
import { encryptApiKey, maskApiKey } from '../../utils/encryption';

interface APIKeyDialogProps {
    handleClose: () => void
    open: boolean
    updateActiveKey: () => void
}

type api_keys = {
    key: string
    isActive: boolean
    id: number
    encryptedKey: string
}

// makes api key active
const updateLocalStorage = (api_key_id: number, isActive: boolean) => {
    const inLocalStorage = getFromLocalStorage('api_keys');
    const updatedKeys = inLocalStorage.map((a: api_keys) => ({
        ...a,
        isActive: a.id === api_key_id && !isActive
    }))
    localStorage.setItem('api_keys', JSON.stringify(updatedKeys))
}

const localStorageKeysInitial: api_keys[] = []

export default function APIKeyDialog({ open, handleClose, updateActiveKey }: APIKeyDialogProps) {
    const [api_key, setapi_key] = useState('');
    const [stored_api_keys, setStored_api_keys] = useState(localStorageKeysInitial);

    useEffect(() => {
        setStored_api_keys(getFromLocalStorage('api_keys'));
    }, [])

    const getActiveKey = () => {
        const active = stored_api_keys.filter(a => a.isActive)
        return active.length ? active[0].id : null
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Manage OpenAI API keys</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', height: 50, alignItems: 'flex-end' }}>
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
                                const id = Date.now()
                                saveToLocalStorage('api_keys',
                                    {
                                        key: maskApiKey(api_key),
                                        isActive: false,
                                        id,
                                        encryptedKey: encryptApiKey(api_key)
                                    }
                                )
                                updateLocalStorage(id, false)
                                setStored_api_keys(getFromLocalStorage('api_keys'));
                                setapi_key('')
                                updateActiveKey()
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
                                defaultValue={getActiveKey}
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
                                                                updateLocalStorage(api_key.id, api_key.isActive)
                                                                setStored_api_keys(getFromLocalStorage('api_keys'));
                                                                updateActiveKey();
                                                            }}
                                                            checked={api_key.isActive}
                                                        />
                                                    }
                                                    label={api_key.key} />
                                                <IconButton
                                                    onClick={() => {
                                                        removeFromLocalStorage('api_keys', api_key)
                                                        setStored_api_keys(getFromLocalStorage('api_keys'));
                                                        updateActiveKey()
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
