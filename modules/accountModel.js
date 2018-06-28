var database = require('../database/db');

exports.login = user => {
    var sql = `select * from users where username = '${user.username}' and password = '${user.password}'`;
    return database.load(sql);
}

exports.add = user => {
    var sql = `insert into users(username, password, isAdmin, isBlock, opendate, fullname, gender, phone, email, address) values('${user.username}', '${user.password}', '${user.isAdmin}', '${user.isBlock}', '${user.opendate}', '${user.fullname}', '${user.gender}', '${user.phone}', '${user.email}', '${user.address}')`;
    return database.save(sql);
}

exports.update = user => {
    var sql = `update users set fullname = '${user.fullname}', gender = ${user.gender}, phone = '${user.phone}', email = '${user.email}', address = '${user.address}', password = '${user.password}' where username = '${user.username}'`;
    return database.save(sql);
}

exports.load = user => {
    var sql = `select * from users where username = '${user.username}'`;
    return database.load(sql);
}

exports.loadAll = user => {
    var sql = `select * from users`;
    return database.load(sql);
}