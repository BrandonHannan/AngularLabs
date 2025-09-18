var express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
var app = express();
const port = 3000;
app.use(cors());
var http = require('http').Server(app);

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/'));

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Holds the database connection
let db;

client.connect().then(() => {
    console.log('Connected successfully to MongoDB');
    db = client.db('mydb'); // Use the same database
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});



// API Routes

// Gets a list of products
app.get('/products', async (req, res) => {
    try {
        const productsCollection = db.collection('products');
        const products = await productsCollection.find({}).toArray();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Gets a single product given by its MongoDB Object ID
app.get('/products/:id', async (req, res) => {
    try {
        const productsCollection = db.collection('products');
        const product = await productsCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Adds a new product to the collection within the database
app.post('/products', async (req, res) => {
    try {
        const productsCollection = db.collection('products');
        const newProduct = req.body;

        const result = await productsCollection.insertOne(newProduct);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Remove a product based on its MongoDB ID
app.delete('/products/:id', async (req, res) => {
    try {
        const productsCollection = db.collection('products');
        // Convert the string ID from the URL into a MongoDB ObjectId
        const productId = new ObjectId(req.params.id);

        const result = await productsCollection.deleteOne({ _id: productId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Updates a product based on its MongoDB ID
app.put('/products/:id', async (req, res) => {
    try {
        const productsCollection = db.collection('products');
        const productId = new ObjectId(req.params.id);
        const updatedData = req.body;

        // The id cannot be updated, so remove it from the update payload
        delete updatedData._id;

        const result = await productsCollection.updateOne(
            { _id: productId },
            { $set: updatedData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).json({ message: 'Product updated successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

http.listen(port);
