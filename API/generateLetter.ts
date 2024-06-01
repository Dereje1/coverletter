import OpenAI from 'openai';
import { inputTypes } from './interfaces';

const getContent = ({ resume, description, prompt }: inputTypes) => {
    const PromptObj: {
        [key: string]: string;
    } = {
        prompt1: `Given the following resume: ${resume} and this job description: ${description}, generate a professional and impactful cover letter that highlights relevant skills and experiences.`,
        prompt2: `Based on the resume: ${resume} and the job description: ${description}, create a compelling cover letter that demonstrates the candidate's fit for the role.`,
        prompt3: `Considering the provided resume: ${resume} and the job description: ${description}, draft a persuasive cover letter that showcases the candidate's qualifications and enthusiasm for the position.`,
        prompt4: `With the resume: ${resume} and the job description: ${description} in mind, write a convincing cover letter that effectively markets the candidate's abilities and suitability for the job.`
    }
    return PromptObj[prompt];
}

const generateDraftLetter = async ({ resume, description, prompt }: inputTypes) => {
    try {
        if (!description.trim().length || !resume.length) {
            throw new Error(`Missing Resume or Description !!`);
        }
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const draftResponse = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{
                role: 'user',
                content: getContent({ resume, description, prompt }),
            }],
            max_tokens: 800,
        });

        const [draftObject] = draftResponse.choices;

        return draftObject.message?.content;
    } catch (error) {
        return `Error Generating Draft: ${error}`;
    }
};


export default generateDraftLetter;
/* Prompt samples and corresponding intentions

1. **Prompt 1**:
```javascript
`Given the following resume: ${resume} and this job description: ${jobDescription}, generate a professional and impactful cover letter that highlights relevant skills and experiences.`
```

2. **Prompt 2**:
```javascript
`Based on the resume: ${resume} and the job description: ${jobDescription}, create a compelling cover letter that demonstrates the candidate's fit for the role.`
```

3. **Prompt 3**:
```javascript
`Considering the provided resume: ${resume} and the job description: ${jobDescription}, draft a persuasive cover letter that showcases the candidate's qualifications and enthusiasm for the position.`
```

4. **Prompt 4**:
```javascript
`With the resume: ${resume} and the job description: ${jobDescription} in mind, write a convincing cover letter that effectively markets the candidate's abilities and suitability for the job.`
```

Remember, the quality of the generated cover letter will depend on the details provided in the `resume` and `jobDescription` variables. The more specific and detailed they are, the better the generated cover letter will be. Good luck with your project! 😊

***************

Prompt types and meanings

1. **Prompt 1**: This prompt focuses on generating a professional cover letter that highlights relevant skills and experiences. It's a good choice if you want a more formal and straightforward cover letter.

2. **Prompt 2**: This prompt aims to create a compelling cover letter that demonstrates the candidate's fit for the role. It's suitable if you want to emphasize how well the candidate matches the job requirements.

3. **Prompt 3**: This prompt drafts a persuasive cover letter that showcases the candidate's qualifications and enthusiasm for the position. It's ideal if you want to convey passion and excitement about the job opportunity.

4. **Prompt 4**: This prompt writes a convincing cover letter that effectively markets the candidate's abilities and suitability for the job. It's perfect if you want a more sales-oriented approach, selling the candidate's skills and experiences.

Remember, there's no right or wrong choice here. You can even try all of them and see which output you prefer. Good luck with your project! 😊

*/