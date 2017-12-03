const MS = require('./messenger_actions');

module.exports = {

	sleepTextMessage(senderId, text, time) {
		setTimeout(function() {
			MS.textMessage(senderId, text);
		}, time)
	},

	sleepGenericMenu(senderId, elements, time) {
		setTimeout(function() {
			MS.genericCardMenu(senderId, elements);
		}, time)
	},

	sleepQuickReplices(senderId, quickReplices, text, time) {
		setTimeout(function() {
			MS.genericQuickAnsWer(senderId, text, quickReplices);
		}, time)
	}

}