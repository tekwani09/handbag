import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, category } = req.query
    
    const whereClause: any = { active: true }
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { category: { name: { contains: search as string, mode: 'insensitive' } } }
      ]
    }
    
    if (category) {
      whereClause.category = { slug: category as string }
    }
    
    const products = await prisma.product.findMany({
      where: whereClause,
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ products })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    })
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.json({ product })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}

export const createProduct = async (req: any, res: Response) => {
  try {
    const { name, description, priceGBP, priceUSD, priceINR, sku, inventory, categoryId, images } = req.body
    
    const product = await prisma.product.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description,
        priceGBP: parseFloat(priceGBP),
        priceUSD: parseFloat(priceUSD),
        priceINR: parseFloat(priceINR),
        sku,
        inventory: parseInt(inventory),
        categoryId,
        images: images || [],
        active: true
      },
      include: { category: true }
    })
    
    res.status(201).json({ product })
  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({ error: 'Failed to create product' })
  }
}

export const updateProduct = async (req: any, res: Response) => {
  try {
    const { id } = req.params
    const { name, description, priceGBP, priceUSD, priceINR, inventory, images } = req.body
    
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description,
        priceGBP: parseFloat(priceGBP),
        priceUSD: parseFloat(priceUSD),
        priceINR: parseFloat(priceINR),
        inventory: parseInt(inventory),
        images: images || []
      },
      include: { category: true }
    })
    
    res.json({ product })
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' })
  }
}