const axios = require("axios");
const variable = require("../variables");

async function getChatGptResponse(prompt) {
  try {
    const promptString = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `write a e-commerc description in 20words like this ${prompt}`,
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
    const content = response.data.choices[0].message.content;
    return content;
  } catch (error) {
    console.error("Error fetching response from the API:", error.message);
    return null;
  }
}

exports.generateDescription = async ctx => {
  try {
    const { description } = ctx.request.body;
    const response = await getChatGptResponse(description);
    console.log(response);
    ctx.body = { response };
  } catch (error) {
    console.error("Error generating description:", error);
  }
};
