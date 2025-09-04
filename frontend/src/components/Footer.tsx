import { Link } from 'react-router-dom'
import CountrySwitcher from './CountrySwitcher'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Customer Care */}
          <div>
            <h4 className="text-sm font-light text-black mb-6 uppercase tracking-wide">Customer Care</h4>
            <ul className="space-y-3 text-sm font-light">
              <li><Link to="/contact" className="text-gray-600 hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link to="/size-guide" className="text-gray-600 hover:text-black transition-colors">Size Guide</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-black transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/care" className="text-gray-600 hover:text-black transition-colors">Care Instructions</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-black transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-light text-black mb-6 uppercase tracking-wide">About</h4>
            <ul className="space-y-3 text-sm font-light">
              <li><Link to="/about" className="text-gray-600 hover:text-black transition-colors">Our Story</Link></li>
              <li><Link to="/craftsmanship" className="text-gray-600 hover:text-black transition-colors">Craftsmanship</Link></li>
              <li><Link to="/sustainability" className="text-gray-600 hover:text-black transition-colors">Sustainability</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-black transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-light text-black mb-6 uppercase tracking-wide">Legal</h4>
            <ul className="space-y-3 text-sm font-light">
              <li><Link to="/privacy" className="text-gray-600 hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-black transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/cookies" className="text-gray-600 hover:text-black transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-light text-black mb-6 uppercase tracking-wide">Connect</h4>
            <ul className="space-y-3 text-sm font-light">
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Facebook</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Pinterest</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm font-light text-gray-600 mb-4 md:mb-0">
              © 2024 Strathberry. All rights reserved.
            </p>
            <CountrySwitcher />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer