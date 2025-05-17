// Contenido de las páginas (puedes personalizar estos datos)
const PAGES_DATA = [
    {
        title: "Primer Recuerdo",
        image: "https://via.placeholder.com/800x600?text=Foto+1",
        text: "Aquí irá un mensaje especial que acompañe a esta foto..."
    },
    {
        title: "Momentos Mágicos",
        image: "https://via.placeholder.com/800x600?text=Foto+2",
        text: "Otro mensaje especial para esta foto..."
    },
    {
        title: "Sonrisas y Alegrías",
        image: "https://via.placeholder.com/800x600?text=Foto+3",
        text: "Un mensaje que capture este momento..."
    }
];

// Variables globales
let currentPage = -1; // -1: libro cerrado, 0: primera página visible, etc.
const TOTAL_PAGES = 5; // Intro + 3 contenido + final

// Sonidos
const pageSound = new Audio("https://www.soundjay.com/page-flip-sounds/page-flip-01a.mp3");
const popSound = new Audio("https://www.soundjay.com/mechanical/sounds/balloon-pop-1.mp3");

// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado, inicializando libro...");
    
    // Referencias DOM
    const bookCover = document.getElementById("book-cover");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    
    // Cargar datos en las páginas
    loadPageContent();
    
    // Configurar eventos
    bookCover.addEventListener("click", openBook);
    prevBtn.addEventListener("click", previousPage);
    nextBtn.addEventListener("click", nextPage);
    
    // Configurar eventos táctiles simples para móviles
    setupSimpleTouchEvents();
    
    // Deshabilitar botón anterior al inicio
    prevBtn.disabled = true;
    
    // Preparar elementos visuales
    prepareVisualEffects();
    
    // Mostrar tutorial rápido
    showQuickTutorial();
    
    // Log para debugging
    console.log("Libro inicializado correctamente");
});

// Mostrar tutorial rápido
function showQuickTutorial() {
    alert("Para usar el libro:\n\n1. Toca la portada para abrirlo\n2. Desliza a la izquierda para avanzar página\n3. Desliza a la derecha para retroceder página\n4. O usa los botones abajo");
}

// Cargar el contenido en las páginas
function loadPageContent() {
    PAGES_DATA.forEach((data, index) => {
        const pageId = `page-${index + 1}`;
        const page = document.getElementById(pageId);
        
        if (page) {
            const titleEl = page.querySelector(".memory-title");
            const imageEl = page.querySelector(".memory-photo");
            const textEl = page.querySelector(".memory-text");
            
            if (titleEl) titleEl.textContent = data.title;
            if (imageEl) imageEl.src = data.image;
            if (textEl) textEl.textContent = data.text;
        }
    });
}

// Crear confeti permanente en el fondo
function createBackgroundConfetti() {
    console.log("Creando confeti de fondo...");
    
    const container = document.createElement('div');
    container.className = 'confetti-bg';
    document.body.appendChild(container);
    
    // Colores vibrantes para el confeti
    const colors = [
        '#FFC700', '#FF0000', '#2E3192', '#009245',
        '#00FFFF', '#FF00FF', '#FF9900', '#9C27B0'
    ];
    
    // Crear piezas de confeti
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.width = `${5 + Math.random() * 10}px`;
        piece.style.height = `${5 + Math.random() * 10}px`;
        piece.style.animationDuration = `${5 + Math.random() * 15}s`;
        piece.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(piece);
    }
}

// Agregar confeti a las páginas
function addConfettiToPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        // Solo agregar 5-10 piezas por página
        const numPieces = 5 + Math.floor(Math.random() * 5);
        const colors = ['#FFC700', '#FF0000', '#2E3192', '#009245', '#FF00FF'];
        
        for (let i = 0; i < numPieces; i++) {
            const piece = document.createElement('div');
            piece.className = 'page-confetti';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.left = `${Math.random() * 90}%`;
            piece.style.top = `${Math.random() * 90}%`;
            piece.style.width = `${8 + Math.random() * 7}px`;
            piece.style.height = `${8 + Math.random() * 7}px`;
            piece.style.transform = `rotate(${Math.random() * 360}deg)`;
            page.appendChild(piece);
        }
    });
}

