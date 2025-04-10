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
});
