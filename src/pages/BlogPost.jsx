import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { WHATSAPP_DEFAULT } from '../utils/constants';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundPost = BLOG_POSTS.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate('/blog', { replace: true });
    }
  }, [slug, navigate]);

  if (!post) return null;

  // Função para compartilhar a página
  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Confira este artigo: ${post.title}`;
    
    let shareUrl = '';
    switch (platform) {
      case 'whatsapp': shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`; break;
      case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break;
      case 'twitter': shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`; break;
      case 'linkedin': shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}`; break;
      default: break;
    }
    
    if (shareUrl) window.open(shareUrl, '_blank');
  };

  const renderContent = () => {
    return post.content.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return <p key={index} className="text-slate-300 text-lg leading-relaxed mb-6 font-light">{block.text}</p>;
        
        case 'heading':
          return <h2 key={index} className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 leading-tight">{block.text}</h2>;
        
        case 'list':
          return (
            <ul key={index} className="list-none space-y-4 mb-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              {block.items.map((item, i) => (
                <li key={i} className="flex items-start text-slate-300">
                  <span className="text-emerald-500 mr-3 mt-1">✦</span>
                  <span className="text-lg font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          );
          
        case 'cta':
          return (
            <div key={index} className="my-10 bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/20 p-8 rounded-3xl text-center relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-colors" />
              
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{block.text}</h3>
              <a 
                href={WHATSAPP_DEFAULT || "https://wa.me/5549998362864"} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 relative z-10"
              >
                <MessageCircle size={20} />
                Falar com a Clínica no WhatsApp
              </a>
            </div>
          );
          
        default:
          return null;
      }
    });
  };

  return (
    <article className="min-h-screen bg-slate-950 pt-24 pb-20">
      
      {/* Imagem de Capa e Header (Hero) */}
      <header className="relative w-full h-[50vh] md:h-[60vh] flex items-end mb-12 animate-fade-in">
        <div className="absolute inset-0">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full pb-8 md:pb-16 text-center md:text-left">
          <Link to="/blog" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium mb-6 transition-colors hover:-translate-x-1">
            <ArrowLeft size={16} /> Voltar para o Blog
          </Link>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-300 text-sm">
              <Calendar size={14} className="text-emerald-500" />
              {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              AC
            </div>
            <div className="text-left">
              <p className="text-white font-medium">{post.author}</p>
              <p className="text-slate-400 text-xs">Especialista</p>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="prose prose-invert prose-emerald max-w-none">
          {/* Excerpt como introdução em destaque */}
          <p className="text-xl md:text-2xl text-slate-200 font-light leading-relaxed mb-12 border-l-4 border-emerald-500 pl-6 animate-fade-in-up">
            {post.excerpt}
          </p>

          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {renderContent()}
          </div>
        </div>

        {/* Rodapé do Artigo - Compartilhamento */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-slate-400">
            <Tag size={18} />
            <span className="font-medium">Categoria:</span>
            <span className="text-emerald-400">{post.category}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium flex items-center gap-2">
              <Share2 size={18} /> Compartilhar:
            </span>
            <div className="flex gap-2">
              <button onClick={() => handleShare('whatsapp')} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#25D366] hover:border-[#25D366] transition-colors" aria-label="Compartilhar no WhatsApp">
                <MessageCircle size={18} />
              </button>
              <button onClick={() => handleShare('facebook')} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#1877F2] hover:border-[#1877F2] transition-colors" aria-label="Compartilhar no Facebook">
                <Facebook size={18} />
              </button>
              <button onClick={() => handleShare('twitter')} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-colors" aria-label="Compartilhar no Twitter">
                <Twitter size={18} />
              </button>
              <button onClick={() => handleShare('linkedin')} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors" aria-label="Compartilhar no LinkedIn">
                <Linkedin size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </article>
  );
};

export default BlogPost;
