
'use strict';

require('dotenv').config();

const app = require('./server');

const async = require('async');
const request = require('request');
const HashMap = require('hashmap');

const config = require('./config');
const MS = require('./dialog/messenger_actions');
const api_ai = require('./dialog/api.ai_actions');
const messenger_controller = require('./dialog/messenger_controller');

const apiAiClient = require('apiai')(config.API_AI_TOKEN);

// Messenger API parameters
if (!config.FB_PAGE_ID) {
    throw new Error('missing FB_PAGE_ID');
}
if (!config.FB_PAGE_TOKEN) {
    throw new Error('missing FB_PAGE_TOKEN');
}


// See the Webhook reference
// https://developers.facebook.com/docs/messenger-platform/webhook-reference
const getFirstMessagingEntry = (body) => {
    const val = body.object == 'page' &&
            body.entry &&
            Array.isArray(body.entry) &&
            body.entry.length > 0 &&
            body.entry[0] &&
            body.entry[0].id === config.FB_PAGE_ID &&
            body.entry[0].messaging &&
            Array.isArray(body.entry[0].messaging) &&
            body.entry[0].messaging.length > 0 &&
            body.entry[0].messaging[0]
        ;
    return val || null;
};



// Webhook setup
app.get('/webhook', (req, res) => {
    console.log('validação ok...');
    if (!config.FB_VERIFY_TOKEN) {
        throw new Error('missing FB_VERIFY_TOKEN');
    }
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.FB_VERIFY_TOKEN) {
        res.status(200).send(req.query['hub.challenge']);
    } else {
        res.sendStatus(400);
    }
});


//
app.post('/webhook', function(req, res) {
    var data = req.body;
    const messaging = getFirstMessagingEntry(data);

    //if (messaging && messaging.recipient.id === config.FB_PAGE_ID) {
    if(data && data.object === 'page' && config.FB_PAGE_ID === messaging.recipient.id) {
        console.log('Index - Recebeu mensagem enviada pelo usuário...');

        data.entry.forEach(function(entry) {
            var pageId = entry.id;

            entry.messaging.forEach(function(event) {

                if( (event.message && event.message.text && event.message.quick_reply && event.message.quick_reply.payload) || (event.postback && event.postback.payload) ) {
                    console.log('quickReply or payload!');

                    var payload = event.postback ? event.postback.payload : event.message.quick_reply.payload;
                    var senderId = event.sender.id;
                    var postback = event.postback;

                    console.log("senderId: ", senderId, " - payload: ", payload, " - postback: ", postback, " - event: ", event);

                    messenger_controller.processQuickReplyOrPayload(senderId, payload, postback, event);

                }  else if(event.message && event.message.text) {    
                    console.log('message!');

                    messenger_controller.processMessageReceived(event);

                } else if(event.message && event.message.attachments) {
                    console.log('attachments!');

                    messenger_controller.processAttachmentsReceived(event);

                } else if(event.delivery) {

                    console.log('delivery!');

                } else if(event.read) {

                    console.log('read!');

                } else {

                    console.log('não é mensagem, anexo, delivery nem read!');

                }
            })

        })
    }
    res.sendStatus(200);
})










//retorno sobre temperatura do Api.ai
/*app.post('/test_api', function(req, res) {
    console.log('****** /test_api');
    //console.log("res: ", req);
    //console.log("req: ", res);
    console.log('****** /test_api');
    if (req.body.result.action === 'temperatura') {
        const imageName = req.body.result.parameters['temperatura'];
    }
})*/

//retorno sobre temperatura do Api.ai
/*app.post('/answer', function(req, res) {
    console.log('****** /answer');

    var action = req.body.result.action    
    switch(action) {
        case 'temperatura':
            var parameters = req.body.result.parameters['temperatura'];
            console.log("/answer/temperatura -> parameters: ", parameters);
            break;
        case 'set_district':
            var parameters = req.body.result.parameters['district'];
            console.log("/answer/set_district -> parameters: ", parameters);
            //verifica distrito
            //salva distrito no bd
            //solicita tema
            break;
        case 'set_theme':
            var parameters = req.body.result.parameters['theme'];
            console.log("/answer/set_theme -> parameters: ", parameters);
            //verifica tema
            //salva tema no bd
            //verifica se precisa pedir algum dado (type (meta ou projeto), gestão (passada ou atual), distrito, tema)
            break;
    }


})*/