const fs = require('fs');
const path = require('path');

// Read the HTML file
const html = fs.readFileSync(path.join(__dirname, 'sample.html'), 'utf-8');

// Extract image URLs using regex
const imageRegex = /https:\/\/cdn\.shopify\.com\/s\/files\/[^"'\s]+\.(?:jpg|png|webp)/gi;
const images = [...new Set(html.match(imageRegex) || [])];

// Filter for product images (gallery images)
const productImages = images.filter(url => 
  url.includes('cms-pm-gallery') || 
  url.includes('cms-pm-hero') || 
  url.includes('cms-pm-plp')
).map(url => url.split('?')[0]); // Remove query params

// Extract product name from HTML (looking for the title)
const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
const productName = titleMatch ? titleMatch[1].trim() : 'Melody Tote';

// Extract price from HTML
const priceMatch = html.match(/£(\d+)/);
const price = priceMatch ? parseInt(priceMatch[1]) : Math.floor(Math.random() * 500) + 200;

// Read existing products or create new array
let products = [];
const productsFilePath = path.join(__dirname, 'products.json');

if (fs.existsSync(productsFilePath)) {
  products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  console.log(`📂 Found ${products.length} existing product(s)`);
}

// Create new product with all images
const newProduct = {
  id: products.length + 1,
  name: productName,
  description: 'Luxury handbag with premium materials and exquisite craftsmanship',
  price: price,
  category: 'Handbags',
  stock: Math.floor(Math.random() * 50) + 10,
  images: productImages.slice(0, 10), // Take up to 10 images
  mainImage: productImages[0] || '', // First image as main
  createdAt: new Date().toISOString()
};

// Add new product to array
products.push(newProduct);

// Save to JSON file
fs.writeFileSync(
  productsFilePath,
  JSON.stringify(products, null, 2)
);

console.log(`\n✅ Added new product: "${newProduct.name}"`);
console.log(`📸 With ${newProduct.images.length} images`);
console.log(`💰 Price: £${newProduct.price}`);
console.log(`📦 Stock: ${newProduct.stock}`);
console.log(`\n📊 Total products in database: ${products.length}`);
console.log('📁 Saved to products.json');
