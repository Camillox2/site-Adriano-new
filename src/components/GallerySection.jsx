import React, { useState } from 'react';
import { X, Camera, Eye } from 'lucide-react';
import { images } from '../assets';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      src: images.pai,
      alt: "Dr. Adriano Camillo",
      title: "Dr. Adriano Camillo",
      description: "Cirurgião Dentista especialista"
    },
    {
      src: images.paidois,
      alt: "Dr. Adriano Camillo - Foto 2",
      title: "Dr. Adriano Camillo",
      description: "Especialista em Harmonização Orofacial"
    },
    {
      src: images.consultorio1,
      alt: "Consultório - Ambiente 1",
      title: "Nosso Consultório",
      description: "Ambiente moderno e acolhedor"
    },
    {
      src: images.consultorio2,
      alt: "Consultório - Ambiente 2", 
      title: "Equipamentos",
      description: "Tecnologia de ponta"
    },
    {
      src: images.consultorio3,
      alt: "Consultório - Ambiente 3",
      title: "Área de Atendimento",
      description: "Conforto e segurança"
    },
    {
      src: images.whatsappScreenshot,
      alt: "WhatsApp do Dr. Adriano",
      title: "Atendimento WhatsApp",
      description: "Contato direto e rápido"
    }
  ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold mb-4 inline-block">
            📸 GALERIA
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Conheça Nosso Espaço
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja como é nosso consultório e conheça mais sobre o Dr. Adriano Camillo, 
            profissional dedicado à excelência em tratamentos odontológicos.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => openModal(image)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-sm">{image.title}</h3>
                  <p className="text-xs text-gray-300">{image.description}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Eye className="text-white" size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-slate-600 p-8 rounded-2xl text-white max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Camera className="text-emerald-200" size={32} />
              <h3 className="text-2xl font-bold">
                Veja Mais no Instagram
              </h3>
            </div>
            <p className="text-emerald-100 mb-6">
              Acompanhe nossos trabalhos e transformações no Instagram. 
              Veja casos reais e inspire-se para sua própria transformação!
            </p>
            <button 
              onClick={() => window.open('https://www.instagram.com/dr.adrianocamillo/', '_blank')}
              className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
            >
              📸 Seguir Instagram
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
            >
              <X size={24} />
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;