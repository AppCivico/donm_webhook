'use strict';

const config = require('./config');
const request = require('request');

module.exports = {

	processApiAiReceived(response) {
		console.log('apiAi_controller.sendApiAi...');

	    var speech = response.result.fulfillment.speech;
	    var intentName = response.result.metadata.intentName;
	    var parameters = response.result.parameters;
	    var action = response.result.action;

	    
	},

	trataActionTemperatura() {
		console.log('apiAi_controller.trataActionTemperatura...');

	    var actionTemperatura = parameters.temperatura;
	    switch(actionTemperatura) {
	        case 'Aumente':
	            console.log('Ok, vamos aumentar a temperatura');
	            break;
	        case 'Diminua': 
	            console.log('Ok, vamos aumentar a temperatura');
	            break;
	        case defaul:
	            console.log('trataActionTemperatura defaul response');
	    }
	}

}