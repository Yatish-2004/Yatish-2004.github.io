document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Setup
    const cursorBlob = document.querySelector('.cursor-blob');
    const cursorFollower = document.querySelector('.cursor-blob-follower');
    
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            
            // Add a slight delay to the main blob for a "following" effect
            setTimeout(() => {
                cursorBlob.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }, 50);
        });

        // Hover effects for cursor
        const interactives = document.querySelectorAll('a, button, .skill-tag, .work-card, .btn-primary');
        
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorBlob.style.width = '50px';
                cursorBlob.style.height = '50px';
                cursorBlob.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                cursorBlob.style.borderColor = 'transparent';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorBlob.style.width = '30px';
                cursorBlob.style.height = '30px';
                cursorBlob.style.backgroundColor = 'transparent';
                cursorBlob.style.borderColor = 'var(--text-primary)';
            });
        });
    } else {
        // Hide custom cursor on mobile/touch
        if(cursorBlob) cursorBlob.style.display = 'none';
        if(cursorFollower) cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.querySelector('i').classList.replace('ri-close-line', 'ri-menu-line');
            });
        });
    }

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hero Entrance Animation
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.animate-element');
        animatedElements.forEach(el => el.classList.add('visible'));
    }, 100);

    // Scroll Reveal Animation with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Infinite Ticker Logic
    const tickerContent = document.getElementById('ticker');
    if (tickerContent) {
        // Clone the content multiple times to ensure enough width to scroll
        const clone1 = tickerContent.innerHTML;
        tickerContent.innerHTML += clone1 + clone1;
        
        // CSS animation relies on width, this inline style approach handles variable widths perfectly
        let position = 0;
        const speed = 0.5; // Pixels per frame
        
        function animateTicker() {
            position -= speed;
            // When we've scrolled past one full original set (1/3 of total since we added 2 clones)
            if (Math.abs(position) >= tickerContent.scrollWidth / 3) {
                position = 0;
            }
            tickerContent.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animateTicker);
        }
        
        animateTicker();
    }
    
    // Active Nav Link Update on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
