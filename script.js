// Contenido de las páginas (puedes personalizar estos datos)
const PAGES_DATA = [
    {
        title: "Momentos en Familia",
        image: "fotos/familia-foto.jpg",
        text: "Reunidos en familia, compartiendo sonrisas y amor. Estos momentos son los que construyen los cimientos de nuestra felicidad."
    },
    {
        title: "Familia es Todo",
        image: "fotos/familia-foto2.jpg",
        text: "Una hermosa reunión familiar donde cada abrazo cuenta una historia de amor y unión. ¡La familia siempre será nuestro mayor tesoro!"
    },
    {
        title: "Con mi Dani",
        image: "fotos/foto-con-dani.jpg",
        text: "Momentos especiales junto a Dani, donde cada sonrisa ilumina nuestro día. La amistad verdadera se refleja en cada foto."
    },
    {
        title: "Primos Unidos",
        image: "fotos/foto-con-primas.jpg",
        text: "Los primos son los primeros amigos que la vida nos regala. Cada encuentro está lleno de risas y aventuras inolvidables."
    },
    {
        title: "¡Goleador!",
        image: "fotos/goles-masacre.jpg",
        text: "Un día épico en la cancha, demostrando pasión por el fútbol. Cada gol es una historia que contar."
    },
    {
        title: "Diversión Familiar",
        image: "fotos/jugando-primo.jpg",
        text: "Juegos y risas con los primos, creando recuerdos que durarán toda la vida. La diversión familiar no tiene precio."
    },
    {
        title: "¡Premio al Esfuerzo!",
        image: "fotos/la-wawa-premiada.jpg",
        text: "Un reconocimiento al esfuerzo y dedicación. Cada premio es un recordatorio de que los sueños se hacen realidad con perseverancia."
    },
    {
        title: "Momentos Divertidos",
        image: "fotos/maxi-con-algo-raro.jpg",
        text: "¡Las ocurrencias de Maxi! Siempre encontrando formas de hacernos reír y disfrutar de la vida."
    },
    {
        title: "En el Estadio",
        image: "fotos/maxi-con-chasky-estadio.jpg",
        text: "Una tarde inolvidable en el estadio con Chasky. La pasión por el fútbol nos une y crea momentos especiales."
    },
    {
        title: "Primos del Alma",
        image: "fotos/maxi-con-primo-de-la-u.jpg",
        text: "Compartiendo con el primo universitario. El orgullo y cariño se refleja en cada encuentro familiar."
    },
    {
        title: "Tía Querida",
        image: "fotos/maxi-con-tia.jpg",
        text: "Momentos especiales con la tía que siempre tiene una sonrisa y un abrazo para dar. El amor familiar en su máxima expresión."
    },
    {
        title: "Crack del Fútbol",
        image: "fotos/maxi-cuando-era-crack.jpg",
        text: "Desde pequeño demostrando talento en la cancha. Los inicios de un verdadero apasionado del fútbol."
    },
    {
        title: "Siesta Improvisada",
        image: "fotos/maxi-durmiendo-de-pie.jpg",
        text: "¡Hasta dormido de pie! Esos momentos graciosos que nos hacen reír hasta hoy. La vida está llena de momentos únicos."
    },
    {
        title: "Diversión Total",
        image: "fotos/maxi-feliz-inflables.jpg",
        text: "La felicidad pura en los juegos inflables. La sonrisa de un niño es el mejor regalo del mundo."
    },
    {
        title: "Elegancia Pura",
        image: "fotos/maxi-fino-elegante.jpg",
        text: "Vestido para la ocasión, todo un caballero. La elegancia natural de Maxi brillando como siempre."
    },
    {
        title: "¡Campeón!",
        image: "fotos/maxi-nomo-premiado.jpg",
        text: "Un día de triunfo y celebración. El esfuerzo y la dedicación siempre traen recompensas."
    },
    {
        title: "Navidad en Familia",
        image: "fotos/maxi-regalon-navidad.jpg",
        text: "La magia de la Navidad se multiplica cuando estamos en familia. Momentos que calientan el corazón."
    },
    {
        title: "Momento de Relax",
        image: "fotos/maxi-tomando.jpg",
        text: "Disfrutando de un momento tranquilo. A veces los mejores momentos son los más simples."
    },
    {
        title: "Siesta Familiar",
        image: "fotos/maxi-tomi-javiDurmiendo.jpg",
        text: "Cuando el cansancio nos venció a todos. Las siestas familiares son las mejores."
    },
    {
        title: "Casual y Feliz",
        image: "fotos/maxi-ya-no-tan-elegante.jpg",
        text: "La comodidad ante todo. La verdadera felicidad está en ser uno mismo."
    },
    {
        title: "Recuerdos de Bebé",
        image: "fotos/maxito-bebe.jpg",
        text: "Esos primeros momentos tan especiales. Cada sonrisa de bebé era un regalo del cielo."
    },
    {
        title: "Payaseando",
        image: "fotos/momento-auto-payaso.jpg",
        text: "¡Momentos de locura en el auto! La vida es mejor cuando la tomamos con humor."
    },
    {
        title: "Noche de Amigos",
        image: "fotos/pijamada-los-panitas.jpg",
        text: "Pijamada con los mejores amigos. Risas, juegos y recuerdos que durarán para siempre."
    },
    {
        title: "¡A la Piscina!",
        image: "fotos/piscina-check.jpg",
        text: "Diversión asegurada en la piscina. El verano es mejor cuando lo compartimos con quienes amamos."
    },
    {
        title: "Día de Playa",
        image: "fotos/playita-time.jpg",
        text: "Arena, sol y mar. Los días de playa son perfectos para crear recuerdos inolvidables."
    }
];

