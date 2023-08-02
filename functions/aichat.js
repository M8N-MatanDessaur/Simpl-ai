const axios = require('axios');

let conversationHistory = [];

exports.handler = async function(event, context) {
  try {
    // Extract the user's message from the event
    const userInput = event.queryStringParameters.input;
    
    // Add the user's message to the conversation history
    conversationHistory.push({role: 'user', content: userInput});
    
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        messages: conversationHistory,
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    const data = response.data;

    if (data && data.choices && data.choices.length > 0) {
      const aiResponse = data.choices[0].message.content;
      
      // Add the AI's response to the conversation history
      conversationHistory.push({role: 'assistant', content: aiResponse});
      
      return {
        statusCode: 200,
        body: JSON.stringify({ output: aiResponse }),
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
