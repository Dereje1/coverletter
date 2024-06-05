import React, { useState, useEffect } from 'react';
import FormDialog from './Dialogs/FormDialog';
import WarningDialog from './Dialogs/WarningDialog';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from '../utils/localstorage';

interface ResumeFormProps {
  updateResume: (r: string) => void
  resume: string
}

type localResume = {
  name: string
  resume: string
  id: number
}

const warningDialogInitial: localResume | null = null
const localStorageResumesInitial: localResume[] = []

export default function ResumeForm({ updateResume, resume }: ResumeFormProps) {
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [localStorageResumes, setLocalStorageResumes] = useState(localStorageResumesInitial);
  const [activeResumeId, setActiveResumeId] = useState(0)
  const [warningDialogContents, setWarningDialogContents] = useState(warningDialogInitial);

  useEffect(() => {
    setLocalStorageResumes(getFromLocalStorage('resumes'));
  }, [])


  return (
    <React.Fragment>
      <FormDialog
        open={openFormDialog}
        handleClose={() => setOpenFormDialog(false)}
        saveResume={(resumeName) => {
          saveToLocalStorage('resumes', {
            name: resumeName,
            resume,
            id: Date.now()
          })
          setOpenFormDialog(false)
          setLocalStorageResumes(getFromLocalStorage('resumes'));
        }}
      />
      <WarningDialog
        open={Boolean(warningDialogContents)}
        handleClose={() => setWarningDialogContents(null)}
        deleteResume={() => {
          if (warningDialogContents) {
            removeFromLocalStorage('resumes', warningDialogContents)
          }
          setLocalStorageResumes(getFromLocalStorage('resumes'))
          setWarningDialogContents(null)
        }}
        localResume={warningDialogContents}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Stack direction="row" spacing={1} sx={{ marginRight: 3 }}>
          {
            localStorageResumes.map((r: localResume) => {
              return (
                <Chip
                  label={r.name}
                  onDelete={() => {
                    setWarningDialogContents(r)
                  }}
                  onClick={() => {
                    updateResume(r.resume)
                    setActiveResumeId(r.id)
                  }}
                  key={r.id}
                  color='primary'
                  variant={activeResumeId === r.id ? 'filled' : 'outlined'}
                />
              )
            })
          }
        </Stack>
        <IconButton
          aria-label="clear"
          color='error' disabled={!resume.length}
          onClick={() => { updateResume(''); setActiveResumeId(0) }}
        >
          <NotInterestedIcon />
        </IconButton>
        <IconButton aria-label="save" color='primary' disabled={!resume.length} onClick={() => setOpenFormDialog(true)}>
          <SaveOutlinedIcon />
        </IconButton>
      </div>

      <TextField
        required
        id="resume"
        name="resume"
        label="Paste your resume here"
        fullWidth
        variant="outlined"
        multiline
        minRows={15}
        maxRows={15}
        onChange={(e) => { updateResume(e.target.value); setActiveResumeId(0) }}
        value={resume}
      />
    </React.Fragment>
  );
}
