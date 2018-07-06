exports.add = (cart, item) => {
    for (i = cart.length - 1; i >= 0; i--) {
        if (cart[i].pro_id === item.pro_id) {
            cart[i].quantity += item.quantity;
            return;
        }
    }

    cart.push(item);
}

exports.remove = (cart, pro_id) => {
    for (var i = cart.length - 1; i >= 0; i--) {
        if (pro_id === cart[i].pro_id) {
            cart.splice(i, 1);
            return;
        }
    }
}