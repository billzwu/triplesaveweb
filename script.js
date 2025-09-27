// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';

            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Observe steps
document.querySelectorAll('.step').forEach(step => {
    observer.observe(step);
});

// Observe pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    observer.observe(card);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateCounter();
};

// Animate stats when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');

            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('$')) {
                    const value = parseInt(text.replace(/[^0-9]/g, ''));
                    stat.textContent = '$0';
                    animateCounter(stat, value);
                    stat.textContent = '$' + stat.textContent;
                } else if (text.includes('%')) {
                    const value = parseInt(text.replace('%', ''));
                    stat.textContent = '0%';
                    animateCounter(stat, value, 1500);
                    setTimeout(() => {
                        stat.textContent = value + '%';
                    }, 1500);
                } else if (text.includes('hrs')) {
                    stat.textContent = '0 hrs';
                    animateCounter(stat, 15, 1500);
                    setTimeout(() => {
                        stat.textContent = '15 hrs';
                    }, 1500);
                }
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Button hover effects
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Mobile menu toggle (for future mobile navigation)
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navContent = document.querySelector('.nav-content');

    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    hamburger.style.cssText = `
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        position: relative;
        z-index: 1001;
    `;

    // Add styles for hamburger lines
    const style = document.createElement('style');
    style.textContent = `
        .hamburger span {
            display: block;
            width: 25px;
            height: 3px;
            background: var(--text-dark);
            margin: 5px 0;
            transition: 0.3s;
            border-radius: 3px;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-7px, -8px);
        }

        @media (max-width: 768px) {
            .hamburger {
                display: block !important;
            }

            .nav-links {
                display: flex !important;
                position: fixed;
                top: 60px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 60px);
                background: white;
                flex-direction: column;
                justify-content: flex-start;
                padding: 2rem;
                transition: left 0.3s ease;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }

            .nav-links.active {
                left: 0;
            }

            .nav-links a {
                padding: 1rem 0;
                border-bottom: 1px solid var(--border-color);
            }

            .nav-links button {
                width: 100%;
                margin-top: 1rem;
            }
        }
    `;
    document.head.appendChild(style);

    navContent.appendChild(hamburger);

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a, .nav-links button').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
};

// Initialize mobile menu
createMobileMenu();

// Form submission simulation
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    if (button.textContent.includes('Trial') || button.textContent.includes('Started')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Create modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            `;

            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 1rem;
                max-width: 400px;
                text-align: center;
            `;

            modalContent.innerHTML = `
                <h2 style="margin-bottom: 1rem; color: var(--text-dark);">Get Started with TripleSave.AI</h2>
                <p style="margin-bottom: 2rem; color: var(--text-light);">Enter your email to start your free trial</p>
                <input type="email" placeholder="your@email.com" style="
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid var(--border-color);
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                    font-size: 1rem;
                ">
                <button class="btn-primary btn-block" style="margin-bottom: 1rem;">Start Free Trial</button>
                <button class="close-modal" style="
                    background: none;
                    border: none;
                    color: var(--text-light);
                    cursor: pointer;
                    text-decoration: underline;
                ">Maybe later</button>
            `;

            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            // Close modal
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });

            // Handle form submission
            modal.querySelector('.btn-primary').addEventListener('click', () => {
                const email = modal.querySelector('input').value;
                if (email && email.includes('@')) {
                    modalContent.innerHTML = `
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                        <h2 style="margin-bottom: 1rem; color: var(--text-dark);">Welcome to TripleSave.AI!</h2>
                        <p style="color: var(--text-light);">Check your email for next steps.</p>
                    `;

                    setTimeout(() => {
                        modal.remove();
                    }, 3000);
                }
            });
        });
    }
});

// Add typing effect to hero title
const addTypingEffect = () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        heroTitle.style.minHeight = '200px';

        const lines = originalText.split('<br>');
        let lineIndex = 0;
        let charIndex = 0;

        const typeText = () => {
            if (lineIndex < lines.length) {
                const currentLine = lines[lineIndex];

                if (charIndex < currentLine.length) {
                    heroTitle.innerHTML += currentLine[charIndex];
                    charIndex++;
                    setTimeout(typeText, 50);
                } else {
                    if (lineIndex < lines.length - 1) {
                        heroTitle.innerHTML += '<br>';
                    }
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeText, 200);
                }
            }
        };

        setTimeout(typeText, 500);
    }
};

// Initialize typing effect on page load
window.addEventListener('load', addTypingEffect);