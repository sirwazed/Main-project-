const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Product = db.Product;

module.exports = {
    getAll,
    getByCategory,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(req) {
    if(req.params.id == 0){
        return await Product.find();
    }
    else{
        console.log("yes");
        let num = parseInt(req.params.id);
        return await Product.find().skip((num-1)*10).limit(10);
    }
}

async function getById(id) {
    //console.log(id);
    return await Product.findById(id);
}

async function getByCategory(id) {
    //console.log(id);
    return await Product.find({category: id});
}


async function create(userParam) {
    // validate
    if (await Product.findOne({ productShortCode: userParam.productShortCode })) {
        throw 'productShortCode "' + userParam.productShortCode + '" is already taken';
    }

    const product = new Product(userParam);

    await product.save();
}

async function update(id, userParam) {
    const product = await Product.findById(id);
    Object.assign(product, userParam);

    await product.save();
}

async function _delete(id) {
    await Product.findByIdAndRemove(id);
}