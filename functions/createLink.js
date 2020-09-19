require('dotenv').config();

const { CREATE_LINK } = require('./query/link');
const sendQuery = require('./utils/sendQuery');
const formattedResponse = require('./utils/formattedResponse');

exports.handler = async (event) => {
    if (event.httpMethod != 'POST') {
        return formattedResponse(405, { error: 'Invalid request method' });
    }
    const { name, url, description } = JSON.parse(event.body);
    const variables = { name, url, description, archived: false };
    try {
        const { createLink: createdLink } = await sendQuery(
            CREATE_LINK,
            variables
        );
        return formattedResponse(200, createdLink);
    } catch (err) {
        console.error(err);
        return formattedResponse(500, { error: 'An error occured' });
    }
};