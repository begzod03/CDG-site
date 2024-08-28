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


// Middle section text p animation and logic for appearance
document.addEventListener('DOMContentLoaded', function() {
    const middleSectionText = document.getElementById('middle-section-text');
    const aboutSection = document.getElementById('section-2');
    const paragraphs = middleSectionText.querySelectorAll('p');
    const animatedLine = document.getElementById("animated-line");
    let hasAnimated = false; // Flag to prevent double animation

    paragraphs.forEach(p => {
        const originalHeight = p.offsetHeight;
        p.style.height = '0'; // Set initial height to 0
        p.style.margin = '0'; // Set initial margin to 0
        const words = p.textContent.trim().split(' ');
        p.textContent = ''; // Clear the text content initially

        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = 0;
            span.style.transform = 'translateX(-20px)';
            p.appendChild(span);
        });
    });

    function revealWords() {
        if (aboutSection.classList.contains('active') && !hasAnimated) {
            hasAnimated = true; // Set the flag to true to prevent further animations
            setTimeout(() => {
                paragraphs.forEach(p => {
                    p.style.transition = 'height 1.5s ease, margin 1.5s ease';
                    p.style.height = 'auto'; // Set height to auto
                    p.style.margin = '0.7em 0em'; // Add appropriate margin
                    p.style.fontSize = '9em'; // Add appropriate font size
                    p.style.backgroundColor = 'black';
                    const spans = p.querySelectorAll('span');
                    let delay = 0;
                    spans.forEach(span => {
                        setTimeout(() => {
                            span.style.transition = 'opacity 0.5s, transform 0.5s';
                            span.style.opacity = 1;
                            span.style.transform = 'translateX(0)';
                            span.style.borderRadius = '1em';
                            span.style.padding = '0.1em 1.2em';
                            span.style.color = 'white';
                            span.style.backgroundColor = 'black';
                        }, delay);
                        delay += 5000 / spans.length;
                    });
                });
                animatedLine.classList.add('animate');
            }, 2500); // Delay the animation by 1.5s
            window.removeEventListener('scroll', revealWords);
        }
    }

    // MutationObserver setup below.
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (aboutSection.classList.contains('active')) {
                    revealWords();
                    observer.disconnect();
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
});


// Update navigation indicator sign based on which section is active
document.addEventListener('DOMContentLoaded', function() {
    const indicators = document.querySelectorAll('.indicator');
    const sections = document.querySelectorAll('.section');

    let currentSectionIndex = 0;

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

    let isScrolling = false;
    let scrollTimeout = null;
    const scrollDelay = 0;

    const initialActiveSection = document.querySelector('.active');
    if (initialActiveSection) {
        currentSectionIndex = Array.prototype.indexOf.call(sections, initialActiveSection);
    }

    function switchSection(direction) {
        if (isScrolling) return;
        isScrolling = true;

        sections.forEach(section => {
            section.classList.remove('active', 'instant-active');
        });

        if (direction === 'down') {
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
            }
        } else if (direction === 'up') {
            currentSectionIndex = Math.max(0, currentSectionIndex - 1);
        }

        sections[currentSectionIndex].classList.add('active');
        updateIndicators();
        setTimeout(() => {
            isScrolling = false;
        }, 1500);
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

    const urlParams = new URLSearchParams(window.location.search);
    const sectionId = urlParams.get('section');

    if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const currentActiveSection = document.querySelector('.active');
            if (currentActiveSection) {
                currentActiveSection.classList.remove('active');
            }
            
            section.classList.add('instant-active');
            currentSectionIndex = Array.prototype.indexOf.call(sections, section);
            updateIndicators();
            section.scrollIntoView({ behavior: 'instant' });
            
            const whiteOverlay = document.querySelector('.white-overlay-return');
            whiteOverlay.classList.add('animate');
            
            setTimeout(() => {
                whiteOverlay.classList.remove('animate');
                whiteOverlay.style.display = 'none';
            }, 1000);
        } else {
            console.error('Section not found');
        }
    } else {
        const whiteOverlay = document.querySelector('.white-overlay-return');
        whiteOverlay.style.display = 'none';
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            sections.forEach(section => {
                section.classList.remove('active', 'instant-active');
            });

            currentSectionIndex = index;
            sections[currentSectionIndex].classList.add('active');
            updateIndicators();
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


// Contact Us form

const submitBtn = document.getElementById('submit-btn');
const successMessage = document.getElementById('success-message');

submitBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form from submitting traditionally

    // Simulate form submission
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Here you would typically send the data to your backend.
    // Reset the form fields
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';

    // Show success message
    successMessage.style.display = 'block';

    // Hide success message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
});