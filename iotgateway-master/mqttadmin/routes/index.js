var express = require('express');
var router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

var device_controller = require('../controllers/deviceController');

// GET catalog home page.
// router.get('/', device_controller.index);
router.get('/', ensureGuest, (req, res) => {
    res.render('login')
})

router.get('/home',  ensureAuth, device_controller.index);

// GET request for creating a Device. NOTE This must come before routes that display Device (uses id).
router.get('/device/create', ensureAuth, device_controller.device_create_get);

// POST request for creating Device.
router.post('/device/create', ensureAuth, device_controller.device_create_post);

// GET request to delete Device.
router.get('/device/:id/delete', ensureAuth, device_controller.device_delete_get);

// POST request to delete Device.
router.post('/device/:id/delete', ensureAuth, device_controller.device_delete_post);

// GET request to update Device.
router.get('/device/:id/update', ensureAuth, device_controller.device_update_get);

// POST request to update Device.
router.post('/device/:id/update', ensureAuth, device_controller.device_update_post);

// GET request for one Device.
router.get('/device/:id', ensureAuth, device_controller.device_detail);

// GET request for list of all Device items.
router.get('/devices', ensureAuth, device_controller.device_list);

module.exports = router;
