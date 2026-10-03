import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

interface AuthRequest extends Request {
  user?: any
}

const prisma = new PrismaClient()

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body

    console.log('Register - Request received:', { email, firstName, lastName, phone: !!phone })

    // Normalize email to lowercase and trim whitespace
    const normalizedEmail = email?.toLowerCase().trim()

    if (!normalizedEmail || !password || !firstName || !lastName) {
      console.log('Register - Missing required fields')
      return res.status(400).json({ error: 'Missing required fields' })
    }
    
    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } })
    if (existingUser) {
      console.log('Register - Email already registered:', normalizedEmail)
      return res.status(400).json({ error: 'This email is already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone?.trim() || null,
        role: 'CUSTOMER'
      }
    })

    console.log('Register - User created successfully:', user.id)

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    )

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Handle specific Prisma errors
    if (error?.code === 'P2002') {
      console.log('Register - Duplicate key error')
      return res.status(400).json({ error: 'This email is already registered' })
    }
    
    res.status(500).json({ error: 'Registration failed. Please try again.' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Normalize email to lowercase and trim whitespace
    const normalizedEmail = email?.toLowerCase().trim()

    if (!normalizedEmail || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }
    
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    )

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    })
  } catch (error: any) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed. Please try again.' })
  }
}

export const getProfile = async (req: any, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        createdAt: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json({ user })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ error: 'Failed to get profile' })
  }
}

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { firstName, lastName, phone } = req.body
    
    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: { firstName, lastName, phone },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true
      }
    })

    res.status(200).json({ message: 'Profile updated', user })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Failed to update profile' })
  }
}