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
    
    // Add CSS animations dynamically - force dark theme
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
        
        /* Dark theme consistent styles */
        body {
            background-color: var(--dark-bg);
            color: var(--text-primary);
        }
        
        main {
            background: linear-gradient(to bottom, #121212, #181818);
        }
        
        section {
            background-color: var(--section-bg);
            border: 1px solid var(--border-color);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        
        .team-card, .project-card {
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
        }
        
        h2 {
            color: var(--text-accent);
            padding-bottom: 5px;
        }
        
        h3 {
            color: var(--accent);
        }
        
        /* Modified blueprint-inspired grid background - darker for dark theme */
        main::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(rgba(50, 50, 50, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(50, 50, 50, 0.3) 1px, transparent 1px);
            background-size: 40px 40px;
            background-position: center;
            z-index: -1;
        }
        
        /* Force dark theme styles consistently */
        body {
            background-color: var(--bg);
            color: var(--text-primary);
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
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        
        .enhanced-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
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
            font-size: 3.5rem;
            font-weight: bold;
            color: var(--accent);
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
    `;
    document.head.appendChild(enhancedStyle);
    
    // Enhanced background parallax effects
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Parallax effect for sections with different engineering backgrounds
        document.querySelectorAll('section').forEach((section, index) => {
            // Different speeds for different sections
            const speed = 0.05 + (index * 0.01);
            section.style.backgroundPosition = `center ${-scrollPosition * speed}px`;
        });
        
        // Subtle parallax for the teal machinery header
        const header = document.querySelector('header');
        if (header) {
            header.style.backgroundPosition = `center ${-scrollPosition * 0.2}px`;
        }
        
        // Subtle parallax for the robotic background footer
        const footer = document.querySelector('footer');
        if (footer) {
            const footerPos = footer.offsetTop;
            const footerParallax = (scrollPosition - footerPos) * 0.15;
            if (scrollPosition > footerPos - window.innerHeight) {
                footer.style.backgroundPosition = `center ${footerParallax}px`;
            }
        }
    });

    // Remove theme toggle functionality entirely
    document.body.classList.add('dark-theme'); // Always use dark theme
    localStorage.setItem('theme', 'dark'); // Always save dark theme preference

    // Make emails and phone numbers copyable
    function makeCopyable() {
        // Find all elements containing phone numbers or emails
        document.querySelectorAll('.contact-info p, .team-card p').forEach(element => {
            const text = element.textContent;
            
            // Replace phone numbers with clickable spans
            if (text.includes('📞') || text.includes('📱')) {
                const phoneRegex = /(\+\d{1,4}\s?\d{1,}[\s-]?\d{1,}[\s-]?\d{1,})/g;
                let updatedText = text;
                let match;
                
                while (match = phoneRegex.exec(text)) {
                    const phoneNumber = match[1];
                    updatedText = updatedText.replace(
                        phoneNumber,
                        `<span class="copyable" data-value="${phoneNumber.replace(/\s/g, '')}">${phoneNumber} <span class="copy-icon">📋</span><span class="copy-tooltip">Click to copy</span></span>`
                    );
                }
                
                element.innerHTML = updatedText;
            }
            
            // Replace emails with clickable spans
            if (text.includes('📧') || text.includes('@')) {
                const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;
                let updatedText = text;
                let match;
                
                while (match = emailRegex.exec(text)) {
                    const email = match[1];
                    updatedText = updatedText.replace(
                        email,
                        `<span class="copyable" data-value="${email}">${email} <span class="copy-icon">📋</span><span class="copy-tooltip">Click to copy</span></span>`
                    );
                }
                
                element.innerHTML = updatedText;
            }
        });
        
        // Add click event listener to copyable elements
        document.querySelectorAll('.copyable').forEach(element => {
            element.addEventListener('click', function() {
                const textToCopy = this.getAttribute('data-value');
                
                // Create temporary textarea element to copy text
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'absolute';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                
                // Select and copy the text
                textarea.select();
                document.execCommand('copy');
                
                // Remove the temporary element
                document.body.removeChild(textarea);
                
                // Show copied feedback
                const tooltip = this.querySelector('.copy-tooltip');
                tooltip.textContent = 'Copied!';
                tooltip.classList.add('show');
                
                // Reset tooltip after 2 seconds
                setTimeout(() => {
                    tooltip.textContent = 'Click to copy';
                    tooltip.classList.remove('show');
                }, 2000);
            });
        });
    }
    
    // Call the function to make content copyable
    makeCopyable();
});

function openModal() {
  document.getElementById("waterProjectModal").style.display = "block";
}

function closeModal() {
  document.getElementById("waterProjectModal").style.display = "none";
}
