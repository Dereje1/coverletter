import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

interface ResumeFormProps {
  updateResume: (r: string) => void
  resume: string
}

export default function ResumeForm({ updateResume, resume }: ResumeFormProps) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Paste Resume
      </Typography>
      <TextField
        required
        id="resume"
        name="resume"
        label="Resume"
        fullWidth
        variant="outlined"
        multiline
        minRows={15}
        maxRows={15}
        onChange={(e) => updateResume(e.target.value)}
        value={resume}
      />
    </React.Fragment>
  );
}
