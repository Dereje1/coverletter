import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function Review() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width:'50%', marginRight: 2 }}>
        <Typography variant="h6" gutterBottom textAlign={'center'}>
          Resume
        </Typography>
        <TextField
          id="resume-review"
          name="resume-review"
          fullWidth
          variant="filled"
          multiline
          minRows={15}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width:'50%' }}>
        <Typography variant="h6" gutterBottom textAlign={'center'}>
          Description
        </Typography>
        <TextField
          id="description-review"
          name="description-review"
          fullWidth
          variant="filled"
          multiline
          minRows={15}
        />
      </div>
    </div>
  );
}
