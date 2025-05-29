// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Loading screen functionality
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
    }, 2500); // Show loading screen for 2.5 seconds

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Navigation active state
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });    // Games carousel data
    const gamesData = [
        {
            title: "Fire Emblem: Awakening",
            genre: "Tactical RPG",
            year: 2012,
            image: "images/games/Fire Emblem.jpg"
        },
        {
            title: "Animal Crossing: New Leaf",
            genre: "Life Simulation",
            year: 2013,
            image: "images/games/Animal Crossing.jpg"
        },
        {
            title: "Metroid: Samus Returns",
            genre: "Action-Adventure",
            year: 2017,
            image: "images/games/Metroid Samus Returns.jpg"
        },
        {
            title: "Kid Icarus: Uprising",
            genre: "Action-Adventure",
            year: 2012,
            image: "images/games/Kid Icarus.jpg"
        },
        {
            title: "Mario & Luigi: Dream Team",
            genre: "RPG",
            year: 2013,
            image: "images/games/Mario & Luigi.jpg"
        },
        {
            title: "Mario Golf: World Tour",
            genre: "Sports",
            year: 2014,
            image: "images/games/Mario Golf World Tour.jpg"
        },
        {
            title: "Bravely Default",
            genre: "JRPG",
            year: 2012,
            image: "images/games/Bravely Default.jpg"
        },
        {
            title: "Pokémon Ultra Sun & Moon",
            genre: "RPG",
            year: 2017,
            image: "images/games/pokemon ultra violet.jpg"
        },
        {
            title: "The Legend of Zelda: Ocarina of Time 3D",
            genre: "Action-Adventure",
            year: 2011,
            image: "images/games/Temple.jpg"
        }
    ];

    // Generate game cards for the carousel
    const carouselContainer = document.querySelector('.carousel-container');
      gamesData.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        
        gameCard.innerHTML = `
            <div class="game-image">
                <img src="${game.image}" alt="${game.title}">
            </div>
            <div class="game-info">
                <h3>${game.title}</h3>
                <p>${game.genre} (${game.year})</p>
            </div>
        `;
        
        carouselContainer.appendChild(gameCard);
    });

    // Carousel navigation
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    
    nextButton.addEventListener('click', () => {
        carouselContainer.scrollBy({ left: 520, behavior: 'smooth' });
    });
    
    prevButton.addEventListener('click', () => {
        carouselContainer.scrollBy({ left: -520, behavior: 'smooth' });
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle the clicked item
            item.classList.toggle('active');
        });
    });

    // Download button functionality
    const downloadButtons = document.querySelectorAll('.download-btn');
    const downloadModal = document.getElementById('download-modal');
    const closeModal = document.querySelector('.close-modal');
    const downloadOS = document.getElementById('download-os');
    const startDownloadBtn = document.getElementById('start-download');
    const downloadProgress = document.querySelector('.download-progress');
    const downloadStatus = document.querySelector('.download-status');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const os = button.getAttribute('data-os');
            downloadOS.textContent = os.charAt(0).toUpperCase() + os.slice(1);
            
            downloadModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', () => {
        downloadModal.classList.remove('show');
        document.body.style.overflow = '';
        resetDownloadState();
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === downloadModal) {
            downloadModal.classList.remove('show');
            document.body.style.overflow = '';
            resetDownloadState();
        }
    });
    
    startDownloadBtn.addEventListener('click', () => {
        simulateDownload();
    });

    function resetDownloadState() {
        downloadProgress.style.width = '0%';
        downloadStatus.textContent = 'Preparing download...';
        startDownloadBtn.disabled = false;
        startDownloadBtn.textContent = 'Start Download';
    }
    
    function simulateDownload() {
        startDownloadBtn.disabled = true;
        startDownloadBtn.textContent = 'Downloading...';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                downloadStatus.textContent = 'Download complete! Starting installation...';
                startDownloadBtn.textContent = 'Downloaded';
                
                setTimeout(() => {
                    downloadStatus.textContent = 'Thank you for downloading our 3DS Emulator!';
                }, 1500);
            } else {
                downloadStatus.textContent = `Downloading... ${Math.round(progress)}%`;
            }
            
            downloadProgress.style.width = `${progress}%`;
        }, 200);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Here you would typically send the email to your server
                // For now, we'll just show a success message
                emailInput.value = '';
                alert('Thank you for subscribing to our newsletter!');
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
