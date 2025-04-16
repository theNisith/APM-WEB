// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(0, this.getAttribute('href').indexOf('.html'));
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Parallax header effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            header.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }
    
    // Add smooth reveal animations with staggered delay
    const animateElements = document.querySelectorAll('section, .team-card, .project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay based on element index
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, 150 * index);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        el.classList.add('pre-animation');
        observer.observe(el);
    });
    
    // Animated counter for statistics (if any exist)
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
        
        counterObserver.observe(counter);
    });
    
    // Engineering-inspired text effect for main heading
    const mainHeading = document.querySelector('header h1');
    if (mainHeading && !window.location.pathname.includes('team') && !window.location.pathname.includes('projects') && !window.location.pathname.includes('about')) {
        const text = mainHeading.textContent;
        mainHeading.innerHTML = ''; // Clear the heading
        mainHeading.classList.add('engineering-title');
        
        // Create container for the blueprint-style text
        const titleContainer = document.createElement('div');
        titleContainer.className = 'title-container';
        mainHeading.appendChild(titleContainer);
        
        // Split the text into words
        const words = text.split(' ');
        
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            
            // Add each letter with engineering measurement lines
            for (let i = 0; i < word.length; i++) {
                const letterContainer = document.createElement('span');
                letterContainer.className = 'letter-container';
                
                const letter = document.createElement('span');
                letter.className = 'letter';
                letter.textContent = word[i];
                letter.style.animationDelay = `${(wordIndex * 0.5) + (i * 0.1)}s`;
                
                letterContainer.appendChild(letter);
                wordSpan.appendChild(letterContainer);
            }
            
            titleContainer.appendChild(wordSpan);
            
            // Add space between words except for last word
            if (wordIndex < words.length - 1) {
                const space = document.createElement('span');
                space.className = 'space';
                space.innerHTML = '&nbsp;';
                titleContainer.appendChild(space);
            }
        });
        
        // Add technical decoration elements to the title
        const decorationLeft = document.createElement('span');
        decorationLeft.className = 'title-decoration left';
        decorationLeft.innerHTML = '<svg viewBox="0 0 50 20" xmlns="http://www.w3.org/2000/svg"><path d="M1,10 L10,10 M5,5 L5,15 M15,1 L15,19 M20,5 L20,15 M25,10 L49,10" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>';
        
        const decorationRight = document.createElement('span');
        decorationRight.className = 'title-decoration right';
        decorationRight.innerHTML = '<svg viewBox="0 0 50 20" xmlns="http://www.w3.org/2000/svg"><path d="M1,10 L10,10 M5,5 L5,15 M15,1 L15,19 M20,5 L20,15 M25,10 L49,10" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>';
        
        mainHeading.insertBefore(decorationLeft, titleContainer);
        mainHeading.appendChild(decorationRight);
    }

    // Enhance text boxes with color animations
    const textBoxes = document.querySelectorAll('.card-content');
    textBoxes.forEach((box, index) => {
        // Add unique gradient background based on index
        const hue1 = (210 + index * 30) % 360; // Base blue with variation
        const hue2 = (hue1 + 15) % 360;
        
        box.classList.add('enhanced-box');
        box.dataset.colorIndex = index % 4; // For CSS animations
        
        // Add shimmer effect on hover
        box.addEventListener('mouseenter', function() {
            this.classList.add('box-shimmer');
        });
        
        box.addEventListener('mouseleave', function() {
            this.classList.remove('box-shimmer');
            // Trigger reflow to restart animation next time
            void this.offsetWidth;
        });
    });
    
    // Add enhanced hover effects for cards
    const cards = document.querySelectorAll('.team-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Create shine effect
            this.style.transform = 'translateY(-10px)';
            
            // Apply subtle rotation based on mouse position
            card.addEventListener('mousemove', handleMouseMove);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            card.removeEventListener('mousemove', handleMouseMove);
            
            // Reset any transforms
            card.style.transform = 'translateY(0)';
        });
    });
    
    function handleMouseMove(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        // Calculate mouse position relative to card center
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;
        
        // Calculate rotation (max 5 degrees)
        const rotateY = mouseX * 5 / (cardRect.width / 2);
        const rotateX = -mouseY * 5 / (cardRect.height / 2);
        
        card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    
    // Create particle background effect
    const createParticleBackground = () => {
        const footer = document.querySelector('footer');
        if (!footer) return;
        
        const canvas = document.createElement('canvas');
        canvas.classList.add('particle-canvas');
        
        // Set canvas styles
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.4';
        
        // Insert canvas as first child in footer
        footer.insertBefore(canvas, footer.firstChild);
        
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = footer.offsetWidth;
            canvas.height = footer.offsetHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        // Particle properties
        const particlesArray = [];
        const numberOfParticles = 50;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }
            
            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        function init() {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                
                // Connect particles with lines
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - distance/100 * 0.3})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        init();
        animate();
    };
    
    // Create floating engineering elements (gears, motors, tools, etc.)
    const createFloatingElements = () => {
        const main = document.querySelector('main');
        if (!main) return;
        
        // Engineering element SVG definitions
        const engineeringElements = [
            // Gear
            `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#8B4513" stroke-width="1.5"/>
                <path d="M14.1213 14.1213L16.2426 16.2426M14.1213 9.87868L16.2426 7.75736M9.87868 14.1213L7.75736 16.2426M9.87868 9.87868L7.75736 7.75736M15 12H18M12 15V18M12 9V6M9 12H6" stroke="#8B4513" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M12.9 3H11.1L10.5 4.5L9 4.9L7.7 4L6.4 5.3L7.3 6.6L6.9 8.1L5.4 8.7V10.5L6.9 11.1L7.3 12.6L6.4 13.9L7.7 15.2L9 14.3L10.5 14.7L11.1 16.2H12.9L13.5 14.7L15 14.3L16.3 15.2L17.6 13.9L16.7 12.6L17.1 11.1L18.6 10.5V8.7L17.1 8.1L16.7 6.6L17.6 5.3L16.3 4L15 4.9L13.5 4.5L12.9 3Z" stroke="#8B4513" stroke-width="1.5"/>
            </svg>`,
            
            // Motor/engine
            `<svg width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="40" height="20" rx="2" stroke="#8B4513" stroke-width="1.5"/>
                <circle cx="15" cy="15" r="5" stroke="#8B4513" stroke-width="1.5"/>
                <circle cx="35" cy="15" r="5" stroke="#8B4513" stroke-width="1.5"/>
                <line x1="20" y1="15" x2="30" y2="15" stroke="#8B4513" stroke-width="1.5"/>
                <line x1="0" y1="15" x2="5" y2="15" stroke="#8B4513" stroke-width="1.5"/>
                <line x1="45" y1="15" x2="50" y2="15" stroke="#8B4513" stroke-width="1.5"/>
            </svg>`,
            
            // Blueprint/technical drawing
            `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#8B4513" stroke-width="1.5"/>
                <line x1="3" y1="7" x2="21" y2="7" stroke="#8B4513" stroke-width="1"/>
                <line x1="7" y1="3" x2="7" y2="21" stroke="#8B4513" stroke-width="1"/>
                <line x1="12" y1="3" x2="12" y2="21" stroke="#8B4513" stroke-width="1"/>
                <line x1="17" y1="3" x2="17" y2="21" stroke="#8B4513" stroke-width="1"/>
                <line x1="3" y1="12" x2="21" y2="12" stroke="#8B4513" stroke-width="1"/>
                <line x1="3" y1="17" x2="21" y2="17" stroke="#8B4513" stroke-width="1"/>
                <circle cx="12" cy="12" r="3" stroke="#8B4513" stroke-width="1"/>
            </svg>`,
            
            // Wrench
            `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5L15.5 8M6 4C6 5.10457 5.10457 6 4 6C2.89543 6 2 5.10457 2 4C2 2.89543 2.89543 2 4 2C5.10457 2 6 2.89543 6 4ZM14 16C14 17.1046 13.1046 18 12 18C10.8954 18 10 17.1046 10 16C10 14.8954 10.8954 14 12 14C13.1046 14 14 14.8954 14 16ZM22 8C22 9.10457 21.1046 10 20 10C18.8954 10 18 9.10457 18 8C18 6.89543 18.8954 6 20 6C21.1046 6 22 6.89543 22 8Z" stroke="#8B4513" stroke-width="1.5"/>
            </svg>`
        ];
        
        // Create container for floating elements
        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'floating-elements-container';
        main.appendChild(floatingContainer);
        
        // Create 8-12 random engineering elements
        const elementCount = Math.floor(Math.random() * 5) + 8;
        
        for (let i = 0; i < elementCount; i++) {
            const floatingEl = document.createElement('div');
            floatingEl.className = 'floating-element';
            
            // Select random engineering element
            const randomElementIndex = Math.floor(Math.random() * engineeringElements.length);
            floatingEl.innerHTML = engineeringElements[randomElementIndex];
            
            // Random position
            const xPos = Math.random() * 100; // percent
            const yPos = Math.random() * 100; // percent
            
            // Random starting rotation
            const rotation = Math.random() * 360;
            
            // Random animation duration and delay
            const duration = 20 + Math.random() * 40; // seconds
            const delay = Math.random() * -20; // seconds
            
            // Set styles
            floatingEl.style.left = `${xPos}%`;
            floatingEl.style.top = `${yPos}%`;
            floatingEl.style.transform = `rotate(${rotation}deg)`;
            floatingEl.style.animationDuration = `${duration}s`;
            floatingEl.style.animationDelay = `${delay}s`;
            floatingEl.style.opacity = 0.07 + Math.random() * 0.05;
            
            floatingContainer.appendChild(floatingEl);
        }
    };
    
    createFloatingElements();
    createParticleBackground();
    
    // Add smooth scroll behavior to navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only intercept links to the same page with hash
            if (href.includes('#') && href.split('#')[0] === currentPage || href.split('#')[0] === '') {
                e.preventDefault();
                
                const targetId = href.split('#')[1];
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: #fff }
        }
        
        .pre-animation {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .particle-canvas {
            pointer-events: none;
        }
        
        /* Classic engineering color scheme for middle section - without blue underlines */
        body {
            background-color: #f0f4f8;
            color: #2c3e50;
        }
        
        main {
            background: linear-gradient(to bottom, #f0f4f8, #e6eef5);
        }
        
        section {
            background-color: #f7fafc;
            border: 1px solid #d1dce7;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .team-card, .project-card {
            background-color: #ffffff;
            border: 1px solid #d1dce7;
        }
        
        h2 {
            color: #34495e;
            /* Removed the blue underline */
            padding-bottom: 5px;
        }
        
        h3 {
            color: #2980b9;
        }
        
        /* Modified blueprint-inspired grid background - more subtle */
        main {
            position: relative;
        }
        
        main::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(rgba(240, 244, 248, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(240, 244, 248, 0.5) 1px, transparent 1px);
            background-size: 40px 40px; /* Larger, more subtle grid */
            background-position: center;
            z-index: -1;
        }
        
        /* Classic engineering color scheme with brown accents */
        body {
            background-color: #f4f0e8; /* Slightly warmer background */
            color: #48392a; /* Brown text color */
        }
        
        main {
            background: linear-gradient(to bottom, #f4f0e8, #e8dfd0);
        }
        
        section {
            background-color: #f9f6f0; /* Warm white */
            border: 1px solid #d8cbb8; /* Brown border */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .team-card, .project-card {
            background-color: #ffffff;
            border: 1px solid #d8c3a5; /* Warm brown border */
        }
        
        h2 {
            color: #8b5a2b; /* Brown heading */
            padding-bottom: 5px;
            border-bottom: 2px solid #a67c52; /* Brown underline */
            display: inline-block;
        }
        
        h3 {
            color: #6b4423; /* Darker brown for subheadings */
        }
        
        /* Modified blueprint-inspired grid background with brown tones */
        main {
            position: relative;
        }
        
        main::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(rgba(183, 154, 129, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(183, 154, 129, 0.2) 1px, transparent 1px);
            background-size: 40px 40px;
            background-position: center;
            z-index: -1;
        }
        
        /* Floating engineering elements */
        .floating-elements-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none; /* Don't interfere with clicks */
            z-index: -1;
        }
        
        .floating-element {
            position: absolute;
            animation: float-around 30s linear infinite;
        }
        
        @keyframes float-around {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(50px, 25px) rotate(90deg);
            }
            50% {
                transform: translate(0, 50px) rotate(180deg);
            }
            75% {
                transform: translate(-50px, 25px) rotate(270deg);
            }
            100% {
                transform: translate(0, 0) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add more CSS animations dynamically for new effects
    const enhancedStyle = document.createElement('style');
    enhancedStyle.textContent = `
        @keyframes blueprint-reveal {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes technical-scan {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        
        @keyframes cad-line-draw {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
        }
        
        @keyframes box-gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
            0% { box-shadow: 0 0 0 rgba(255, 255, 255, 0); }
            25% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); }
            50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
            75% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); }
            100% { box-shadow: 0 0 0 rgba(255, 255, 255, 0); }
        }
        
        .engineering-title {
            font-family: 'Montserrat', 'Arial', sans-serif;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1rem 0;
            padding: 0.5rem 0;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 700;
            color: #e0e6ff;
            text-shadow: 0 0 2px rgba(255,255,255,0.5);
        }
        
        .title-container {
            position: relative;
            display: inline-flex;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .word {
            display: inline-flex;
            overflow: hidden;
        }
        
        .letter-container {
            position: relative;
            display: inline-block;
        }
        
        .letter {
            display: inline-block;
            animation: blueprint-reveal 0.5s cubic-bezier(0.215, 0.610, 0.355, 1) forwards;
            opacity: 0;
            position: relative;
        }
        
        /* Removed the blue underline under each letter */
        .letter-container::after {
            display: none;
        }
        
        .engineering-title::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,255,255,0.1) 50%, 
                transparent 100%);
            background-size: 200% 100%;
            animation: technical-scan 4s linear infinite;
            z-index: 1;
            pointer-events: none;
        }
        
        .title-decoration {
            display: block;
            width: 50px;
            height: 20px;
            margin: 0 15px;
            opacity: 0.8;
            color: rgba(200, 220, 255, 0.8);
        }
        
        .title-decoration.left {
            transform: scaleX(-1);
        }
        
        .title-decoration svg path {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: cad-line-draw 2s ease-out forwards;
        }
        
        /* Engineering-themed box styling - without the blue top border */
        .enhanced-box {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            z-index: 1;
            border-radius: 6px;
            background-color: #f7fafc;
            border: 1px solid #d1dce7;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .enhanced-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        /* Removed the blue top border on boxes */
        .enhanced-box::before {
            display: none;
        }
        
        .enhanced-box:hover::before {
            display: none;
        }
        
        /* Removed all the data-color-index styles since we removed the element they apply to */
        
        .box-shimmer {
            animation: none; /* Removed shimmer effect */
        }
        
        .counter-number {
            font-size: 2.5rem;
            font-weight: bold;
            color: #2c3e50; /* Changed from blue to dark gray */
            margin: 0.5rem 0;
        }
        
        /* Enhance pre-animation styles */
        .pre-animation {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Engineering-themed box styling with brown accents */
        .enhanced-box {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            z-index: 1;
            border-radius: 6px;
            background-color: #faf6f0; /* Warm white */
            border: 1px solid #d2b48c; /* Tan border */
            box-shadow: 0 2px 5px rgba(139, 69, 19, 0.05); /* Brown shadow */
        }
        
        .enhanced-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(139, 69, 19, 0.1); /* Brown shadow on hover */
        }
        
        .counter-number {
            font-size: 2.5rem;
            font-weight: bold;
            color: #8b4513; /* Brown counter numbers */
            margin: 0.5rem 0;
        }
        
        /* Brown accents for engineering title */
        .title-decoration {
            color: rgba(139, 69, 19, 0.6); /* Brown for decorative elements */
        }
        
        .engineering-title {
            color: #f0e6d2; /* Warm light color for title */
            text-shadow: 0 0 5px rgba(139, 69, 19, 0.3); /* Brown glow */
        }
        
        /* Modified particles for footer to use brown */
        .particle-canvas {
            opacity: 0.6; /* Make more visible */
        }
    `;
    document.head.appendChild(enhancedStyle);
});
