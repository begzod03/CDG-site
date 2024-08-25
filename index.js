document.addEventListener('DOMContentLoaded', function() {
    const siteTitle = document.querySelector('#site-title');
    const capitalAnimation = document.querySelector('#capital-animation');
    const introTitleAnimation = document.querySelector(".intro-content-title");
    const siteSubTitle = document.querySelector('#site-sub-title');
    const animatedPath = document.querySelector('.animated-path');
    const introContentImage = document.querySelector('#intro-content-image');

    const introTitles = document.querySelectorAll(".intro-content-title");
    const toReality = document.querySelector('#to-reality');
    
    // Animate the intro content titles
    setTimeout(() => {
        introTitles.forEach(title => {
            title.classList.add("fill");
        });
    }, 500);

    // Slide in the <h1> element
    siteTitle.style.transform = 'translateX(3%)';

    // Trigger the SVG line animation
    animatedPath.style.animation = 'draw 8s ease forwards';

    // Animate the intro content title immediately
    introTitleAnimation.classList.add("fill");

    // Fade in the image
    setTimeout(() => {
        introContentImage.classList.add('fade-in');
    }, 500);

    // Wait for the slide-in animation to complete before starting the CAPITAL fill effect
    setTimeout(() => {
        capitalAnimation.classList.add('fill');
        
        // Wait for the fill animation to complete before revealing the sub-title
        setTimeout(() => {
            siteSubTitle.classList.add('reveal');
            
            // Move "TO REALITY" to the right after a short delay
            setTimeout(() => {
                toReality.style.transform = 'translateX(50%)';
                toReality.style.color = "black"
            }, 500);
        }, 500);
    }, 2000);

    // Add event listener for click to change cursor
    document.body.addEventListener('click', function() {
        document.body.classList.add('hammer-down');

        // Revert back to the original cursor after 0.2 seconds
        setTimeout(() => {
            document.body.classList.remove('hammer-down');
        }, 200);
    });
});


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
});

// Image Animation and handling

document.addEventListener('DOMContentLoaded', function() {
    const introContentImage = document.querySelector('#intro-content-image img');
    const imageSources = ['assets/house2.jpg', 'assets/house3.jpg', 'assets/house4.jpg'];
    let currentIndex = 0;

    introContentImage.addEventListener('click', function() {
        // Apply the hide animation
        introContentImage.classList.add('hide');

        // After the hide animation, change the image source and apply the show animation
        setTimeout(() => {
            // Update the image index
            currentIndex = (currentIndex + 1) % imageSources.length;

            // Change the image source
            introContentImage.src = imageSources[currentIndex];

            // Remove the hide class
            introContentImage.classList.remove('hide');

            // Apply the show animation
            introContentImage.classList.add('show');

            // Reset for the next click
            setTimeout(() => {
                introContentImage.classList.remove('show');
            }, 500); // Match this timeout with the CSS animation duration
        }, 500); // Match this timeout with the CSS animation duration
    });
});





// Portfolio
const portfolio = document.querySelector('.portfolio');
const imageTrack = document.getElementById('image-track');

let isDragging = false;
let startX = 0;
let currentTranslateX = 0;
let velocity = 0;
let animationFrameId;

// Define automatic scroll speed and direction
const autoScrollSpeed = 3; // Speed of auto-scrolling
const scrollAmount = 0.3; // Increased amount for faster auto-scrolling

// Add 'mouse-clicked' class when the mouse button is pressed down
portfolio.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
    velocity = 0; // Reset velocity
    portfolio.classList.add('mouse-clicked');
    cancelAnimationFrame(animationFrameId); // Stop momentum on drag
});

// Remove 'mouse-clicked' class when the mouse button is released
portfolio.addEventListener('mouseup', function() {
    isDragging = false;
    portfolio.classList.remove('mouse-clicked');
    animateMomentum(); // Start momentum animation
});

// Also remove 'mouse-clicked' class if the mouse leaves the element while holding down
portfolio.addEventListener('mouseleave', function() {
    isDragging = false;
    portfolio.classList.remove('mouse-clicked');
    animateMomentum(); // Start momentum animation
});

// Update image track position on mouse move
portfolio.addEventListener('mousemove', function(e) {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    currentTranslateX += deltaX;
    startX = e.clientX;

    // Calculate velocity
    velocity = deltaX;

    // Limit the movement to not go beyond the center
    const maxTranslateX = 0; // Adjust this value based on your needs

    // Define additional drag distance
    const additionalDrag = 1900; // Adjust this value as needed
    const minTranslateX = -((imageTrack.scrollWidth - portfolio.clientWidth) / 2) - additionalDrag;

    // Update the translation logic
    currentTranslateX = Math.max(Math.min(currentTranslateX, maxTranslateX), minTranslateX);

    // Apply transition CSS for smooth scrolling
    imageTrack.style.transition = 'transform 0.1s ease-in-out'; // Reduced transition time
    imageTrack.style.transform = `translate(${currentTranslateX}px, -50%)`;
});

