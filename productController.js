const Product = require('./product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.addNewProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateProductById = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).send('Product not found');
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.removeProductById = async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.json({ message: "Product removed." });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.removeAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.json({ message: "All products removed." });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.findProductsByName = async (req, res) => {
    try {
        const keyword = req.query.name;
        const products = await Product.find({ name: new RegExp(keyword, 'i') });
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
};

