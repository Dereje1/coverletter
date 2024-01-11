import express, { Request, Response } from 'express';
import generateDraftLetter from './generateLetter.ts';
import dotenv from 'dotenv';
interface inputTypes {
  resume: string
  description: string
}

dotenv.config();
const app = express();
app.use(express.json());

app.post('/api', async (request: Request, response: Response) => {
  const { resume, description }: inputTypes = request.body
  const generatedLetter = await generateDraftLetter({ resume, description })
  response.json({
    resume,
    description,
    letter: generatedLetter
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});