// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to current navigation item
window.addEventListener('scroll', function() {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 60) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Emergency section animation
const emergencySection = document.querySelector('.emergency-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'pulse 2s infinite';
        }
    });
}, { threshold: 0.5 });

if (emergencySection) {
    observer.observe(emergencySection);
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Mood tracker functionality
const moodTracker = {
    init() {
        const moodButtons = document.querySelectorAll('.mood-button');
        if (moodButtons.length > 0) {
            moodButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.trackMood(button.dataset.mood);
                });
            });
        }
    },
    
    trackMood(mood) {
        // In a real application, this would send data to a server
        console.log(`Mood tracked: ${mood}`);
        alert(`Thank you for tracking your mood: ${mood}`);
    }
};

// Initialize mood tracker if it exists on the page
if (document.querySelector('.mood-tracker')) {
    moodTracker.init();
}

// Add accessibility features
document.addEventListener('keydown', function(e) {
    // Skip to main content
    if (e.key === '1' && e.ctrlKey) {
        document.querySelector('main').focus();
    }
    // Skip to emergency section
    if (e.key === '2' && e.ctrlKey) {
        document.querySelector('.emergency-section').focus();
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
}); 