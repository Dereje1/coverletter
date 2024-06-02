# Cover Letter Generator

## Overview
This project is a cover letter generator leveraging OpenAI's API. It's designed to assist job seekers in creating unique and professional cover letters with ease.

## Installation

### Prerequisites
| Prerequisite                                | Version |
| ------------------------------------------- | ------- |
| Node.js /  npm (comes with Node)  | `~ ^18.3.0` / `~^8.19.3` |
| Git | `~ ^2` |

This project also requires an [OpenAI API key](https://platform.openai.com/docs/quickstart/step-2-setup-your-api-key). Please note that the application currently runs locally.

### Steps
1. Clone the repository: `git clone https://github.com/Dereje1/coverletter.git`
2. Navigate to the project directory: `cd coverletter`
3. Install the required packages: `npm install`
4. Create a `.env` file in the root of the project and add the following content: `OPENAI_API_KEY='your-api-key'`
5. Run the app: `npm run dev`

## Usage
After starting the application, follow the provided steps to input your resume, job description, and the type of prompt you want to use. The application will then generate a personalized cover letter based on your input.

### API Key Management
Users can now save several OpenAI API keys in their browser's local storage and send them to the backend. You also have the option to save your API keys in a `.env` file. The backend does not persist your API keys; it only uses them to send requests to OpenAI.

### Resume Management
You can save your resumes in the local storage for future use, allowing you to manage and reuse multiple resumes easily. 

### Generating and Using Cover Letters
Once your cover letter is generated, you can copy it directly to your clipboard with a single click, making it easy to paste and share your cover letter. Additionally, you can download your generated cover letter as a clean PDF file, which is useful for saving, printing, or emailing the cover letter as an attachment.

## Contributing
Contributions are welcome! Please ensure to read the contributing guidelines before making any changes.

## License
This project is licensed under the terms of the MIT license.
