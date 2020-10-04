/*
    path: api/auth
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { formsValidate } = require('../middlewares/forms_validate');
const { validateJWT } = require('../middlewares/validate_jwt');
const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().notEmpty().isLength({ min: 5 }),
    check('email', 'El email es obligatorio').not().notEmpty().isEmail(),
    check('password', 'La contraseña es obligatorio').isLength({ min: 8 }),
    formsValidate
], createUser);

router.post('/', [
    check('email', 'El email es obligatorio').not().notEmpty().isEmail(),
    check('password', 'La contraseña es obligatorio').isLength({ min: 8 }),
    formsValidate
], loginUser)

router.get('/renew', validateJWT, renewToken);

module.exports = router;