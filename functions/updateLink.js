require('dotenv').config();

const { UPDATE_LINK } = require('./query/link');
const sendQuery = require('./utils/sendQuery');
const formattedResponse = require('./utils/formattedResponse');

exports.handler = async (event) => {
    if (event.httpMethod != 'PUT') {
        return formattedResponse(405, { error: 'Invalid request method' });
    }
    const { name, url, description, _id: id, archived } = JSON.parse(event.body);
    const variables = { name, url, description, archived, id };
    try {
        const { updateLink: updatedLink } = await sendQuery(
            UPDATE_LINK,
            variables
        );
        return formattedResponse(200, updatedLink);
    } catch (err) {
        console.error(err);
        return formattedResponse(500, { error: 'An error occured' });
    }
};