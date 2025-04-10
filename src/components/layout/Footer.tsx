
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="proval-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-bold text-xl text-proval-500 mb-4">Proval</h3>
            <p className="text-gray-600 mb-4">
              Professional valuation software for Land and Building Valuers in India.
            </p>
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Proval India. All rights reserved.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-proval-500 text-sm">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-proval-500 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-proval-500 text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">
                Email: support@proval-india.com
              </li>
              <li className="text-gray-600 text-sm">
                Phone: +91 98765 43210
              </li>
              <li className="text-gray-600 text-sm">
                Address: 123 Business Park, Mumbai, India
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-proval-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-proval-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-proval-500">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-proval-500">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
