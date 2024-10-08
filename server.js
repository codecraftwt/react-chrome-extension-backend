const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Replace with your OpenAI API key
// const OPENAI_API_KEY = 'sk-5xwciyztp4TBJy9P8PEdxU-a-Zoi-mXSmdasUNRdPtT3BlbkFJkjbhNWcANrRs3mI3aQfXeHF_mevwbM4P0Gon9otT0A';
const OPENAI_API_KEY = 'sk-4s22BU7k6CHktFqZuI7MP45woijnaU8qMXdyu74wb7T3BlbkFJbZZePsKls5EWqzAhnDDYagTjoVKJBMrAbqLUDlWmcA';

// Endpoint to handle chat messages
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const aiResponse = await getAIResponse(message);
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Error fetching AI response:', error);
    res.status(500).json({ reply: 'Error communicating with AI.' });
  }
});

// Function to get AI response from OpenAI API
const getAIResponse = async (message) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo', // Specify the model you want to use
      messages: [{ role: 'user', content: message }],
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0]?.message?.content || "Sorry, I couldn't understand that.";
};

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
