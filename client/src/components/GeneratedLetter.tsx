import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import RefreshIcon from '@mui/icons-material/Refresh';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface GeneratedLetterProps {
    resume: string
    description: string
    activePrompt: string
    activeKey: string | null
    editInputs: () => void
    refresh: () => void
}

const downloadDocument = (letter: string) => {
    // Instantiate jsPDF instance
    const doc = new jsPDF();
    doc.setFontSize(12)

    // Split the text into lines so it fits within a certain width
    const lines = doc.splitTextToSize(letter, 180); // 180 is the max width
    // Add text to the PDF
    doc.text(lines, 10, 10); // The numbers 10, 10 specify the x and y coordinates for where the text should start

    // Save the PDF
    doc.save("cover_letter.pdf");
};

const copyToClipboard = (letter: string) => {
    // Copy text to clipboard
    navigator.clipboard.writeText(letter)
        .then(() => alert('Text copied to clipboard'))
        .catch(err => console.error('Could not copy text: ', err));
};

export default function GeneratedLetter({
    resume,
    description, 
    activePrompt, 
    activeKey,
    editInputs, 
    refresh
}: GeneratedLetterProps) {
    const [letter, setLetter] = useState(null)

    const getGeneratedData = async () => {
        const { data } = await axios.post(API_BASE_URL, { resume, description, prompt: activePrompt, api_key: activeKey })
        setLetter(data.letter)
    }

    useEffect(() => {
        getGeneratedData()
    }, [])

    if (!letter) return <LinearProgress color="secondary" variant="indeterminate" />;
    return (
        <>
            <Tooltip title="Download" placement='top'>
                <IconButton aria-label="save" color='primary' onClick={() => downloadDocument(letter)}>
                    <DownloadIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Copy to clipboard" placement='top'>
                <IconButton aria-label="save" color='primary' onClick={() => copyToClipboard(letter)}>
                    <ContentCopyIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Edit inputs" placement='top'>
                <IconButton aria-label="save" color='success' onClick={editInputs}>
                    <EditIcon />
                </IconButton>
            </Tooltip>


            <Tooltip title="Reset all" placement='top'>
                <IconButton aria-label="save" color='error' onClick={refresh}>
                    <RefreshIcon />
                </IconButton>
            </Tooltip>

            <Paper elevation={3} sx={{ padding: 2, whiteSpace: 'pre-wrap' }}>{letter}</Paper>
        </>
    );
}
