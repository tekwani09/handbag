const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const colorMap = {
  'Black':                        '#1a1a1a',
  'Vanilla':                      '#F3EFE0',
  'Vanilla/Natural Raffia':       '#E8E0C8',
  'Tan':                          '#C19A6B',
  'Tan with Vanilla Stitch':      '#C19A6B',
  'Tan/Natural Raffia':           '#B8935A',
  'Sand':                         '#D4B896',
  'Hazelnut':                     '#9B6B3A',
  'Walnut':                       '#6B3F2A',
  'Espresso':                     '#3B1F14',
  'Toffee Suede/Espresso':        '#8B5E3C',
  'Chocolate with Vanilla Stitch':'#4A2C17',
  'Pine Green':                   '#3B5A3F',
  'Taupe':                        '#B5A99A',
  'Oat/Honey/Clay':               '#C8A97E',
}

async function run() {
  let updated = 0
  for (const [color, hex] of Object.entries(colorMap)) {
    const result = await prisma.product.updateMany({
      where: { color },
      data: { colorHex: hex },
    })
    console.log(`${color} → ${hex}  (${result.count} products)`)
    updated += result.count
  }
  console.log(`\nDone. ${updated} products updated.`)
}

run().finally(() => prisma.$disconnect())
