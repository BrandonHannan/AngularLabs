const updateProduct = async (db) => {
  const productsCollection = db.collection('products');
  const filter = { Id: 1 }; // Filter for the Laptop
  const updateDoc = {
    $set: {
      Price: 1150.00,
      units: 45
    },
  };

  const result = await productsCollection.updateOne(filter, updateDoc);
};

module.exports = { updateProduct };