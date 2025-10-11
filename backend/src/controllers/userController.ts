import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getCart = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ cart: [] })
  } catch (error) {
    res.status(500).json({ error: 'Failed to get cart' })
  }
}

export const addToCart = async (req: Request, res: Response) => {
  try {
    res.status(201).json({ message: 'Item added to cart' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' })
  }
}

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Cart item updated' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart item' })
  }
}

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Item removed from cart' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from cart' })
  }
}

export const getUserAddresses = async (req: any, res: Response) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user.userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }]
    })
    
    res.json({ addresses })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch addresses' })
  }
}

export const createOrFindAddress = async (userId: string, addressData: any) => {
  // Check if address already exists
  const existingAddress = await prisma.address.findFirst({
    where: {
      userId,
      firstName: addressData.firstName,
      lastName: addressData.lastName,
      address1: addressData.address1,
      city: addressData.city,
      state: addressData.state || 'N/A',
      zipCode: addressData.zipCode,
      country: addressData.country
    }
  })

  if (existingAddress) {
    return existingAddress
  }

  // Check if user has any addresses to determine if this should be default
  const addressCount = await prisma.address.count({
    where: { userId }
  })

  // Create new address if it doesn't exist
  return await prisma.address.create({
    data: {
      ...addressData,
      state: addressData.state || 'N/A',
      userId,
      isDefault: addressCount === 0 // Set as default if it's the first address
    }
  })
}