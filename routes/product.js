const express = require('express');
// starting a router

const router = express();
const productModel = require('../models/products');

// REST

router.get('/', function(req, res){
    res.send('landing page');
});

// 1. Index -> display all products

router.get('/products', async function (req, res) {
    try {
        
        const products = await productModel.find();
        res.render('index', {products});

    } catch (error) {
        res.send(error);
    }
});

// 2. New -> shows a form

router.get('/products/new', function (req, res) {
    res.render('new');
})

// 3. Create -> Insert a product into db

router.post('/products', async function (req, res) {
    try {
        let inStock = req.body.inStock ? true : false;
        const newProduct = new productModel({
            name: req.body.name,
            price: req.body.price,
            sellerName: req.body.sellerAddress,
            sellerPhone: req.body.sellerPhone,
            inStock: inStock
        });
        await newProduct.save();
        console.log('product added to db');
        res.redirect('/products');

    } catch (error) {
        res.send(error);
    }
})

// 4. Show -> displays details of one product

router.get('/products/:id', async function(req, res) {
    try {
        const product = await productModel.findById(req.params.id);
        res.render('show', {product});

    } catch (error) {
        res.send(error);
    }
});

// 5. Edit -> edit form

router.get('/products/:id/edit', async function(req, res) {
    try {

        const product = await productModel.findById(req.params.id);
        res.render('edit', {product});

    } catch (error) {
        res.send(error);
    }
})

// 6. Update -> update info in db

router.patch('/products/:id', async function(req, res) {
    try {
        let inStock = req.body.inStock ? true : false;
        const dataOfProductToUpdate = {
            name: req.body.name,
            price: req.body.price,
            sellerName: req.body.sellerAddress,
            sellerPhone: req.body.sellerPhone,
            inStock:inStock
        };
        await productModel.findByIdAndUpdate(req.params.id, dataOfProductToUpdate);
        res.redirect('/products');
    } catch (error) {
        res.send(error);
    }
});

// 7. Delete/Destroy -> delete the specific product

router.delete('/products/:id', async function(req, res) {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (error) {
        res.send(error);
    }
});

router.get('*', function(req, res) {
    res.send('page not found');
})

module.exports = router;