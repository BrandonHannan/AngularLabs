const addProducts = async (db) => {
  const productsCollection = db.collection('products');
  const products = [
    { Id: 1, Name: 'Laptop', Description: 'High performance laptop', Price: 1200.50, units: 50 },
    { Id: 2, Name: 'Mouse', Description: 'Ergonomic wireless mouse', Price: 25.00, units: 150 },
    { Id: 3, Name: 'Keyboard', Description: 'Mechanical keyboard with RGB', Price: 75.99, units: 100 }
  ];

  const result = await productsCollection.insertMany(products);
};

module.exports = { addProducts };