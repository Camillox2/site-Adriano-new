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
          return <p key={index} className="text-slate-700 text-lg leading-relaxed mb-6 font-normal">{block.text}</p>;
        
        case 'heading':
          return <h2 key={index} className="text-2xl md:text-3xl font-bold text-slate-900 mt-10 mb-5 leading-tight font-display">{block.text}</h2>;
        
        case 'list':
          return (
            <ul key={index} className="list-none space-y-4 mb-8 bg-emerald-50/60 p-6 rounded-2xl border border-emerald-100/80 shadow-sm">
              {block.items.map((item, i) => (
                <li key={i} className="flex items-start text-slate-800">
                  <span className="text-emerald-600 mr-3 mt-1 font-bold">✓</span>
                  <span className="text-base md:text-lg font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          );
          
        case 'cta':
          return (
            <div key={index} className="my-10 bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 md:p-10 rounded-3xl text-center shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl" />
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10 leading-snug">{block.text}</h3>
              <a 
                href={WHATSAPP_DEFAULT || "https://wa.me/5549998362864"} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-800 hover:bg-slate-100 font-extrabold py-3.5 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 relative z-10 text-base"
              >
                <MessageCircle size={20} className="text-emerald-600" />
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
    <article className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Navegação de Volta */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-8 transition-colors hover:-translate-x-1">
          <ArrowLeft size={18} /> Voltar para o Blog
        </Link>

        {/* Cabeçalho do Artigo */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
              <Calendar size={14} className="text-emerald-600" />
              {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 font-display">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 py-3 border-y border-slate-200/80">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
              AC
            </div>
            <div>
              <p className="text-slate-900 font-bold text-sm">{post.author}</p>
              <p className="text-slate-500 text-xs font-medium">Cirurgião-Dentista • CRO/SC 4011</p>
            </div>
          </div>
        </header>

        {/* Imagem em Destaque (Arte enviada pelo usuário) */}
        <div className="mb-12 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white max-w-2xl mx-auto">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-auto object-contain mx-auto block"
          />
        </div>

        {/* Conteúdo Principal */}
        <div className="prose prose-slate max-w-none">
          {/* Excerpt como introdução em destaque */}
          <div className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-10 border-l-4 border-emerald-500 pl-6 py-1 bg-emerald-50/40 rounded-r-2xl">
            {post.excerpt}
          </div>

          <div className="animate-fade-in-up">
            {renderContent()}
          </div>
        </div>

        {/* Rodapé do Artigo - Compartilhamento */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-slate-600">
            <Tag size={18} className="text-emerald-600" />
            <span className="font-semibold">Categoria:</span>
            <span className="text-emerald-700 font-bold">{post.category}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-slate-600 font-semibold text-sm flex items-center gap-2">
              <Share2 size={18} className="text-emerald-600" /> Compartilhar:
            </span>
            <div className="flex gap-2">
              <button onClick={() => handleShare('whatsapp')} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#25D366] hover:border-[#25D366] transition-colors shadow-sm" aria-label="Compartilhar no WhatsApp">
                <MessageCircle size={18} />
              </button>
              <button onClick={() => handleShare('facebook')} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1877F2] hover:border-[#1877F2] transition-colors shadow-sm" aria-label="Compartilhar no Facebook">
                <Facebook size={18} />
              </button>
              <button onClick={() => handleShare('twitter')} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-colors shadow-sm" aria-label="Compartilhar no Twitter">
                <Twitter size={18} />
              </button>
              <button onClick={() => handleShare('linkedin')} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors shadow-sm" aria-label="Compartilhar no LinkedIn">
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