// Preparar efectos visuales
function prepareVisualEffects() {
    // Crear contenedor para explosiones
    const explosionContainer = document.createElement("div");
    explosionContainer.className = "explosion-container";
    document.body.appendChild(explosionContainer);
    
    // Crear estrellas para explosiones
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement("div");
        particle.className = i % 2 === 0 ? "explosion-star" : "explosion-confetti";
        particle.style.display = "none";
        explosionContainer.appendChild(particle);
    }
    
    // Precargar imágenes
    PAGES_DATA.forEach(data => {
        const img = new Image();
        img.src = data.image;
    });
    
    // Precargar sonidos
    try {
        pageSound.load();
        popSound.load();
    } catch (e) {
        console.warn("No se pudieron cargar los sonidos:", e);
    }
    
    // Agregar confeti permanente
    createBackgroundConfetti();
    
    // Agregar confeti a las páginas
    addConfettiToPages();
}

// Configurar eventos táctiles simples para móviles
function setupSimpleTouchEvents() {
    let startX;
    let currentX;
    let dragging = false;
    const MIN_SWIPE = 50; // Distancia mínima para considerar un swipe
    const MAX_BEND = 40; // Grado máximo de doblez de la página
    
    // Obtener la página activa
    function getActivePage() {
        const allPages = document.querySelectorAll('.page');
        if (currentPage >= 0 && currentPage < TOTAL_PAGES) {
            if (currentPage === 0) {
                return document.getElementById('intro-page');
            } else if (currentPage === TOTAL_PAGES - 1) {
                return document.getElementById('final-page');
            } else {
                return document.getElementById(`page-${currentPage}`);
            }
        }
        return null;
    }
    
    // Obtener la página anterior
    function getPrevPage() {
        if (currentPage > 0) {
            if (currentPage === 1) {
                return document.getElementById('intro-page');
            } else {
                return document.getElementById(`page-${currentPage-1}`);
            }
        }
        return null;
    }
    
    // Inicio de toque
    document.addEventListener('touchstart', function(e) {
        if (currentPage < 0) return; // No hacer nada si el libro está cerrado
        
        startX = e.touches[0].clientX;
        currentX = startX;
        dragging = true;
        
        // Obtener la página activa y preparar para arrastre
        const activePage = getActivePage();
        if (activePage) {
            activePage.classList.add('dragging');
            activePage.style.transition = 'none';
        }
        
        // Si es posible ir hacia atrás, también preparar la página anterior
        if (currentPage > 0) {
            const prevPage = getPrevPage();
            if (prevPage) {
                prevPage.style.transition = 'none';
            }
        }
    }, { passive: true });
    
    // Movimiento de toque
    document.addEventListener('touchmove', function(e) {
        if (!dragging || currentPage < 0) return;
        
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        const pageWidth = window.innerWidth * 0.8; // 80% del ancho de la ventana
        
        // Página activa para arrastrar
        const activePage = getActivePage();
        
        if (activePage) {
            // Efecto de doblez hacia adelante (siguiente página)
            if (diffX < 0 && currentPage < TOTAL_PAGES - 1) {
                const percentDragged = Math.min(Math.abs(diffX) / pageWidth, 0.5);
                const bendAngle = -percentDragged * MAX_BEND;
                const rotateY = percentDragged * -90;
                const shadow = percentDragged * 20;
                
                // Efecto 3D de doblez
                activePage.style.transform = `
                    rotateY(${rotateY}deg)
                    perspective(1200px)
                `;
                
                // Sombra dinámica en el borde
                activePage.style.boxShadow = `
                    -${shadow}px 0 15px rgba(0, 0, 0, 0.3),
                    inset ${shadow/2}px 0 10px rgba(0, 0, 0, 0.2)
                `;
                
                // Curva en el borde
                activePage.style.borderRight = `1px solid rgba(0, 0, 0, ${percentDragged*0.3})`;
                
                // Clase de doblez para estilos adicionales
                activePage.classList.add('bending-forward');
                
                // Ajustar intensidad de gradiente de doblez
                activePage.style.setProperty('--bend-intensity', percentDragged.toFixed(2));
            }
            
            // Efecto de doblez hacia atrás (página anterior)
            else if (diffX > 0 && currentPage > 0) {
                const prevPage = getPrevPage();
                if (prevPage) {
                    const percentDragged = Math.min(diffX / pageWidth, 0.5);
                    const rotateY = -180 + (percentDragged * 90);
                    const shadow = percentDragged * 20;
                    
                    // Efecto 3D de doblez
                    prevPage.style.transform = `
                        rotateY(${rotateY}deg)
                        perspective(1200px)
                    `;
                    
                    // Sombra dinámica
                    prevPage.style.boxShadow = `
                        ${shadow}px 0 15px rgba(0, 0, 0, 0.3),
                        inset -${shadow/2}px 0 10px rgba(0, 0, 0, 0.2)
                    `;
                    
                    // Clase de doblez para estilos adicionales
                    prevPage.classList.add('bending-backward');
                    
                    // Ajustar intensidad de gradiente de doblez
                    prevPage.style.setProperty('--bend-intensity', percentDragged.toFixed(2));
                }
            }
        }
    }, { passive: true });
    
    // Fin de toque
    document.addEventListener('touchend', function(e) {
        if (!dragging || currentPage < 0) return;
        
        const diffX = currentX - startX;
        const activePage = getActivePage();
        const prevPage = getPrevPage();
        
        // Restaurar transiciones
        if (activePage) {
            activePage.style.transition = `transform 0.5s var(--page-turn-function), box-shadow 0.5s ease`;
            activePage.classList.remove('dragging', 'bending-forward');
        }
        
        if (prevPage) {
            prevPage.style.transition = `transform 0.5s var(--page-turn-function), box-shadow 0.5s ease`;
            prevPage.classList.remove('bending-backward');
        }
        
        // Detectar si fue un deslizamiento significativo
        if (Math.abs(diffX) > MIN_SWIPE) {
            if (diffX > 0) {
                // Deslizamiento a la derecha - página anterior
                if (currentPage > 0) {
                    previousPage();
                } else {
                    resetPageStyles(activePage, prevPage);
                }
            } else {
                // Deslizamiento a la izquierda - página siguiente
                if (currentPage < TOTAL_PAGES - 1) {
                    nextPage();
                } else {
                    resetPageStyles(activePage, prevPage);
                }
            }
        } else {
            // No fue suficiente deslizamiento, restaurar estilos
            resetPageStyles(activePage, prevPage);
        }
        
        dragging = false;
        startX = null;
        currentX = null;
    }, { passive: true });
    
    // Restaurar estilos de páginas
    function resetPageStyles(activePage, prevPage) {
        if (activePage) {
            activePage.style.transform = 'rotateY(0deg)';
            activePage.style.boxShadow = '';
            activePage.style.borderRight = '';
        }
        
        if (prevPage) {
            prevPage.style.transform = 'rotateY(-180deg)';
            prevPage.style.boxShadow = '';
        }
    }
}

