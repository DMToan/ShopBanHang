var database = require('../database/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = `select * from products`;
    return database.load(sql);
}

exports.loadNewest = () => {
    var sql = `SELECT * FROM products JOIN brands ON products.bra_id = brands.bra_id
    ORDER BY pro_date DESC limit 10`;
    return database.load(sql);
}

exports.loadBestseller = () => {
    var sql = `SELECT * FROM products JOIN brands ON products.bra_id = brands.bra_id
    ORDER BY pro_sell DESC limit 10`;
    return database.load(sql);
}

exports.loadMostview = () => {
    var sql = `SELECT * FROM products JOIN brands ON products.bra_id = brands.bra_id
    ORDER BY pro_view DESC limit 10`;
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

exports.loadAllByBra = (bra_id, offset) => {
    var sql = `select * from products where bra_id = ${bra_id} limit ${config.ITEMS_PER_PAGE} offset ${offset}`;
    return database.load(sql);
}

exports.countByBra = bra_id => {
    var sql = `select count(*) as total from products where bra_id = ${bra_id}`;
    return database.load(sql);
}

exports.single = pro_id => {
    var sql = `select * from products where Pro_id = ${pro_id}`;
    return database.load(sql);
}

exports.add = (c) => {
    var sql = `insert into products(pro_id, pro_name, pro_cost, catID, pro_date, ManHinh, 
    HDH, Cam_tr, Cam_s, CPU, Ram, Memory, Sim, Pin, bra_id, quantity) values('${c.pro_id}', '${c.pro_name}', '${c.pro_cost}', 
    '${c.catID}', '${c.date}', '${c.ManHinh}', '${c.HDH}', '${c.Cam_tr}', '${c.Cam_s}', '${c.CPU}', 
    '${c.Ram}', '${c.Memory}', '${c.Sim}', '${c.pin}', '${c.bra_id}', '${c.quantity}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from products where pro_id = ${id}`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update products set pro_name = '${c.pro_name}', pro_cost = '${c.pro_cost}', catID = '${c.catID}', 
    pro_date = '${c.pro_date}', ManHinh = '${c.ManHinh}', HDH = '${c.HDH}', Cam_tr = '${c.Cam_tr}', Cam_s = '${c.Cam_s}', CPU = '${c.CPU}', Ram = '${c.Ram}', 
    Memory = '${c.Memory}', Sim = '${c.Sim}', Pin = '${c.Pin}', bra_id = '${c.bra_id}', quantity = '${c.quantity} where pro_id = ${c.pro_id}`;
    return db.save(sql);
}

