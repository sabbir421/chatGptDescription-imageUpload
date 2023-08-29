const axios = require("axios");
const variable = require("../variables");

async function generateDescription(prompt) {
  try {
    const promptString = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `generate a short description for ${prompt} years old`,
        },
      ],
    });

    const response = await axios.post(variable.apiURL, promptString, {
      headers: {
        Authorization: `Bearer ${variable.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const content = response.data.choices[0]?.message?.content;
    return content;
  } catch (error) {
    console.error("Error fetching response from the API:", error.message);
    return null;
  }
}

exports.generateDescriptionForAge = async ctx => {
  try {
    const { age } = ctx.request.body;
    const content = await generateDescription(age);
    ctx.body = { response: content };
  } catch (error) {
    console.error("Error generating description:", error);
  }
};
