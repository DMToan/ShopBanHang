var database = require('../database/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = `select * from products`;
    return database.load(sql);
}

exports.loadAllByCat = (catId, offset) => {
    var sql = `select * from products where CatID = ${catId} limit ${config.ITEMS_PER_PAGE} offset ${offset}`;
    return database.load(sql);
}

exports.countByCat = catId => {
	var sql = `select count(*) as total from products where CatID = ${catId}`;
    return database.load(sql);
}

exports.single = proId => {
    var sql = `select * from products where ProId = ${proId}`;
    return database.load(sql);
}

exports.add = (c) => {
    var sql = `insert into products(pro_name, pro_cost, pro_date, ManHinh, 
    HDH, Cam_tr, Cam_s, CPU, Ram, Memory, Sim, bra_id, quantity) values('${c.pro_name}', '${c.pro_cost}', 
    '${c.pro_date}', '${c.ManHinh}', '${c.HDH}', '${c.Cam_tr}', '${c.Cam_s}', '${c.CPU}', 
    '${c.Ram}', '${c.Memory}', '${c.Sim}', '${c.bra_id}', '${c.quantity}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from products where pro_id = ${id}`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update products set pro_name = '${c.pro_name}' where pro_id = ${c.pro_id}`;
    return db.save(sql);
}
