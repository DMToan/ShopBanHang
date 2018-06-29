var db = require('../database/db');

exports.loadAll = () => {
    var sql = `select * from categories`;
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from categories where catID = ${id}`;
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.add = (c) => {
    var sql = `insert into categories(catName, isService) values('${c.catName}', '${c.isService}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from categories where catID = ${id}`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update categories set catName = '${c.catName}' where catID = ${c.catId}`;
    return db.save(sql);
}
