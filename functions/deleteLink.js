require('dotenv').config();

const { DELETE_LINK } = require('./query/link');
const sendQuery = require('./utils/sendQuery');
const formattedResponse = require('./utils/formattedResponse');

exports.handler = async (event) => {
    if (event.httpMethod != 'DELETE') {
        return formattedResponse(405, { error: 'Invalid request method' });
    }
    const { id } = JSON.parse(event.body);
    const variables = { id };
    try {
        const { deleteLink: deletedLink } = await sendQuery(
            DELETE_LINK,
            variables
        );
        return formattedResponse(200, deletedLink);
    } catch (err) {
        console.error(err);
        return formattedResponse(500, { error: 'An error occured' });
    }
};