// Variables globales
let currentPage = -1; // -1: libro cerrado, 0: primera página visible, etc.
const TOTAL_PAGES = PAGES_DATA.length + 2; // +2 para incluir la intro y la página final

// Sonidos
const pageSound = new Audio("https://www.soundjay.com/page-flip-sounds/page-flip-01a.mp3");
const popSound = new Audio("https://www.soundjay.com/mechanical/sounds/balloon-pop-1.mp3");

// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado, inicializando libro...");
    
    // Cargar contenido
    loadPageContent();
    
    // Referencia a elementos UI
    const bookCover = document.getElementById('book-cover');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
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
    
    // Añadir botón para volver a la portada
    addHomeButton();
    
    // Inicializar el overlay instructivo
    setupInstructionOverlay();
    
    // Log para debugging
    console.log("Libro inicializado correctamente");
});

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
    
    // Reducir a solo 2 colores para mejor rendimiento
    const colors = ['#FFD700', '#4CAF50'];
    
    // Reducir la cantidad de confeti a solo 20 piezas
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
        container.appendChild(confetti);
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
// Eliminar estas funciones
// createBackgroundConfetti()
// addConfettiToPages()

function prepareVisualEffects() {
    // Precargar imágenes
    PAGES_DATA.forEach(data => {
        const img = new Image();
        img.src = data.image;
    });
    
    // Precargar sonidos
    try {
        pageSound.load();
    } catch (e) {
        console.warn("No se pudieron cargar los sonidos:", e);
    }
}

