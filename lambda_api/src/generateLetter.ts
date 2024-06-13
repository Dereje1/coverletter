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

        return {
            letter: draftObject.message?.content
        };
    } catch (error: any) {
        console.log(`Error generating draft letter: ${JSON.stringify(error)}`)
        return { error: error.message }
    }
};


export default generateDraftLetter;