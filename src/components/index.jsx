// Índice centralizado de todos os componentes do site Dr. Adriano Camillo
import React from 'react';

// Importar componentes para usar na exportação default
import Header from './Header';
import Hero from './Hero';
import HifuSection from './HifuSection';
import ServicesSection from './ServicesSection';
import AboutSection from './AboutSection';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

// ===== COMPONENTES PRINCIPAIS =====
export { default as Header } from './Header';
export { default as Hero } from './Hero';
export { default as HifuSection } from './HifuSection';
export { default as ServicesSection } from './ServicesSection';
export { default as AboutSection } from './AboutSection';
export { default as TestimonialsSection } from './TestimonialsSection';
export { default as ContactSection } from './ContactSection';
export { default as Footer } from './Footer';
export { default as WhatsAppButton } from './WhatsAppButton';

// ===== COMPONENTES REUTILIZÁVEIS =====

// Componente de Loading
export const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    gray: 'border-gray-600'
  };

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-solid border-t-transparent rounded-full animate-spin`}></div>
  );
};

// Componente de Button customizado
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-lg hover:scale-105',
    secondary: 'border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600',
    whatsapp: 'bg-green-500 hover:bg-green-600 text-white hover:shadow-lg',
    ghost: 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
    disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
  }`;
  
  return (
    <button 
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoadingSpinner size="sm" color="white" /> : children}
    </button>
  );
};

// Componente de Card
export const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  shadow = 'md',
  padding = 'md',
  ...props 
}) => {
  const shadows = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const hoverEffect = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';
  
  const classes = `bg-white rounded-xl ${shadows[shadow]} ${paddings[padding]} ${hoverEffect} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Componente de Modal reutilizável
export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true 
}) => {
  if (!isOpen) return null;
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl ${sizes[size]} w-full max-h-[90vh] overflow-y-auto`}>
        {(title || showCloseButton) && (
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            {title && <h2 className="text-2xl font-bold text-gray-800">{title}</h2>}
            {showCloseButton && (
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                ✕
              </button>
            )}
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Componente de Badge/Tag
export const Badge = ({ 
  children, 
  variant = 'blue', 
  size = 'md',
  className = '' 
}) => {
  const variants = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800'
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const classes = `inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
};

// Componente de Input customizado
export const Input = ({ 
  label, 
  error, 
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-gray-700 font-semibold mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

// Componente de Textarea customizada
export const Textarea = ({ 
  label, 
  error, 
  required = false,
  className = '',
  rows = 4,
  ...props 
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-gray-700 font-semibold mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

// Componente de Select customizado
export const Select = ({ 
  label, 
  options = [], 
  error, 
  required = false,
  placeholder = 'Selecione uma opção',
  className = '',
  ...props 
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-gray-700 font-semibold mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

// Componente de Container responsivo
export const Container = ({ 
  children, 
  size = 'default',
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'max-w-3xl',
    default: 'max-w-6xl',
    lg: 'max-w-7xl',
    full: 'max-w-full'
  };
  
  const classes = `container mx-auto px-4 ${sizes[size]} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Componente de Section
export const Section = ({ 
  children, 
  background = 'white',
  padding = 'default',
  className = '',
  id,
  ...props 
}) => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-gradient-to-r from-blue-50 to-green-50',
    dark: 'bg-gray-900 text-white'
  };
  
  const paddings = {
    sm: 'py-12',
    default: 'py-20',
    lg: 'py-32'
  };
  
  const classes = `${backgrounds[background]} ${paddings[padding]} ${className}`;
  
  return (
    <section id={id} className={classes} {...props}>
      {children}
    </section>
  );
};

// Hook customizado para controle de modais
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = React.useState(initialState);
  
  const openModal = React.useCallback(() => setIsOpen(true), []);
  const closeModal = React.useCallback(() => setIsOpen(false), []);
  const toggleModal = React.useCallback(() => setIsOpen(prev => !prev), []);
  
  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
};

// Hook para scroll position
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  
  React.useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);
  
  return scrollPosition;
};

// ===== EXPORTAÇÃO DEFAULT =====
const Components = {
  Header,
  Hero,
  HifuSection,
  ServicesSection,
  AboutSection,
  TestimonialsSection,
  ContactSection,
  Footer,
  WhatsAppButton,
  LoadingSpinner,
  Button,
  Card,
  Modal,
  Badge,
  Input,
  Textarea,
  Select,
  Container,
  Section,
  useModal,
  useScrollPosition
};

export default Components;