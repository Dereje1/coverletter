import express, { Request, Response } from 'express';
import generateDraftLetter from './generateLetter.js'; // <-- strange node-ts unable to run with the ts extension ??? investigate
import dotenv from 'dotenv';
import { inputTypes } from './interfaces';

dotenv.config();
const app = express();
app.use(express.json());

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});