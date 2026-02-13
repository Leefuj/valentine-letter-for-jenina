// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Background music
let bgMusic = null;
let musicPlaying = false;

// Rejection messages
const rejectionMessages = [
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Don't be shy!",
    "Last chance!",
    "You're breaking my heart!",
    "Please reconsider!",
    "Come on now..."
];

let messageIndex = 0;
let yesButtonScale = 1;
let heartsInterval = null;
let isNoButtonMoving = false;

// Optimized Confetti (reduced from 200 to 80)
function createConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ffa07a', '#ff1493', '#ff69b4'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 25);
    }
}

// Optimized Falling hearts (slower interval)
function createFallingHearts() {
    heartsInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        const heartTypes = ['❤', '💕', '💖', '💗', '💓'];
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 5000);
    }, 400);
}

// Optimized Particle effects (reduced from 30 to 15)
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#ff69b4', '#ff1493', '#ff6b9d'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * i) / 15;
        const velocity = 100;
        particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

// Optimized Screen flash
function createFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.background = 'rgba(255, 255, 255, 0.7)';
    flash.style.zIndex = '99999';
    flash.style.pointerEvents = 'none';
    flash.style.animation = 'flashEffect 0.4s ease-out';
    document.body.appendChild(flash);
    
    setTimeout(() => flash.remove(), 400);
}

// Optimized Fireworks (reduced from 5 to 3)
function createFireworks() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'fixed';
            firework.style.left = (20 + Math.random() * 60) + 'vw';
            firework.style.top = (20 + Math.random() * 40) + 'vh';
            firework.style.fontSize = '40px';
            firework.innerHTML = '💥';
            firework.style.zIndex = '9999';
            firework.style.pointerEvents = 'none';
            firework.style.animation = 'explode 0.8s ease-out forwards';
            document.body.appendChild(firework);
            
            setTimeout(() => firework.remove(), 800);
        }, i * 300);
    }
}

// Click Envelope
envelope.addEventListener("click", () => {
    createFlash();
    createParticles(envelope);
    
    envelope.style.animation = 'none';
    envelope.style.transform = 'scale(0) rotate(360deg)';
    envelope.style.opacity = '0';
    
    setTimeout(() => {
        envelope.style.display = "none";
        letter.style.display = "flex";
        
        const musicToggle = document.getElementById('music-toggle');
        musicToggle.style.display = 'block';
        
        if (!bgMusic) {
            bgMusic = new Audio("music.mp3");
            bgMusic.loop = true;
            bgMusic.volume = 0.3;
        }
        
        bgMusic.play().catch(e => {
            console.log("Music autoplay blocked");
            musicPlaying = false;
        });
        musicPlaying = true;
        
        createFallingHearts();

        setTimeout(() => {
            document.querySelector(".letter-window").classList.add("open");
        }, 50);
    }, 600);
});

// Fixed NO button logic - less sensitive
noBtn.addEventListener("mouseenter", () => {
    if (isNoButtonMoving) return;
    
    isNoButtonMoving = true;
    
    noBtn.classList.add('shake-animation');
    setTimeout(() => noBtn.classList.remove('shake-animation'), 500);
    
    if (messageIndex < rejectionMessages.length) {
        title.style.animation = 'none';
        setTimeout(() => {
            title.textContent = rejectionMessages[messageIndex];
            title.style.animation = 'titleBounce 0.6s ease-out';
            messageIndex++;
        }, 10);
    }
    
    // FIXED: Grow Yes button
    yesButtonScale += 0.15;
    yesBtn.style.transform = `scale(${yesButtonScale})`;
    yesBtn.style.transition = 'transform 0.3s ease';
    
    createParticles(noBtn);
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const rect = noBtn.getBoundingClientRect();

    const min = 100;
    const max = 150;
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    let moveX = Math.cos(angle) * distance;
    let moveY = Math.sin(angle) * distance;

    const newLeft = rect.left + moveX;
    const newTop = rect.top + moveY;

    if (newLeft < 50 || newLeft > viewportWidth - 200) {
        moveX = -moveX;
    }
    if (newTop < 50 || newTop > viewportHeight - 200) {
        moveY = -moveY;
    }

    noBtn.style.transition = "transform 0.4s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${Math.random() * 360}deg)`;
    
    setTimeout(() => {
        isNoButtonMoving = false;
    }, 500);
});

