import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

// API configuration
const translateApiKey = '4a003cec64msh637ccde1edc67b8p14b3e3jsnc491a9d60cc6';
const translateApiUrl = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';

// Detect language function
const detectLanguage = async (text) => {
  try {
    const response = await axios.post(translateApiUrl, {
      from: 'auto',
      to: 'en',
      text: text
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': translateApiKey,
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error detecting language:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Dialogflow webhook endpoint
app.post('/api/webhook/', async (req, res) => {
  const userInput = req.body.queryText;

  try {
    // Detect the language of the user input
    const result = await detectLanguage(userInput);
    const detectedLanguage = result.source_language_code; // e.g., 'zu' for Zulu

    // Map language codes to Dialogflow supported languages
    const supportedLanguages = {
      'en': 'English',
      'zu': 'Zulu',
      'xh': 'Xhosa'
    };

    if (supportedLanguages[detectedLanguage]) {
      // Respond based on detected language
      res.json({
        fulfillmentText: `You are speaking in ${supportedLanguages[detectedLanguage]}.`
      });
    } else {
      // Default response if language is not supported
      res.json({
        fulfillmentText: "Sorry, I don't support this language yet."
      });
    }
  } catch (error) {
    console.error('Error detecting language:', error.response ? error.response.data : error.message);
    res.json({
      fulfillmentText: "There was an error processing your request."
    });
  }
});

const PORT = process.env.PORT || 3014;
app.listen(PORT, () => {
  console.log(`Webhook server is running on port ${PORT}`);
});
