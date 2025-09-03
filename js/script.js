/**
 * Dra. Clara Inés Ortiz Serrano - Dermatóloga Especialista
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = mainNav.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('active')) {
            // Check if the click is outside the navigation
            if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-btn')) {
                mainNav.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's not an anchor link
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }
                }
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });

    // Handle appointment form submission
    const appointmentForm = document.getElementById('appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(appointmentForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the data to a server
            // For now, we'll just show a confirmation message
            
            // Create confirmation message
            const messageContainer = document.createElement('div');
            messageContainer.className = 'form-confirmation';
            messageContainer.innerHTML = `
                <div class="confirmation-inner">
                    <h3>¡Gracias por su solicitud!</h3>
                    <p>Nos pondremos en contacto con usted a la brevedad para confirmar su cita.</p>
                    <button type="button" class="btn btn-primary close-confirmation">Cerrar</button>
                </div>
            `;
            
            // Add to DOM
            document.body.appendChild(messageContainer);
            
            // Style the confirmation message
            messageContainer.style.position = 'fixed';
            messageContainer.style.top = '0';
            messageContainer.style.left = '0';
            messageContainer.style.width = '100%';
            messageContainer.style.height = '100%';
            messageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            messageContainer.style.display = 'flex';
            messageContainer.style.justifyContent = 'center';
            messageContainer.style.alignItems = 'center';
            messageContainer.style.zIndex = '9999';
            
            const confirmationInner = messageContainer.querySelector('.confirmation-inner');
            confirmationInner.style.backgroundColor = 'white';
            confirmationInner.style.padding = '2rem';
            confirmationInner.style.borderRadius = '8px';
            confirmationInner.style.maxWidth = '500px';
            confirmationInner.style.textAlign = 'center';
            
            // Add close handler
            const closeButton = messageContainer.querySelector('.close-confirmation');
            closeButton.addEventListener('click', function() {
                messageContainer.remove();
                appointmentForm.reset();
            });
            
            // Log form data to console (for demonstration)
            console.log('Form submission:', formObject);
        });
    }

    // Highlight active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection || 
                (currentSection === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active link on load and scroll
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);
    
    // Initialize current year in footer copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
}); 