document.addEventListener('DOMContentLoaded', function() {
    
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span') || themeToggle;
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        setDarkTheme();
    } else {
        setLightTheme();
    }
    
    
    themeToggle.addEventListener('click', function() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            setLightTheme();
        } else {
            setDarkTheme();
        }
    });
    
    function setDarkTheme() {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'bi bi-sun-fill';
        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i> Light';
        localStorage.setItem('theme', 'dark');
    }
    
    function setLightTheme() {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.className = 'bi bi-moon-fill';
        themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i> Dark';
        localStorage.setItem('theme', 'light');
    }
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
            
            contactForm.reset();
        });
    }
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    updateActiveLink();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const skillCards = document.querySelectorAll('.skill-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    const projectCards = document.querySelectorAll('#projects .card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 35px var(--shadow-color)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 0.5rem 1rem var(--shadow-color)';
        });
    });
    
    const downloadResumeBtn = document.querySelector('a[download]');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {

            alert('In a real implementation, this would download the resume PDF file.');
            
        });
    }
    
    const socialLinks = document.querySelectorAll('footer a[href="#"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.includes('github') ? 'GitHub' : 'LinkedIn';
            alert(`In a real portfolio, this would link to your ${platform} profile.\nAdd your actual URL in the href attribute.`);
        });
    });
    
    console.log('Welcome to Muhammad Huzifa\'s Portfolio!');
    console.log('This site features a dark/light theme toggle and interactive elements.');
});