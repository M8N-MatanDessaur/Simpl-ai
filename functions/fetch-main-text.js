const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    const response = await axios.post("https://api.openai.com/v1/engines/text-davinci-003/completions", 
      {
        prompt: `respond to the user input. Return only the response text. The input is ${event.queryStringParameters.input}}`,
        temperature: 0.7,
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
