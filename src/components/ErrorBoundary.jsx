import React from 'react';
import { whatsapp } from '../utils/constants';

const FALLBACK_WHATSAPP = whatsapp('Olá, Dr. Adriano! Vim pelo site e gostaria de mais informações.');

// Evita que um erro em uma página deixe o site inteiro em branco
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Erro ao renderizar a página:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 text-white">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-2xl font-bold">Não foi possível carregar esta página.</h1>
            <p className="text-slate-300">
              Fale com a nossa equipe pelo WhatsApp ou volte para a página inicial.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={FALLBACK_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Falar no WhatsApp
              </a>
              <a href="/" className="btn-outline-light">
                Página inicial
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
