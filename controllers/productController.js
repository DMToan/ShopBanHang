var express = require('express');
var productModel = require('../models/productModel');
var config = require('../config/config');


var router = express.Router();

router.get('/', (req, res) => {
    productModel.loadAll().then(rows => {
        var vm = {
            products: rows
        };
        res.render('product/index', vm);
    });
});

router.get('/add', (req, res) => {
    var vm = {
        showAlert: false
    };
    res.render('product/add', vm);
});

router.post('/add', (req, res) => {
    productModel.add(req.body).then(value => {
        var vm = {
            showAlert: true
        };
        res.render('product/add', vm);
    }).catch(err => {
        res.end('fail');
    });
});

router.get('/delete', (req, res) => {
    var vm = {
        pro_id: req.query.id
    }
    res.render('product/delete', vm);
});

router.post('/delete', (req, res) => {
    productModel.delete(req.body.pro_id).then(value => {
        res.redirect('/product');
    });
});

router.get('/edit', (req, res) => {
    productModel.single(req.query.id).then(c => {
        // console.log(c);
        var vm = {
            product: c
        };
        res.render('product/edit', vm);
    });
});

router.post('/edit', (req, res) => {
    productModel.update(req.body).then(value => {
        res.redirect('/product');
    }).catch(err => {
        res.end('fail');
    });
});

router.get('/byCat/:catId', (req, res) => {
    var catId = req.params.catId;

    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.ITEMS_PER_PAGE;

    var p1 = productModel.loadAllByCat(catId, offset);
    var p2 = productModel.countByCat(catId);
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
        // console.log(pRows);
        // console.log(countRows);

        var total = countRows[0].total;
        var nPages = total / config.ITEMS_PER_PAGE;
        if (total % config.ITEMS_PER_PAGE > 0) {
            nPages++;
        }

        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page
            });
        }

        var vm = {
            products: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers
        };
        res.render('product/byCat', vm);
    });
});

router.get('/byBrand/:bra_id', (req, res) => {
    var bra_id = req.params.bra_id;

    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.ITEMS_PER_PAGE;

    var p1 = productModel.loadAllByBra(bra_id, offset);
    var p2 = productModel.countByBra(bra_id);
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
        // console.log(pRows);
        // console.log(countRows);

        var total = countRows[0].total;
        var nPages = total / config.ITEMS_PER_PAGE;
        if (total % config.ITEMS_PER_PAGE > 0) {
            nPages++;
        }

        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page
            });
        }

        var vm = {
            products: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers
        };
        res.render('product/byBrand', vm);
    });
});

router.get('/detail/:pro_id', (req, res) => {
    var pro_id = req.params.pro_id;
    productModel.single(pro_id).then(rows => {
        if (rows.length > 0) {
            var vm = {
                products: rows[0]
            }
            res.render('product/detail', vm);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;