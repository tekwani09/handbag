import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { createOrFindAddress } from './userController'

const prisma = new PrismaClient()

export const createOrder = async (req: any, res: Response) => {
  try {
    console.log('Create order - Request body:', JSON.stringify(req.body, null, 2))
    console.log('Create order - User from token:', req.user)
    
    const { items, shippingAddress, total, subtotal, shipping, tax = 0 } = req.body
    
    if (!items || items.length === 0) {
      console.log('Create order - No items provided')
      return res.status(400).json({ error: 'No items provided' })
    }
    
    // Create or find existing address
    console.log('Create order - Creating/finding address for user:', req.user.userId)
    const address = await createOrFindAddress(req.user.userId, shippingAddress)
    console.log('Create order - Address resolved:', address.id)
    
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
        status: 'PENDING',
        paymentStatus: 'PENDING'
      }
    })
    
    // Create order items
    for (const item of items) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }
      })
      
      // Update product inventory
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          inventory: {
            decrement: item.quantity
          }
        }
      })
    }
    
    // Clear user's cart after successful order creation
    await prisma.cartItem.deleteMany({
      where: { userId: req.user.userId }
    })
    
    console.log('Create order - Order created successfully and cart cleared:', order.id)
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
    console.log('Get order - Order ID:', id)
    console.log('Get order - User ID:', req.user.userId)
    
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
    
    console.log('Get order - Found order:', !!order)
    
    if (!order) {
      console.log('Get order - Order not found')
      return res.status(404).json({ error: 'Order not found' })
    }
    
    console.log('Get order - Returning order data')
    res.json({ order })
  } catch (error) {
    console.error('Get order error:', error)
    res.status(500).json({ error: 'Failed to fetch order' })
  }
}