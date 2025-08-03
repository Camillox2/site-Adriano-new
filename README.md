# 🦷 Site Dr. Adriano Camillo - Cirurgião Dentista

Site profissional moderno e responsivo para Dr. Adriano Camillo, especialista em Ortodontia, Implantes, Harmonização Orofacial e HIFU.

## ✨ Características Principais

- 🎨 **Design Moderno**: Paleta azul, branco e verde musgo
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em todos os dispositivos
- ⚡ **Performance Otimizada**: Carregamento rápido e animações suaves
- 🎬 **Animações Profissionais**: Transições e efeitos visuais elegantes
- 💬 **Integração WhatsApp**: Botão flutuante e formulários conectados
- 🔍 **SEO Otimizado**: Meta tags e structured data
- ♿ **Acessível**: Seguindo padrões de acessibilidade web

## 🏗️ Estrutura Completa do Projeto

```
dr-adriano-site/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       │   ├── logo.png
│       │   ├── Logotipo Site-02.png
│       │   ├── 20240723_165806.jpg
│       │   ├── 20240723_165833.jpg
│       │   ├── 20240723_170110.jpg
│       │   ├── pai.jpg
│       │   ├── paidois.jpg
│       │   └── Screenshot_*.jpg
│       └── videos/
│           ├── hifu.mp4
│           ├── hifuatendimento.mp4
│           └── hifudois.mp4
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── HifuSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── Footer.jsx
│   │   ├── WhatsAppButton.jsx
│   │   └── index.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── HifuDetails.jsx
│   ├── assets/
│   │   └── index.jsx
│   ├── styles/
│   │   ├── global.css
│   │   └── components/
│   ├── utils/
│   │   └── animations.js
│   ├── App.jsx
│   └── index.jsx
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 16.0 ou superior
- npm ou yarn

### Passos para Instalação

1. **Clone ou crie o projeto React**
```bash
npx create-react-app dr-adriano-site
cd dr-adriano-site
```

2. **Instale as dependências necessárias**
```bash
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Configure o Tailwind CSS**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2563eb',
          green: '#059669'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
```

4. **Copie todos os arquivos fornecidos**
   - Substitua os arquivos nas respectivas pastas
   - Adicione as imagens e vídeos na pasta `public/assets/`

5. **Inicie o servidor de desenvolvimento**
```bash
npm start
```

## 📋 Componentes Disponíveis

### 🔧 Componentes Principais

| Componente | Descrição | Localização |
|------------|-----------|-------------|
| **Header** | Cabeçalho fixo com navegação | `src/components/Header.jsx` |
| **Hero** | Seção principal de boas-vindas | `src/components/Hero.jsx` |
| **HifuSection** | Destaque do serviço HIFU | `src/components/HifuSection.jsx` |
| **ServicesSection** | Todos os serviços com modais | `src/components/ServicesSection.jsx` |
| **AboutSection** | Sobre o Dr. Adriano | `src/components/AboutSection.jsx` |
| **TestimonialsSection** | Carrossel de depoimentos | `src/components/TestimonialsSection.jsx` |
| **ContactSection** | Formulário e informações | `src/components/ContactSection.jsx` |
| **Footer** | Rodapé com links | `src/components/Footer.jsx` |
| **WhatsAppButton** | Botão flutuante do WhatsApp | `src/components/WhatsAppButton.jsx` |

### 🎛️ Componentes Reutilizáveis

- **Button**: Botões customizados com variantes
- **Card**: Cards com efeitos hover
- **Modal**: Modais responsivos
- **Badge**: Tags/etiquetas
- **Input/Textarea/Select**: Campos de formulário
- **Container/Section**: Layout containers

## 🎨 Paleta de Cores

```css
:root {
  --color-primary-blue: #2563eb;
  --color-primary-green: #059669;
  --color-secondary-blue: #3b82f6;
  --color-secondary-green: #10b981;
}
```

### Uso das Cores
- **Azul Principal**: Botões primários, links, destaques
- **Verde Musgo**: Botões WhatsApp, elementos natureza
- **Branco**: Backgrounds, texto em fundos escuros
- **Gradientes**: Combinações azul-verde para efeitos especiais

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## ⚙️ Funcionalidades Especiais

### 🎬 Animações
- Fade in/out suave
- Hover effects
- Scroll animations
- Loading states
- Carrossel automático

### 📞 Integração WhatsApp
- Botão flutuante sempre visível
- Formulários conectados
- Mensagens pré-formatadas
- Links diretos para contato

### 🎥 Gerenciamento de Vídeos
- Player customizado
- Lazy loading
- Controles responsivos
- Fallbacks para navegadores antigos

## 🔧 Personalização

### Modificar Informações de Contato
```javascript
// src/components/ContactSection.jsx
const locations = [
  { 
    city: 'Sua Cidade', 
    address: 'Seu Endereço',
    phone: 'Seu Telefone'
  }
];
```

### Adicionar Novos Serviços
```javascript
// src/components/ServicesSection.jsx
const services = [
  {
    id: 'novo-servico',
    icon: '🆕',
    title: 'Novo Serviço',
    description: 'Descrição do serviço',
    benefits: ['Benefício 1', 'Benefício 2']
  }
];
```

### Personalizar Cores
```css
/* src/styles/global.css */
:root {
  --color-primary-blue: #sua-cor;
  --color-primary-green: #sua-cor;
}
```

## 📊 SEO e Performance

### Meta Tags Incluídas
- Title e Description otimizados
- Open Graph tags
- Twitter Card tags
- Structured Data (Schema.org)

### Otimizações de Performance
- Lazy loading de imagens
- Code splitting
- Compressão de assets
- Caching strategies

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload da pasta build/ para Netlify
```

