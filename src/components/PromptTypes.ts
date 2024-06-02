type PromptObjectType = {
    [key: string]: { name: string; description: string; };
};

const PromptObj: PromptObjectType = {
    prompt1: {
        name: "Professional and Impactful",
        description: "This prompt focuses on generating a professional cover letter that highlights relevant skills and experiences. It's a good choice if you want a more formal and straightforward cover letter.",
    },
    prompt2: {
        name: "Compelling",
        description: "This prompt aims to create a compelling cover letter that demonstrates the candidate's fit for the role. It's suitable if you want to emphasize how well the candidate matches the job requirements.",
    },
    prompt3: {
        name: "Persuasive",
        description: "This prompt drafts a persuasive cover letter that showcases the candidate's qualifications and enthusiasm for the position. It's ideal if you want to convey passion and excitement about the job opportunity.",
    },
    prompt4: {
        name: "Convincing",
        description: "This prompt writes a convincing cover letter that effectively markets the candidate's abilities and suitability for the job. It's perfect if you want a more sales-oriented approach, selling the candidate's skills and experiences.",
    }
}

export default PromptObj;