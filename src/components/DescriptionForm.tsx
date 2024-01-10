import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
export default function DescriptionForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Paste Job Description
      </Typography>
      <TextField
        required
        id="description"
        name="description"
        label="Description"
        fullWidth
        variant="outlined"
        multiline
        minRows={15}
      />
    </React.Fragment>
  );
}
