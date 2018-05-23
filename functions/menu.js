// "use strict";
// const admin = require('firebase-admin');

// var serviceAccount = require('./backChatBot-eca749cf2efc.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// var db = admin.firestore();


// var payload = 'ADDtocart_1. lasanha'
// var actionName = payload.slice(0,9);
// var productName = payload.slice(10);
// var listCount = payload.slice(10,11)






// function addOrderToCart(event, productName) {
// 	var senderID = event.sender.id;
// 	var recipientID = event.recipient.id;
// 	var title = event.postback.title;
// 	let payload = event.postback.payload;
// 	console.log(payload);

// 	var docRef = db.collection('restaurant').doc('ciaPaulista').collection('users');
// 	docRef.where('id', '==', senderID).get().then(function (querySnapshot) {
// 			querySnapshot.forEach(function (doc) {


// 				var dbCart = db.collection('restaurant/ciaPaulista/allproducts')
// 				var docUserId = doc.id;
// 				var query = dbCart.where('title', '==', productName).get()
// 					.then(snapshot => {
// 						snapshot.forEach(doc => {
// 							const mydata = doc.data();
// 							db.collection('restaurant').doc('ciaPaulista').collection('users').doc(docUserId).collection('mycart').doc().set(doc.data());
// 							console.log(" item included");
							
// 						});
// 					})
// 					.catch(err => {
// 						console.log('Error getting documents', err);
// 					});
					
// 			});
// 		})
// 		.catch(function (error) {
// 			console.log("Error getting documents: ", error);
// 		});

// }







// function sendMyCart(event) {
// 	var userId = event.sender.id;
// 	var elements = [];
// 	var listCount = 0;
// 	var docRef = db.collection('restaurant').doc('ciaPaulista').collection('users');
// 	docRef.where('id', '==', userId).get().then(function (querySnapshot) {
// 			querySnapshot.forEach(function (doc) {
// 				// console.log(doc.id);
// 				var docUserId = doc.id;
// 				var dbCart = db.collection('restaurant').doc('ciaPaulista').collection('users').doc(docUserId).collection('mycart');
				
// 				var query = dbCart.get()
// 					.then(snapshot => {
// 						snapshot.forEach(doc => {
// 							var docRef = db.collection('restaurant').doc('ciaPaulista').collection('users').doc(docUserId).collection('mycart').doc(doc.id);
// 							listCount = listCount + 1
// 							const mydata = doc.data();
// 							console.log(" item included");
// 							let buttons = [];
// 							let button;

// 							button = {
// 								"type": "postback",
// 								"title": 'excluir',
// 								"payload": 'deletcart_' + mydata.title
// 							}
// 							buttons.push(button);

// 							let element = {
// 								"title":listCount+'. '+ mydata.title,
// 								"image_url": mydata.image_url,
// 								"subtitle": mydata.subtitle,
// 								"buttons": buttons
// 							};
// 							let newtitle = element.title.slice(0,1);
// 							console.log(newtitle);
// 							console.log(element.title);
// 							if (newtitle !== Number){
// 								docRef.update({
// 									"title":listCount+'. '+ mydata.title
// 								})
// 							};
							
// 							elements.push(element);
// 							// if (elements == empty){
// 							// 	sendTextMessage(userId, "seu carrinho esta vazio")
// 							// }
// 							// console.log(elements);

// 						});
// 						if (elements.length == 0){
// 							sendTextMessage(userId, "seu carrinho esta vazio")
// 						}
// 						sendGenericMessage(userId, elements);
// 					})
// 					.catch(err => {
// 						console.log('Error getting documents', err);
// 					});
// 			});
// 		})
// 		.catch(function (error) {
// 			console.log("Error getting documents: ", error);
// 		});
// };




// -------------------------------------------------ADD ITEM TO CART FOR TEST----------------
// var userId = '1630462087003172';

// var docRef =  db.collection('restaurant').doc('ciaPaulista').collection('users');
// docRef.where('id', '==', userId).get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {


//         var dbUsers = db.collection('restaurant/ciaPaulista/allproducts')
//         var docUserId = doc.id;
       
        
//                var docRef = db.collection('restaurant').doc('ciaPaulista').collection('users').doc(docUserId).collection('mycart').doc();
//                 docRef.set({

//                             "title":"calabresa",
//                             "image_url":"https://www.comidaereceitas.com.br/images/stories/Pizza_calabresooo.jpg",
//                             "subtitle":"queijo e calabresa",
//                             "buttons":[
//                               {
//                                 "type":"postback",
//                                 "title":"excluir",
//                                 "payload":"deletcart_calabresa"
//                               } ]
//                     }).then(function(){
//                         console.log("doc saved");
//                     }).catch(function(error){
//                         console.log(error + "we got");
//                     });
           
