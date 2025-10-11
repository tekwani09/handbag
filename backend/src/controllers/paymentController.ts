import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const processPayment = async (req: Request, res: Response) => {
  try {
    console.log('Payment controller - Request body:', req.body)
    console.log('Payment controller - User from token:', (req as any).user)
    
    const { orderId, paymentMethod = 'card' } = req.body
    const userId = (req as any).user?.userId

    if (!userId) {
      console.log('Payment controller - No user ID found in token')
      return res.status(401).json({ error: 'User not authenticated' })
    }
    
    console.log('Payment controller - Processing payment for user:', userId)

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Update order status to paid
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        paymentId: `dummy_payment_${Date.now()}`,
        status: 'CONFIRMED'
      }
    })

    res.json({
      success: true,
      paymentId: `dummy_payment_${Date.now()}`,
      message: 'Payment processed successfully'
    })
  } catch (error) {
    console.error('Payment processing failed:', error)
    res.status(500).json({ error: 'Payment processing failed' })
  }
}



