// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            console.log('Form submitted:', { name, email, message });
            
            const btn = this.querySelector('.submit-btn');
            if (btn) {
                btn.style.backgroundColor = '#4CAF50';
                btn.textContent = 'Message Sent!';
                
                setTimeout(() => {
                    this.reset();
                    btn.style.backgroundColor = '';
                    btn.textContent = 'Send Message';
                }, 3000);
            }
        });
    }

    // Initialize scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and elements that need animation
    const animatedElements = document.querySelectorAll('section, .about-text, .project-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });

    // Hero section parallax effect
    const hero = document.querySelector('.hero');
    if (hero) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
                const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
                hero.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            });
        });
    }

    // Initialize fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });

    // Skill tags hover effect
    document.querySelectorAll('.skills span').forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.transform = 'translateY(-5px)';
        });
        
        skill.addEventListener('mouseleave', () => {
            skill.style.transform = 'translateY(0)';
        });
    });
});