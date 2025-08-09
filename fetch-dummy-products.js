// fetch-dummy-products.js

import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Step 1: Fetch real product data from DummyJSON
async function fetchProducts() {
  const response = await axios.get('https://dummyjson.com/products?limit=6');
  const rawProducts = response.data.products;

  // Format the data to match your React Product component
  const formatted = rawProducts.map((item) => ({
    id: item.id,
    name: item.title,
    price: item.price,
    image: item.thumbnail,
    category: item.category,
    description: item.description,
  }));

  return formatted;
}

// Step 2: Save to src/data/products.js
async function saveProducts(products) {
  const content = `const products = ${JSON.stringify(products, null, 2)};\n\nexport default products;\n`;

  const outputPath = path.join(__dirname, 'src', 'data', 'products.js');

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, content, 'utf-8');

  console.log('✅ Products saved to src/data/products.js');
}

// Run
(async () => {
  try {
    console.log('🌐 Fetching products from DummyJSON...');
    const products = await fetchProducts();
    await saveProducts(products);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();
