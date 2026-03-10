// lost signal javascript
// all the interactive stuff for the website

console.log('Lost Signal systems online...');
console.log('Meili MKII terminal initialized');

// wait for page to load before running anything
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // WEEK 3: glitch text effect
    // ========================================
    
    const glitchBtn = document.getElementById('glitchBtn');
    const logTexts = document.querySelectorAll('.log-text');
    
    if (glitchBtn) {
        glitchBtn.addEventListener('click', function() {
            console.log('Replaying transmission...');
            
            logTexts.forEach(text => {
                // make text glitchy
                text.classList.add('glitching');
                
                // save original text so we can restore it
                const originalText = text.textContent;
                let glitchText = '';
                
                // replace random characters with glitch symbols
                // 10% chance each letter gets replaced
                for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() < 0.1) {
                        // pick random symbol from these
                        const glitchChars = '█▓▒░@#$%&*';
                        glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    } else {
                        glitchText += originalText[i];
                    }
                }
                
                // show glitched text
                text.textContent = glitchText;
                
                // put back normal text after 200ms
                setTimeout(() => {
                    text.textContent = originalText;
                    text.classList.remove('glitching');
                }, 200);
            });
        });
    }
    
    // ========================================
    // WEEK 4: like system for the cards
    // ========================================
    
    const cards = document.querySelectorAll('.system-card');
    
    cards.forEach(card => {
        const likeBtn = card.querySelector('.like-btn');
        const likeCount = card.querySelector('.like-count');
        const statusText = card.querySelector('.system-status');
        
        // keep track of likes for each card
        let likes = 0;
        let isLiked = false;
        
        likeBtn.addEventListener('click', function() {
            if (!isLiked) {
                // user clicked like
                likes++;
                isLiked = true;
                
                // change button to show its liked
                likeBtn.classList.add('liked');
                likeBtn.textContent = '█ LIKED';
                
                // update the counter
                likeCount.textContent = likes;
                likeCount.style.color = 'var(--terminal-green)';
                
                // if system was critical, make it stable when liked
                if (statusText.classList.contains('critical')) {
                    statusText.textContent = '[STABLE]';
                    statusText.classList.remove('critical');
                    statusText.style.color = 'var(--alert-orange)';
                    console.log('Critical system stabilized!');
                }
                
                // glitch effect when you like
                card.classList.add('liked-glitch');
                setTimeout(() => {
                    card.classList.remove('liked-glitch');
                }, 300);
                
                console.log('System liked! Count:', likes);
                
            } else {
                // user clicked unlike
                likes--;
                isLiked = false;
                
                // reset button back to normal
                likeBtn.classList.remove('liked');
                likeBtn.textContent = '░ LIKE';
                
                // reset counter
                likeCount.textContent = likes;
                likeCount.style.color = 'var(--text-dim)';
                
                console.log('System unliked. Count:', likes);
            }
        });
    });
    
    // ========================================
    // WEEK 4: progress bars that animate on scroll
    // ========================================
    
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // this function runs when progress bar appears on screen
    const animateProgress = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                // fill the bar to target width
                bar.style.width = width;
                
                console.log('Progress bar animated to', width);
            }
        });
    };
    
    // intersection observer watches when stuff appears on screen
    const observer = new IntersectionObserver(animateProgress, {
        threshold: 0.5  // trigger when 50% visible
    });
    
    // watch each progress bar
    progressBars.forEach(bar => {
        // start at 0 width
        bar.style.width = '0%';
        
        // start watching
        observer.observe(bar);
    });
    
    console.log('All systems initialized');
    console.log('- Glitch effect ready');
    console.log('- Like system active');
    console.log('- Progress animations loaded');
    
});