// Configurar eventos táctiles simples para móviles
function setupSimpleTouchEvents() {
    let startX;
    let currentX;
    let dragging = false;
    const MIN_SWIPE = 50;
    const pageWidth = window.innerWidth * 0.8;

    document.addEventListener('touchstart', function(e) {
        if (currentPage < 0) return;
        
        startX = e.touches[0].clientX;
        currentX = startX;
        dragging = true;
        
        const activePage = getActivePage();
        if (activePage) {
            activePage.style.transition = 'none';
            activePage.style.transformOrigin = 'left';
            activePage.classList.add('page-turning');
        }
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
        if (!dragging) return;
        
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        const activePage = getActivePage();
        
        if (activePage) {
            const progress = Math.min(Math.max(diffX / pageWidth, -1), 0);
            const rotation = progress * 180;
            const scale = 1 - Math.abs(progress) * 0.2;
            const shadow = Math.abs(progress) * 30;
            
            activePage.style.transform = `
                rotateY(${rotation}deg) 
                scale(${scale})
                perspective(1000px)
            `;
            activePage.style.boxShadow = `
                ${-shadow}px 0 ${shadow}px rgba(0,0,0,0.2)
            `;
        }
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        if (!dragging) return;
        
        const diffX = currentX - startX;
        const activePage = getActivePage();
        
        if (activePage) {
            activePage.style.transition = 'all 0.3s ease-out';
            activePage.classList.remove('page-turning');
            
            if (Math.abs(diffX) > MIN_SWIPE) {
                if (diffX < 0 && currentPage < TOTAL_PAGES - 1) {
                    activePage.style.transform = 'rotateY(-180deg) scale(0.8)';
                    setTimeout(() => nextPage(), 300);
                } else if (diffX > 0 && currentPage > 0) {
                    activePage.style.transform = 'rotateY(0deg) scale(1)';
                    setTimeout(() => previousPage(), 300);
                } else {
                    resetPageStyles(activePage);
                }
            } else {
                resetPageStyles(activePage);
            }
        }
        
        dragging = false;
        startX = null;
        currentX = null;
    }, { passive: true });
}

function resetPageStyles(page) {
    if (!page) return;
    
    page.style.transform = 'rotateY(0deg) scale(1)';
    page.style.boxShadow = 'none';
    page.style.transition = 'all 0.3s ease-out';
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
    if (bookCover) {
        bookCover.classList.add("open");
        bookCover.style.transform = 'rotateY(-180deg)';
        bookCover.style.transformOrigin = 'left center';
    }
    
    // Mostrar contraportada
    const backCover = document.getElementById("book-back-cover");
    if (backCover) {
        backCover.style.display = "block";
    }
    
    // Mostrar el contenedor de páginas
    const pagesContainer = document.getElementById("pages");
    if (pagesContainer) {
        pagesContainer.style.display = "block";
        pagesContainer.style.opacity = "1";
    }
    
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
    
    // Obtener todas las páginas
    const introPage = document.getElementById('intro-page');
    const finalPage = document.getElementById('final-page');
    const memoryPages = document.querySelectorAll('#memory-pages .page');
    
    // Crear array con todas las páginas en orden
    const allPages = [introPage, ...Array.from(memoryPages), finalPage];
    
    // Verificar páginas
    if (!allPages.every(page => page)) {
        console.error('Error: No se encontraron todas las páginas');
        return;
    }
    
    // Optimización: Solo actualizar las páginas necesarias
    const prevPage = currentPage > 0 ? allPages[currentPage - 1] : null;
    const currentPageElement = allPages[currentPage];
    const nextPage = currentPage < allPages.length - 1 ? allPages[currentPage + 1] : null;
    
    // Ocultar todas las páginas excepto las necesarias
    allPages.forEach(page => {
        if (page !== prevPage && page !== currentPageElement && page !== nextPage) {
            page.style.display = 'none';
        }
    });
    
    // Configurar páginas visibles
    if (prevPage) {
        prevPage.style.display = 'block';
        prevPage.classList.add('turned');
        prevPage.style.transform = 'rotateY(180deg)';
        prevPage.style.zIndex = allPages.length - (currentPage - 1);
    }
    
    if (currentPageElement) {
        currentPageElement.style.display = 'block';
        currentPageElement.classList.add('active');
        currentPageElement.style.transform = 'rotateY(0deg)';
        currentPageElement.style.zIndex = allPages.length;
    }
    
    if (nextPage) {
        nextPage.style.display = 'block';
        nextPage.style.transform = 'rotateY(0deg)';
        nextPage.style.zIndex = currentPage + 1;
    }
    
    // Actualizar botones
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) prevBtn.disabled = currentPage <= 0;
    if (nextBtn) nextBtn.disabled = currentPage >= allPages.length - 1;
}

