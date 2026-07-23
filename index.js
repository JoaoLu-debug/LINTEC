/* ==========================================================================
   LINTEC AUTOCLAVES - INTERACTIVITY & SIMULATED AI CHATBOT (ESTILO RAMP)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. RESPONSIVE MENU DRAWER
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const closeDrawer = document.querySelector('.close-drawer');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function toggleMenu() {
    if (mobileDrawer) mobileDrawer.classList.toggle('open');
  }

  function closeMenu() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
  }

  if (mobileToggle) mobileToggle.addEventListener('click', toggleMenu);
  if (closeDrawer) closeDrawer.addEventListener('click', closeMenu);
  drawerLinks.forEach(link => link.addEventListener('click', closeMenu));


  /* ==========================================================================
     1.5. MORPHIC NAVBAR LOGIC (GOOEY LIQUID GLASS INDICATOR) & SCROLL SPY
     ========================================================================== */
  const morphicLinks = document.querySelectorAll('.morphic-link');
  const sections = document.querySelectorAll('section[id]');
  const indicator = document.querySelector('.morphic-indicator');
  const linksLayer = document.querySelector('.morphic-links-layer');

  function updateIndicator(activeLink) {
    if (!indicator || !activeLink || !linksLayer) return;
    
    const containerRect = linksLayer.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    
    const left = linkRect.left - containerRect.left;
    const width = linkRect.width;
    
    indicator.style.left = `${left}px`;
    indicator.style.width = `${width}px`;
  }

  function updateMorphicNavbar(activeHref) {
    let activeLink = null;
    
    morphicLinks.forEach((link) => {
      const isLinkActive = link.getAttribute('href') === activeHref;
      
      if (isLinkActive) {
        link.classList.add('active');
        activeLink = link;
      } else {
        link.classList.remove('active');
      }
    });

    if (activeLink) {
      requestAnimationFrame(() => {
        updateIndicator(activeLink);
      });
    }
  }

  // Click handler to update active state immediately
  morphicLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      updateMorphicNavbar(href);
    });
  });

  // Scroll spy to update active state based on position
  function scrollSpy() {
    const scrollPosition = window.scrollY + 150; // offset for the navbar
    
    let currentSectionId = '#inicio';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = '#' + sectionId;
      }
    });
    
    updateMorphicNavbar(currentSectionId);
  }

  // Handle window resizing to keep indicator aligned
  window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.morphic-link.active');
    if (activeLink) {
      updateIndicator(activeLink);
    }
  });

  window.addEventListener('scroll', scrollSpy);
  
  // Initial call to set active link on load
  setTimeout(() => {
    scrollSpy();
  }, 100);


  /* ==========================================================================
     2. 3D TILT EFFECT FOR COLUMNS (Premium Refractive Web Design Skill)
     ========================================================================== */
  const tiltColumns = document.querySelectorAll('[data-tilt]');

  tiltColumns.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X inside column
      const y = e.clientY - rect.top;  // Mouse Y inside column
      
      const width = rect.width;
      const height = rect.height;
      const mouseX = x / width; // 0 to 1
      const mouseY = y / height; // 0 to 1

      // Rotation angles (Max 8 degrees for clean subtle feel matching white blocks)
      const rotateX = (0.5 - mouseY) * 8;
      const rotateY = (mouseX - 0.5) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
      card.style.transition = 'transform 0.1s ease-out';
    });

    // Reset styles on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });


  /* ==========================================================================
     2.5. MOUSE HOVER PARALLAX EFFECT FOR HERO SECTION (Premium Skill)
     ========================================================================== */
  const heroSection = document.querySelector('.hero-section');
  const heroContent = document.querySelector('.hero-content');
  const heroGlow = document.querySelector('.hero-glow-circle');
  const arrowGrid = document.querySelector('.hero-canvas-overlay');

  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X inside Hero
      const y = e.clientY - rect.top;  // Mouse Y inside Hero
      
      const width = rect.width;
      const height = rect.height;

      // Normalized coordinates (-0.5 to 0.5)
      const normX = (x / width) - 0.5;
      const normY = (y / height) - 0.5;

      // Displacements
      const gridX = normX * -20;
      const gridY = normY * -20;
      const glowX = normX * 50;
      const glowY = normY * 50;
      const contentX = normX * 25;
      const contentY = normY * 25;

      if (arrowGrid) {
        arrowGrid.style.transform = `translate(${gridX}px, ${gridY}px)`;
        arrowGrid.style.transition = 'transform 0.1s ease-out';
      }
      if (heroGlow) {
        heroGlow.style.transform = `translate(calc(-50% + ${glowX}px), calc(-50% + ${glowY}px))`;
        heroGlow.style.transition = 'transform 0.1s ease-out';
      }
      if (heroContent) {
        heroContent.style.transform = `translate(${contentX}px, ${contentY}px)`;
        heroContent.style.transition = 'transform 0.1s ease-out';
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      const resetTransition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      if (arrowGrid) {
        arrowGrid.style.transform = 'translate(0px, 0px)';
        arrowGrid.style.transition = resetTransition;
      }
      if (heroGlow) {
        heroGlow.style.transform = 'translate(-50%, -50%)';
        heroGlow.style.transition = resetTransition;
      }
      if (heroContent) {
        heroContent.style.transform = 'translate(0px, 0px)';
        heroContent.style.transition = resetTransition;
      }
    });
  }

  /* ==========================================================================
     2.6. CANVAS CURSORGRID OF REACTIVE DOTS (React Bits Ported to Vanilla JS)
     ========================================================================== */
  const canvas = document.getElementById('hero-canvas');
  if (canvas && heroSection) {
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Configurações do CursorGrid de Pontinhos
    const cellSize = 35; // Espaçamento entre os pontinhos em pixels
    const pointColor = '#ffffff'; // Cor branca para os pontinhos
    const pointRadius = 1.4; // Raio de cada pontinho em pixels (Aumentado de 1.2)
    const interactionRadius = 165; // Raio sob o mouse em pixels
    const maxDisplacement = 13; // Deslocamento físico máximo (repulsão) em pixels
    const gridOpacity = 0.22; // Opacidade estática padrão dos pontinhos (Aumentado de 0.12)
    const maxOpacity = 0.95; // Opacidade máxima dos pontinhos brilhando (Aumentado de 0.75)
    const holdTime = 350; // Tempo em ms que o ponto fica brilhando
    const fadeDuration = 700; // Tempo em ms para o brilho desaparecer
    const clickPulse = true;
    const pulseSpeed = 650; // Velocidade da onda de clique em pixels/segundo

    let cols = 0;
    let rows = 0;
    let offX = 0;
    let offY = 0;
    
    let points = [];
    let pulses = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let mouseIn = false;
    let lastFrame = performance.now();
    let raf = null;

    const hexToRgb = (hex) => {
      const h = hex.replace('#', '');
      const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
      const num = parseInt(v.slice(0, 6), 16);
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    };
    const [cr, cg, cb] = hexToRgb(pointColor);

    const rebuildGrid = () => {
      const w = heroSection.offsetWidth;
      const h = heroSection.offsetHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / cellSize) + 1;
      rows = Math.ceil(h / cellSize) + 1;
      offX = (w - cols * cellSize) / 2;
      offY = (h - rows * cellSize) / 2;

      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = offX + c * cellSize + cellSize / 2;
          const oy = offY + r * cellSize + cellSize / 2;
          points.push({
            ox,                  // Origem X
            oy,                  // Origem Y
            cx: ox,              // Posição atual X (com interpolação)
            cy: oy,              // Posição atual Y (com interpolação)
            alpha: gridOpacity,  // Opacidade atual
            touched: 0           // Timestamp do último toque
          });
        }
      }
    };

    const draw = (now) => {
      const dt = Math.min(now - lastFrame, 50);
      lastFrame = now;

      const w = heroSection.offsetWidth;
      const h = heroSection.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Processar pulsos de clique
      for (let pi = pulses.length - 1; pi >= 0; pi--) {
        const pulse = pulses[pi];
        const age = (now - pulse.t0) / 1000;
        const ringR = age * pulseSpeed;
        
        if (ringR > Math.hypot(w, h)) {
          pulses.splice(pi, 1);
          continue;
        }

        const band = cellSize * 1.5;
        points.forEach(pt => {
          const dist = Math.hypot(pt.ox - pulse.x, pt.oy - pulse.y);
          const diff = Math.abs(dist - ringR);
          if (diff < band) {
            const waveStrength = 1 - (diff / band);
            const level = waveStrength * waveStrength * maxOpacity;
            if (level > pt.alpha) {
              pt.alpha = level;
              pt.touched = now;
            }
          }
        });
      }

      // Calcular física e desenhar pontos
      const fadeStep = dt / Math.max(fadeDuration, 16);

      points.forEach(pt => {
        let targetX = pt.ox;
        let targetY = pt.oy;
        let targetAlpha = gridOpacity;

        if (mouseIn) {
          const dist = Math.hypot(pt.ox - mouseX, pt.oy - mouseY);
          
          if (dist < interactionRadius) {
            const force = 1 - (dist / interactionRadius);
            const smoothForce = force * force * (3 - 2 * force);
            
            // Repulsão Magnética
            const dx = pt.ox - mouseX;
            const dy = pt.oy - mouseY;
            const angle = Math.atan2(dy, dx);
            
            const disp = smoothForce * maxDisplacement;
            targetX = pt.ox + Math.cos(angle) * disp;
            targetY = pt.oy + Math.sin(angle) * disp;

            // Brilho
            targetAlpha = gridOpacity + (maxOpacity - gridOpacity) * smoothForce;
            pt.touched = now;
          }
        }

        if (now - pt.touched > holdTime) {
          pt.alpha = Math.max(gridOpacity, pt.alpha - fadeStep);
        } else {
          pt.alpha += (targetAlpha - pt.alpha) * 0.15;
        }

        pt.cx += (targetX - pt.cx) * 0.12;
        pt.cy += (targetY - pt.cy) * 0.12;

        ctx.beginPath();
        ctx.arc(pt.cx, pt.cy, pointRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${pt.alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    const wake = () => {
      if (!raf) {
        lastFrame = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };

    const updateMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    heroSection.addEventListener('pointerenter', () => {
      mouseIn = true;
      wake();
    });

    heroSection.addEventListener('pointermove', (e) => {
      mouseIn = true;
      updateMousePos(e);
      wake();
    });

    heroSection.addEventListener('pointerleave', () => {
      mouseIn = false;
      mouseX = -1000;
      mouseY = -1000;
    });

    heroSection.addEventListener('pointerdown', (e) => {
      if (!clickPulse) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pulses.push({ x, y, t0: performance.now() });
      wake();
    });

    const resizeObserver = new ResizeObserver(() => {
      rebuildGrid();
      wake();
    });
    resizeObserver.observe(heroSection);

    rebuildGrid();
    wake();
  }


  /* ==========================================================================
     3. INTELLIGENT SIMULATED AI CHATBOT (Ramp Theme Adapted)
     ========================================================================== */
  const chatbotWidget = document.querySelector('.chatbot-widget');
  const chatbotTrigger = document.querySelector('.chatbot-trigger');
  const chatbotClose = document.querySelector('.chatbot-close');
  const chatbotContainer = document.querySelector('.chatbot-container');
  const chatbotForm = document.getElementById('chatbot-form');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const quickReplyButtons = document.querySelectorAll('.quick-reply-btn');

  // Toggle Chat Box
  if (chatbotTrigger) {
    chatbotTrigger.addEventListener('click', () => {
      chatbotContainer.classList.toggle('open');
      // Scroll to bottom when opening
      setTimeout(() => {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }, 300);
    });
  }

  if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
      chatbotContainer.classList.remove('open');
    });
  }

  // Base de Conhecimento da IA (Foco exclusivo em Autoclaves de Balcão)
  const iaKnowledge = {
    horarios: {
      keywords: ['horario', 'funcionamento', 'hora', 'fecha', 'abre', 'sabado', 'domingo', 'dias'],
      answer: 'Nosso horário de atendimento é de <strong>Segunda a Sexta-feira, das 09:00 às 16:30</strong>. Não abrimos aos finais de semana e feriados.'
    },
    endereco: {
      keywords: ['endereco', 'onde fica', 'localizacao', 'alphaville', 'barueri', 'rua', 'calcada', 'mapa', 'como chegar'],
      answer: 'Estamos localizados no Centro Comercial Alphaville: <strong>Calçada das Anêmonas, 167 – Térreo, Alphaville, Barueri - SP, CEP 06453-005</strong>. Se desejar trazer sua autoclave, a avaliação física na nossa bancada é totalmente sem custos!'
    },
    servicos: {
      keywords: ['servico', 'conserto', 'manutencao', 'preventiva', 'corretiva', 'calibracao', 'validaçao', 'arrumar', 'problema', 'quebrou', 'pressao', 'temperatura', 'vazando'],
      answer: 'Somos especializados em <strong>autoclaves de balcão</strong> (modelos de mesa de 4L a 30L). Realizamos manutenção preventiva (limpeza, troca de guarnições/filtros), manutenção corretiva (reparos elétricos, placas, resistências, válvulas) e calibração. <em>Nota: não consertamos canetas de alta rotação ou cadeiras odontológicas, focamos 100% em autoclaves!</em>'
    },
    marcas: {
      keywords: ['marca', 'modelo', 'cristofoli', 'stermax', 'sanders', 'alt', 'bio art', 'volaremed', 'gnatus', 'dabi', 'woson'],
      answer: 'Atendemos e oferecemos assistência técnica de todas as principais marcas do mercado, incluindo <strong>Cristófoli, Stermax, Sanders, ALT Autoclaves, Bio Art, Volaremed</strong>, entre outras. Usamos somente peças compatíveis e originais de alta qualidade.'
    },
    whatsapp: {
      keywords: ['whatsapp', 'telefone', 'contato', 'agendar', 'visita', 'orcamento', 'chamar', 'falar com tecnico', 'enviar mensagem', 'celular'],
      answer: 'Você pode falar diretamente com nossa equipe pelos telefones:<br>• <strong>WhatsApp Técnico: (11) 98471-5339</strong><br>• <strong>WhatsApp Comercial: (11) 94113-0112</strong>.<br>Para agendar uma visita técnica no local ou tirar dúvidas urgentes, clique nos botões de atalho no nosso site.'
    },
    funcionamento: {
      keywords: ['como funciona', 'modo de trabalho', 'visita no local', 'retira', 'bancada', 'tempo', 'demora', 'garantia'],
      answer: 'Trabalhamos de duas maneiras para sua comodidade:<br>1. <strong>Manutenção no Local:</strong> Agendamos uma visita para que o técnico realize o conserto na sua clínica/consultório (você acompanha tudo e não fica sem o equipamento).<br>2. <strong>Manutenção em Bancada:</strong> Você traz o equipamento à nossa assistência para uma avaliação técnica gratuita. Todos os serviços contam com garantia de peças e mão de obra.'
    },
    preco: {
      keywords: ['preco', 'quanto custa', 'valor', 'taxa', 'visita', 'gratis', 'gratuito', 'orcamento'],
      answer: 'A avaliação técnica do equipamento trazido em nossa bancada é <strong>100% gratuita e sem compromisso</strong>. Para visitas técnicas diretamente no seu consultório, há uma taxa de deslocamento sob consulta que varia conforme a sua região em São Paulo.'
    },
    cadeiras: {
      keywords: ['cadeira', 'odontologica', 'odontologico', 'caneta', 'alta rotacao', 'micromotor', 'compressor', 'odonto'],
      answer: 'Atualmente, a Lintec atua de forma <strong>exclusiva na manutenção de autoclaves de balcão</strong>. Não realizamos mais serviços em compressores, canetas ou cadeiras odontológicas, garantindo assim foco total e máxima qualidade na esterilização dos seus equipamentos.'
    }
  };

  // Processa a dúvida do usuário e retorna a melhor resposta correspondente
  function getAIResponse(userText) {
    const cleanText = userText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Procura por correspondência nas palavras-chave
    for (const key in iaKnowledge) {
      const match = iaKnowledge[key].keywords.some(keyword => {
        const cleanKeyword = keyword.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return cleanText.includes(cleanKeyword);
      });
      if (match) {
        return iaKnowledge[key].answer;
      }
    }

    // Resposta padrão caso nenhuma palavra-chave combine
    return 'Entendi sua pergunta, mas para te dar a informação mais precisa sobre o seu modelo de autoclave ou agendamento de visita, recomendo falar direto com um de nossos técnicos via <strong>WhatsApp no (11) 98471-5339</strong> ou pelo comercial no <strong>(11) 94113-0112</strong>.';
  }

  // Adiciona uma mensagem na tela do chatbot
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.innerHTML = text;
    chatbotMessages.appendChild(messageDiv);
    
    // Rolagem automática
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return messageDiv;
  }

  // Simula o efeito de digitação da IA
  function simulateTypingAndRespond(userQuery) {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('chat-message', 'bot', 'typing');
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    chatbotMessages.appendChild(typingIndicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Tempo de delay aleatório para parecer mais humano
    const delay = Math.random() * 800 + 600; // entre 600ms e 1400ms

    setTimeout(() => {
      typingIndicator.remove();
      const response = getAIResponse(userQuery);
      addMessage(response, 'bot');
    }, delay);
  }

  // Evento de envio do formulário
  if (chatbotForm) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatbotInput.value.trim();
      if (!text) return;

      addMessage(text, 'user');
      chatbotInput.value = '';
      
      simulateTypingAndRespond(text);
    });
  }

  // Quick Replies Click
  quickReplyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const queryKey = btn.getAttribute('data-query');
      const queryText = btn.textContent;
      
      addMessage(queryText, 'user');
      simulateTypingAndRespond(queryKey);
    });
  });

});
