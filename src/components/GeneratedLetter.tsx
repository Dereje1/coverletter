import { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';


export default function GeneratedLetter() {
    const [letter, setLetter] = useState(null)

    const getGeneratedData = async () => {
        const {data} = await axios.get('/api')
        setLetter(data.letter)
    }

    useEffect(() => {
        getGeneratedData()
    }, [])

    if(!letter) return null;
    return (
        <>
            <Typography variant="subtitle1">{letter}</Typography>
        </>
    );
}
