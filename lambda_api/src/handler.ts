import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { inputTypes } from './interfaces';
import generateDraftLetter from './generateLetter';

const responseUtil = (response: { [key: string]: string | null | undefined | unknown }, statusCode: number) => (
  {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Headers": "Content-Type", // Allow specific headers
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET", // Allow specific methods
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      response,
      null,
      2
    ),
  }
)



export const index = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { resume, description, prompt, api_key }: inputTypes = JSON.parse(event.body || '{}');
    // Start measuring time for the OpenAI API call
    const start = new Date().getTime();
    const response = await generateDraftLetter({ resume, description, prompt, api_key })
    // Measure time taken for the OpenAI API call
    const end = new Date().getTime();
    console.log(`OpenAI API call took ${end - start} ms`);
    return responseUtil(response, 200);

  } catch (err) {
    console.log(err);
    return responseUtil({ error: 'An error happened in the lambda handler' }, 500)
  }
};
