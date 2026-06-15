/**
 * seed-strathberry.js
 *
 * Fetches the Strathberry Mosaic Collection API, deletes all existing
 * products (and their dependants), then inserts the 20 real products.
 *
 * Usage:  node seed-strathberry.js
 */

const { PrismaClient } = require('@prisma/client')
const https = require('https')

const prisma = new PrismaClient()

// ─── helpers ────────────────────────────────────────────────────────────────

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const opts = {
      headers: {
        accept: '*/*',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36',
        referer: 'https://www.strathberry.com/collections/mosaic-collection?locale=in',
      },
    }
    https
      .get(url, opts, (res) => {
        let body = ''
        res.on('data', (c) => (body += c))
        res.on('end', () => {
          try {
            resolve(JSON.parse(body))
          } catch (e) {
            reject(new Error('JSON parse error: ' + e.message))
          }
        })
      })
      .on('error', reject)
  })
}

/** Strip HTML tags from description */
function stripHtml(html) {
  return (html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

/**
 * Map Strathberry productType + tags → Prisma ProductCategory enum
 */
function mapCategory(productType, tags) {
  const t = (productType || '').toLowerCase()
  if (t.includes('cabas')) return 'TOTES_TOP_HANDLE_BAGS'
  if (t.includes('nano')) return 'SMALL_MINI_BAGS'
  if (t.includes('shoulder')) return 'SHOULDER_BAGS'
  // Mosaic Bag — check tags for further hints
  if (tags.includes('crossbody-bags')) return 'CROSSBODY_BAGS'
  if (tags.includes('shoulder-bags')) return 'SHOULDER_BAGS'
  return 'CROSSBODY_BAGS' // safe default for Mosaic Bag
}

/**
 * Extract gallery images (jpeg only), plp image and model/hover image
 * from the metafields.mediaV2 array.
 */
function extractImages(mediaV2) {
  const gallery = (mediaV2 || [])
    .filter((m) => m.type === 'gallery' && m.media?.mimeType === 'image/jpeg')
    .map((m) => m.media.url)

  const plp = (mediaV2 || []).find((m) => m.type === 'plp')
  const plpUrl = plp?.media?.url || plp?.shopify?.image?.url || null

  const hover = (mediaV2 || []).find((m) => m.type === 'hover')
  const modelUrl = hover?.media?.url || hover?.shopify?.image?.url || null

  // images array: plp first (listing image), then the rest of gallery
  const images = plpUrl
    ? [plpUrl, ...gallery.filter((u) => u !== plpUrl)]
    : gallery

  return { images, productModelImage: modelUrl }
}

/** Convert GBP price to approximate USD and INR */
function convertPrices(gbpStr) {
  const gbp = parseFloat(gbpStr)
  return {
    priceGBP: gbp,
    priceUSD: Math.round(gbp * 1.27 * 100) / 100,   // ~1.27
    priceINR: Math.round(gbp * 107 * 100) / 100,    // ~107
  }
}

/** Build a URL-safe slug from the Shopify handle + color */
function makeSlug(handle) {
  return handle.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
}

/** Build a deterministic SKU from the variant SKU */
function makeSku(variantSku, index) {
  return variantSku || `MOSAIC-${String(index).padStart(3, '0')}`
}

// ─── main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌐  Fetching Strathberry Mosaic Collection…')
  const data = await fetchJson(
    'https://www.strathberry.com/api/collections/mosaic-collection/products'
  )
  const rawProducts = data.data.products
  console.log(`   Found ${rawProducts.length} products`)

  // ── 1. Delete all existing products (cascade dependants first) ──────────
  console.log('\n🗑️  Clearing existing products…')
  await prisma.wishlistItem.deleteMany({})
  await prisma.cartItem.deleteMany({})
  await prisma.orderItem.deleteMany({})
  await prisma.review.deleteMany({})
  await prisma.product.deleteMany({})
  console.log('   Done — all products removed')

  // ── 2. Insert new products ───────────────────────────────────────────────
  console.log('\n✨  Inserting Strathberry products…')

  const created = []

  for (let i = 0; i < rawProducts.length; i++) {
    const p = rawProducts[i]

    const variant = p.variants.edges[0]?.node
    const { priceGBP, priceUSD, priceINR } = convertPrices(variant?.price?.amount || '395')

    const colorRaw = p.title.includes(' - ')
      ? p.title.split(' - ').slice(1).join(' - ').trim()
      : (p.swatch || null)

    const { images, productModelImage } = extractImages(p.metafields?.mediaV2)

    const category = mapCategory(p.productType, p.tags)
    const slug = makeSlug(p.handle)
    const sku = makeSku(variant?.sku, i + 1)
    const description = stripHtml(p.descriptionHtml) || `${p.title} — a Strathberry Mosaic Collection piece.`
    const size = p.metafields?.size || null
    const isFeatured = p.tags.includes('new_arrivals') || p.tags.includes('bestsellers')

    const product = await prisma.product.create({
      data: {
        name: p.title,
        slug,
        description,
        priceGBP,
        priceUSD,
        priceINR,
        comparePrice: null,
        sku,
        inventory: variant?.quantityAvailable ?? 50,
        images,
        productModelImage,
        color: colorRaw,
        colorHex: null,
        featured: isFeatured,
        active: p.availableForSale,
        category,
        family: 'MOSAIC',
      },
    })

    console.log(`   [${i + 1}/20] ✅ ${product.name}  (${category})`)
    created.push(product)
  }

  console.log(`\n🎉  Seeded ${created.length} products successfully!`)
}

main()
  .catch((err) => {
    console.error('\n❌  Error:', err.message)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
