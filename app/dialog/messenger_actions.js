'use strict';

const config = require('../config');
const request = require('request');
const payloads = require('../const/constants_payload');
const urls = require('../const/constants_url');

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

	genericQuicKRepliesText(payload_item, title_item) {
		console.log('MS.getQuickAnsWer...');
	  	var value = 
	    {
	        content_type: "text",
	        title: title_item,
	        payload: payload_item
	    }; 
	    return value;
	},

	genericQuicKRepliesUrl(url, title_item) {
		console.log('MS.genericQuicKRepliesUrl...');
	  	var value = 
	    {
	        content_type: "web_url",
	        title: title_item,
	        url: url
	    }; 
	    return value;
	},

	genericQuicKRepliesTextAndImage(payload_item, title_item, image_url_item) {
		console.log('MS.genericQuicRepliesTextAndImage...');
	  	var value = 
	    {
	        content_type: "text",
	        title: title_item,
	        payload: payload_item,
	        image_url : image_url_item
	    }; 
	    return value;
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

	genericQuickAnsWer(recipientId, messageText, quickReplies) {
		console.log('MS.getQuickAnsWer...');
	    var messageDate = {
		    recipient: {
		      id: recipientId
		    },
		    message: {
		      text: messageText,
		      quick_replies: quickReplies
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

	genericVideoAttachment(recipientId, url) {
		var messageDate = {
		    recipient: {
		      id: recipientId
		    },
		    message: {
		      attachment: {
		        type: "video",
		        payload: {
		          url: url
		        }
		      }
		    }
	  };
	  callSendAPI(messageDate);
	},

	genericPersistentMenu() {

		var messageData = {
			persistent_menu:[
			    {
			     	locale:"default",
			    	composer_input_disabled:"false",
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
	},

	fluxo_1_PersistentMenu() {

		var messageData = {
			persistent_menu:[
			    {
			     	locale:"default",
			    	composer_input_disabled:"false",
			    	call_to_actions:[
			    		{
			              title:"Obrigações da Prefeitura",
			              type:"postback",
			              payload: payloads.PBK_OBLIGATION_INFO
			            },
			        	{
			              title:"Cidades que aderiram",
			              type:"postback",
			              payload: payloads.PBK_CITIES_INFO
			            },
			        	{
				          type:"web_url",
				          title:"Mais informações",
				          url: urls.URL_ABOUT,
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
	},

	fluxo_2_Persistent_menu() {

		var messageData = {
			persistent_menu:[
			    {
			     	locale:"default",
			    	composer_input_disabled:"false",
			    	call_to_actions:[
			        	{
							title:"Sobre a Lei de Metas",
							type:"nested",
							call_to_actions:[
								{
					              title:"Obrigações da Prefeitura",
					              type:"postback",
					              payload: payloads.PBK_OBLIGATION_INFO
					            },
						    	{
					              title:"Cidades que aderiram",
					              type:"postback",
					              payload: payloads.PBK_CITIES_INFO
					            },
					        	{
						          type:"web_url",
						          title:"Mais informações",
						          url: urls.URL_ABOUT,
						          webview_height_ratio:"full"
						        }
							]
			        	},
						{
				        	title:"Gestão passada",
							type:"postback",
							payload: payloads.PBK_PAST_MANAGEMENT
						},
						{
			        		title:"Conhecer mais",
							type:"nested",
							call_to_actions:[
						    	{
						    	  title:"Gestão passada",
					              type:"web_url",
						          url: urls.URL_DONM_2013,
						          webview_height_ratio:"full"
					            },
					    		{
					              type:"web_url",
						          title:"Gestão atual",
						          url: urls.URL_DONM_2017,
						          webview_height_ratio:"full"
					            }
							]
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
	      if(response && response.statusCode) {
	      	console.log(response.statusCode)	
	      }
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

function solicitationUserInfo(senderId) {
	console.log('MS.solicitationUserInfo...');
	console.log(senderId);
	  request({
	    uri: "https://graph.facebook.com/v2.6/me/".concat(senderId),
	    qs: {
	    	fields: 'first_name,last_name,profile_pic,locale,timezone,gender',
	    	access_token: config.FB_PAGE_TOKEN
	    },
	    method: 'GET',
	  }, function(error, response, body) {
	    
	    if(!error && response.statusCode == 200) {
	      	var result = JSON.parse(body);
	      	console.log('Mensagem enviada com sucesso!');
	      	console.log(result);
	    } else {
	     	console.log('Não foi possível enviar a mensagem!');
	    	console.log(response.statusCode)
	    	console.log(body)
	    }
	    
	 })
};
