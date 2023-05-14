const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = 3000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 50,
    });

    const reply = completion.data.choices[0].text.trim();
    res.json({ reply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
