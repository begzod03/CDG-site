document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('projectId');

    if (projectId) {
        const project = projects.find(project => project.id === parseInt(projectId));

        if (project) {
            document.querySelector('.project-image').src = project.image;
            document.querySelector('.project-name').textContent = project.name;
            document.querySelector('.project-year-built').textContent = `Year Built: ${project.yearBuilt}`;
            document.querySelector('.project-details').textContent = project.details;
        } else {
            console.error('Project not found');
            // Optionally, redirect to an error page or display an error message
        }
    } else {
        console.error('Project ID not provided in URL');
        // Optionally, redirect to an error page or display an error message
    }

    document.querySelector('.go-back-button').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        const url = new URL('index.html', window.location.origin);
        url.searchParams.set('section', 'section-3');
        window.location.href = url.href;
    });
});