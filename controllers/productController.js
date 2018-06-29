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

router.get('/detail/:proId', (req, res) => {
    var proId = req.params.proId;
    productModel.single(proId).then(rows => {
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