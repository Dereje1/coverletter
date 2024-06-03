import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { inputTypes } from './interfaces';
import generateDraftLetter from './generateLetter';

const responseUtil = (letter: string | null, statusCode: number) => (
  {
    statusCode,
    headers: {
      "x-custom-header": "my custom header value",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(
      {
        letter,
      },
      null,
      2
    ),
  }
)



export const index = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const { resume, description, prompt, api_key }: inputTypes  = JSON.parse(event.body || '{}');
      const letter = await generateDraftLetter({ resume, description, prompt, api_key })
      return responseUtil(letter, 200)

    } catch (err) {
        console.log(err);
        return responseUtil('some error happened', 500)
    }
};
