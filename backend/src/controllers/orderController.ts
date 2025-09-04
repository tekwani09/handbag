import { Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createOrder = async (req: any, res: Response) => {
  try {
    const { shippingAddress } = req.body
    
    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.userId },
      include: { product: true }
    })
    
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' })
    }
    
    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => 
      sum + (parseFloat(item.product.priceGBP.toString()) * item.quantity), 0
    )
    const tax = subtotal * 0.2 // 20% VAT
    const shipping = subtotal > 150 ? 0 : 10 // Free shipping over £150
    const total = subtotal + tax + shipping
    
    // Create address
    const address = await prisma.address.create({
      data: {
        ...shippingAddress,
        userId: req.user.userId
      }
    })
    
    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: `STR${Date.now()}`,
        userId: req.user.userId,
        subtotal,
        tax,
        shipping,
        total,
        shippingAddressId: address.id,
        status: 'PENDING'
      }
    })
    
    // Create order items
    for (const cartItem of cartItems) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: cartItem.product.priceGBP
        }
      })
      
      // Update product inventory
      await prisma.product.update({
        where: { id: cartItem.productId },
        data: {
          inventory: {
            decrement: cartItem.quantity
          }
        }
      })
    }
    
    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { userId: req.user.userId }
    })
    
    res.status(201).json({ order, message: 'Order created successfully' })
  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({ error: 'Failed to create order' })
  }
}

export const getOrders = async (req: any, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.userId },
      include: {
        items: {
          include: { product: true }
        },
        shippingAddress: true
      },
      orderBy: { createdAt: 'desc' }
    })
    
    res.json({ orders })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
}

export const getOrder = async (req: any, res: Response) => {
  try {
    const { id } = req.params
    
    const order = await prisma.order.findFirst({
      where: { 
        id,
        userId: req.user.userId 
      },
      include: {
        items: {
          include: { product: true }
        },
        shippingAddress: true
      }
    })
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    
    res.json({ order })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' })
  }
}