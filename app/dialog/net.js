'use strict';

const request = require('request');
const config = require('../config');

module.exports = {

	//Lógica no recebimento de uma mensagem de texto....
	getDonm(senderId, url, callback) {

        request({
            uri: url,
            method: 'GET',
        }, function(error, response, body) {
	    	if (!error && response.statusCode == 200) {
	    		var result = JSON.parse(body);
	            callback(null, result, senderId);
	        } else {
	            callback(error, null, senderId);
	        }
	  	})      
	},

	getPastGoalId(senderId, id, callback) {
	    console.log("net.getPastGoalId -> goalId: ", id);

	  	request({
		    uri: "https://deolhonasmetas.org.br/api/public/goals/".concat(id),
		    qs: {
		    	api_key: 'Rn2qUusiJVkud7JXyaNeMZOn9RS48LMznPB5vbiM26X7R7Pb4nTBg2EXNfe3n4hHxJwhkXNPCDN8ruVt3DQEWv4sy6f2jQGzr9Ja5QgJg01A204eCaPBIwRzKcWL5RlX',
		    },
		    method: 'GET',
	  	}, function(error, response, body) {
	    	if (!error && response.statusCode == 200) {
	    		var result = JSON.parse(body);
	            callback(null, result, senderId);
	        } else {
	            callback(error, null, senderId);
	        }
	  	})
	},

	getPastProjectsId(senderId, id, callback) {
	    console.log("net.getPastProjectsId -> projectId: ", id);
	    var url = "https://deolhonasmetas.org.br/api/projects/".concat(id);
	    console.log("net.getPastProjectsId -> url: ", url);

	  	request({
		    uri: "https://deolhonasmetas.org.br/api/projects/".concat(id),
		    qs: {
		    	api_key: 'Rn2qUusiJVkud7JXyaNeMZOn9RS48LMznPB5vbiM26X7R7Pb4nTBg2EXNfe3n4hHxJwhkXNPCDN8ruVt3DQEWv4sy6f2jQGzr9Ja5QgJg01A204eCaPBIwRzKcWL5RlX',
		    },
		    method: 'GET',
	  	}, function(error, response, body) {
	  		console.log("Retorno projeto - statusCode: ", response.statusCode);
	  		console.log("Retorno projeto - error: ", error);
	    	if (!error && response.statusCode == 200) {
	    		var result = JSON.parse(body);
	    		console.log("success");
	            callback(null, result, senderId);
	        } else {
	        	console.log("failed");
	            callback(error, null, senderId);
	        }
	  	})
	},


	getPastGoals(senderId, theme, district, callback) {
	    console.log("net.getPastGoals -> theme: ", theme, " - distict: ", district);

	  	request({
		    uri: "https://deolhonasmetas.org.br/api/public/goals",
		    qs: {
		    	api_key: 'Rn2qUusiJVkud7JXyaNeMZOn9RS48LMznPB5vbiM26X7R7Pb4nTBg2EXNfe3n4hHxJwhkXNPCDN8ruVt3DQEWv4sy6f2jQGzr9Ja5QgJg01A204eCaPBIwRzKcWL5RlX',
		    	type_id: theme,
		    	region_id: district
		    },
		    method: 'GET',
	  	}, function(error, response, body) {
	  		//console.log("return - statusCode: ", response.statusCode);
	  		//console.log("return - error: ", error);
	    	if (!error && response.statusCode == 200) {
	    		var result = JSON.parse(body);
	    		//console.log("return - result: ", result);
	            callback(null, result, senderId);
	        } else {
	            callback(error, null, senderId);
	        }
	  	})
	},

	getPastProjects(senderId, theme, district, callback) {
	    console.log("net.getGoalsTheme -> theme: ", theme, " - distict: ", district);

	  	request({
		    uri: "https://deolhonasmetas.org.br/api/public/projects",
		    qs: {
		    	api_key: 'Rn2qUusiJVkud7JXyaNeMZOn9RS48LMznPB5vbiM26X7R7Pb4nTBg2EXNfe3n4hHxJwhkXNPCDN8ruVt3DQEWv4sy6f2jQGzr9Ja5QgJg01A204eCaPBIwRzKcWL5RlX',
		    	type_id: theme,
		    	region_id: district
		    },
		    method: 'GET',
	  	}, function(error, response, body) {
	    	if (!error && response.statusCode == 200) {
	    		var result = JSON.parse(body);
	            callback(null, result, senderId);
	        } else {
	            callback(error, null, senderId);
	        }
	  	})
	},


	solicitationFacebookUserInfo(senderId, callback) {
		request({
		    uri: "https://graph.facebook.com/v2.6/".concat(senderId),
		    qs: {
		    	fields: 'first_name,last_name,profile_pic,locale,timezone,gender',
		    	access_token: config.FB_PAGE_TOKEN
		    },
		    method: 'GET',
		}, function(error, response, body) {		    
		    if (!error && response.statusCode == 200) {
	    		var result = JSON.parse(body);
	            callback(null, result, senderId);
	        } else {
	            callback(error, null, senderId);
	        }
		})
	}

}


/*
http://www.deolhonasmetas.org.br/api/projects?type_id=4&region_id=648&api_key=Rn2qUusiJVkud7JXyaNeMZOn9RS48LMznPB5vbiM26X7R7Pb4nTBg2EXNfe3n4hHxJwhkXNPCDN8ruVt3DQEWv4sy6f2jQGzr9Ja5QgJg01A204eCaPBIwRzKcWL5RlX
type_id:4 (tema ou objects)
region_id:599 (distrito ou region)

*/