const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    const conversationHistory = event.queryStringParameters.history; // get conversation history from request parameters
    const userInput = event.queryStringParameters.input; // get user input from request parameters";
    const prompt = `${conversationHistory}\nUser: ${userInput}\nAI:`; // format the prompt including conversation history and user input

    const response = await axios.post("https://api.openai.com/v1/engines/text-davinci-003/completions", 
      {
        prompt: prompt,
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const data = response.data;

    if (data && data.choices && data.choices.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ output: " "+data.choices[0].text.trim() }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ output: `Oh oh ... Something happened, try again` }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred" }),
    };
  }
};
