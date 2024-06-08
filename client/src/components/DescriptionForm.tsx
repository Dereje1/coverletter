import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface DescriptionFormProps {
  updateDescription: (d: string) => void
  description: string
}

export default function DescriptionForm({ updateDescription, description }: DescriptionFormProps) {
  return (
    <Box sx={{
      pt: 2,
      pb: 2,
      mt: 5
    }}>
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
    </Box>
  );
}
