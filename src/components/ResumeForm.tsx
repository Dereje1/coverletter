import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function ResumeForm() {
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
      />
    </React.Fragment>
  );
}
