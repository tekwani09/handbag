import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
  user?: any
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    console.log('Auth middleware - Headers:', req.headers.authorization)
    const token = req.header('Authorization')?.replace('Bearer ', '')
    console.log('Auth middleware - Extracted token:', token ? 'Token present' : 'No token')
    
    if (!token) {
      console.log('Auth middleware - No token provided')
      return res.status(401).json({ error: 'Access denied' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    console.log('Auth middleware - Token decoded successfully:', decoded)
    req.user = decoded
    next()
  } catch (error) {
    console.log('Auth middleware - Token verification failed:', error)
    res.status(401).json({ error: 'Invalid token' })
  }
}

export const adminAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    if (decoded.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' })
    }
    
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}