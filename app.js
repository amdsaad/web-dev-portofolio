document.addEventListener('DOMContentLoaded', () => {
    // Add header scroll effect
    const header = document.querySelector('.gh-header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
        updateThemeIcon(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    
    function updateThemeIcon(isDark) {
        const icon = themeToggle.querySelector('i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        setTheme(prefersDark.matches);
    }

    // Handle theme toggle click
    themeToggle.addEventListener('click', () => {
        const isDark = !document.documentElement.classList.contains('dark-theme');
        setTheme(isDark);
    });

    // Handle system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches);
        }
    });

    // Smooth scroll and active state for navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Scroll event listener
    window.addEventListener('scroll', updateActiveLink);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInElements = document.querySelectorAll('.skill-category, .service-card, .tool-card, .repo-card, .testimonial-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.repo-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projects.forEach(project => {
                if (filter === 'all' || project.dataset.type === filter) {
                    project.style.display = 'flex';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Lazy loading images with loading animation
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.parentElement.classList.add('loading');
        img.addEventListener('load', () => {
            img.parentElement.classList.remove('loading');
        });
    });

    // Add parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add smooth reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => revealObserver.observe(element));

    // Add skill progress animation
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillItems.forEach(item => skillObserver.observe(item));

    // Add section header animation
    const sectionHeaders = document.querySelectorAll('.section-header');
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                headerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    sectionHeaders.forEach(header => headerObserver.observe(header));

    // Projects section scroll animation
    const projectCards = document.querySelectorAll('.repo-card');
    const projectImages = document.querySelectorAll('.repo-image');

    // Enhanced project scroll animation with smooth transitions
    function updateActiveProject() {
        const threshold = window.innerHeight * 0.4;
        
        projectCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const centerPosition = rect.top + rect.height / 2;
            
            if (centerPosition > 0 && centerPosition < threshold) {
                // Activate current card and image with delay
                setTimeout(() => {
                    card.classList.add('active');
                    projectImages[index]?.classList.add('active');
                }, 100);
                
                // Deactivate others
                projectCards.forEach((c, i) => {
                    if (i !== index) {
                        c.classList.remove('active');
                        projectImages[i]?.classList.remove('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveProject);
    updateActiveProject(); // Initial check

    // Replace the old testimonial slider code with GSAP implementation
    function initTestimonialSlider() {
        const track = document.querySelector('.testimonials-track');
        const cards = document.querySelectorAll('.testimonial-card');
        
        if (!track || cards.length === 0) return;

        // Clone cards for infinite loop
        cards.forEach(card => {
            track.appendChild(card.cloneNode(true));
        });

        // Set initial position
        gsap.set(track, { x: 0 });

        // Create the infinite scroll animation
        gsap.to(track, {
            x: `-${cards[0].offsetWidth * cards.length}`,
            duration: cards.length * 5, // Adjust speed by changing duration
            ease: "none",
            repeat: -1,
            // Add smooth pause on hover
            paused: false,
        });

        // Add hover functionality
        track.addEventListener('mouseenter', () => {
            gsap.getTweensOf(track)[0].pause();
        });

        track.addEventListener('mouseleave', () => {
            gsap.getTweensOf(track)[0].resume();
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            gsap.getTweensOf(track)[0].kill();
            gsap.set(track, { x: 0 });
            gsap.to(track, {
                x: `-${cards[0].offsetWidth * cards.length}`,
                duration: cards.length * 5,
                ease: "none",
                repeat: -1,
            });
        });
    }

    // Initialize the slider after a short delay
    setTimeout(initTestimonialSlider, 100);

    // Replace the old skills animation code with this simplified version
    const newSkillItems = document.querySelectorAll('.skill-item');
    
    const newObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                newObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    newSkillItems.forEach(item => {
        newObserver.observe(item);
    });
});

// Remove these functions entirely as they're no longer needed
// Delete these functions:
// - initSkillsAnimation()
// - animateSkills()
// - The second skillObserver implementation