// Función optimizada para cargar el contenido
function loadPageContent() {
    PAGES_DATA.forEach((data, index) => {
        const page = document.getElementById(`page-${index + 1}`);
        if (!page) return;
        
        const imageEl = page.querySelector(".memory-photo");
        if (imageEl) {
            imageEl.loading = "lazy";
            imageEl.decoding = "async";
            imageEl.onerror = function() {
                console.warn(`Failed to load image: ${data.image}`);
                this.src = 'placeholder.jpg'; // Add a placeholder image
            };
            imageEl.src = data.image;
        }
        
        const titleEl = page.querySelector(".memory-title");
        const textEl = page.querySelector(".memory-text");
        
        if (titleEl) titleEl.textContent = data.title;
        if (textEl) textEl.textContent = data.text;
    });
}

// Función optimizada para navegar entre páginas
function nextPage() {
    if (currentPage < TOTAL_PAGES - 1) {
        currentPage++;
        playSound(pageSound);
        showCurrentPage();
    }
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        playSound(pageSound);
        showCurrentPage();
    }
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
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(error => {
            console.warn("Error al reproducir sonido:", error);
        });
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

// Añadir botón para volver a la portada
function addHomeButton() {
    const homeBtn = document.createElement('button');
    homeBtn.id = 'home-btn';
    homeBtn.innerHTML = '🏠';
    homeBtn.className = 'nav-button home-button';
    document.querySelector('.book-container').appendChild(homeBtn);
    
    homeBtn.addEventListener('click', () => {
        if (currentPage >= 0) {
            currentPage = -1;
            const bookCover = document.getElementById('book-cover');
            const backCover = document.getElementById('book-back-cover');
            const pages = document.getElementById('pages');
            
            if (bookCover) {
                bookCover.classList.remove('open');
                bookCover.style.transform = '';
            }
            
            if (backCover) {
                backCover.style.display = 'none';
            }
            
            if (pages) {
                pages.style.display = 'none';
                pages.style.opacity = '0';
            }
            
            // Restablecer todas las páginas
            document.querySelectorAll('.page').forEach(page => {
                page.style.transform = '';
                page.style.display = 'none';
                page.classList.remove('active', 'turned');
            });
        }
    });
}

// Función para volver a la portada
function goToHomePage() {
    // Guardar la página actual antes de volver a la portada
    const prevPage = currentPage;
    
    // Si ya estamos en la portada, no hacer nada
    if (currentPage === 0) return;
    
    // Ocultar todas las páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        setTimeout(() => {
            page.classList.add('hidden');
        }, 500);
    });
    
    // Cerrar el libro y mostrar la portada
    document.querySelector('.book-cover').classList.remove('open');
    currentPage = 0;
    
    // Reproducir sonido de cierre del libro
    playSound('pageBack');
    
    // Actualizar navegación
    updateNavigation();
}

// Funciones para el overlay instructivo "Javier dice"
function setupInstructionOverlay() {
    const overlay = document.querySelector('.instruction-overlay');
    const startButton = document.querySelector('.start-button');
    
    if (overlay && startButton) {
        startButton.addEventListener('click', () => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
                openBook();
            }, 500);
        });
    } else {
        console.warn('Overlay or start button not found');
    }
}

function hideInstructionOverlay() {
    const overlay = document.getElementById('tutorial-overlay');
    overlay.classList.add('closing');
    
    // Quitar el overlay después de la animación
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500); // 500ms = duración de la animación
}
document.addEventListener('DOMContentLoaded', function() {
    const startReadingBtn = document.getElementById('start-reading');
    const tutorialOverlay = document.getElementById('tutorial-overlay');
    const bookEnvironment = document.querySelector('.book-environment');

    startReadingBtn.addEventListener('click', function() {
        // Ocultar el overlay del tutorial con una animación
        tutorialOverlay.classList.add('closing');
        
        // Mostrar el ambiente del libro
        bookEnvironment.style.display = 'flex';
        
        // Remover completamente el overlay después de la animación
        setTimeout(() => {
            tutorialOverlay.style.display = 'none';
        }, 500);
    });
});
