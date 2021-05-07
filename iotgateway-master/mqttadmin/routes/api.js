var express = require('express');
var router = express.Router();
const Device = require('../models/device');

//Google auth for mobile app
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

var api_device_controller = require('../controllers/apiDeviceController');

function checkAuthenticated(req, res, next){

        let token = req.cookies['session-token'];
        
        let user = {};
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the GOOGLE_CLIENT_ID of the app that accesses the backend
            });
            const payload = ticket.getPayload();
            user.name = payload.name;
            user.email = payload.email;
            user.picture = payload.picture;
            user.googleId = payload.sub;
            }
            verify()
              .then(()=>{
                  req.user = user;
                  next();
              })
              .catch(err=>{
                  res.redirect('/tokensignin')
              })
    }

router.get('/', function(req, res, next){
        res.send('haha');
});

router.post('/device/create',  checkAuthenticated , api_device_controller.device_create_post);

router.get('/devices', checkAuthenticated, api_device_controller.device_list_get);

router.post('/devices', checkAuthenticated, api_device_controller.device_list_post);

router.get('/device/:id', checkAuthenticated, api_device_controller.device_get);

router.delete('/device/:id', checkAuthenticated, api_device_controller.device_delete);

router.post('/device/:id/update', checkAuthenticated, api_device_controller.device_update);
    
router.get('/tokensignin', function(req, res, next) {
        res.send('tokensignin page get method response');
});
    
router.post('/tokensignin', function(req, res, next){
        let token = req.body.token;

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the GOOGLE_CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            
            const payload = ticket.getPayload();
            
            console.log("token issued " + payload.iat);
            console.log("token expiration date: "+payload.exp);   
            googleId = payload.sub;
            
        }
        verify()
        .then(()=>{
             res.cookie('session-token', token);
             res.send(googleId);
        })
        .catch(console.error);
})
    
router.get('/tokensignout',function(req, res, next){
    res.clearCookie('session-token');
    res.send('logged out');
})

module.exports = router;