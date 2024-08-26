document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('projectId');

    if (projectId) {
        const project = projects.find(project => project.id === parseInt(projectId));

        if (project) {
            let currentImageIndex = 0;

            // Set the first image in the images array
            document.querySelector('.project-image').src = project.images[currentImageIndex];
            document.querySelector('.project-name').textContent = project.name;
            document.querySelector('.project-year-built').textContent = `Year Built: ${project.yearBuilt}`;
            document.querySelector('.project-details').textContent = project.details;

            // Add event listeners for the arrow buttons
            document.querySelector('.left-arrow').addEventListener('click', function() {
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                } else {
                    currentImageIndex = project.images.length - 1; // Loop to last image
                }
                document.querySelector('.project-image').src = project.images[currentImageIndex];
            });

            document.querySelector('.right-arrow').addEventListener('click', function() {
                if (currentImageIndex < project.images.length - 1) {
                    currentImageIndex++;
                } else {
                    currentImageIndex = 0; // Loop to first image
                }
                document.querySelector('.project-image').src = project.images[currentImageIndex];
            });
        } else {
            console.error('Project not found');
        }
    } else {
        console.error('Project ID not provided in URL');
    }

    document.querySelector('.go-back-button').addEventListener('click', function(event) {
        event.preventDefault();
    
        // Show the white overlay immediately
        const overlay = document.querySelector('.white-overlay');
        overlay.classList.add('animate');
    
        const url = new URL('index.html', window.location.origin);
        url.searchParams.set('section', 'section-3');
    
        // Redirect after a delay
        setTimeout(function() {
            window.location.href = url.href;
        }, 1200);
    });
});