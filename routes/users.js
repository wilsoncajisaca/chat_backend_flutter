/*
    path: api/users
 */
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate_jwt');
const { getUsers } = require('../controllers/userController');

const router = Router();

router.post('/', validateJWT, getUsers);

module.exports = router;