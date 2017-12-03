'use strict';

const config = require('../config');
const MS = require('./messenger_actions');
const request = require('request');
const apiAi_controller = require('./apiAi_controller');
const apiAiClient = require('apiai')(config.API_AI_TOKEN);

module.exports = {

	sendApiAi(senderId, msg, session) {
		console.log('api.ai_actions.sendApiAi...');

	    const apiaiSession = apiAiClient.textRequest(msg, {sessionId: senderId});

	    apiaiSession.on('response', (response) => {
	    	console.log("api.ai_actions.sendApiAi - apiaiSession.on -> response: ", response);
	        const result = response.result.fulfillment.speech;
	        apiAi_controller.optionsActionsApiAi(senderId, response);
	    });

	    apiaiSession.on('error', error => console.log(error));

	    apiaiSession.end();
	}

}