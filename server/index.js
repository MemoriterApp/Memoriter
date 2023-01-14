/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

// load environment variables
const env = require('dotenv').config();
console.log(`Loaded environment variables: ${JSON.stringify(env)}`);

const app = express();
app.use(bodyParser.json());

app.options('/generate-suggestion', (req, res) => {
    console.log(req.method, req.url);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST');

    res.send('Hello World!');
});

app.post('/generate-suggestion', (req, res) => {
    const { title } = req.body;
    const configuration = new Configuration({
        apiKey: env.parsed.OPENAI_API_KEY,
        organization: env.parsed.ORGANIZATION_KEY,
    });

    if (title.length < 10) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(200).json({ suggestion: '' });
        res.end();
        return;
    }

    const openai = new OpenAIApi(configuration);
    const AiPrompt = `This is a flashcard. The question is: ${title}. The answer is:`;

    openai.createCompletion({
        model: 'text-davinci-003',
        prompt: AiPrompt,
        temperature: 0.25,
        // eslint-disable-next-line camelcase
        max_tokens: 512,
    })
        .then((response) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            console.log(`Response: ${JSON.stringify(response.data)}`);
            res.status(200).json({ suggestion: response.data.choices[0].text.trim() });
            res.end();
        })
        .catch((error) => {
            console.error('Oops something went wrong: ', error.response.data.error.message);
            res.status(500).send('Something went wrong');
        });
});

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});