### Hospedagem Tradicional
```bash
npm run build
# Upload da pasta build/ para seu servidor
```

## 🛠️ Manutenção

### Adicionando Novos Depoimentos
```javascript
// src/components/TestimonialsSection.jsx
const testimonials = [
  {
    name: 'Nome do Paciente',
    treatment: 'Tratamento Realizado',
    rating: 5,
    text: 'Depoimento do paciente',
    location: 'Cidade'
  }
];
```

### Atualizando Vídeos
1. Adicione os novos vídeos em `public/assets/videos/`
2. Atualize as referências em `HifuSection.jsx`
3. Teste o carregamento e reprodução

### Modificando Textos
- **Textos principais**: Diretamente nos componentes
- **Meta tags**: `src/styles/global.jsx`
- **Informações de contato**: `ContactSection.jsx` e `Footer.jsx`

## 📞 Suporte e Contato

- **WhatsApp**: (49) 9 9836-2864
- **Instagram**: [@dr.adrianocamillo](https://www.instagram.com/dr.adrianocamillo/)

## 📄 Licença

Este projeto foi desenvolvido especificamente para Dr. Adriano Camillo. Todos os direitos reservados.

---

# dr-adriano-camillo-site

Site profissional para Dr. Adriano Camillo - Cirurgião Dentista especialista em Ortodontia, Implantes, Harmonização Orofacial e HIFU

## Estrutura do projeto

```
src/
  components/         # Componentes React reutilizáveis
  pages/              # Páginas principais do site
  assets/
    images/           # Imagens do site
    videos/           # Vídeos HIFU
  styles/             # Estilos globais e de componentes
  utils/              # Funções utilitárias
```

## Como rodar o projeto

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```sh
   npm start
   ```

O site estará disponível em `http://localhost:3000`.

## Observações
- Arquivos grandes (MP4) são gerenciados pelo Git LFS.
- Para adicionar novos componentes ou páginas, crie arquivos `.jsx` nas respectivas pastas.
- Para produção, use:
   ```sh
   npm run build
   ```

---
Desenvolvido para Dr. Adriano Camillo