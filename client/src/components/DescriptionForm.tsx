import * as React from 'react';
import TextField from '@mui/material/TextField';

interface DescriptionFormProps {
  updateDescription: (d: string) => void
  description: string
}

export default function DescriptionForm({ updateDescription, description }: DescriptionFormProps) {
  return (
    <React.Fragment>
      <TextField
        required
        id="description"
        name="description"
        label="Paste the job description here"
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
