const readProducts = async (db) => {
  const productsCollection = db.collection('products');
  const products = await productsCollection.find({}).toArray();
  return products;
};

module.exports = { readProducts };