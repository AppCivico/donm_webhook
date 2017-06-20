'use strict';

const config = require('./config');
const request = require('request');
const MS = require('./messenger_actions');
const api_ai = require('./api.ai_actions');

const PBK_CITIES_GOAL_LAW_INFO = "click_cities_goal_law_info";
const PBK_AUDIENCES_INFO = "click_audiences_info";
const PBK_START = 'click_start';
const URL_CITIES_GOAL_LAW_INFO = 'http://nossasaopaulo.org.br/programa-de-metas/cidades';

module.exports = {

	//Lógica no recebimento de uma mensagem de texto....
	processMessageReceived(event) {

		console.log('messenger_controller.processMessageReceived...');

	    var senderId = event.sender.id;
	    var recipientId = event.recipient.id;
	    var message = event.message;
	    var messageId = message.mid;
	    var messageText = message.text;
	    var attachments = message.attachments;

	    if(messageText) {

	        /*itch(messageText) {
	            case 'xxx':
	                cardMenuGoal(senderId);
	                break;
	            default:
	                //usandoApiAi(senderId, messageText);
	                api_ai.sendApiAi(senderId, messageText, 'botcube_co');
	        }*/

	        api_ai.sendApiAi(senderId, messageText, 'botcube_co');

	    } else if(attachments) {
	        console.log('Anexo!');
	    }

	},

	//Lógica no recebimento de uma mensagem de "Clique em um botão/menu"....
	optionsPostbackPayload(payload, senderId) {
  		console.log('messenger_controller.optionsPostbackPayload...');

		switch(payload) {
			case PBK_START:
				MS.genericPersistentMenu();
				break;
	    	case PBK_CITIES_GOAL_LAW_INFO:
	        	usandoApiAi(senderId, 'Aumente a temperatura');
	        	break;
		    case PBK_AUDIENCES_INFO:

		        break;
	    }
	}

}

//Gera menu de metas
function buttonsMenuGoal(senderId) {
	console.log('messenger_controller.buttonsMenuGoal...');

    var buttons = [
        MS.genericButtonPostback(PBK_CITIES_GOAL_LAW_INFO, 'Cidades'),
        MS.genericButtonPostback(URL_CITIES_GOAL_LAW_INFO, 'Lei de metas'),
        MS.genericButtonLink(PBK_AUDIENCES_INFO, 'Audiencias')
    ];

    MS.genericMenuButton(senderId, 'O que deseja fazer?', buttons);
};

//Gera card menu de metas
function cardMenuGoal(senderId) {
	console.log('messenger_controller.cardMenuGoal...');

    var button1 = [MS.genericButtonPostback(PBK_CITIES_GOAL_LAW_INFO, 'VER')];
    var button2 = [MS.genericButtonLink(URL_CITIES_GOAL_LAW_INFO, 'ME DIRECIONE')];
    var button3 = [MS.genericButtonPostback(PBK_AUDIENCES_INFO, 'VER')];

    var elements = [
        MS.genericElements('Titulo 1', 'subtitulo 1', button1, 'http://deolhonocariri.com.br/wp-content/uploads/2016/03/image.jpeg'),
        MS.genericElements('Titulo 2', 'subtitulo 2', button2, 'http://deolhonocariri.com.br/wp-content/uploads/2016/03/image.jpeg'),
        MS.genericElements('Titulo 3', 'subtitulo 3', button3, 'http://deolhonocariri.com.br/wp-content/uploads/2016/03/image.jpeg')
    ];

    MS.genericCardMenu(senderId, elements);
}