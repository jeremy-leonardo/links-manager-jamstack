require('dotenv').config();

const {GET_LINKS} = require('./query/link');
const sendQuery = require('./utils/sendQuery');
const formattedResponse = require('./utils/formattedResponse');

exports.handler = async (event) => {
    if (event.httpMethod != 'GET') {
        return formattedResponse(405, { error: 'Invalid request method' });
    }
    try{
        const res = await sendQuery(GET_LINKS);
        const data = res.allLinks.data;
        return formattedResponse(200, data);
    }catch(err){
        console.error(err);
        return formattedResponse(500, {error: 'An error occured'});
    }
}