// Abrir el libro
function openBook() {
    console.log("Abriendo libro...");
    
    // Si ya está abierto, no hacer nada
    if (currentPage >= 0) return;
    
    // Reproducir sonido
    playSound(pageSound);
    
    // Animar apertura
    const bookCover = document.getElementById("book-cover");
    bookCover.classList.add("open");
    
    // Mostrar contraportada
    const backCover = document.getElementById("book-back-cover");
    backCover.style.display = "block";
    
    // Cambiar a la primera página
    currentPage = 0;
    showCurrentPage();
    
    // Efectos visuales
    setTimeout(() => {
        try {
            const celebrationSound = new Audio('https://www.soundjay.com/buttons/sounds/button-37a.mp3');
            celebrationSound.volume = 0.5;
            celebrationSound.play().catch(error => {
                console.warn("Error al reproducir sonido de celebración:", error);
            });
        } catch(e) {
            console.warn("Error con el sonido de celebración:", e);
        }
        
        // Crear explosión de partículas
        const rect = document.querySelector(".book-container").getBoundingClientRect();
        createExplosion(
            rect.left + rect.width * Math.random(), 
            rect.top + rect.height * Math.random()
        );
    }, 800);
}

// Mostrar la página actual
function showCurrentPage() {
    console.log(`Mostrando página ${currentPage}`);
    
    // Referencia a todas las páginas
    const allPages = [
        document.getElementById("intro-page"),
        document.getElementById("page-1"),
        document.getElementById("page-2"),
        document.getElementById("page-3"),
        document.getElementById("final-page")
    ];
    
    if (allPages.some(page => !page)) {
        console.error("Error: Algunas páginas no fueron encontradas");
        return;
    }
    
    // Actualizar estado de todas las páginas
    allPages.forEach((page, index) => {
        // Hacer visibles todas las páginas
        page.style.display = "block";
        page.style.opacity = "1";
        
        // Quitar clases activas
        page.classList.remove("active");
        
        // Configurar z-index y rotación
        if (index < currentPage) {
            // Páginas anteriores
            page.classList.add("turned");
            page.style.transform = "rotateY(-180deg)";
            page.style.zIndex = 10 - index;
        } else {
            // Páginas no vistas aún
            page.classList.remove("turned");
            page.style.transform = "rotateY(0deg)";
            page.style.zIndex = 10 + index;
        }
    });
    
    // Activar la página actual
    if (currentPage >= 0 && currentPage < allPages.length) {
        const activePage = allPages[currentPage];
        activePage.classList.add("active");
        activePage.style.zIndex = "20";
        
        // Agregar elementos divertidos a la página actual
        addFunElements(activePage);
        
        // Reproducir sonido
        playSound(pageSound);
    }
    
    // Actualizar el estado de portada y contraportada
    const bookCover = document.getElementById("book-cover");
    const backCover = document.getElementById("book-back-cover");
    
    if (currentPage >= 0) {
        bookCover.classList.add("open");
        backCover.style.display = "block";
    } else {
        bookCover.classList.remove("open");
        backCover.style.display = "none";
    }
    
    // Actualizar botones de navegación
    updateNavigationButtons();
}

