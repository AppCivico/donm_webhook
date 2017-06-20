'use strict';

// Webserver parameter
const PORT = 3000;

const bodyParser = require('body-parser');
const express = require('express');
const async = require('async');
const request = require('request');

const config = require('./config');
const MS = require('./messenger_actions');
const api_ai = require('./api.ai_actions');
const messenger_controller = require('./messenger_controller');

const apiAiClient = require('apiai')(config.API_AI_TOKEN);

// Messenger API parameters
if (!config.FB_PAGE_ID) {
    throw new Error('missing FB_PAGE_ID');
}
if (!config.FB_PAGE_TOKEN) {
    throw new Error('missing FB_PAGE_TOKEN');
}

// Starting our webserver and putting it all together
const app = express();
app.set('port', PORT);
app.listen(app.get('port'));
app.use(bodyParser.json());

console.log(PORT);


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

/*var sessions = {};
const findOrCreateSession = (sessions, fbid, cb) => {

    if (!sessions[fbid]) {
        console.log("New Session for:", fbid);
        sessions[fbid] = {context: {}};
    }

    cb(sessions, fbid);
};*/


const sessions = {};
const findOrCreateSession = (fbid) => {
  let sessionId;
  // Vamos ver se já temos uma sessão para o usuário fbid
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      // Sim, entendi!
      sessionId = k;
    }
  });
  if (!sessionId) {
    // Nenhuma sessão encontrada para o usuário fbid, vamos criar uma nova
    sessionId = new Date().toISOString();
    sessions[sessionId] = {fbid: fbid, context: {}};
  }
  return sessionId;
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

//Mensagens enviadas pelo usuário
app.post('/webhook', function(req, res) {
    var data = req.body;
    const messaging = getFirstMessagingEntry(data);

    //if (messaging && messaging.recipient.id === config.FB_PAGE_ID) {
    if(data && data.object === 'page' && config.FB_PAGE_ID === messaging.recipient.id) {
        console.log('Index - Recebeu mensagem enviada pelo usuário...');

        data.entry.forEach(function(entry) {
            var pageId = entry.id;

            entry.messaging.forEach(function(event) {
                if(event.message) {    
                    messenger_controller.processMessageReceived(event);
                } else if(event.postback && event.postback.payload) {
                    var payload = event.postback.payload;
                    messenger_controller.optionsPostbackPayload(payload, event.sender.id);
                } else if(event.delivery) {
                    console.log('delivery!');
                    console.log(event); 
                } else if(event.read) {
                    console.log('read!');
                    console.log(event); 
                } else {
                    console.log('não é mensagem, anexo, delivery nem read!');
                }
            })

        })
    }
    res.sendStatus(200);
})

//retorno sobre temperatura do Api.ai
/*app.post('/temperatura', function(req, res) {

    if (req.body.result.action === 'temperatura') {
        const imageName = req.body.result.parameters['temperatura'];
    }
})*/


