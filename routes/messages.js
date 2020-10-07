/*
path: /api/messages
*/

/*
    path: api/users
 */
const { Router } = require('express');
const { getMessages } = require('../controllers/messagesControllers');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

router.get('/:from', validateJWT, getMessages);

module.exports = router;