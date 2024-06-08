import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface ReviewProps {
  resume: string
  description: string
}

export default function Review({ resume, description }: ReviewProps) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: {
        xs: 'column',
        sm: 'row'
      }
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: { xs: '100%', sm: '50%' },
        marginRight: 2
      }}>
        <Typography
          gutterBottom
          sx={{
            fontSize: { xs: 15, sm: 25 },
            fontStyle:'italic',
            textAlign: { xs: 'left', sm: 'center' },
          }}
        >
          Resume
        </Typography>
        <TextField
          id="resume-review"
          name="resume-review"
          fullWidth
          variant="filled"
          multiline
          minRows={15}
          maxRows={15}
          value={resume}
        />
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: { xs: '100%', sm: '50%' },
        marginRight: 2
      }}>
        <Typography
          gutterBottom
          sx={{
            fontSize: { xs: 15, sm: 25 },
            fontStyle:'italic',
            textAlign: { xs: 'left', sm: 'center' },
            mt: { xs: 2, sm: 0 }
          }}
        >
          Description
        </Typography>
        <TextField
          id="description-review"
          name="description-review"
          fullWidth
          variant="filled"
          multiline
          minRows={15}
          maxRows={15}
          value={description}
        />
      </Box>
    </Box>
  );
}
