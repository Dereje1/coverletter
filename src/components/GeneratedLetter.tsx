import { useEffect, useState } from 'react';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';


interface GeneratedLetterProps {
    resume: string
    description: string
  }

export default function GeneratedLetter({ resume, description }: GeneratedLetterProps) {
    const [letter, setLetter] = useState(null)

    const getGeneratedData = async () => {
        const { data } = await axios.post('/api', { resume, description })
        setLetter(data.letter)
    }

    useEffect(() => {
        getGeneratedData()
    }, [])

    if (!letter) return <LinearProgress color="secondary" variant="indeterminate" />;
    return (
        <>
            <Paper elevation={3} sx={{padding: 2, whiteSpace: 'pre-wrap'}}>{letter}</Paper>
        </>
    );
}
