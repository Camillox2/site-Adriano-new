import React, { useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';

const HifuSection = React.lazy(() => import('../components/HifuSection'));
const ServicesSection = React.lazy(() => import('../components/ServicesSection'));
const AboutSection = React.lazy(() => import('../components/AboutSection'));
const TestimonialsSection = React.lazy(() => import('../components/TestimonialsSection'));
const ContactSection = React.lazy(() => import('../components/ContactSection'));

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
        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <HifuSection />
          <ServicesSection />
          <AboutSection />
          <TestimonialsSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
