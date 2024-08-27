document.addEventListener('DOMContentLoaded', function() {
    const siteTitle = document.querySelector('#site-title');
    const capitalAnimation = document.querySelector('#capital-animation');
    const introTitleAnimation = document.querySelector(".intro-content-title");
    const siteSubTitle = document.querySelector('#site-sub-title');
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

    // Animate the intro content title immediately
    introTitleAnimation.classList.add("fill");

    // Wait for the slide-in animation to complete before starting the CAPITAL fill effect
    setTimeout(() => {
        capitalAnimation.classList.add('fill');
        
        // Wait for the fill animation to complete before revealing the sub-title
        setTimeout(() => {
            siteSubTitle.classList.add('reveal');
            
            // Move "TO REALITY" to the right after a short delay
            setTimeout(() => {
                toReality.style.transform = 'translateX(27%)';
                toReality.style.color = "white";
            }, 500);
        }, 500);
    }, 2000);
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

// Middle section text p animation and logic for appearance

document.addEventListener('DOMContentLoaded', function() {
    const middleSectionText = document.getElementById('middle-section-text');
    const aboutSection = document.getElementById('section-2');
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




// Update navigation indicator sign based on which section is active
document.addEventListener('DOMContentLoaded', function() {
    const indicators = document.querySelectorAll('.indicator');
    const sections = document.querySelectorAll('.section');

    let currentSectionIndex = 0;

    // Function to update the indicators
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentSectionIndex) {
                indicator.classList.add('filled');
            } else {
                indicator.classList.remove('filled');
            }
        });
    }

    // Initial update
    updateIndicators();

// Update navigation indicator sign based on which section is active
document.addEventListener('DOMContentLoaded', function() {
    const indicators = document.querySelectorAll('.indicator');
    const sections = document.querySelectorAll('.section');

    let currentSectionIndex = 0;

    // Function to update the indicators
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentSectionIndex) {
                indicator.classList.add('filled');
            } else {
                indicator.classList.remove('filled');
            }
        });
    }
});

    // Initial 
    updateIndicators();

 // Custom Scrolling effect logic
let isScrolling = false;
let scrollTimeout = null;
const scrollDelay = 0; // Adjust this value to control the scroll delay

// Find the initial active section
const initialActiveSection = document.querySelector('.active');
if (initialActiveSection) {
    currentSectionIndex = Array.prototype.indexOf.call(sections, initialActiveSection);
}

function switchSection(direction) {
    if (isScrolling) return;
    isScrolling = true;

        // Remove active and instant-active classes from all sections
        sections.forEach(section => {
            section.classList.remove('active', 'instant-active');
        });

        if (direction === 'down') {
            // Prevent scrolling down after the last section
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
            }
        } else if (direction === 'up') {
            currentSectionIndex = Math.max(0, currentSectionIndex - 1);
        }

        // Add active class to the new section
        sections[currentSectionIndex].classList.add('active');
        updateIndicators(); // Update indicators here
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

    // Logic to handle coming back from project-detail.html
    const urlParams = new URLSearchParams(window.location.search);
    const sectionId = urlParams.get('section');

    if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            // Remove active class from any section that has it
            const currentActiveSection = document.querySelector('.active');
            if (currentActiveSection) {
                currentActiveSection.classList.remove('active');
            }
            
            // Add instant-active class to the new section and update currentSectionIndex
            section.classList.add('instant-active');
            currentSectionIndex = Array.prototype.indexOf.call(sections, section);
            updateIndicators(); // Update indicators here
            section.scrollIntoView({ behavior: 'instant' }); // Instantly scroll to the section
            
            // Add animate class to white-overlay
            const whiteOverlay = document.querySelector('.white-overlay-return');
            whiteOverlay.classList.add('animate');
            
            // Remove animate class after animation ends
            setTimeout(() => {
                whiteOverlay.classList.remove('animate');
                // Hide the overlay after animation ends
                whiteOverlay.style.display = 'none';
            }, 1000); // Matches the 1s transition time in CSS
        } else {
            console.error('Section not found');
            // Optionally, redirect to an error page or display an error message
        }
    } else {
        // Hide the overlay if the user is not coming back
        const whiteOverlay = document.querySelector('.white-overlay-return');
        whiteOverlay.style.display = 'none';
    }

    // Add event listener to each indicator
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            // Remove active and instant-active classes from all sections
            sections.forEach(section => {
                section.classList.remove('active', 'instant-active');
            });

            // Update currentSectionIndex
            currentSectionIndex = index;

            // Add active class to the new section
            sections[currentSectionIndex].classList.add('active');
            updateIndicators(); // Update indicators here
            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
        });
    });
});



// Trigger construction-hat animation
document.getElementById('section-3').addEventListener('transitionend', function() {
    if (this.classList.contains('active')) {
        triggerHatAnimation();
    }
});

function triggerHatAnimation() {
    const animatedHat = document.getElementById('animated-hat');
    animatedHat.classList.add('animate'); // Add class to trigger animation
}


// More Details... button logic
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        // Get the data-project-id attribute of the button
        const projectId = button.getAttribute('data-project-id');
        console.log('Project ID:', projectId);
        
        // Create a new URL with the projectId as a query parameter
        const url = new URL('project-detail.html', window.location.origin);
        url.searchParams.set('projectId', projectId);
        console.log('New URL:', url.href);
        
        // Show the white overlay immediately
        const overlay = document.querySelector('.white-overlay-leave');
        overlay.classList.add('animate');
        
        // Navigate to the new URL after a delay
        setTimeout(function() {
            window.location.href = url.href;
        }, 1200); // Adjust the delay time as needed
    });
});


// Grabbing onto images

const imageTrack = document.getElementById('image-track');

let isDown = false;
let startX;
let scrollLeft;

imageTrack.addEventListener('mousedown', (e) => {
  isDown = true;
  imageTrack.style.cursor = 'grabbing';
  startX = e.pageX - imageTrack.offsetLeft;
  scrollLeft = imageTrack.scrollLeft;
});

imageTrack.addEventListener('mouseleave', () => {
  isDown = false;
  imageTrack.style.cursor = 'grab';
});

imageTrack.addEventListener('mouseup', () => {
  isDown = false;
  imageTrack.style.cursor = 'grab';
});

imageTrack.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - imageTrack.offsetLeft;
  const walk = (x - startX) * 1; // adjust the speed of the drag
  imageTrack.scrollLeft = scrollLeft - walk;
});