//     });
// })
// .catch(function(error) {
//     console.log("Error getting documents: ", error);
// });



//-------------------------------------------FIND AND DELETE ITEM FROM MYCART----------------------------
// var payload = 'ADDtocart_lasanha'
// var actionName = payload.slice(0,9);
// var productName = payload.slice(10)
// var userId = '1630462087003172';
// var docRef = db.collection('restaurant').doc('ciaPaulista').collection('users');
// docRef.where('id', '==', userId).get().then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {

//             var docUserId = doc.id;
//             var dbCart = db.collection('restaurant').doc('ciaPaulista').collection('users').doc(docUserId).collection('mycart');

//             var query = dbCart.where('title', '==', productName).get()
//                 .then(snapshot => {
//                     snapshot.forEach(doc => {
//                         const mydata = doc.data();
//                         //axar o doc e apagar
//                         var deleteDoc =  db.collection('restaurant').doc('ciaPaulista').collection('users').doc(docUserId).collection('mycart').doc(doc.id).delete();
                        

//                     });
//                     // sendGenericMessage(userId, elements);
                   
//                 })
//                 .catch(err => {
//                     console.log('Error getting documents', err);
//                 });
//         });
//     })
//     .catch(function (error) {
//         console.log("Error getting documents: ", error);
//     });






// ---------------------------------------FIND AND SHOW MY CART------------------
// var userId = '1630462087003172';
// var elements = [];
// var docRef = db.collection('restaurant').doc('ciaPaulista').collection('users');
// docRef.where('id', '==', userId).get().then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {

//             console.log(doc.id);
//             var docUserId = doc.id;
//             var dbCart = db.collection('restaurant').doc('ciaPaulista').collection('users').doc(docUserId).collection('mycart');

//             var query = dbCart.get()
//                 .then(snapshot => {
//                     snapshot.forEach(doc => {
//                         const mydata = doc.data();
//                         console.log(" item included");
//                         let buttons = [];
//                         let button;
                        
//                             button = {
//                                 "type": "postback",
//                                 "title": 'excluir',
//                                 "payload": 'delete_item_cart'
//                             }
//                             buttons.push(button);
                        
//                         let element = {
//                             "title": mydata.title,
//                             "image_url": mydata.image_url,
//                             "subtitle": mydata.subtitle,
//                             "buttons": buttons
//                         };
//                         elements.push(element);
                        

//                     });
//                     // sendGenericMessage(userId, elements);
//                     console.log(elements);
//                 })
//                 .catch(err => {
//                     console.log('Error getting documents', err);
//                 });
//         });
//     })
//     .catch(function (error) {
//         console.log("Error getting documents: ", error);
//     });






//-----------------------------------------FIND AND ADD PRODUCT TO CART-------------------------------
// var userId = '1630462087003172';

// var docRef =  db.collection('restaurant').doc('ciaPaulista').collection('users');
// docRef.where('id', '==', userId).get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {


//         var dbUsers = db.collection('restaurant/ciaPaulista/allproducts')
//         var docUserId = doc.id;
//         var title = 'lasanha';
//         var buttons = [ { title: '+ file ao molho madeira', payload: 'include', type: 'postback' } ];
//         var query = dbUsers.where('buttons', '==', buttons).get()
//             .then(snapshot => {
//                 snapshot.forEach(doc => {
//                     const mydata = doc.data();
//                     console.log(mydata);
//                 db.collection('restaurant').doc('ciaPaulista').collection('users').doc(docUserId).collection('mycart').doc().set(doc.data());
//                 console.log(" item included");

//                     // console.log(doc.id);
//                     // console.log(mydata);


//                 });
//             })
//             .catch(err => {
//                 console.log('Error getting documents', err);
//             });
//     });
// })
// .catch(function(error) {
//     console.log("Error getting documents: ", error);
// });









// var citiesRef = db.collection('restaurant/ciaPaulista/allproducts')
// var senderId = '1630462087003172';
// var title = 'lasanha';
// var buttons = [ { title: '+ lasanha', payload: 'include', type: 'postback' } ];
// var query = citiesRef.where('buttons', '==', buttons).get()
//     .then(snapshot => {
//         snapshot.forEach(doc => {
//             const mydata = doc.data();

//         db.collection('restaurant').doc('ciaPaulista').collection('users').doc(senderId).collection('mycart').doc().set(doc.data());
//         console.log(" item included");

//             // console.log(doc.id);
//             // console.log(mydata);


//         });
//     })
//     .catch(err => {
//         console.log('Error getting documents', err);
//     });


