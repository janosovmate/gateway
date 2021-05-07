 
// var express = require('express');
// var router = express.Router();

// //Google auth for mobile app
// const {OAuth2Client} = require('google-auth-library');
// //const CLIENT_ID = '543207254066-dt4ip4v88t0vod7uk801cfvvdsrsoktk.apps.googleusercontent.com'
// const CLIENT_ID = '5257994727-afpn8795sqkvn55d8al8c5ua1j73fiaj.apps.googleusercontent.com'
// const client = new OAuth2Client(CLIENT_ID);


// function checkAuthenticated(req, res, next){

//     let token = req.cookies['session-token'];

//     let user = {};
//     async function verify() {
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//         });
//         const payload = ticket.getPayload();
//         user.name = payload.name;
//         user.email = payload.email;
//         user.picture = payload.picture;
//       }
//       verify()
//       .then(()=>{
//           req.user = user;
//           next();
//       })
//       .catch(err=>{
//           res.redirect('/tokensignin')
//       })

// }


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//     let token = req.body.token;

//     res.send('tokensignin page get method responso');
// });

// router.post('/', function(req, res, next){
//     let token = req.body.token;
//     let userEmail;
//     async function verify() {
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//             // Or, if multiple clients access the backend:
//             //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//         });
//         const payload = ticket.getPayload();
//         userEmail = payload.email;
//         const userid = payload['sub'];
//         //res.send(payload);
//       }
      
//     verify()
//     .then(()=>{
//          res.cookie('session-token', token);
//          res.send(userEmail);
//     })
//     .catch(console.error);

// })

// router.get('/signout',function(req, res, next){
//     res.clearCookie('session-token');
//     res.send('logged out');
// })




// module.exports = router;

