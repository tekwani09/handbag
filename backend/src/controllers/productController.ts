import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, category, family, admin } = req.query
    
    const whereClause: any = {}
    
    // Only filter by active status if not admin request
    if (!admin) {
      whereClause.active = true
    }
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ]
    }
    
    if (category) {
      whereClause.category = category as string
    }
    
    if (family) {
      whereClause.family = family as string
    }
    
    const products = await prisma.product.findMany({
      where: whereClause,
      include: { 
        colorVariants: { where: admin ? {} : { active: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ products })
  } catch (error: any) {
    console.error('Get products error:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where: { id },
      include: { 
        colorVariants: { where: { active: true } },
        parentProduct: { include: { colorVariants: { where: { active: true } } } }
      }
    })
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.json({ product })
  } catch (error: any) {
    console.error('Get product error:', error)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}

export const createProduct = async (req: any, res: Response) => {
  try {
    const { 
      name, 
      description, 
      priceGBP, 
      priceUSD, 
      priceINR, 
      comparePrice,
      sku, 
      inventory, 
      category, 
      family,
      images, 
      productModelImage,
      color, 
      colorHex, 
      featured,
      active,
      parentProductId 
    } = req.body
    
    // Normalize SKU to uppercase
    const normalizedSku = sku?.toUpperCase().trim()
    
    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        slug: name.toLowerCase().replace(/\s+/g, '-') + (color ? `-${color.toLowerCase().replace(/\s+/g, '-')}` : ''),
        description: description.trim(),
        priceGBP: parseFloat(priceGBP),
        priceUSD: parseFloat(priceUSD),
        priceINR: parseFloat(priceINR),
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        sku: normalizedSku,
        inventory: parseInt(inventory),
        category,
        family: family || null,
        images: images || [],
        productModelImage,
        color: color?.trim() || null,
        colorHex,
        featured: featured || false,
        active: active !== undefined ? active : true,
        parentProductId
      },
      include: { colorVariants: true }
    })
    
    res.status(201).json({ product })
  } catch (error: any) {
    console.error('Create product error:', error)
    
    // Handle specific Prisma errors
    if (error?.code === 'P2002') {
      const field = error.meta?.target?.[0]
      if (field === 'sku') {
        return res.status(400).json({ error: 'This SKU is already in use' })
      }
      if (field === 'slug') {
        return res.status(400).json({ error: 'A product with this name and color already exists' })
      }
      return res.status(400).json({ error: 'Duplicate entry found' })
    }
    
    res.status(500).json({ error: 'Failed to create product' })
  }
}

export const updateProduct = async (req: any, res: Response) => {
  try {
    const { id } = req.params
    const { 
      name, 
      description, 
      priceGBP, 
      priceUSD, 
      priceINR, 
      comparePrice,
      sku,
      inventory, 
      category,
      family,
      images,
      productModelImage,
      color,
      colorHex,
      featured,
      active
    } = req.body
    
    // Normalize SKU to uppercase if provided
    const normalizedSku = sku ? sku.toUpperCase().trim() : undefined
    
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: name?.trim(),
        slug: name ? name.toLowerCase().replace(/\s+/g, '-') + (color ? `-${color.toLowerCase().replace(/\s+/g, '-')}` : '') : undefined,
        description: description?.trim(),
        priceGBP: priceGBP ? parseFloat(priceGBP) : undefined,
        priceUSD: priceUSD ? parseFloat(priceUSD) : undefined,
        priceINR: priceINR ? parseFloat(priceINR) : undefined,
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        sku: normalizedSku,
        inventory: inventory ? parseInt(inventory) : undefined,
        category,
        family: family || null,
        images: images || [],
        productModelImage: productModelImage || null,
        color: color?.trim() || null,
        colorHex: colorHex || null,
        featured: featured !== undefined ? featured : undefined,
        active: active !== undefined ? active : undefined
      }
    })
    
    res.json({ product })
  } catch (error: any) {
    console.error('Update product error:', error)
    
    // Handle specific Prisma errors
    if (error?.code === 'P2002') {
      const field = error.meta?.target?.[0]
      if (field === 'sku') {
        return res.status(400).json({ error: 'This SKU is already in use' })
      }
      if (field === 'slug') {
        return res.status(400).json({ error: 'A product with this name and color already exists' })
      }
      return res.status(400).json({ error: 'Duplicate entry found' })
    }
    
    if (error?.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.status(500).json({ error: 'Failed to update product' })
  }
}

export const deleteProduct = async (req: any, res: Response) => {
  try {
    const { id } = req.params
    
    await prisma.product.update({
      where: { id },
      data: { active: false }
    })
    
    res.json({ message: 'Product deleted successfully' })
  } catch (error: any) {
    console.error('Delete product error:', error)
    
    if (error?.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.status(500).json({ error: 'Failed to delete product' })
  }
}