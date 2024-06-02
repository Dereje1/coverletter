import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import PromptObj from './PromptTypes';

interface PromptPickerProps {
    setActivePrompt: (d: string) => void
    activePrompt: string
  }

export default function PromptPicker({activePrompt, setActivePrompt}: PromptPickerProps) {
    return (
        <Grid container spacing={3}>
            {
                Object.keys(PromptObj).map(prompt => {
                    return (
                        <Grid item xs={12} sm={6} key={prompt}>
                            <Card sx={{ 
                                maxWidth: 345, 
                                background: prompt === activePrompt ? '#1976d2' : 'white', 
                                color: prompt === activePrompt ? 'white' : 'black',
                                height: 197 
                                }}>
                                <CardActionArea onClick={()=>setActivePrompt(prompt)}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {PromptObj[prompt].name}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            {PromptObj[prompt].description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}

