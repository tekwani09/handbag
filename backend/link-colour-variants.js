/**
 * Links colour variants by grouping products that share the same base name.
 * e.g. "Mosaic Nano - Black" and "Mosaic Nano - Tan" → parent = first, others get parentProductId set.
 *
 * Safe to run multiple times (idempotent — only updates products with no parentProductId).
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const products = await prisma.product.findMany({
    select: { id: true, name: true, color: true, parentProductId: true },
    orderBy: { createdAt: 'asc' } // earliest created becomes the parent
  })

  // Extract base name: everything before " - <Color>"
  const getBaseName = (name) => {
    const idx = name.lastIndexOf(' - ')
    return idx !== -1 ? name.substring(0, idx).trim() : name.trim()
  }

  // Group by base name
  const groups = {}
  for (const p of products) {
    const base = getBaseName(p.name)
    if (!groups[base]) groups[base] = []
    groups[base].push(p)
  }

  let linked = 0
  let skipped = 0

  for (const [base, variants] of Object.entries(groups)) {
    if (variants.length < 2) {
      console.log(`  Skipping "${base}" — only 1 product, no variants to link`)
      skipped++
      continue
    }

    // First product (oldest) becomes the parent
    const parent = variants[0]
    const children = variants.slice(1)

    // Clear any stale parentProductId on the parent itself
    if (parent.parentProductId !== null) {
      await prisma.product.update({
        where: { id: parent.id },
        data: { parentProductId: null }
      })
      console.log(`  Cleared parentProductId on parent "${parent.name}"`)
    }

    for (const child of children) {
      if (child.parentProductId === parent.id) {
        console.log(`  Already linked: "${child.name}" → parent "${parent.name}"`)
        continue
      }
      await prisma.product.update({
        where: { id: child.id },
        data: { parentProductId: parent.id }
      })
      console.log(`  Linked: "${child.name}" → parent "${parent.name}" (${parent.id})`)
      linked++
    }
  }

  console.log(`\nDone. ${linked} products linked, ${skipped} single-product groups skipped.`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
