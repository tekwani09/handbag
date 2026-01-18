# Product Image Scraper & Seeder

This tool extracts product images from HTML files and saves them as products in your database.

## How It Works

1. **Extract Images**: The script reads `sample.html` and extracts all product images
2. **Group Images**: All images are grouped together for a single product
3. **Incremental Addition**: Each time you run the script, it adds a new product to `products.json`
4. **Database Seeding**: Use the seed script to save products to your database

## Files

- `scrapeImages.js` - Extracts images from HTML and creates product data
- `seedProducts.js` - Seeds products from JSON into the database
- `products.json` - Stores all extracted products with their images
- `sample.html` - Source HTML file with product images

## Usage

### Step 1: Extract Images from HTML

```bash
node scrapeImages.js
```

This will:
- Read `sample.html`
- Extract all product images (up to 10 per product)
- Extract product name and price
- Add a new product to `products.json`
- Preserve existing products in the file

**Output:**
```
✅ Added new product: "Melody Tote - Taupe"
📸 With 10 images
💰 Price: £545
📦 Stock: 58
📊 Total products in database: 1
```

### Step 2: Seed Products to Database

```bash
node seedProducts.js
```

This will:
- Read all products from `products.json`
- Create them in your PostgreSQL database using Prisma
- Display progress for each product

**Output:**
```
🌱 Starting to seed products...

✅ Created: Melody Tote - Taupe
   💰 Price: £545
   📦 Stock: 58
   📸 Images: 10

🎉 Successfully seeded 1 product(s)!
📊 Total products in database: 1
```

## Product Data Structure

Each product in `products.json` has:

```json
{
  "id": 1,
  "name": "Melody Tote - Taupe",
  "description": "Luxury handbag with premium materials and exquisite craftsmanship",
  "price": 545,
  "category": "Handbags",
  "stock": 58,
  "images": [
    "https://cdn.shopify.com/s/files/.../image1.jpg",
    "https://cdn.shopify.com/s/files/.../image2.jpg",
    ...
  ],
  "mainImage": "https://cdn.shopify.com/s/files/.../image1.jpg",
  "createdAt": "2026-01-15T09:36:51.978Z"
}
```

## Adding More Products

1. Replace `sample.html` with a new product page HTML
2. Run `node scrapeImages.js` again
3. The new product will be added to `products.json`
4. Run `node seedProducts.js` to update the database

## Tips

- The script automatically extracts the product name from the HTML `<h1>` tag
- Price is extracted from the first £ symbol found
- Images are filtered to only include product gallery images
- The first image is set as the main image
- Stock is randomly generated (10-60 units)

## Reset Products

To start fresh:

```bash
rm products.json
node scrapeImages.js
```

## Notes

- The script preserves image order from the HTML
- Duplicate images are automatically removed
- Query parameters are stripped from image URLs
- Maximum 10 images per product
