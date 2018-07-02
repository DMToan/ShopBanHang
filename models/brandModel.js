var db = require('../database/db');

exports.loadAll = () => {
    var sql = `select * from brand`;
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from brand where bra_id = ${id}`;
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

exports.add = (b) => {
    var sql = `insert into brand(bra_name, catID) values('${b.bra_name}', '${b.category}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from brand where bra_id = ${id}`;
    return db.save(sql);
}

exports.update = (b) => {
    var sql = `update brand set bra_name = '${b.bra_name}' where bra_id = ${b.brandID}`;
    return db.save(sql);
}
