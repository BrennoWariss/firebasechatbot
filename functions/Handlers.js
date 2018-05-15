const functions = require('firebase-functions');
const config    = require('./config');
const request   = require('request');


//firestore initialize
const admin = require('firebase-admin');
var serviceAccount = require('./backChatBot-eca749cf2efc.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();


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
		handlers.sendMenu(event);
	} else if (messageAttachments) {
		handleMessageAttachments(messageAttachments, senderID);
	}
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
handlers.sendMenu = function (event) {
	var senderID = event.sender.id;
	let elements = [];
	handlers.sendTextMessage(senderID, "carregando cardapio");
	var docRef = db.collection('restaurant').doc('ciaPaulista').collection('products');
	docRef.get().then(listdbElement()).catch( (error) => {
		console.log('some error' + error);
	})
    function listdbElement() {
        return snapshot => {
            snapshot.forEach(doc => {
                if (doc && doc.exists) {
                    const mydata = doc.data();
                    let element = {
                        "title": mydata.title,
                        "image_url": mydata.image_url,
                        "subtitle": mydata.subtitle,
                        "buttons": mydata.buttons
                    };
                    elements.push(element);
                    // console.log(elements)
                }
            });
            handlers.sendGenericMessage(senderID, elements);
        };
    }
}

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
var casa= 2;
module.exports = handlers;