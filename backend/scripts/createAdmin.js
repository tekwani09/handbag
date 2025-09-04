const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const email = 'admin@strathberry.com'
    const password = 'admin123'
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN'
      }
    })
    
    console.log('Admin user created successfully:')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('ID:', admin.id)
    
  } catch (error) {
    console.error('Error creating admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()