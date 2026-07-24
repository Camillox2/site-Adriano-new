import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HifuSection from '../components/HifuSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';

const Home = () => {
  const location = useLocation();

  // Permite navegar de outra rota direto para uma seção (ex.: Header em /hifu)
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      // pequeno delay para garantir que a página renderizou
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Dr. Adriano Camillo — Odontologia Estética em São Lourenço do Oeste"
        description="Dentista em São Lourenço do Oeste - SC. Odontologia estética, Ortodontia, Implantes, Harmonização Orofacial, DTM e HIFU. Agende sua avaliação pelo WhatsApp."
        path="/"
      />
      <Header />
      <main>
        <Hero />
        <HifuSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
