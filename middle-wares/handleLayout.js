var categoryModel = require('../models/categoryModel');
var brandModel = require('../models/brandModel')
module.exports = (req, res, next) => {

	if (req.session.isLogged === undefined) {
		req.session.isLogged = false;
	}

    categoryModel.loadAll().then(rows => {
        res.locals.layoutVM = {
            categories: rows,
            isLogged: req.session.isLogged,
            curUser: req.session.user
        };

        // console.log(res.locals.layoutVM.curUser);
        next();
    });
};