// Ir a la página anterior
function previousPage() {
    console.log("Ir a página anterior");
    
    if (currentPage <= 0) return;
    
    currentPage--;
    showCurrentPage();
    
    // Animar botón
    animateButton(document.getElementById("prev-btn"));
    
    // Reproducir sonido de página
    playSound(pageSound);
}

// Ir a la página siguiente
function nextPage() {
    console.log("Ir a página siguiente");
    
    if (currentPage >= TOTAL_PAGES - 1) return;
    
    currentPage++;
    showCurrentPage();
    
    // Animar botón
    animateButton(document.getElementById("next-btn"));
    
    // Reproducir sonido de página
    playSound(pageSound);
}

// Actualizar el estado de los botones de navegación
function updateNavigationButtons() {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    
    prevBtn.disabled = (currentPage <= 0);
    nextBtn.disabled = (currentPage >= TOTAL_PAGES - 1);
}

// Animar un botón al pulsarlo
function animateButton(button) {
    button.classList.add("btn-pressed");
    setTimeout(() => {
        button.classList.remove("btn-pressed");
    }, 200);
}

// Reproducir un sonido
function playSound(sound) {
    try {
        sound.currentTime = 0;
        sound.play().catch(error => {
            console.warn("No se pudo reproducir el sonido:", error);
        });
    } catch (e) {
        console.warn("Error al reproducir sonido:", e);
    }
}

// Agregar elementos divertidos a una página
function addFunElements(page) {
    // Evitar duplicados
    if (page.dataset.funElementsAdded === "true") return;
    
    // Agregar estrellas brillantes
    for (let i = 0; i < 6; i++) {
        const star = document.createElement("div");
        star.className = "fun-star";
        star.style.left = `${Math.random() * 90}%`;
        star.style.top = `${Math.random() * 90}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        page.appendChild(star);
    }
    
    // Agregar burbujas
    for (let i = 0; i < 8; i++) {
        const bubble = document.createElement("div");
        bubble.className = "fun-bubble";
        bubble.style.left = `${Math.random() * 90}%`;
        bubble.style.top = `${Math.random() * 90}%`;
        bubble.style.width = `${15 + Math.random() * 30}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.animationDuration = `${5 + Math.random() * 10}s`;
        page.appendChild(bubble);
    }
    
    // Marcar como procesada
    page.dataset.funElementsAdded = "true";
}

// Crear explosión de partículas
function createExplosion(x, y) {
    console.log(`Creando explosión en (${x}, ${y})`);
    
    // Reproducir sonido pop
    playSound(popSound);
    
    // Obtener partículas
    const particles = document.querySelectorAll(".explosion-star, .explosion-confetti");
    const colors = ['#FF5252', '#FFEB3B', '#2196F3', '#4CAF50', '#9C27B0', '#FF9800'];
    
    // Animar partículas
    particles.forEach((particle, index) => {
        // Solo usar algunas
        if (index > 35) return;
        if (particle.style.display !== "none") return;
        
        // Configurar posición inicial
        particle.style.display = "block";
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = "1";
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Configurar trayectoria
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 150;
        const duration = 500 + Math.random() * 1000;
        
        // Animar
        setTimeout(() => {
            particle.style.transition = `all ${duration}ms cubic-bezier(0.1, 0.5, 0.1, 1)`;
            particle.style.transform = `scale(${0.5 + Math.random()}) rotate(${Math.random() * 360}deg)`;
            particle.style.left = `${x + Math.cos(angle) * distance}px`;
            particle.style.top = `${y + Math.sin(angle) * distance}px`;
            particle.style.opacity = "0";
            
            // Limpiar después de la animación
            setTimeout(() => {
                particle.style.display = "none";
                particle.style.transition = "";
                particle.style.transform = "";
            }, duration);
        }, Math.random() * 100);
    });
}
