const MS = require('./messenger_actions');
const SLEEP = require('./sleepMessenger');
const CITY = require('../const/cities');
const DISTRICT = require('../const/district');
const payloads = require('../const/constants_payload');
const action = require('../const/constants_action');
const sleep = require('./sleepMessenger');
const urls = require('../const/constants_url');


module.exports = {

	verifyMyCity(senderId, response, callback) {
		console.log('responseMessenger.verifyMyCity...');
		if(response && response.result && response.result.parameters) {
			var city = response.result.parameters['geo-city'];
			if(city && CITY.get(city)) {
				MS.textMessage(senderId, CITY.get(city)[Math.floor(Math.random()*map.get(city).length)]);
				sleep.sleepTextMessage(senderId, 'Se quiser saber sobre outra cidade, é só me informar o nome dela. Ou escolha uma opção do menu, para que eu te ajude com outro assunto.', 1500);
			} else {
				var city = response.result.parameters['geo-city'];
				var text = 'Infelizmente, ainda não foi implantada a Lei de Metas em ' + city;
				MS.textMessage(senderId, text);
				sleep.sleepTextMessage(senderId, 'Mas não se esqueça que a participação popular é muito importante para que o prefeito de sua cidade implante a Lei de Metas ;)', 1500);
			}
		} else {
			MS.textMessage(senderId, 'Desculpe, não entendi o nome de sua cidade =/');
		}
	},

	verifyDistrict(senderId, data, callback) {
		if(data) {
			var district = response.result.parameters['district'];
			console.log("responseMessenger.verifyDistrict -> district: ", district);
			callback(null, district);
		} else {
			console.log("responseMessenger.verifyDistrict -> district is null");
		}
	},

	verifyTheme(senderId, response, callback) {
		if(response && response.result && response.result.parameters) {
			var district = response.result.parameters['theme'];
			console.log("responseMessenger.verifyTheme -> theme: ", district);
		} else {
			console.log("responseMessenger.verifyTheme -> theme is null");
		}
	}
}