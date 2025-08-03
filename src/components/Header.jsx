import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const Header = () => {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      isHeaderScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            DA
          </div>
          <div>
            <h1 className={`text-xl font-bold ${
              isHeaderScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              Dr. Adriano Camillo
            </h1>
            <p className={`text-sm ${
              isHeaderScrolled ? 'text-gray-600' : 'text-blue-100'
            }`}>
              Cirurgião Dentista
            </p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('inicio')} 
            className={`hover:text-blue-600 transition-colors ${
              isHeaderScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            Início
          </button>
          <button 
            onClick={() => scrollToSection('servicos')} 
            className={`hover:text-blue-600 transition-colors ${
              isHeaderScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            Serviços
          </button>
          <button 
            onClick={() => scrollToSection('hifu')} 
            className={`hover:text-blue-600 transition-colors ${
              isHeaderScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            HIFU
          </button>
          <button 
            onClick={() => scrollToSection('sobre')} 
            className={`hover:text-blue-600 transition-colors ${
              isHeaderScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            Sobre
          </button>
          <button 
            onClick={() => scrollToSection('contato')} 
            className={`hover:text-blue-600 transition-colors ${
              isHeaderScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            Contato
          </button>
        </nav>
        
        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
            className="hidden sm:flex bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 items-center gap-2"
          >
            <Phone size={16} />
            Agendar Consulta
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${isHeaderScrolled ? 'text-gray-800' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('servicos')}
              className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('hifu')}
              className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              HIFU
            </button>
            <button 
              onClick={() => scrollToSection('sobre')}
              className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Contato
            </button>
            <button 
              onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              Agendar Consulta
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;