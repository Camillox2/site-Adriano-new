import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight, Search, Mail, Send, MessageCircle } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { images } from '../assets';

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Extrair todas as categorias únicas
  const categories = ['Todos', ...new Set(BLOG_POSTS.map(post => post.category))];

  // Filtrar os posts com base na busca e na categoria
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100/60 via-slate-200/70 to-slate-300/80 pt-24 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Animado - Centralizado */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 bg-white p-2 pr-6 rounded-full border border-emerald-200 shadow-md mb-6">
            <img 
              src={images.drAdriano} 
              alt="Dr. Adriano Camillo" 
              className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500 shadow"
            />
            <div className="text-left">
              <span className="block font-bold text-slate-800 text-sm">Dr. Adriano Camillo</span>
              <span className="block text-xs text-emerald-700 font-bold">CRO/SC 4011 • Cirurgião-Dentista</span>
            </div>
          </div>

          <span className="text-emerald-700 font-bold tracking-wider uppercase text-sm mb-3 block">
            Conteúdo Exclusivo
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 font-display leading-tight">
            Blog da Clínica Odontológica <br className="hidden md:block" />
            <span className="text-emerald-700">Dr. Adriano Camillo</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8 leading-relaxed">
            Fique por dentro das novidades, descubra mitos e verdades sobre tratamentos estéticos e acompanhe as melhores dicas de saúde bucal.
          </p>
          <a 
            href={`https://wa.me/5549998362864?text=${encodeURIComponent('Olá, vim pelo Blog e gostaria de agendar uma avaliação.')}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-1 text-base"
          >
            <MessageCircle size={20} />
            Agendar Avaliação
          </a>
        </div>

        {/* Barra de Pesquisa e Filtros */}
        <div className="mb-12 space-y-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          
          {/* Barra de Pesquisa */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar artigos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-300 text-slate-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all placeholder:text-slate-400 shadow-md"
            />
          </div>

          {/* Filtros de Categoria */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-700/30 scale-105' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-emerald-700 border border-slate-300 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback de Busca */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Nenhum artigo encontrado</h3>
            <p className="text-slate-600">Tente buscar por outras palavras-chave ou limpe os filtros.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('Todos');}}
              className="mt-6 px-6 py-2 bg-emerald-50 text-emerald-600 font-semibold rounded-full hover:bg-emerald-100 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* Grid de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredPosts.map((post, index) => (
            <article 
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 flex flex-col group animate-fade-in-up"
              style={{ animationDelay: `${(index % 6) * 100}ms` }}
            >
              <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden aspect-[16/10]">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-emerald-700 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                    <Tag size={12} />
                    {post.category}
                  </span>
                </div>
              </Link>

              <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                {/* Linha decorativa no hover */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-emerald-600" />
                    {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-tight">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-slate-600 text-sm mb-8 line-clamp-3 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                <Link 
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm hover:text-emerald-500 transition-all mt-auto w-fit group/link"
                >
                  Leia mais
                  <span className="bg-emerald-50 p-1 rounded-full group-hover/link:bg-emerald-100 transition-colors">
                    <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Sessão Newsletter */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 border border-emerald-500/30 p-8 md:p-16 shadow-2xl animate-fade-in-up">
          {/* Efeitos de fundo verde fortinho */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-400/25 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Mail size={16} />
                Newsletter Exclusiva do Dr. Adriano
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                Receba dicas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">saúde & estética</span>
              </h3>
              <p className="text-slate-200 text-lg leading-relaxed">
                Inscreva-se com seu e-mail e receba artigos novos, dicas de saúde bucal, avisos sobre mitos da harmonização e novidades da clínica diretamente no seu e-mail ou WhatsApp!
              </p>
            </div>
            
            <form 
              className="relative flex flex-col sm:flex-row gap-3" 
              onSubmit={(e) => { 
                e.preventDefault(); 
                const emailInput = e.target.elements.email.value;
                const message = encodeURIComponent(`Olá Dr. Adriano! Gostaria de me cadastrar na newsletter com o e-mail: ${emailInput}`);
                window.open(`https://wa.me/5549998362864?text=${message}`, '_blank');
              }}
            >
              <input 
                name="email"
                type="email" 
                required
                placeholder="Digite seu e-mail..." 
                className="flex-grow bg-slate-950/90 border border-emerald-500/40 text-white rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent placeholder:text-slate-400 font-medium"
              />
              <button 
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-emerald-400/30 flex items-center justify-center gap-2 text-base shrink-0"
              >
                Quero Receber <Send size={18} />
              </button>
            </form>
          </div>

          {/* CRO Info */}
          <div className="relative z-10 mt-12 pt-6 border-t border-emerald-700/40 text-center text-slate-300 text-sm font-medium">
            <p>Dr. Adriano R. Camillo • Cirurgião-Dentista • CRO/SC 4011</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogList;
