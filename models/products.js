const mongoose = require('mongoose');

const product = new mongoose.Schema({ /* schema is like creating a table and adding elements to it */
    name: String,
    price: Number,
    sellerName: String,
    sellerAddress: String,
    sellerPhone: Number,
    inStock: Boolean
});

const productModel = mongoose.model('product info', product);/* schema which we created is turned to model here to use CRUD*/
module.exports = productModel;/* to export the module and import it in another files */
