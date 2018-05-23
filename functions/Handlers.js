const functions = require('firebase-functions');
const config    = require('./config');
const request   = require('request');
var dbFunctions = require ('./dbFunctions');

var handlers = {};


handlers.receivedMessage = function (event) {

	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfMessage = event.timestamp;
	var message = event.message;
	//console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
	//console.log(JSON.stringify(message));

	var isEcho = message.is_echo;
	var messageId = message.mid;
	var appId = message.app_id;
	var metadata = message.metadata;

	// You may get a text or attachment but not both
	var messageText = message.text;
	var messageAttachments = message.attachments;
	var quickReply = message.quick_reply;

	if (isEcho) {
		handleEcho(messageId, appId, metadata);
		return;
	} else if (quickReply) {
		handleQuickReply(senderID, quickReply, messageId);
		return;
	}


	if (messageText) {
		//send message to api.ai
		handlers.sendTextMessage(senderID, "espera 5s pra teste");
		// handlers.sendMenu(event);
	} else if (messageAttachments) {
		handleMessageAttachments(messageAttachments, senderID);
	}
}

handlers.receivedDeliveryConfirmation = function(event) {
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var delivery = event.delivery;
	var messageIDs = delivery.mids;
	var watermark = delivery.watermark;
	var sequenceNumber = delivery.seq;

	if (messageIDs) {
		messageIDs.forEach((messageID) => {
			console.log("Received delivery confirmation for message ID: %s",
				messageID);
		});
	}

	console.log("All message before %d were delivered.", watermark);
}

handlers.receivedPostback = function(event) {
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfPostback = event.timestamp;

	// The 'payload' param is a developer-defined field which is set in a postback 
	// button for Structured Messages. 
	var payload = event.postback.payload;

	switch (payload) {


		case 'testelist':
			sendGenericMessageforlisttest(event);
			break;
		
		default:
			//unindentified payload
			sendTextMessage(senderID, "I'm not sure what you want. Can you be more specific?aqi");
			break;

	}}

	
handlers.receivedMessageRead = function (event) {
		var senderID = event.sender.id;
		var recipientID = event.recipient.id;
	
		// All messages before watermark (a timestamp) or sequence have been seen.
		var watermark = event.read.watermark;
		var sequenceNumber = event.read.seq;
	
		console.log("Received message read event for watermark %d and sequence " +
			"number %d", watermark, sequenceNumber);
	}	

handlers.sendTextMessage = function (recipientId, text) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			text: text
		}
	}
	dbFunctions.listMenu();
	handlers.callSendAPI(messageData);
}

handlers.callSendAPI = function (messageData) {
	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {
			access_token: config.FB_PAGE_TOKEN
		},
		method: 'POST',
		json: messageData

	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			var recipientId = body.recipient_id;
			var messageId = body.message_id;

			if (messageId) {
				console.log("Successfully sent message with id %s to recipient %s",
					messageId, recipientId);
			} else {
				console.log("Successfully called Send API for recipient %s",
					recipientId);
			}
		} else {
			console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
		}
	});
}
// handlers.sendMenu = function (event) {
// 	var senderID = event.sender.id;
// 	let elements = [];
// 	handlers.sendTextMessage(senderID, "carregando cardapio");
// 	var docRef = db.collection('restaurant').doc('ciaPaulista').collection('products');
// 	docRef.get().then(listdbElement()).catch( (error) => {
// 		console.log('some error' + error);
// 	})
//     function listdbElement() {
//         return snapshot => {
//             snapshot.forEach(doc => {
//                 if (doc && doc.exists) {
//                     const mydata = doc.data();
//                     let element = {
//                         "title": mydata.title,
//                         "image_url": mydata.image_url,
//                         "subtitle": mydata.subtitle,
//                         "buttons": mydata.buttons
//                     };
//                     elements.push(element);
//                     // console.log(elements)
//                 }
//             });
//             handlers.sendGenericMessage(senderID, elements);
//         };
//     }
// }

handlers.sendGenericMessage = function(recipientId, elements) {
	var messageData = {
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

	handlers.callSendAPI(messageData);
}

module.exports = handlers;