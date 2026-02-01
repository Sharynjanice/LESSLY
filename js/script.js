// Dark Mode Toggle
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
themeSwitch.checked = currentTheme === 'dark';

themeSwitch.addEventListener('change', () => {
    const theme = themeSwitch.checked ? 'dark' : 'light';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// Menu burger
const burger = document.querySelector('.burger');
const navList = document.querySelector('.nav-list');

burger.addEventListener('click', () => {
    navList.classList.toggle('active');
    burger.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Header scroll effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animation au scroll améliorée
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in-up');
            }, index * 100); // Staggered animation
        }
    });
}, observerOptions);

// Observer toutes les sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Hero animations
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h2');
    const heroSubtitle = document.querySelector('.hero p');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    const heroImage = document.querySelector('.hero-image');

    // Animate hero elements
    setTimeout(() => heroTitle.classList.add('fade-in-up'), 200);
    setTimeout(() => heroSubtitle.classList.add('fade-in-up'), 400);
    setTimeout(() => {
        heroButtons.forEach((btn, index) => {
            setTimeout(() => btn.classList.add('fade-in-up'), index * 200);
        });
    }, 600);
    setTimeout(() => heroImage.classList.add('parallax'), 800);
});

// Bouton retour en haut
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lightbox pour la galerie
const galerieItems = document.querySelectorAll('.galerie-item');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-content">
        <img src="" alt="">
        <button class="lightbox-close">&times;</button>
    </div>
`;
document.body.appendChild(lightbox);

galerieItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const imgAlt = item.querySelector('img').alt;
        lightbox.querySelector('img').src = imgSrc;
        lightbox.querySelector('img').alt = imgAlt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Validation du formulaire
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const telephone = document.getElementById('telephone').value.trim();

    if (!nom || !telephone) {
        alert('Please fill in all required fields.');
        return;
    }

    // Validation du téléphone italien
    const phoneRegex = /^(\+39)?\s?3\d{2}[\s.-]?\d{3}[\s.-]?\d{3}$/;
    if (!phoneRegex.test(telephone.replace(/\s|-|\./g, ''))) {
        alert('Please enter a valid Italian phone number.');
        return;
    }

    // Ici, vous pouvez ajouter l'envoi du formulaire à un service backend
    alert('Thank you for your message! We will contact you soon.');
    contactForm.reset();
});

// Animation des cartes au hover
document.querySelectorAll('.tarif-card, .service-card, .extra-badge, .galerie-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
        card.style.boxShadow = '0 10px 30px rgba(218, 165, 32, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
    });
});

// Button animations
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
        btn.style.boxShadow = '0 5px 15px rgba(218, 165, 32, 0.3)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '';
    });
});

// Form focus animations
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.style.transform = 'translateY(-2px)';
    });

    field.addEventListener('blur', () => {
        field.parentElement.style.transform = 'translateY(0)';
    });
});

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// WhatsApp Integration
const whatsappBtn = document.getElementById('whatsapp-btn');
const whatsappFormBtn = document.getElementById('whatsapp-form-btn');

function generateWhatsAppMessage(name = '', hairstyle = '', message = '') {
    let text = "Hello, I would like to book a hairstyle appointment with Braids & Beauty.";
    if (name) text += `\n\nName: ${name}`;
    if (hairstyle) text += `\nHairstyle: ${hairstyle}`;
    if (message) text += `\n\nMessage: ${message}`;
    return encodeURIComponent(text);
}

// Floating WhatsApp button
whatsappBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const message = generateWhatsAppMessage();
    whatsappBtn.href = `https://wa.me/393XXXXXXXXX?text=${message}`;
});

// Form WhatsApp button
whatsappFormBtn.addEventListener('click', () => {
    const name = document.getElementById('nom').value.trim();
    const hairstyle = document.getElementById('coiffure').value;
    const message = document.getElementById('message').value.trim();

    const whatsappMessage = generateWhatsAppMessage(name, hairstyle, message);
    const whatsappUrl = `https://wa.me/393XXXXXXXXX?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
});

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter les classes d'animation initiales
    document.querySelectorAll('section').forEach((section, index) => {
        if (index === 0) {
            section.classList.add('fade-in-up');
        }
    });
});