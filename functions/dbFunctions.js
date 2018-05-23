//firestore initialize
const admin = require('firebase-admin');
var dbHolder = require('./dbHolder');
var serviceAccount = require('./chatbotfirebase-24e1d-691b9f702112.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();

var dbFuctions = {};
var allElements = []



dbFuctions.listMenu = function () {
    var element = [];
    var docRef = db.collection('restaurant').doc('ciaPaulista').collection('products');
    const dbForeach = snapshot => {
        snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            if (doc && doc.exists) {
                // console.log(doc.data());
                const mydata = doc.data();
                // console.log(mydata.title);
                element.push(mydata.title);
                dbHolder.menuTitle = element;
                dbFuctions.listSubMenu(mydata.title)  // ---> call all submenus
            }
        });
        // console.log(dbHolder.menuCount);
        

    };
    docRef.get().then(dbForeach)
        .catch(err => {
            console.log('Error getting documents', err);
        });
}   



dbFuctions.listSubMenu = function (submenu) {
    let element = []
    
    element.push(submenu)
    var docRef = db.collection('restaurant').doc('ciaPaulista').collection('products').doc(submenu).collection('listmenu');
    const dbForeach = snapshot => {
        snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            if (doc && doc.exists) {
                const mydata = doc.data();
                element.push(mydata);
                
            }
        });
        allElements.push(element);
        dbHolder.submenu = allElements
        
    };
    docRef.get().then(dbForeach)
        .catch(err => {
            console.log('Error getting documents', err);
        });
}



var userId = '1630462087003172';
var userData = {
    name:"brenno"
}
// var docRef =  db.collection('restaurant').doc('ciaPaulista').collection('users');
// docRef.where('id', '==', userId).get().then((querySnapshot) => {
//     if (querySnapshot.empty) {
//         console.log('no documents found');
//         db.collection('restaurant').doc('ciaPaulista').collection('users').doc(userId).set(userData)
//       } else {
//         // do something with the data
//         console.log('axouu');
//       }
//     querySnapshot.forEach((doc) => {

//     });
// })
// .catch((error) => {
//     console.log("Error getting documents: ", error);
// });


//     dbHolder.submenu = array
//     console.log(dbHolder.submenu.length);

// var myFather = new dbHolder1 ("John", "Doe", "2" ,"blue");
// myFather.foo()
// dbFuctions.listMenu()
// dbFuctions.listSubMenu("massas")
// dbFuctions.listSubMenu("bebidas")
// setTimeout(() => {
//     console.log(dbHolder.submenu);
// }, 5000);


// dbFuctions.teste01 = function (){
//     var array = ['carro',' mesa', 'cadeira', 'banco']
//     dbHolder.submenu = array
//     console.log(dbHolder.submenu.length);
// }
//  samples for tests down ++++++++++++++++++++++++++-----------------_+++++++++++++++++
// add itens to new db=============================================================
// var bairros = ['Batista Campos', 'Campina', 'Cidade Velha', 'Fátima', 'Nazaré', 'Reduto', 'São Brás', 'Umarizal', 'Marco']


// bairros.forEach(addItensToD);

//     function addItensToD (iten){
//         var docRef = db.collection('restaurant').doc('ciaPaulista').collection('bairros').doc();

//     docRef.set({

//         "bairros": iten,
//         "lojaResponsavel": "matriz",

//     }).then(function () {
//         console.log("doc saved");
//     }).catch(function (error) {
//         console.log(error + "we got");
//     });
//     }

module.exports = dbFuctions;