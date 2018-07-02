var express = require('express');
var brandModel = require('../models/brandModel');

var router = express.Router();

router.get('/', (req, res) => {
    brandModel.loadAll().then(rows => {
        var vm = {
            brand: rows
        };
        res.render('brand/index', vm);
    });
});

router.get('/add', (req, res) => {
    var vm = {
        showAlert: false
    };
    res.render('brand/add', vm);
});

router.post('/add', (req, res) => {
    brandModel.add(req.body).then(value => {
        var vm = {
            showAlert: true
        };
        res.render('brand/add', vm);
    }).catch(err => {
        res.end('fail');
    });
});

router.get('/delete', (req, res) => {
    var vm = {
        bra_id: req.query.id
    }
    res.render('brand/delete', vm);
});

router.post('/delete', (req, res) => {
    brandModel.delete(req.body.bra_id).then(value => {
        res.redirect('/brand');
    });
});

router.get('/edit', (req, res) => {
    brandModel.single(req.query.id).then(c => {
    	// console.log(c);
        var vm = {
            brand: b
        };
        res.render('brand/edit', vm);
    });
});

router.post('/edit', (req, res) => {
    brandModel.update(req.body).then(value => {
        res.redirect('/brand');
    }).catch(err => {
        res.end('fail');
    });
});


module.exports = router;