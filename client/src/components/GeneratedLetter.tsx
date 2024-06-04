import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface GeneratedLetterProps {
    resume: string
    description: string
    activePrompt: string
    activeKey: string | null
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

export default function GeneratedLetter({ resume, description, activePrompt, activeKey }: GeneratedLetterProps) {
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
            <IconButton aria-label="save" color='primary' onClick={() => downloadDocument(letter)}>
                <DownloadIcon />
            </IconButton>
            <IconButton aria-label="save" color='success' onClick={() => copyToClipboard(letter)}>
                <ContentCopyIcon />
            </IconButton>
            <Paper elevation={3} sx={{ padding: 2, whiteSpace: 'pre-wrap' }}>{letter}</Paper>
        </>
    );
}
