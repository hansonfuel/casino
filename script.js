document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({ 
        duration: 1000, 
        once: false, 
        mirror: true,
        easing: 'ease-in-out'
    });

    // Number formatting for currency
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    // Function to update the numbers in stats
    function updateNumbers() {
        document.querySelectorAll('.stat-value[data-base]').forEach(el => {
            const isCurrency = el.textContent.includes('$');
            const currentValue = parseInt(el.textContent.replace(/\D/g,''));
            const baseValue = parseInt(el.dataset.base);

            const increment = isCurrency 
                ? Math.floor(Math.random() * 250) + 100
                : Math.floor(Math.random() * 15) - 2;

            const newValue = Math.max(0, currentValue + increment);
            el.textContent = isCurrency 
                ? formatter.format(newValue)
                : newValue.toLocaleString();
        });
    }

    // Initialize random values for stats
    document.querySelectorAll('.stat-value[data-base]').forEach(el => {
        const base = parseInt(el.dataset.base);
        const isCurrency = el.closest('.stat-item').querySelector('.stat-label').textContent === 'Won Today';
        const randomized = base + Math.floor(Math.random() * 5000);
        el.textContent = isCurrency 
            ? formatter.format(randomized)
            : randomized.toLocaleString();
    });

    // Update numbers every 3 seconds
    setInterval(updateNumbers, 3000);

    // Notification system
    let notificationQueue = [];
    let isNotificationActive = false;

    function createNotification() {
        const games = ['Mines', 'Plinko', 'Dice', 'Blackjack'];
        const amounts = [
            (Math.random() * 5).toFixed(4) + ' BTC',
            (Math.random() * 20).toFixed(3) + ' ETH',
            (Math.random() * 100).toFixed(2) + ' XMR',
            (Math.random() * 500).toFixed(2) + ' SOL'
        ];

        return {
            game: games[Math.floor(Math.random() * games.length)],
            amount: amounts[Math.floor(Math.random() * amounts.length)],
            user: 'User****' + Math.floor(Math.random()*9000+1000)
        };
    }

    function showNotification() {
        if (isNotificationActive) {
            notificationQueue.push(createNotification());
            return;
        }

        isNotificationActive = true;
        const { game, amount, user } = createNotification();

        const notification = document.createElement('div');
        notification.className = 'win-notification';
        notification.innerHTML = `
            <div class="progress-bar"></div>
            <p>🎉 ${user} won ${amount} on ${game}!</p>
        `;

        const container = document.querySelector('.live-wins');
        container.innerHTML = '';
        container.appendChild(notification);

        notification.addEventListener('animationend', () => {
            container.innerHTML = '';
            isNotificationActive = false;

            if (notificationQueue.length > 0) {
                showNotification();
                notificationQueue.shift();
            }
        });
    }

    // Show notifications every 8 seconds
    setInterval(showNotification, 8000);
    setTimeout(showNotification, 2000);

    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px) scale(1.05)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);

            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Add responsive menu toggle
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header').appendChild(menuToggle);

    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        document.querySelector('.nav-links').style.display = isMenuOpen ? 'flex' : 'none';
        menuToggle.style.transform = isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)';
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('header')) {
            isMenuOpen = false;
            document.querySelector('.nav-links').style.display = 'none';
            menuToggle.style.transform = 'rotate(0deg)';
        }
    });

    // Add scroll animation effects
    const scrollElements = document.querySelectorAll('.game-card, .vip-card, .bonus-card');

    window.addEventListener('scroll', function() {
        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });

    // Initialize scroll effects
    scrollElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease-out';
    });

    // Add parallax effect to feature items
    const parallaxElements = document.querySelectorAll('.feature-item');

    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementTop = element.getBoundingClientRect().top;
            const parallaxOffset = scrollPosition - elementTop;

            element.style.transform = `translateY(${parallaxOffset * 0.5}px)`;
        });
    });

    // Add custom cursor effects
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-inner"></div>';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Add hover effect to game cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.transform = `translateY(-10px) perspective(1000px) rotateX(${(y - rect.height/2) / 10}deg) rotateY(${-(x - rect.width/2) / 10}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
        });
    });

    // Add touch events for mobile
    document.querySelectorAll('.game-card').forEach(card => {
        let touchStartX = 0;
        let touchStartY = 0;

        card.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        card.addEventListener('touchmove', function(e) {
            e.preventDefault();
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const rect = this.getBoundingClientRect();

            const x = touchX - rect.left;
            const y = touchY - rect.top;

            this.style.transform = `translateY(-10px) perspective(1000px) rotateX(${(y - rect.height/2) / 10}deg) rotateY(${-(x - rect.width/2) / 10}deg)`;
        });

        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(-10px)';
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            isMenuOpen = false;
            document.querySelector('.nav-links').style.display = 'none';
            menuToggle.style.transform = 'rotate(0deg)';
        }
    });
});
