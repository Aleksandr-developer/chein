const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

const models = require('../models');

// POST is register
router.get('/register', (req, res) => {    /////////////////////////////////////////

    const name = req.body.name;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    const surname = req.body.surname;
    const patronymic = req.body.patronymic;
    const email = req.body. email;
    const course = req.body.course;
    const path =req.body.path;

    if (!name|| !password|| !passwordConfirm ||!surname || !patronymic || !email || !course || !path) {
        res.json({
            ok: false,
            error: 'Все поля должны быть заполнены!',
            fields: ['name', 'password', 'passwordConfirm','surname', 'patronymic', 'email', 'course', 'path']
        });
    }

     else if (password !== passwordConfirm && flag) {
        res.json({
            ok: false,
            error: 'Пароли не совпадают!',
            fields: ['password', 'passwordConfirm']
        });
     } else {
         models.User.findOne({
              name
         }).then(user => {
             if (!user) {
                 bcrypt.hash(password, null, null, (err, hash) => {
                     models.User.create({
                        name,
                        surname,
                        patronymic,
                        email,
                        course,
                        path,
                        password: hash
                     })
                         .then(user => {
                             console.log(user);
                             req.session.userId = user.id;
                             req.session.userEmail = user.email;
                             res.json({
                                 ok: true
                             });
                         })
                         .catch(err => {
                             console.log(err);
                             res.json({
                                 ok: false,
                                 error: 'Ошибка, попробуйте позже!'
                             });
                         });
                 });
             } else {
                 res.json({
                     ok: false,
                     error: 'Имя занято!',
                     fields: ['name']
                 });
             }
         });
     }
});

// POST is authorized
router.post('/login', (req, res) => {
    const password = req.body.password;
    const email = req.body. email;

    if ( !password||!email ) {
        const fields = [];
        if(!email) fields.push('email');
        if(!password) fields.push('password');
        res.json({
            ok: false,
            error: 'Все поля должны быть заполнены!',
            fields
        });
    } else {
        models.User.findOne({
            email
        }).then(user => {
        if (!user) {
            res.json({
                ok: false,
                error: 'Email и пароль неверны!',
                fields: ['email', 'password']
            });
        }else {
            bcrypt.compare(password, user.password, function(err, result) {
               console.log(result);
                if (!result) {
                    res.json({
                        ok: false,
                        error: 'пароль неверен!',
                        fields: ['email', 'password']
                    });
                } else {
                    req.session.userId = user.id;
                    req.session.userEmail = user.email;
                    res.json({
                       ok: true
                    });
                }
            });
        }
    })
            .catch(err => {
                console.log(err);
                res.json({
                    ok: false,
                    error: 'Ошибка, попробуйте позже!'
                });
            });
    }

});

// GET for logout
router.get('/logout', (req, res) => {
    if (req.session) {
        // delete session object
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;