document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu on link click
                const navLinks = document.querySelector('.nav-links');
                const menuToggle = document.querySelector('.menu-toggle');
                if (navLinks && menuToggle && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    } else {
        console.warn('Menu toggle or nav-links element not found.');
    }

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(26, 29, 41, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 217, 165, 0.1)';
            } else {
                header.style.background = 'rgba(26, 29, 41, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe skill and project cards for animation
    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Timeline animation
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Card and node animation
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    const node = entry.target.querySelector('.timeline-node');
                    if (node) {
                        node.classList.add('visible');
                    }
                }, index * 200); // 200ms delay between each card
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe timelines and cards
    document.querySelectorAll('.journey-grid.timeline').forEach(timeline => {
        timelineObserver.observe(timeline);
    });

    document.querySelectorAll('.journey-grid.timeline .journey-card').forEach(card => {
        cardObserver.observe(card);
    });

    // Add click ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });

    // Cursor trail effect (disabled on mobile for performance)
    let mouseX = 0;
    let mouseY = 0;
    const trailElements = [];

    if (window.innerWidth > 768) {
        for (let i = 0; i < 5; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.position = 'fixed';
            trail.style.width = '4px';
            trail.style.height = '4px';
            trail.style.backgroundColor = '#00d9a5';
            trail.style.borderRadius = '50%';
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9999';
            trail.style.opacity = '0';
            trail.style.transition = 'opacity 0.3s ease, transform 0.1s ease';
            document.body.appendChild(trail);
            trailElements.push(trail);
        }

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            trailElements.forEach((trail, index) => {
                const delay = index * 50;
                setTimeout(() => {
                    trail.style.left = `${mouseX - 2}px`; // Center the trail
                    trail.style.top = `${mouseY - 2}px`;
                    trail.style.opacity = `${1 - index * 0.2}`;
                    trail.style.transform = `scale(${1 - index * 0.2})`;
                }, delay);
            });
        });

        document.addEventListener('mouseleave', () => {
            trailElements.forEach(trail => {
                trail.style.opacity = '0';
            });
        });
    }
});