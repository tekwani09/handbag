import { Request, Response, NextFunction } from 'express'

// Helper function to validate password strength
function validatePasswordStrength(password: string): string[] {
  const errors: string[] = []
  
  if (!password) {
    errors.push('Password is required')
    return errors
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return errors
}

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper function to validate phone format (optional)
function isValidPhone(phone: string): boolean {
  if (!phone) return true // Optional field
  const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/
  return phoneRegex.test(phone)
}

// Validation rule interface
interface ValidationRule {
  field: string
  type: 'email' | 'minLength' | 'minValue' | 'isInt' | 'notEmpty' | 'password' | 'phone'
  value?: any
  message: string
}

export const validateRequest = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: Array<{ field: string; message: string }> = []
    const body = req.body

    console.log('Validation middleware running for:', body.email, 'with rules count:', rules.length)

    for (const rule of rules) {
      const fieldValue = body[rule.field]
      console.log(`Validating field: ${rule.field}, type: ${rule.type}, value: ${fieldValue}`)

      if (rule.type === 'notEmpty') {
        if (!fieldValue || String(fieldValue).trim() === '') {
          console.log(`Field ${rule.field} failed notEmpty`)
          errors.push({ field: rule.field, message: rule.message })
        }
      } else if (rule.type === 'email') {
        if (!fieldValue) {
          console.log(`Field ${rule.field} failed: no value`)
          errors.push({ field: rule.field, message: 'Email is required' })
        } else if (!isValidEmail(fieldValue)) {
          console.log(`Field ${rule.field} failed: invalid email`)
          errors.push({ field: rule.field, message: rule.message })
        }
      } else if (rule.type === 'password') {
        console.log(`Checking password strength for: ${fieldValue}`)
        const passwordErrors = validatePasswordStrength(fieldValue)
        console.log(`Password errors: ${JSON.stringify(passwordErrors)}`)
        if (passwordErrors.length > 0) {
          errors.push(...passwordErrors.map(msg => ({ 
            field: rule.field, 
            message: msg 
          })))
        }
      } else if (rule.type === 'phone') {
        if (fieldValue && !isValidPhone(fieldValue)) {
          errors.push({ field: rule.field, message: rule.message })
        }
      } else if (rule.type === 'minLength') {
        if (fieldValue && String(fieldValue).length < rule.value) {
          errors.push({ field: rule.field, message: rule.message })
        }
      } else if (rule.type === 'minValue') {
        if (fieldValue !== undefined && fieldValue !== null) {
          const numValue = parseFloat(fieldValue)
          if (isNaN(numValue) || numValue < rule.value) {
            errors.push({ field: rule.field, message: rule.message })
          }
        }
      } else if (rule.type === 'isInt') {
        if (fieldValue !== undefined && fieldValue !== null) {
          const intValue = parseInt(fieldValue, 10)
          if (isNaN(intValue) || intValue < 0) {
            errors.push({ field: rule.field, message: rule.message })
          }
        }
      }
    }

    console.log(`Validation complete. Total errors: ${errors.length}`)
    if (errors.length > 0) {
      console.log('Returning validation errors:', JSON.stringify(errors))
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors
      })
    }

    console.log('Validation passed, calling next()')
    next()
  }
}

// Register validation rules
export const registerValidation = validateRequest([
  { field: 'email', type: 'email', message: 'Please provide a valid email address' },
  { field: 'password', type: 'password', message: 'Password validation failed' },
  { field: 'firstName', type: 'notEmpty', message: 'First name is required' },
  { field: 'firstName', type: 'minLength', value: 2, message: 'First name must be at least 2 characters' },
  { field: 'lastName', type: 'notEmpty', message: 'Last name is required' },
  { field: 'lastName', type: 'minLength', value: 2, message: 'Last name must be at least 2 characters' },
  { field: 'phone', type: 'phone', message: 'Please provide a valid phone number' }
])

// Login validation rules
export const loginValidation = validateRequest([
  { field: 'email', type: 'email', message: 'Please provide a valid email address' },
  { field: 'password', type: 'notEmpty', message: 'Password is required' }
])

// Product validation rules
export const productCreateValidation = validateRequest([
  { field: 'name', type: 'notEmpty', message: 'Product name is required' },
  { field: 'name', type: 'minLength', value: 3, message: 'Product name must be at least 3 characters' },
  { field: 'description', type: 'notEmpty', message: 'Product description is required' },
  { field: 'priceGBP', type: 'minValue', value: 0.01, message: 'Price (GBP) must be greater than 0' },
  { field: 'priceUSD', type: 'minValue', value: 0.01, message: 'Price (USD) must be greater than 0' },
  { field: 'priceINR', type: 'minValue', value: 0.01, message: 'Price (INR) must be greater than 0' },
  { field: 'sku', type: 'notEmpty', message: 'SKU is required' },
  { field: 'inventory', type: 'isInt', message: 'Inventory must be a whole number' },
  { field: 'category', type: 'notEmpty', message: 'Category is required' }
])

// Product update validation (all optional)
export const productUpdateValidation = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body
  const errors: Array<{ field: string; message: string }> = []

  if (body.name && String(body.name).length < 3) {
    errors.push({ field: 'name', message: 'Product name must be at least 3 characters' })
  }
  if (body.priceGBP !== undefined && body.priceGBP !== null) {
    const price = parseFloat(body.priceGBP)
    if (isNaN(price) || price < 0.01) {
      errors.push({ field: 'priceGBP', message: 'Price (GBP) must be greater than 0' })
    }
  }
  if (body.priceUSD !== undefined && body.priceUSD !== null) {
    const price = parseFloat(body.priceUSD)
    if (isNaN(price) || price < 0.01) {
      errors.push({ field: 'priceUSD', message: 'Price (USD) must be greater than 0' })
    }
  }
  if (body.priceINR !== undefined && body.priceINR !== null) {
    const price = parseFloat(body.priceINR)
    if (isNaN(price) || price < 0.01) {
      errors.push({ field: 'priceINR', message: 'Price (INR) must be greater than 0' })
    }
  }
  if (body.inventory !== undefined && body.inventory !== null) {
    const inv = parseInt(body.inventory, 10)
    if (isNaN(inv) || inv < 0) {
      errors.push({ field: 'inventory', message: 'Inventory must be a whole number' })
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors
    })
  }

  next()
}
