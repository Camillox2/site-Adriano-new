import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, Info, HelpCircle } from 'lucide-react';

const HOTSPOTS = [
  {
    id: 'screen',
    title: 'Painel de Controle Inteligente',
    description: 'Interface digital intuitiva para ajustar a energia (J), a profundidade (1.5mm, 3.0mm, 4.5mm) e o espaçamento dos disparos em tempo real.',
    style: { top: '35%', left: '50%' }
  },
  {
    id: 'cartridge',
    title: 'Transdutor Multifuncional',
    description: 'Manopla ergonômica de aplicação direta onde se encaixam os cartuchos de profundidade precisa (microfocado facial).',
    style: { top: '55%', left: '72%' }
  },
  {
    id: 'chassis',
    title: 'Gabinete Compacto e Portátil',
    description: 'Gabinete de metal e acrílico com resfriamento interno otimizado, projetado para fácil transporte entre salas ou clínicas parceiras.',
    style: { top: '75%', left: '42%' }
  }
];

const HifuDeviceViewer3d = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    // 1. Verificar suporte a WebGL
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsWebGLSupported(false);
        return;
      }
    } catch (e) {
      setIsWebGLSupported(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 2. Configurações básicas da cena
    const width = container.clientWidth;
    const height = 450; // altura fixa do visualizador

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0b0f19'); // Fundo escuro premium

    // Câmera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 9);
    camera.lookAt(0, 0.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Grupo principal para rotação do objeto
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 3. Materiais do equipamento
    const whitePlastic = new THREE.MeshStandardMaterial({
      color: 0xf3f4f6,
      roughness: 0.2,
      metalness: 0.1,
    });

    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.8,
    });

    const glossySilver = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.1,
      metalness: 0.9,
    });

    // 4. Criação do monitor digital dinâmico (Textura de Canvas 2D)
    const createScreenTexture = () => {
      const scrCanvas = document.createElement('canvas');
      scrCanvas.width = 512;
      scrCanvas.height = 384;
      const ctx = scrCanvas.getContext('2d');
      if (ctx) {
        // Fundo azul escuro
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 512, 384);

        // Grade
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 512; i += 32) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 384); ctx.stroke();
        }
        for (let j = 0; j < 384; j += 32) {
          ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(512, j); ctx.stroke();
        }

        // Título e Status
        ctx.fillStyle = '#22d3ee';
        ctx.font = 'bold 26px Inter, sans-serif';
        ctx.fillText('ULTRAMED HIFU', 40, 60);

        ctx.fillStyle = '#10b981';
        ctx.font = '15px Inter, sans-serif';
        ctx.fillText('● EM OPERAÇÃO', 40, 95);

        // Curva de Pulso
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 40; x < 470; x++) {
          const y = 210 + Math.sin(x * 0.06) * 35 * Math.sin(x * 0.005);
          if (x === 40) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Parâmetros do Tratamento
        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.fillText('ENERGIA: 1.4 J', 40, 310);
        ctx.fillText('PROF.: 4.5 mm', 40, 340);
        ctx.fillText('DISPAROS: 1.250', 280, 310);
        ctx.fillText('MODO: CONTÍNUO', 280, 340);
      }
      return new THREE.CanvasTexture(scrCanvas);
    };

    const screenTexture = createScreenTexture();
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });

    // 5. Montagem do Equipamento (Procedural)

    // A - Carrinho de Suporte (Trolley)
    const cartGeometry = new THREE.BoxGeometry(1.6, 2.2, 1.4);
    const cart = new THREE.Mesh(cartGeometry, darkMetal);
    cart.position.y = -1.1;
    cart.castShadow = true;
    cart.receiveShadow = true;
    mainGroup.add(cart);

    // Rodinhas (4 cilindros)
    const wheelGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 16);
    const wheelRotZ = Math.PI / 2;
    const wheelPositions = [
      [-0.7, -2.25, 0.5],
      [0.7, -2.25, 0.5],
      [-0.7, -2.25, -0.5],
      [0.7, -2.25, -0.5]
    ];
    wheelPositions.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(wheelGeom, darkMetal);
      wheel.position.set(x, y, z);
      wheel.rotation.z = wheelRotZ;
      wheel.castShadow = true;
      mainGroup.add(wheel);
    });

    // Prateleira intermediária prateada
    const shelfGeom = new THREE.BoxGeometry(1.7, 0.1, 1.5);
    const shelf = new THREE.Mesh(shelfGeom, glossySilver);
    shelf.position.y = -0.05;
    shelf.castShadow = true;
    mainGroup.add(shelf);

    // B - Console Principal do HIFU
    const consoleGeom = new THREE.BoxGeometry(1.4, 0.9, 1.2);
    const hifuConsole = new THREE.Mesh(consoleGeom, whitePlastic);
    hifuConsole.position.y = 0.45;
    hifuConsole.castShadow = true;
    hifuConsole.receiveShadow = true;
    mainGroup.add(hifuConsole);

    // Moldura do monitor (Painel Frontal)
    const monitorFrameGeom = new THREE.BoxGeometry(1.2, 0.7, 0.1);
    const monitorFrame = new THREE.Mesh(monitorFrameGeom, darkMetal);
    monitorFrame.position.set(0, 0.48, 0.61);
    monitorFrame.rotation.x = -Math.PI / 10; // Inclinação confortável
    mainGroup.add(monitorFrame);

    // Tela digital ativa
    const monitorScreenGeom = new THREE.PlaneGeometry(1.1, 0.6);
    const monitorScreen = new THREE.Mesh(monitorScreenGeom, screenMaterial);
    monitorScreen.position.set(0, 0.48, 0.67);
    monitorScreen.rotation.x = -Math.PI / 10;
    mainGroup.add(monitorScreen);

    // C - Manopla/Transdutor (Handpiece) + Fio
    const transducerHolderGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 16);
    const transducerHolder = new THREE.Mesh(transducerHolderGeom, glossySilver);
    transducerHolder.position.set(0.85, 0.45, 0.2);
    transducerHolder.rotation.z = -Math.PI / 6;
    mainGroup.add(transducerHolder);

    const handpieceGroup = new THREE.Group();
    handpieceGroup.position.set(0.95, 0.6, 0.2);
    handpieceGroup.rotation.z = -Math.PI / 6;
    mainGroup.add(handpieceGroup);

    // Manopla
    const handpieceGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.5, 16);
    const handpiece = new THREE.Mesh(handpieceGeom, whitePlastic);
    handpiece.castShadow = true;
    handpieceGroup.add(handpiece);

    // Cartucho ponta preta da manopla
    const cartridgeGeom = new THREE.BoxGeometry(0.1, 0.15, 0.1);
    const cartridge = new THREE.Mesh(cartridgeGeom, darkMetal);
    cartridge.position.y = -0.25;
    handpieceGroup.add(cartridge);

    // Mangueira/Cabo conectado (Representado por uma curva de tubo catenária)
    const points = [];
    points.push(new THREE.Vector3(0.95, 0.4, 0.2));
    points.push(new THREE.Vector3(1.1, -0.4, 0.3));
    points.push(new THREE.Vector3(0.7, -0.8, 0.2));
    points.push(new THREE.Vector3(0.5, 0.2, -0.4)); // entra na parte de trás

    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeom = new THREE.TubeGeometry(curve, 32, 0.03, 8, false);
    const tube = new THREE.Mesh(tubeGeom, darkMetal);
    tube.castShadow = true;
    mainGroup.add(tube);

    // D - Detalhes estéticos (Placa de logo cromada)
    const logoPlateGeom = new THREE.BoxGeometry(0.6, 0.08, 0.01);
    const logoPlate = new THREE.Mesh(logoPlateGeom, glossySilver);
    logoPlate.position.set(0, 0.1, 0.61);
    mainGroup.add(logoPlate);

    // 6. Iluminação e Sombras
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Luz de preenchimento azul de contorno para estética premium
    const fillLightBlue = new THREE.PointLight(0x06b6d4, 2, 8);
    fillLightBlue.position.set(-3, 1, 2);
    scene.add(fillLightBlue);

    // Luz focada no painel digital
    const screenLight = new THREE.PointLight(0x22d3ee, 0.8, 2);
    screenLight.position.set(0, 0.5, 0.9);
    scene.add(screenLight);

    // Chão com sombra
    const floorGeom = new THREE.PlaneGeometry(15, 15);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.4 });
    const floor = new THREE.Mesh(floorGeom, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.35;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid sutil no chão
    const grid = new THREE.GridHelper(10, 10, 0x1e293b, 0x0f172a);
    grid.position.y = -2.34;
    scene.add(grid);

    // 7. Controle manual de rotação (Drag horizontal e vertical)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0.5 }; // rotação inicial sutil

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX || (e.touches && e.touches[0].clientX),
        y: e.clientY || (e.touches && e.touches[0].clientY)
      };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      targetRotation.y += deltaX * 0.007;
      targetRotation.x = Math.max(-0.4, Math.min(0.4, targetRotation.x + deltaY * 0.005));

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handleMouseUp = () => { isDragging = false; };

    // Adiciona event listeners de mouse e touch
    const el = canvas;
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mouseleave', handleMouseUp);

    el.addEventListener('touchstart', handleMouseDown, { passive: true });
    el.addEventListener('touchmove', handleMouseMove, { passive: true });
    el.addEventListener('touchend', handleMouseUp);

    // 8. Loop de animação
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Suaviza a rotação aplicando interpolação
      mainGroup.rotation.y += (targetRotation.y - mainGroup.rotation.y) * 0.1;
      mainGroup.rotation.x += (targetRotation.x - mainGroup.rotation.x) * 0.1;

      // Animação automática sutil de oscilação para parecer "vivo" se o usuário não arrastar
      if (!isDragging) {
        mainGroup.rotation.y += 0.002; // rotação contínua lenta
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mouseleave', handleMouseUp);
      el.removeEventListener('touchstart', handleMouseDown);
      el.removeEventListener('touchmove', handleMouseMove);
      el.removeEventListener('touchend', handleMouseUp);

      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full bg-slate-950 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
      {/* Fallback caso WebGL não seja suportado */}
      {!isWebGLSupported ? (
        <div className="w-full h-[450px] flex flex-col items-center justify-center text-center p-8 bg-slate-900">
          <HelpCircle size={48} className="text-cyan-400 mb-4 animate-bounce-slow" />
          <h3 className="text-xl font-bold text-white mb-2">Equipamento Ultramed HIFU</h3>
          <p className="text-slate-400 text-sm max-w-md mb-6">
            Seu navegador ou dispositivo não possui aceleração gráfica WebGL ativada. Exibimos a imagem profissional do aparelho ao invés do modelo 3D.
          </p>
          <div className="relative rounded-2xl overflow-hidden max-w-sm border border-white/10 shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600" 
              alt="Ultramed HIFU" 
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-4">
              <span className="text-white font-bold text-xs bg-slate-900/80 px-3 py-1 rounded-full border border-white/10">Equipamento Certificado ANVISA</span>
            </div>
          </div>
        </div>
      ) : (
        <div ref={containerRef} className="relative w-full h-[450px]">
          {/* Canvas WebGL */}
          <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

          {/* Dica superior */}
          <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-slate-900/80 border border-white/10 px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur pointer-events-none">
            <Rotate3d size={16} className="text-cyan-400 animate-spin-slow" />
            Clique e arraste para visualizar em 360°
          </div>

          {/* Hotspots Dinâmicos (Sobreposição HTML) */}
          {HOTSPOTS.map((hotspot) => (
            <div
              key={hotspot.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={hotspot.style}
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 relative ${
                  activeHotspot === hotspot.id
                    ? 'bg-cyan-500 text-slate-950 scale-125 shadow-lg shadow-cyan-500/50'
                    : 'bg-slate-900 text-cyan-400 border border-cyan-400/50 hover:bg-cyan-500 hover:text-slate-950 hover:scale-110'
                }`}
                aria-label={`Mais informações sobre ${hotspot.title}`}
              >
                <Info size={13} />
                {/* Efeito de onda pulsante no botão do hotspot */}
                {activeHotspot !== hotspot.id && (
                  <span className="absolute inset-0 rounded-full border border-cyan-400/80 animate-ping opacity-60"></span>
                )}
              </button>

              {/* Tooltip explicativo */}
              <div
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-64 bg-slate-950/95 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-md transition-all duration-300 z-20 pointer-events-none ${
                  activeHotspot === hotspot.id
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                }`}
              >
                <h4 className="font-bold text-white text-sm mb-1">{hotspot.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{hotspot.description}</p>
              </div>
            </div>
          ))}

          {/* Clique fora para fechar o hotspot ativo */}
          {activeHotspot && (
            <div 
              className="absolute inset-0 z-10" 
              onClick={() => setActiveHotspot(null)}
              aria-hidden="true"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HifuDeviceViewer3d;
