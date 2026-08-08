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

const ROUTE_SEO = {
  '/harmonizacao-orofacial': {
    title: 'Harmonização Orofacial e Estética Facial — Dr. Adriano Camillo | São Lourenço, Chapecó e Pato Branco',
    description: 'Harmonização Orofacial com resultados naturais, preenchimento e bioestimuladores com o Dr. Adriano Camillo. Atendimento de referência para São Lourenço do Oeste, Chapecó, Pato Branco e região.',
    scrollTarget: 'servicos',
  },
  '/odontologia-estetica': {
    title: 'Odontologia Estética e Planejamento do Sorriso — Dr. Adriano Camillo | SLO, Chapecó e Pato Branco',
    description: 'Clareamento dental, facetas e lentes de contato dental com planejamento personalizado para pacientes de São Lourenço do Oeste, Chapecó, Pato Branco e região.',
    scrollTarget: 'servicos',
  },
  '/implantes-dentarios': {
    title: 'Implantes Dentários e Reabilitação Oral — Dr. Adriano Camillo | São Lourenço, Chapecó e Pato Branco',
    description: 'Recupere a mastigação e a segurança para sorrir com implantes dentários modernos e tecnologia de ponta. Atendendo São Lourenço do Oeste, Chapecó, Pato Branco e região.',
    scrollTarget: 'servicos',
  },
  '/ortodontia': {
    title: 'Ortodontia e Aparelhos Dentários — Dr. Adriano Camillo | São Lourenço, Chapecó e Pato Branco',
    description: 'Aparelhos ortodônticos modernos para alinhamento dos dentes e correção da mordida. Atendimento de referência para São Lourenço do Oeste, Chapecó, Pato Branco e região.',
    scrollTarget: 'servicos',
  },
  '/dtm-dor-orofacial': {
    title: 'Tratamento de DTM, Bruxismo e Dor Orofacial — Dr. Adriano Camillo | São Lourenço, Chapecó e Pato Branco',
    description: 'Avaliação e tratamento para dor na ATM, estalos na mandíbula e bruxismo com o Dr. Adriano Camillo. Atendimento para São Lourenço do Oeste, Chapecó, Pato Branco e região.',
    scrollTarget: 'servicos',
  },
  '/ozonioterapia': {
    title: 'Ozonioterapia Odontológica — Dr. Adriano Camillo | São Lourenço, Chapecó e Pato Branco',
    description: 'Terapia complementar com ozônio medicinal para cicatrização e protocolos clínicos odontológicos. Atendimento para toda a região.',
    scrollTarget: 'servicos',
  },
  '/lipo-de-papada-hifu': {
    title: 'Lipo de Papada com HIFU (Sem Cortes) — Dr. Adriano Camillo | São Lourenço, Chapecó e Pato Branco',
    description: 'Definição do contorno mandibular e redução da papada com Ultrassom Microfocado HIFU sem cirurgia. Atendendo São Lourenço do Oeste, Chapecó, Pato Branco e região.',
    scrollTarget: 'hifu',
  },
};

const Home = () => {
  const location = useLocation();
  const currentRouteMeta = ROUTE_SEO[location.pathname];

  // Auto-scroll para a seção relevante ao acessar landing pages de serviços ou estado de navegação
  useEffect(() => {
    const target = location.state?.scrollTo || currentRouteMeta?.scrollTarget;
    if (target) {
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      if (location.state?.scrollTo) {
        window.history.replaceState({}, '');
      }
    }
  }, [location.state, location.pathname, currentRouteMeta]);

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={
          currentRouteMeta?.title ||
          'Dr. Adriano Camillo — HIFU, Ortodontia e Harmonização | São Lourenço, Chapecó e Pato Branco'
        }
        description={
          currentRouteMeta?.description ||
          'Cirurgião-dentista e especialista em HIFU (Ultrassom Microfocado), Ortodontia, Implantes e Harmonização Orofacial. Atendimento de referência para São Lourenço do Oeste, Chapecó, Pato Branco e toda a região.'
        }
        path={location.pathname}
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
