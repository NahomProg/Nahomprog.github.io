document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const responseMessage = document.getElementById('responseMessage');
    const musicToggle = document.getElementById('musicToggle');
    const loveSong = document.getElementById('loveSong');
    const heartPercent = document.getElementById('heartPercent');
    
    let noClickCount = 0;
    let fireworksActive = false;
    let fireworksContainer;
    
    createFloatingHearts();
    
    yesBtn.addEventListener('click', function() {
        if (yesBtn.innerHTML.includes('You Said YES')) {
            launchFireworks();
            return;
        }
        
        responseMessage.style.display = 'block';
        createHeartExplosion();
        playCelebrationSound();
        yesBtn.innerHTML = '<i class="fas fa-heart-circle-check"></i> Click for Fireworks! 🎆';
        yesBtn.disabled = false;
        noBtn.style.display = 'none';
        startCountdown();
        localStorage.setItem('valentineResponse', 'yes');
    });
    
    noBtn.addEventListener('click', function() {
        noClickCount++;
        
        if (noClickCount === 1) {
            noBtn.innerHTML = '<i class="fas fa-heart-crack"></i> Not An Option Baby😩';
        } else if (noClickCount === 2) {
            noBtn.innerHTML = '<i class="fas fa-heart-crack"></i> REALLY🤨';
        } else if (noClickCount === 3) {
            noBtn.innerHTML = '<i class="fas fa-heart-crack"></i> 🤦‍♂️🤦‍♂️';
            flashSideEyeDog();
        }
    });
    
    function flashSideEyeDog() {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.zIndex = '9999';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        
        const dogImg = document.createElement('img');
        dogImg.src = 'https://i.imgur.com/3XKHwkk.png';
        dogImg.style.maxWidth = '80%';
        dogImg.style.maxHeight = '80%';
        dogImg.style.borderRadius = '20px';
        dogImg.style.boxShadow = '0 0 50px rgba(255, 255, 255, 0.5)';
        
        overlay.appendChild(dogImg);
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 5000);
    }
    
    let isPlaying = false;
    musicToggle.addEventListener('click', function() {
        if (!isPlaying) {
            loveSong.play();
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i> <span>Pause Music</span>';
            isPlaying = true;
        } else {
            loveSong.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Play Love Song</span>';
            isPlaying = false;
        }
    });
    
    function animateHeartPulse() {
        let size = 1;
        let increasing = true;
        
        setInterval(() => {
            if (increasing) {
                size += 0.005;
                if (size >= 1.1) increasing = false;
            } else {
                size -= 0.005;
                if (size <= 1) increasing = true;
            }
            
            const heart = document.querySelector('.heart-shape');
            heart.style.transform = `rotate(-45deg) scale(${size})`;
        }, 50);
    }
    
    animateHeartPulse();
    
    function createHeartExplosion() {
        const colors = ['#ff0000', '#ff6b8b', '#ff8e9e', '#ffafbd'];
        for (let i = 0; i < 30; i++) {
            createFloatingHeart(
                window.innerWidth / 2,
                window.innerHeight / 2,
                colors[Math.floor(Math.random() * colors.length)]
            );
        }
    }
    
    function createFloatingHeart(x, y, color) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = `${Math.random() * 25 + 15}px`;
        heart.style.opacity = '0.9';
        heart.style.color = color;
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        document.body.appendChild(heart);
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        let posX = x;
        let posY = y;
        let opacity = 0.9;
        
        function animate() {
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            
            heart.style.left = `${posX}px`;
            heart.style.top = `${posY}px`;
            heart.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(heart);
            }
        }
        
        animate();
    }
    
    function createFloatingHearts() {
        const container = document.querySelector('.floating-hearts');
        const heartCount = 15;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('i');
            heart.className = 'fas fa-heart';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.fontSize = `${Math.random() * 20 + 10}px`;
            heart.style.color = `hsl(${Math.random() * 30 + 330}, 100%, 70%)`;
            heart.style.animationDelay = `${Math.random() * 15}s`;
            heart.style.animationDuration = `${Math.random() * 10 + 10}s`;
            container.appendChild(heart);
        }
    }
    
    function playCelebrationSound() {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-crowd-laugh-464.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log("Audio play failed:", e));
    }
    
    function launchFireworks() {
        if (fireworksActive) return;
        fireworksActive = true;
        
        if (!fireworksContainer) {
            fireworksContainer = document.createElement('div');
            fireworksContainer.className = 'fireworks-container';
            document.body.appendChild(fireworksContainer);
        }
        
        const colors = ['#ff0000', '#ff6b00', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'];
        const fireworkCount = 20;
        
        for (let i = 0; i < fireworkCount; i++) {
            setTimeout(() => {
                createFirework(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight,
                    colors[Math.floor(Math.random() * colors.length)]
                );
            }, i * 300);
        }
        
        setTimeout(() => {
            fireworksActive = false;
            if (fireworksContainer) {
                document.body.removeChild(fireworksContainer);
                fireworksContainer = null;
            }
        }, fireworkCount * 300 + 3000);
    }
    
    function createFirework(x, y, color) {
        const particleCount = 100;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = `0 0 10px ${color}`;
            particle.style.zIndex = '9999';
            particle.style.pointerEvents = 'none';
            fireworksContainer.appendChild(particle);
            
            particles.push({
                element: particle,
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 3 + 2,
                decay: Math.random() * 0.02 + 0.01
            });
        }
        
        function animateFirework() {
            let allDone = true;
            
            particles.forEach(p => {
                p.speed *= 0.97;
                const vx = Math.cos(p.angle) * p.speed;
                const vy = Math.sin(p.angle) * p.speed;
                
                const currentLeft = parseFloat(p.element.style.left);
                const currentTop = parseFloat(p.element.style.top);
                const currentOpacity = parseFloat(p.element.style.opacity || 1);
                
                p.element.style.left = `${currentLeft + vx}px`;
                p.element.style.top = `${currentTop + vy}px`;
                p.element.style.opacity = currentOpacity - p.decay;
                
                if (currentOpacity > 0.1 && p.speed > 0.1) {
                    allDone = false;
                }
            });
            
            if (!allDone) {
                requestAnimationFrame(animateFirework);
            } else {
                particles.forEach(p => {
                    if (p.element.parentNode) {
                        p.element.parentNode.removeChild(p.element);
                    }
                });
            }
        }
        
        animateFirework();
        
        const sound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-firework-explosion-3090.mp3');
        sound.volume = 0.2;
        sound.play().catch(e => console.log("Firework sound failed:", e));
    }
    
    function startCountdown() {
        const now = new Date();
        let nextValentine = new Date(now.getFullYear(), 1, 14);
        
        if (now > nextValentine) {
            nextValentine.setFullYear(nextValentine.getFullYear() + 1);
        }
        
        function updateCountdown() {
            const currentTime = new Date();
            const diff = nextValentine - currentTime;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    if (localStorage.getItem('valentineResponse') === 'yes') {
        responseMessage.style.display = 'block';
        yesBtn.innerHTML = '<i class="fas fa-heart-circle-check"></i> Click for Fireworks! 🎆';
        yesBtn.disabled = false;
        noBtn.style.display = 'none';
        startCountdown();
    }
});
