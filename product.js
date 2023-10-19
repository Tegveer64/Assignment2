const mongoose = require('mongoose');

// Define the schema for the product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Teens'], // Assuming these are the categories, adjust if needed
        trim: true
    }
});

// Create the model from the schema and export it
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
