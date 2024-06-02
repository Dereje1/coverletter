import express, { Request, Response } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import generateDraftLetter from './generateLetter.js'; // <-- strange node-ts unable to run with the ts extension ??? investigate
import dotenv from 'dotenv';
import { inputTypes } from './interfaces';

dotenv.config();
const port = process.env.PORT || '3000'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.post('/api', async (request: Request, response: Response) => {
  const { resume, description, prompt, api_key }: inputTypes = request.body
  const generatedLetter = await generateDraftLetter({ resume, description, prompt, api_key })
  response.json({
    resume,
    description,
    prompt,
    letter: generatedLetter
  });
});

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});