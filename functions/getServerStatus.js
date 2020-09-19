exports.handler = async (event, context, callback) => {
    if (event.httpMethod != 'GET') {
        return formattedResponse(405, { error: 'Invalid request method' });
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ msg: 'Server is online', status: 'online' }),
    };
}