var express = require('express');

var accountModel = require('../models/accountModel');
var restrict = require('../middle-wares/restrict');

var router = express.Router();

router.get('/', (req, res) => {
    accountModel.loadAll().then(rows => {
        var vm = {
            users: rows
        };
        res.render('account/index', vm);
    });
});

router.post('/', (req, res) => {
    // update user's {{isBlock}} here, then reload info
    accountModel.loadAll().then(rows => {
        var vm = {
            users: rows
        };
        res.render('account/index', vm);
    });
});

router.get('/login', (req, res) => {
    res.render('account/login');
});

router.post('/login', (req, res) => {
    var user = {
        username: req.body.username,
        password: req.body.rawPWD
    };

    accountModel.login(user).then(rows => {
        if (rows.length > 0) {
            req.session.isLogged = true;
            req.session.user = rows[0];
            req.session.cart = [];

            var url = '/';
            if (req.query.retUrl) {
                url = req.query.retUrl;
            }
            res.redirect(url);

        } else {
            var vm = {
                showError: true,
                errorMsg: 'Login failed'
            };
            res.render('account/login', vm);
        }
    });
});

router.get('/register', (req, res) => {
    res.render('account/register');
});

router.post('/register', (req, res) => {

    var today = new Date();
    var todayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    if (req.body.name === '') {
        var fullName = 'user_' + req.body.username;
    } else {
        var fullName = req.body.name;
    }

    var user = {
        username: req.body.username,
        password: req.body.rawPWD,
        isAdmin: 0,
        isBlock: 0,
        opendate: todayString,
        fullname: fullName,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    };

    accountModel.add(user).then(value => {
        var vm = {
            done: true
        }
        res.render('account/register', vm);
    }).catch(err => {
        res.end('fail');
    });
});


router.get('/profile', restrict, (req, res) => {
    accountModel.load(res.locals.layoutVM.curUser).then(rows => {
        req.session.user = rows[0];
        var vm = {
            User: rows[0]
        };
        res.render('account/profile', vm);
    });
});

router.post('/profile', restrict, (req, res) => {
    if (req.body.newPwd === '') {
        //console.log('thanh cong');
        var user = {
            username: req.session.user.username,
            password: req.session.user.password,
            fullname: req.body.fullname,
            gender: req.body.gender,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address
        };
        accountModel.update(user).then(value => {
            var vm = {
                showError: false,
                showSuccess: true,
                Msg: 'Cập nhật thông tin thành công'
            };
            res.render('account/profile', vm);
        }).catch(err => {
            res.end('fail');
        });
    } else {
        if (req.body.newPwd === req.body.cmpPwd) {
            //console.log('doi mat khau');
            var user = {
                username: req.session.user.username,
                password: req.body.newPwd,
                fullname: req.body.fullname,
                gender: req.body.gender,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address
            };
            accountModel.update(user).then(value => {
                var vm = {
                    showError: false,
                    showSuccess: true,
                    Msg: 'Cập nhật thông tin thành công'
                };
                res.render('account/profile', vm);
            }).catch(err => {
                res.end('fail');
            });
        } else {
            //console.log('that bai');
            var vm = {
                showError: true,
                showSuccess: false,
                Msg: 'Cập nhật thông tin thất bại'
            };
            res.render('account/profile', vm);
        };
    };
});

router.post('/logout', (req, res) => {
    req.session.isLogged = false;
    req.session.user = null;
    // req.session.cart = [];
    //res.redirect(req.headers.referer);
    res.redirect('/');
});

module.exports = router;