import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight, Search, Mail, Send } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

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
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Animado */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-emerald-500 font-semibold tracking-wider uppercase text-sm mb-3 block">
            Conteúdo Exclusivo
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600 mb-6 pb-2 font-display">
            Blog da Clínica Odontológica <br className="hidden md:block" /><span className="text-emerald-400">Dr. Adriano Camillo</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Fique por dentro das novidades, descubra mitos e verdades sobre tratamentos estéticos e acompanhe as melhores dicas de saúde bucal.
          </p>
        </div>

        {/* Barra de Pesquisa e Filtros */}
        <div className="mb-12 space-y-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          
          {/* Barra de Pesquisa */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar artigos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-600 shadow-inner"
            />
          </div>

          {/* Filtros de Categoria */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback de Busca */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800/50">
            <Search className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhum artigo encontrado</h3>
            <p className="text-slate-400">Tente buscar por outras palavras-chave ou limpe os filtros.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('Todos');}}
              className="mt-6 px-6 py-2 bg-emerald-600/20 text-emerald-400 rounded-full hover:bg-emerald-600/30 transition-colors"
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
              className="bg-slate-900/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-800/80 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] hover:-translate-y-2 flex flex-col group animate-fade-in-up"
              style={{ animationDelay: `${(index % 6) * 100}ms` }}
            >
              <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden aspect-[16/10]">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
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

                <h2 className="text-xl font-bold text-slate-100 mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors leading-tight">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-slate-400 text-sm mb-8 line-clamp-3 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                <Link 
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-emerald-500 font-bold text-sm hover:text-emerald-400 transition-all mt-auto w-fit group/link"
                >
                  Leia mais
                  <span className="bg-emerald-500/10 p-1 rounded-full group-hover/link:bg-emerald-500/20 transition-colors">
                    <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Sessão Newsletter */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-800/30 p-8 md:p-16 animate-fade-in-up">
          {/* Efeitos de fundo */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Mail size={16} />
                Newsletter Exclusiva
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Fique por dentro das <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">novidades</span>
              </h3>
              <p className="text-slate-300 text-lg">
                Receba diretamente no seu e-mail artigos novos, dicas práticas de saúde bucal, alertas sobre mitos da estética e convites para eventos exclusivos da clínica. Sem spam, apenas conteúdo de valor!
              </p>
            </div>
            
            <form className="relative flex flex-col sm:flex-row gap-3" onSubmit={(e) => { e.preventDefault(); alert('Inscrição realizada com sucesso!'); }}>
              <input 
                type="email" 
                required
                placeholder="Digite seu e-mail..." 
                className="flex-grow bg-slate-950/80 border border-slate-700/50 text-white rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-500"
              />
              <button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2"
              >
                Assinar <Send size={18} />
              </button>
            </form>
          </div>

          {/* CRO Info */}
          <div className="relative z-10 mt-12 pt-6 border-t border-slate-800/50 text-center text-slate-500 text-sm">
            <p>Dr. Adriano R. Camillo • Cirurgião Dentista • CRO/SC 4011</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogList;
