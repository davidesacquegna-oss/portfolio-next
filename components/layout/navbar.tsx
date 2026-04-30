'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

// Definiamo l'interfaccia per i link di Strapi
interface MenuItem {
  id: number;
  label: string;
  href: string;
}

interface NavbarProps {
  data: {
    menuItem: MenuItem[];
  };
  logo: string | null;
}

const Navbar = ({ data, logo }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Estraiamo i link dal data di Strapi
  const navLinks = data?.menuItem || [];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            {logo && (
              <Link href="/">
                <img 
                  className="h-12 w-auto" 
                  src={`http://localhost:1337${logo}`} 
                  alt="Logo" 
                />
              </Link>
            )}
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((item) => (
              <Link 
                key={item.id} 
                href={item.href} 
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white border-t border-gray-100 shadow-xl">
          {navLinks.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;