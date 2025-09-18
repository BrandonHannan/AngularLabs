const { MongoClient } = require('mongodb');
const { addProducts } = require('./add.js');
const { readProducts } = require('./read.js');
const { updateProduct } = require('./update.js');
const { removeProduct } = require('./remove.js');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db('mydb');
    const collection = db.collection('products');

    // Drop the collection to prevent duplicates on each run
    try {
      await collection.drop();
    } catch (err) {
      if (err.codeName === 'NamespaceNotFound') {
        console.log('Collection did not exist, skipping drop.');
      } else {
        throw err;
      }
    }

    // CRUD Operations
    await addProducts(db);
    console.log("First Read: ");
    var products = await readProducts(db); // Read after adding
    console.log(products);
    await updateProduct(db);
    await removeProduct(db);
    console.log("Second Read: ");
    products = await readProducts(db); // Read the final state
    console.log(products);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main();