const functions = require('firebase-functions');
const config    = require('./config');
const express   = require('express');
const request   = require('request');
const handlers  = require('./Handlers');
const app       = express();

app.get('/timestamp', (request, response) => {
    response.send(`${Date.now()}`);
})

app.get('/timestamp-cashed', (request, response) => {
    response.set('cache-control', 'public, max-age=300, s-maxage=600');
    response.send(`${Date.now()}`);
})

app.get('/webhook/', (req, res) => {
	console.log("request");
	if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.FB_VERIFY_TOKEN) {
		res.status(200).send(req.query['hub.challenge']);
	} else {
		console.error("Failed validation. Make sure the validation tokens match.");
		res.sendStatus(403);
	}
})

app.post('/webhook/', (req, res) => {
	var data = req.body;
	console.log(JSON.stringify(data));
	// Make sure this is a page subscription
	if (data.object === 'page') {
		// Iterate over each entry
		// There may be multiple if batched
		data.entry.forEach( (pageEntry) =>{
			var pageID = pageEntry.id;
			var timeOfEvent = pageEntry.time;

			// Iterate over each messaging event
			pageEntry.messaging.forEach( (messagingEvent) => {
				if (messagingEvent.optin) {
					receivedAuthentication(messagingEvent);
				} else if (messagingEvent.message) {
				handlers.receivedMessage(messagingEvent);
				} else if (messagingEvent.delivery) {
					receivedDeliveryConfirmation(messagingEvent);
				} else if (messagingEvent.postback) {
					receivedPostbackActions(messagingEvent);
				} else if (messagingEvent.read) {
					receivedMessageRead(messagingEvent);
				} else if (messagingEvent.account_linking) {
					receivedAccountLink(messagingEvent);
				} else {
					console.log("Webhook received unknown messagingEvent: ", messagingEvent);
				}
			});
		});

		// Assume all went well.
		// You must send back a 200, within 20 seconds
		res.sendStatus(200);
	}
});


exports.app = functions.https.onRequest(app);
