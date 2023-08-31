const axios = require("axios");
const variable = require("../variables");

async function getChatGptResponse(age, question) {
  try {
    const promptString = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Generate answer for ${question} for ${age} years old. no need to show years old shoe only question answer`,
        },
      ],
    });

    const response = await axios.post(variable.apiURL, promptString, {
      headers: {
        Authorization: `Bearer ${variable.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    console.log("-------------------data--------------", response.data);

    // Extracting the content from the response
    let content = response.data.choices[0].message.content;

    // Replacing \n\n with new lines
    content = content.replace(/\n\n/g, "\n");

    return content;
  } catch (error) {
    console.error("Error fetching response from the API:", error.message);
    return null;
  }
}

exports.generateAgeBasedAns = async ctx => {
  try {
    const { age, question } = ctx.request.body;
    const content = await getChatGptResponse(question, age);

    ctx.body = { response: content };
  } catch (error) {
    console.error("Error generating ans:", error.message);
    ctx.status = 500;
    ctx.body = { error: "An error occurred while generating ans." };
  }
};
