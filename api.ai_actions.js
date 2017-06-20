'use strict';

const config = require('./config');
const MS = require('./messenger_actions');
const request = require('request');
const apiAiClient = require('apiai')(config.API_AI_TOKEN);

module.exports = {

	sendApiAi(senderId, msg, session) {
		console.log('api.ai_actions.sendApiAi...');

	    const apiaiSession = apiAiClient.textRequest(msg, {sessionId: session});

	    apiaiSession.on('response', (response) => {
	        const result = response.result.fulfillment.speech;
	        MS.textMessage(senderId, result);
	    });

	    apiaiSession.on('error', error => console.log(error));

	    apiaiSession.end();
	}

}