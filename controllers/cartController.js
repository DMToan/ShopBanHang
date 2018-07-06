var express = require('express');
var cartRepo = require('../models/cartModent.js'),
    productRepo = require('../models/productModel.js');

var router = express.Router();

router.get('/', (req, res) => {

    var arr_p = [];
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = productRepo.single(cartItem.pro_id);
        arr_p.push(p);
    }

    var items = [];
    Promise.all(arr_p).then(result => {
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];
            var item = {
                Product: pro,
                quantity: req.session.cart[i].quantity,
                Amount: pro.Price * req.session.cart[i].quantity
            };
            items.push(item);
        }

        var vm = {
            items: items
        };
        res.render('cart/index', vm);
    });
});

router.post('/add', (req, res) => {
    var item = {
        pro_id: req.body.pro_id,
        quantity: +req.body.quantity
    };

    cartRepo.add(req.session.cart, item);
    res.redirect(req.headers.referer);
});

router.post('/remove', (req, res) => {
    cartRepo.remove(req.session.cart, req.body.pro_id);
    res.redirect(req.headers.referer);
});

module.exports = router;