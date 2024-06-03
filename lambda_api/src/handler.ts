import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const responseUtil = (message: string, statusCode: number) => (
  {
    statusCode,
    headers: {
      "x-custom-header": "my custom header value",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(
      {
        message,
      },
      null,
      2
    ),
  }
)



const url = 'https://api.github.com/users/Dereje1';
export const index = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // fetch is available with Node.js 18
        console.log(event)
        const res = await fetch(url);
        const message = await res.json();
        return responseUtil(message, res.status)

    } catch (err) {
        console.log(err);
        return responseUtil('some error happened', 500)
    }
};
