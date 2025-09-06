const removeProduct = async (db) => {
  const productsCollection = db.collection('products');
  const query = { Id: 2 }; // Query for the Mouse

  const result = await productsCollection.deleteOne(query);
};

module.exports = { removeProduct };