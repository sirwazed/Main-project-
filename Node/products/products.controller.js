const express = require('express');
const router = express.Router();
const productService = require('./product.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const { route } = require('express/lib/application');

// routes
router.get('/get/:id', getAll); // 0 to get everything. 1 to get first 10.
router.post('/create',authorize('Admin'),register);
router.get('/category/:id', getByCategory);
router.get('/:id', getById);       
router.put('/:id',authorize('Admin'),update);
router.delete('/:id',authorize('Admin'), _delete);
// test

module.exports = router;

function getAll(req, res, next) {
    productService.getAll(req)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByCategory(req, res, next) {
    productService.getByCategory(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    productService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function register(req, res, next) {
    productService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}