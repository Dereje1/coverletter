import express, { Request, Response } from 'express';
import generateDraftLetter from './generateLetter.ts';
import dotenv from 'dotenv';
import { inputTypes } from './interfaces.ts';

dotenv.config();
const app = express();
app.use(express.json());

app.post('/api', async (request: Request, response: Response) => {
  const { resume, description, prompt }: inputTypes = request.body
  const generatedLetter = await generateDraftLetter({ resume, description, prompt })
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