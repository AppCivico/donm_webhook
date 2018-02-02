const SLEEP = require('./sleepMessenger');
const CITY = require('../const/cities');
const DISTRICT = require('../const/district');
const payloads = require('../const/constants_payload');
const action = require('../const/constants_action');
const sleep = require('./sleepMessenger');
const urls = require('../const/constants_url');
const ResMS = require('./responseMessenger');


module.exports = {

	verifyMyCity(senderId, response, callback) {
		console.log('responseMessenger.verifyMyCity...');
		if(response && response.result && response.result.parameters) {
			var city = response.result.parameters['geo-city'];
			if(city && CITY.get(city))
			 {
				ResMS.message(senderId, CITY.get(city)[Math.floor(Math.random()*CITY.get(city).length)]);
				ResMS.optionsNewCities(senderId, "Deseja verificar se outra cidade já implantou a Lei de Metas, ou vamos mudar de assunto?");
			 }
			else
			 {
				var city = response.result.parameters['geo-city'];
				var text = 'Infelizmente, ainda não foi implantada a Lei de Metas em ' + city + '. Mobilize sua comunidade para pedir que a prefeitura da sua cidade implante a Lei de Metas.';
				ResMS.message(senderId, text);
				ResMS.optionsNewCities(senderId, "Deseja verificar se outra cidade já implantou a Lei de Metas, ou vamos mudar de assunto?");
			 }
		} else {
			ResMS.message(senderId, 'Desculpe, não entendi o nome de sua cidade =/');
			ResMS.optionsNewCities(senderId, "Deseja verificar novamente, ou vamos mudar de assunto?");
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