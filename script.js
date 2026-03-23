document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle with Slide Drawer
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle hamburger icon animation
            menuToggle.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // 2. Dark/Light Theme Toggle
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    const updateToggleIcons = (theme) => {
        themeToggleBtns.forEach(btn => {
            btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        });
    };

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateToggleIcons('dark');
    } else {
        updateToggleIcons('light');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleIcons(newTheme);
        });
    });

    // 3. Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.transition = 'all 0.8s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card, .about-img, .about-list, .section-title, .stats-col, .testimonial-card, .contact-wrapper');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // 4. Navbar shrink on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = 'var(--shadow-md)';
                navbar.style.height = '70px';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.height = '80px';
            }
        }
    });

    // 5. Hero Parallax Effect
    window.addEventListener('scroll', () => {
        const heroImg = document.querySelector('.hero-img-full');
        if (heroImg && window.scrollY < window.innerHeight) {
            heroImg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        }
    });

    // 6. RTL/LTR Toggle
    const dirToggleBtns = document.querySelectorAll('.dir-toggle');
    const currentDir = localStorage.getItem('dir') || 'ltr';

    const updateDirIcons = (dir) => {
        dirToggleBtns.forEach(btn => {
            btn.innerHTML = dir === 'rtl' ? 'LTR' : 'RTL';
        });
    };

    if (currentDir === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
        updateDirIcons('rtl');
    } else {
        updateDirIcons('ltr');
    }

    dirToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let dir = document.documentElement.getAttribute('dir') || 'ltr';
            let newDir = dir === 'rtl' ? 'ltr' : 'rtl';

            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateDirIcons(newDir);
        });
    });
});
