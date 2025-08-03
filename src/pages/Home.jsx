import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HifuSection from '../components/HifuSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header fixo */}
      <Header />
      
      {/* Seção Hero - Primeira impressão */}
      <Hero />
      
      {/* Seção HIFU em destaque - Principal serviço */}
      <HifuSection />
      
      {/* Seção de todos os serviços */}
      <ServicesSection />
      
      {/* Seção sobre o Dr. Adriano */}
      <AboutSection />
      
      {/* Depoimentos dos pacientes */}
      <TestimonialsSection />
      
      {/* Contato e localização */}
      <ContactSection />
      
      {/* Rodapé */}
      <Footer />
      
      {/* Botão flutuante do WhatsApp */}
      <WhatsAppButton />
    </div>
  );
};

export default Home;