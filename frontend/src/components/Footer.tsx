import { Link } from 'react-router-dom'
import CountrySwitcher from './CountrySwitcher'

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* Middle Section */}
      <div className="border-t border-gray-200 py-16" style={{backgroundColor: '#f0eee9'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Customer Care */}
            <div>
              <h4 className="text-lg font-light text-black mb-6">Customer Care</h4>
              <ul className="space-y-3">
                <li><Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">Contact Us</Link></li>
                <li><Link to="/size-guide" className="text-sm text-gray-600 hover:text-black transition-colors">Size Guide</Link></li>
                <li><Link to="/shipping" className="text-sm text-gray-600 hover:text-black transition-colors">Shipping & Returns</Link></li>
                <li><Link to="/care" className="text-sm text-gray-600 hover:text-black transition-colors">Care Instructions</Link></li>
                <li><Link to="/faq" className="text-sm text-gray-600 hover:text-black transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            {/* About */}
            <div>
              <h4 className="text-lg font-light text-black mb-6">About</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">Our Story</Link></li>
                <li><Link to="/craftsmanship" className="text-sm text-gray-600 hover:text-black transition-colors">Craftsmanship</Link></li>
                <li><Link to="/sustainability" className="text-sm text-gray-600 hover:text-black transition-colors">Sustainability</Link></li>
                <li><Link to="/careers" className="text-sm text-gray-600 hover:text-black transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="text-lg font-light text-black mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-gray-600 hover:text-black transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/cookies" className="text-sm text-gray-600 hover:text-black transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
            
            {/* Connect */}
            <div>
              <h4 className="text-lg font-light text-black mb-6">Connect</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Instagram</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Facebook</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Twitter</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Pinterest</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="border-t border-gray-200 py-8" style={{backgroundColor: '#f0eee9'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Country Selector */}
            <div>
              <CountrySwitcher />
            </div>
            
            {/* Logo */}
            <div className="text-center">
              <Link to="/" className="text-2xl font-light tracking-widest text-black hover:text-gray-600 transition-colors">
                STRATHBERRY
              </Link>
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-gray-500">
              © 2024 Strathberry. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer