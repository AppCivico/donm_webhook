'use strict';

const config = require('./config');
const request = require('request');

module.exports = {

	genericButtonPostback(payload, title) {
	    var button = 
	    {
	        type: 'postback',
	        title: title,
	        payload: payload   
	    }
	    return button;
	},

	genericButtonLink(url, title) {
	    var button = 
	    {
	        type: 'web_url',
	        title: title, 
            url: url  
	    };
	    return button;
	},

	genericElements(title, subtitle, buttons, image_url) {
	    var element = 
	    {
	        title:title,
	        image_url:image_url,
	        subtitle:subtitle,
	        buttons: buttons
	    }; 
	    return element;
	},

	genericRecipient(recipientId) {
	    var messageData = {
	        recipient: {
	            id: recipientId
	        }
	    }
	    return messageData;
	},

	/*
		Gerar mensagem de texto e enviar  para usuário
			param: recipientId -> id do usuário
			param: messageText -> mensagem que será enviada para o usuário
	*/
	textMessage(recipientId, messageText) {
	    var messageDate = {
	        recipient: {
	            id: recipientId
	        },
	        message: {
	            text: messageText
	        }
	    };
	    console.log('messenger_actions.textMessage');
	    callSendAPI(messageDate);
	},

	/*
		Gerar menu com cards e enviar para usuário
			param: recipientId -> id do usuário
			param: lista de elements
	*/
	genericCardMenu(recipientId, elements) {
		console.log('MS.genericCardMenu...');
		
	  var messageDate = {
	    recipient: {
	      id: recipientId
	    },
	    message: {
	      attachment: {
	        type: "template",
	        payload: {
	          template_type: "generic",
	          elements: elements
	        }
	      }
	    }
	  };
	  callSendAPI(messageDate);
	},

	/*
	Gerar menu com com botões.
	  param: recipientId -> id do usuário
	  param: text -> text exibido acima do menu de botões
	  param: buttons -> lista de botões
	obs: Messenger suporta apenas 3 botões no menu
	*/
	genericMenuButton(recipientId, text, buttons) {

		console.log('MS.genericMenuButton...');
		console.log(recipientId);
		console.log(text);
		console.log(buttons[0]);

	  var messageDate = {
	    recipient: {
	      id: recipientId
	    },
	    recipient: recipientId,
	    message: {
	      attachment: {
	        type: "template",
	        payload: {
	          template_type: "button",
	          text: text,
	          buttons: buttons
	        }
	      }
	    }
	  };
	  callSendAPI(messageDate);
	},

	//Envia requsição de localização.
	//  param: recipientId -> id do usuário
	//  param: text -> text exibido acima do menu de botões
	getLocation(recipientId, messageText) {
		console.log('MS.getLocation...');
	  var messageDate = {
	    recipient: {
	      id: recipientId
	    },
	    message: {
	      text: messageText,
	      quick_replies: [
	        {
	          content_type:'location'
	        }
	      ]
	    }
	  };
	  callSendAPI(messageDate);
	},

	genericPersistentMenu() {

		var messageData = {
			persistent_menu:[
			    {
			     	locale:"default",
			    	composer_input_disabled:"true",
			    	call_to_actions:[
			        	{
			        		title:"My Account",
			        		type:"nested",
			        		call_to_actions:[
				            	{
				              		title:"Pay Bill",
				              		type:"postback",
				              		payload:"PAYBILL_PAYLOAD"
				            	},
				            	{
				              		title:"History",
					              type:"postback",
					              payload:"HISTORY_PAYLOAD"
					            },
					            {
					              title:"Contact Info",
					              type:"postback",
					              payload:"CONTACT_INFO_PAYLOAD"
					            }
			        		]
			    		},
			        	{
				          type:"web_url",
				          title:"Latest News",
				          url:"http://petershats.parseapp.com/hat-news",
				          webview_height_ratio:"full"
				        }
			      	]
			    },
		    	{
		      		locale:"zh_CN",
		      		composer_input_disabled:"false"
		    	}
			]
		};
		createMenuPersistent(messageData);
	}

};

function callSendAPI(messageData) {
	console.log('MS.callSendAPI...');
	console.log(messageData);
	  request({
	    uri: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token: config.FB_PAGE_TOKEN},
	    method: 'POST',
	    json: messageData
	  }, function(error, response, body) {
	    
	    if(!error && response.statusCode == 200) {
	      console.log('Mensagem enviada com sucesso!');
	    } else {
	      console.log('Não foi possível enviar a mensagem!');
	      console.log(response.statusCode)
	      console.log(body)
	    }
	    
	 })
};

function createMenuPersistent(messageData) {
	console.log('MS.createMenuPersistent...');
	console.log(messageData);
	  request({
	    uri: 'https://graph.facebook.com/v2.6/me/messenger_profile',
	    qs: {access_token: config.FB_PAGE_TOKEN},
	    method: 'POST',
	    json: messageData
	  }, function(error, response, body) {
	    
	    if(!error && response.statusCode == 200) {
	      console.log('Mensagem enviada com sucesso!');
	    } else {
	      console.log('Não foi possível enviar a mensagem!');
	      console.log(response.statusCode)
	      console.log(body)
	    }
	    
	 })
};