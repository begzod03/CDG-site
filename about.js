// MENU BUTTON
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuContent = document.querySelector('.menu-content');
    const body = document.body;

    // Function to toggle menu
    menuButton.addEventListener('click', function() {
        body.classList.toggle('menu-open');
        if (body.classList.contains('menu-open')) {
            menuContent.style.transition = 'right 0.5s ease-in-out'; // Smooth slide in
            menuContent.style.right = '0%';
            menuOverlay.style.opacity = '1'; // Show overlay with transition
            menuOverlay.style.pointerEvents = 'auto'; // Enable clicks
        } else {
            menuContent.style.transition = 'right 0.5s ease-in-out'; // Smooth slide out
            menuContent.style.right = '-50%';
            menuOverlay.style.opacity = '0'; // Hide overlay with transition
            menuOverlay.style.pointerEvents = 'none'; // Disable clicks
        }
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
            menuContent.style.transition = 'right 0.5s ease-in-out'; // Smooth slide out
            menuContent.style.right = '-50%';
            menuOverlay.style.opacity = '0'; // Hide overlay with transition
            menuOverlay.style.pointerEvents = 'none'; // Disable clicks
            body.classList.remove('menu-open');
        }
    });

    // New code to handle the loading circle animation
    const loadingCircle = document.querySelector('.loading-circle');
    loadingCircle.addEventListener('animationend', function() {
        document.body.classList.add('gold-background');
        loadingCircle.style.display = 'none'; // Hide the circle after animation

        // Trigger the animation for about-us-title p and logo after circle animation ends
        const aboutUsTitleSpans = document.querySelectorAll('.about-us-title p span');
        const aboutUsLogoSpan = document.querySelector('.about-us-logo span');
        
        // Animate the logo first
        aboutUsLogoSpan.classList.add('animate');
        
        // Animate each letter with a delay
        aboutUsTitleSpans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('animate');
            }, index * 100); // Delay each letter by 100ms
        });
    });

    // Trigger the animation for about-us-title p and logo immediately
    const aboutUsTitleSpans = document.querySelectorAll('.about-us-title p span');
    const aboutUsLogoSpan = document.querySelector('.about-us-logo span');
    
    // Animate the logo first
    aboutUsLogoSpan.classList.add('animate');
    
    // Animate each letter with a delay
    aboutUsTitleSpans.forEach((span, index) => {
        setTimeout(() => {
            span.classList.add('animate');
        }, index * 200); // Delay each letter by 100ms
    });

    // Function to wrap each word in a span
    function wrapWordsInSpans(element) {
        const words = element.innerText.split(' ');
        element.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
    }

    // Apply the function to the about-us-text p
    const aboutUsTextP = document.querySelector('.about-us-text p');
    wrapWordsInSpans(aboutUsTextP);

    // Animate each word with a delay
    const aboutUsTextSpans = document.querySelectorAll('.about-us-text p span');
    aboutUsTextSpans.forEach((span, index) => {
        setTimeout(() => {
            span.classList.add('animate');
        }, index * 50); // Delay each word by 200ms
    });
});