// --use this when collection empty----------------------- check for user and add new users----------------------
// var docRef =  db.collection('restaurant').doc('ciaPaulista').collection('users');
// docRef.where('id', '==', userId).get().then(function(querySnapshot) {
//     if (querySnapshot.empty) {
//         console.log('no documents found');
//         db.collection('restaurant').doc('ciaPaulista').collection('users').doc().set(user)
//       } else {
//         // do something with the data
//         console.log('axouu');
//       }
//     querySnapshot.forEach(function(doc) {

//     });
// })
// .catch(function(error) {
//     console.log("Error getting documents: ", error);
// });








// --------------------------------add all produtcs to allproductlist------------------
// var docRef = [];
//   let  docRef1 = db.collection('restaurant/ciaPaulista/products/bebidas_leves/listmenu');

//    let docRef2 = db.collection('restaurant/ciaPaulista/products/carnes/listmenu');

//    let docRef3 = db.collection('restaurant/ciaPaulista/products/massas/listmenu');

//    let docRef4 = db.collection('restaurant/ciaPaulista/products/pizzas/listmenu');

// docRef.push(docRef1);
// docRef.push(docRef2);
// docRef.push(docRef3);
// docRef.push(docRef4);
// let elements = [];
// var mydata 
// for (let i = 0; i < docRef.length; i++) {
//     docRef[i].get().then(snapshot => {
//             snapshot.forEach(doc => {
//                 if (doc && doc.exists) {
//                     db.collection('restaurant').doc('ciaPaulista').collection('allproducts').doc().set(doc.data());
//  console.log(doc.data());
//                 }
//             });
//             console.log('TUDO CERTO GAROTAO');

//             // console.log(elements); 
//         }).catch(function (error) {
//             console.log('some error' + error);
//         })

// }






//------------------add iten to db----------------
// var docRef = db.doc('restaurant/ciaPaulista/products/test');
// for (let i = 0; i < 5; i++) {
//     var docRef = db.collection('restaurant').doc('ciaPaulista').collection('products').doc('pizzas').collection('listmenu').doc();

//     docRef.set({

//         "title":"calabresa",
//         "image_url":"https://www.comidaereceitas.com.br/images/stories/Pizza_calabresooo.jpg",
//         "subtitle":"queijo e calabresa",
//         "buttons":[
//           {
//             "type":"postback",
//             "title":"inteira",
//             "payload":"include"
//           },{
//             "type":"postback",
//             "title":"metade",
//             "payload":"include"
//           } ]
// }).then(function(){
//     console.log("doc saved");
// }).catch(function(error){
//     console.log(error + "we got");
// });

// }


//-------------------------sendmenu----------------
// var docRef = db.collection('restaurant').doc('ciaPaulista').collection('products');
// let element = [];
// docRef.get().then(snapshot => {
//         snapshot.forEach(doc => {
//             // console.log(doc.id, '=>', doc.data());
//             if (doc && doc.exists) {
//                 const mydata = doc.data();
//                 // console.log(mydata.title);
//                 element.push(mydata);


//             }  

//         });
//         console.log(element[0].buttons);
//     })
//     .catch(err => {
//         console.log('Error getting documents', err);
//     });



//----------sendSubmenu----------------

// let elements = [];
// let docRef
// let payload = 'menu_pizzas';
// if (payload == 'menu_bebidas_leves') {
//     docRef = db.collection('restaurant/ciaPaulista/products/bebidas_leves/listmenu');
// } else if (payload == 'menu_carnes') {
//     docRef = db.collection('restaurant/ciaPaulista/products/carnes/listmenu');
// } else if (payload == 'menu_massas') {
//     docRef = db.collection('restaurant/ciaPaulista/products/massas/listmenu');
// } else if (payload == 'menu_pizzas') {
//     docRef = db.collection('restaurant/ciaPaulista/products/pizzas/listmenu');
// }



// docRef.get().then(snapshot => {
//     snapshot.forEach(doc => {
//         if (doc && doc.exists) {
//             const mydata = doc.data();
//             let buttons = [];
//             let button;
//             for (let i = 0; i < mydata.buttons.length; i++) {
//                 button = {
//                     "type": "postback",
//                     "title": mydata.buttons[i].title,
//                     "payload": mydata.buttons[i].payload
//                 }
//                 buttons.push(button);
//             }
//             let element = {
//                 "title": mydata.title,
//                 "image_url": mydata.image_url,
//                 "subtitle": mydata.subtitle,
//                 "buttons": buttons
//             };
//             elements.push(element);
//             console.log(elements);
//         }
//     });

// }).catch(function (error) {
//     console.log('some error' + error);
// })