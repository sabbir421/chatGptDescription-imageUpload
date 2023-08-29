const axios = require("axios");
const variable = require("../variables");

async function getChatGptResponse(NumberOfQuestions, Domain, Subject, Topic) {
  try {
    const format = {
      question: "question title",
      options: {
        A: "Option 1",
        B: "Option 2",
        C: "Option 3",
        D: "Option 4",
      },
      correctLabel: "", // Placeholder for the correct answer label (A, B, C, D)
    };

    const promptString = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Generate ${NumberOfQuestions} MCQ questions with options and correct answers for ${Domain} of ${Subject} about ${Topic}. Please provide the response in this format: ${JSON.stringify(
            format
          )}`,
        },
      ],
    });
    console.log(
      "================+++++++++++",
      variable.apiKey,
      variable.apiURL
    );
    const response = await axios.post(variable.apiURL, promptString, {
      headers: {
        Authorization: `Bearer ${variable.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const responseData = JSON.parse(response.data.choices[0]?.message?.content);
    return responseData; // Return the parsed response data object
  } catch (error) {
    console.error("Error fetching response from the API:", error.message);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

exports.generateMcq = async ctx => {
  try {
    const { NumberOfQuestions, Domain, Subject, Topic } = ctx.request.body;
    const data = await getChatGptResponse(
      NumberOfQuestions,
      Domain,
      Subject,
      Topic
    );

    // Find the correct option text based on the correctLabel and assign it to correctAns
    data.correctAns = data.correctLabel;

    // Remove the correctLabel field from the data
    delete data.correctLabel;

    ctx.body = { response: data };
  } catch (error) {
    console.error("Error generating description:", error.message);
    ctx.status = 500; // Set an appropriate error status code
    ctx.body = { error: "An error occurred while generating MCQ questions." };
  }
};
