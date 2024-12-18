import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 " >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-2/4 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-400">
              We are committed to providing the best solar energy solutions to our customers. Our mission is to make renewable energy accessible and affordable for everyone.
            </p>

            {/* address */}
            <div className="mt-4">
              <h3 className="text-lg font-bold">Address</h3>
              <p className="text-gray-400">H.No-390 , khandesawantwadi, varde oros, Kudal 416521</p>
              <p className='text-gray-400'> Mobile - 9370942450 </p>

              </div>

          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <ul className="text-gray-400">
              <li className="mb-2"><a href="/products" className="hover:text-white">Products</a></li>
              <li className="mb-2"><a href="/services" className="hover:text-white">Services</a></li>
              <li className="mb-2"><a href="/" className="hover:text-white">Contact</a></li>
              <li className="mb-2"><a href="/projects" className="hover:text-white">Projects</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            
            <div className="flex mt-4 space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Saffron renewTech LTD. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;