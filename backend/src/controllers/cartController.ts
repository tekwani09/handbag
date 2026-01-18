import { Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getCart = async (req: any, res: Response) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.userId },
      include: {
        product: true
      }
    })
    
    res.json({ cartItems })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' })
  }
}

export const addToCart = async (req: any, res: Response) => {
  try {
    const { productId, quantity = 1 } = req.body
    
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user.userId,
          productId
        }
      }
    })
    
    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: true }
      })
      res.json({ cartItem: updatedItem })
    } else {
      const cartItem = await prisma.cartItem.create({
        data: {
          userId: req.user.userId,
          productId,
          quantity
        },
        include: { product: true }
      })
      res.status(201).json({ cartItem })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' })
  }
}

export const updateCartItem = async (req: any, res: Response) => {
  try {
    const { itemId } = req.params
    const { quantity } = req.body
    
    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: itemId } })
      res.json({ message: 'Item removed from cart' })
    } else {
      const cartItem = await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
        include: { product: true }
      })
      res.json({ cartItem })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart item' })
  }
}

export const removeFromCart = async (req: any, res: Response) => {
  try {
    const { itemId } = req.params
    
    await prisma.cartItem.delete({ where: { id: itemId } })
    res.json({ message: 'Item removed from cart' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from cart' })
  }
}

export const clearCart = async (req: any, res: Response) => {
  try {
    await prisma.cartItem.deleteMany({
      where: { userId: req.user.userId }
    })
    res.json({ message: 'Cart cleared successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' })
  }
}