// Function to animate momentum after mouse release
function animateMomentum() {
    if (Math.abs(velocity) < 0.1) return; // Stop if velocity is low

    currentTranslateX += velocity;
    velocity *= 0.15; // Apply friction to slow down

    // Limit the movement to not go beyond the center
    const maxTranslateX = 0;
    const additionalDrag = 1900;
    const minTranslateX = -((imageTrack.scrollWidth - portfolio.clientWidth) / 2) - additionalDrag;
    currentTranslateX = Math.max(Math.min(currentTranslateX, maxTranslateX), minTranslateX);

    // Apply transition CSS for smooth scrolling
    imageTrack.style.transition = 'transform 0.1s ease-in-out'; // Reduced transition time
    imageTrack.style.transform = `translate(${currentTranslateX}px, -50%)`;

    animationFrameId = requestAnimationFrame(animateMomentum);
}

// Start automatic scrolling function
function startAutoScroll() {
    setInterval(() => {
        currentTranslateX -= scrollAmount; // scroll left continuously

        const maxTranslateX = 0;
        const additionalDrag = 1900;
        const minTranslateX = -((imageTrack.scrollWidth - portfolio.clientWidth) / 2) - additionalDrag;

        // Loop back to the first element
        if (currentTranslateX < minTranslateX) {
            currentTranslateX = maxTranslateX; // reset to show the first element again
        }

        // Apply transition CSS for smooth scrolling
        imageTrack.style.transition = 'transform 0.1s ease-in-out'; // Reduced transition time
        imageTrack.style.transform = `translate(${currentTranslateX}px, -50%)`;
    }, autoScrollSpeed);
}

// Start automatic scrolling function when the page loads
startAutoScroll();

document.querySelectorAll('.image-track-image image').forEach(image => {
    image.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
});




// Middle section text p animation and logic for appearance

document.addEventListener('DOMContentLoaded', function() {
    const middleSectionText = document.getElementById('middle-section-text');
    const aboutSection = document.getElementById('section-2');
    const middleSection = document.getElementById('middle-section');
    const words = middleSectionText.querySelector('p').textContent.trim().split(' ');
    const originalHeight = middleSectionText.querySelector('p').offsetHeight;
    const animatedLine = document.getElementById("animated-line")
    middleSectionText.querySelector('p').style.height = `${originalHeight}px`;
    middleSectionText.querySelector('p').textContent = '';
  
    function revealWords() {
        if (aboutSection.classList.contains('active')) {
          let delay = 0;
          words.forEach((word, index) => {
            setTimeout(() => {
              const span = document.createElement('span');
              span.textContent = word + ' ';
              span.style.opacity = 0; // Start hidden
              span.style.transform = 'translateX(-20px)'; // Start from left
              middleSectionText.querySelector('p').appendChild(span); // Only append once
      
              // Smooth transition
              setTimeout(() => {
                span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                span.style.opacity = 1; // Fade in
                span.style.transform = 'translateX(0)'; // Move to original position
              }, 10);
            }, delay);
            delay += 5000 / words.length;
          });
          animatedLine.classList.add('animate'); // Add class to trigger animation
          window.removeEventListener('scroll', revealWords); // Remove listener after triggering
        }
      }
      
  
    // Trigger the revealWords function when the middle section becomes active
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (aboutSection.classList.contains('active')) {
              revealWords();
              aboutSection.classList.add('active');
              observer.disconnect(); // Disconnect the observer once triggered
            }
          }
        });
      });
      
      observer.observe(aboutSection, { attributes: true });
  });


// Custom Scrolling effect logic

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;
    let isScrolling = false;
    let scrollTimeout = null;
    const scrollDelay = 0; // Adjust this value to control the scroll delay

    function switchSection(direction) {
        if (isScrolling) return;

        isScrolling = true;

        sections[currentSectionIndex].classList.remove('active');

        if (direction === 'down') {
            currentSectionIndex = (currentSectionIndex + 1) % sections.length;
        } else if (direction === 'up') {
            currentSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
        }

        sections[currentSectionIndex].classList.add('active');

        setTimeout(() => {
            isScrolling = false;
        }, 1500); // Adjust the delay to match the transition duration in CSS
    }

    window.addEventListener('wheel', function(event) {
        if (scrollTimeout !== null) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(function() {
            if (event.deltaY > 0) {
                switchSection('down');
            } else if (event.deltaY < 0) {
                switchSection('up');
            }
        }, scrollDelay);
    });
});