// Yes button click
yesBtn.addEventListener("click", () => {
    createFlash();
    createFireworks();
    createConfetti();
    
    setTimeout(() => createConfetti(), 400);
    
    createParticles(yesBtn);
    
    title.textContent = "Yippeeee!";
    catImg.src = "cat_dance.gif";
    document.querySelector(".letter-window").classList.add("final");
    
    buttons.style.opacity = '0';
    buttons.style.transform = 'scale(0)';
    buttons.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        buttons.style.display = "none";
    }, 500);
    
    const finalMessage = "Invitation Accepted: You're mine now! You hear me?";
    finalText.innerHTML = '';
    
    let index = 0;
    const interval = setInterval(() => {
        if (index < finalMessage.length) {
            finalText.textContent += finalMessage[index];
            finalText.style.display = 'block';
            index++;
        } else {
            clearInterval(interval);
            
            setTimeout(() => {
                const nextBtn = document.createElement('button');
                nextBtn.id = 'next-btn';
                nextBtn.className = 'next-button';
                nextBtn.textContent = 'Next →';
                nextBtn.style.animation = 'fadeInScale 0.8s ease';
                finalText.parentElement.appendChild(nextBtn);
                
                createParticles(nextBtn);
                
                nextBtn.addEventListener('click', () => {
                    createFlash();
                    createFireworks();
                    createParticles(nextBtn);
                    
                    title.style.opacity = '0';
                    catImg.style.opacity = '0';
                    finalText.style.opacity = '0';
                    nextBtn.style.opacity = '0';
                    
                    title.style.transition = 'opacity 0.5s ease';
                    catImg.style.transition = 'opacity 0.5s ease';
                    finalText.style.transition = 'opacity 0.5s ease';
                    nextBtn.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        title.style.display = 'none';
                        catImg.style.display = 'none';
                        finalText.style.display = 'none';
                        nextBtn.style.display = 'none';
                        
                        const flowerCat = document.createElement('img');
                        flowerCat.src = 'cat-meme-elgatitolover.gif';
                        flowerCat.className = 'cat';
                        flowerCat.style.width = '350px';
                        flowerCat.style.opacity = '0';
                        flowerCat.style.transform = 'scale(0) rotate(-360deg)';
                        flowerCat.style.transition = 'all 1s ease';
                        document.querySelector('.letter-window').appendChild(flowerCat);
                        
                        setTimeout(() => {
                            flowerCat.style.opacity = '1';
                            flowerCat.style.transform = 'scale(1) rotate(0deg)';
                            createConfetti();
                            
                            setTimeout(() => {
                                const igButton = document.createElement('button');
                                igButton.className = 'next-button';
                                igButton.innerHTML = 'TALK TO ME NOW THEN ! 😸';
                                igButton.style.animation = 'fadeInScale 0.8s ease';
                                document.querySelector('.letter-window').appendChild(igButton);
                                
                                createParticles(igButton);
                                
                                igButton.addEventListener('click', () => {
                                    createFlash();
                                    createFireworks();
                                    createConfetti();
                                    createParticles(igButton);
                                    window.open('https://www.instagram.com/lee.nav', '_blank');
                                });
                            }, 1200);
                        }, 100);
                    }, 500);
                });
            }, 1000);
        }
    }, 50);
});

// Music toggle
const musicToggle = document.getElementById('music-toggle');

musicToggle.addEventListener('click', () => {
    createParticles(musicToggle);
    
    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🔇 Music OFF';
        musicToggle.style.background = 'rgba(150, 150, 150, 0.8)';
        musicPlaying = false;
    } else {
        bgMusic.play().catch(e => console.log("Play failed"));
        musicToggle.textContent = '🔊 Music ON';
        musicToggle.style.background = 'rgba(255, 105, 180, 0.8)';
        musicPlaying = true;
    }
});