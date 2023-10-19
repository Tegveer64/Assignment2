const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productController = require('./productController');  // Assuming productController.js is in the same directory

const app = express();
const PORT = process.env.PORT || 3000;

// Replace the placeholders with your Atlas credentials
const ATLAS_URI = "mongodb+srv://tegveer1:9522@cluster0.icyb7sd.mongodb.net/?retryWrites=true&w=majority";

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Atlas database connection established successfully");
});

app.get('/', (req, res) => {
    res.send('Welcome to the Marketplace App');
});


// Define the routes for handling CRUD operations
app.get('/api/products', productController.getAllProducts);
app.get('/api/products/:id', productController.getProductById);
app.post('/api/products', productController.addNewProduct); 
app.put('/api/products/:id', productController.updateProductById);
app.delete('/api/products/:id', productController.removeProductById);
app.delete('/api/products', productController.removeAllProducts);
app.get('/api/products?name=:kw', productController.findProductsByName);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
