import axios from 'axios'

async function translateText(text, sourceLang = 'auto', targetLang = 'en') {
    try {
        const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
            params: {
                client: 'gtx',
                sl: sourceLang,
                tl: targetLang,
                dt: 't',
                q: text
            }
        });

        // Extract the translated text from the response
        const translatedText = response.data[0][0][0];
        return translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
        throw error;
    }
}

export const translate = { translateText }