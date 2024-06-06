import OpenAI from 'openai';
import crypto from 'crypto';
import { inputTypes } from './interfaces';

const decryptApiKey = (encryptedApiKey: string | null): string | null => {
    const privateKey = process.env.PRIVATE_KEY ? crypto.createPrivateKey(process.env.PRIVATE_KEY) : null;
    if (!privateKey || !encryptedApiKey) return null;
    const buffer = Buffer.from(encryptedApiKey, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf-8');
};

const getapiKey = (api_key: string | null) => {
    // use client api key first... if not available use env file
    const clientApiKey = decryptApiKey(api_key);
    if (clientApiKey) return clientApiKey
    if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY
    return null;
}

const getContent = ({ resume, description, prompt, }: Omit<inputTypes, 'api_key'>) => {
    const PromptObj: {
        [key: string]: string;
    } = {
        prompt1: `Using the following resume: ${resume} and the job description: ${description}, generate a professional and impactful cover letter that highlights the most relevant skills and experiences. Ensure the letter is well-structured, engaging, and tailored to the job requirements. Please return the response in plain text without any markdown formatting.`,
        prompt2: `Based on the provided resume: ${resume} and the job description: ${description}, create a compelling cover letter that clearly demonstrates the candidate's strong fit for the role. Highlight key achievements and qualifications that align with the job's needs, and convey enthusiasm for the opportunity. Please return the response in plain text without any markdown formatting.`,
        prompt3: `Given the resume: ${resume} and the job description: ${description}, draft a persuasive cover letter that effectively showcases the candidate's qualifications and genuine enthusiasm for the position. Focus on specific accomplishments and experiences that make the candidate an ideal fit for the role. Please return the response in plain text without any markdown formatting.`,
        prompt4: `Taking into account the resume: ${resume} and the job description: ${description}, write a convincing cover letter that markets the candidate's abilities and suitability for the job. Highlight the most relevant experiences and skills, and explain why the candidate is uniquely qualified for the position. Please return the response in plain text without any markdown formatting.`
    };
    return PromptObj[prompt];
}

const generateDraftLetter = async ({ resume, description, prompt, api_key }: inputTypes) => {
    try {
        if (!description.trim().length || !resume.length) {
            throw new Error(`Missing Resume or Description !!`);
        }

        const apiKey = getapiKey(api_key);

        if (!apiKey) {
            throw new Error(`Missing API key!!`);
        }

        const openai = new OpenAI({ apiKey });

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