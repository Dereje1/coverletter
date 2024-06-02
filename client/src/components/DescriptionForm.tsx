import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

interface DescriptionFormProps {
  updateDescription: (d: string) => void
  description: string
}

export default function DescriptionForm({ updateDescription, description }: DescriptionFormProps) {
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
        maxRows={15}
        onChange={(e) => updateDescription(e.target.value)}
        value={description}
      />
    </React.Fragment>
  );
}
