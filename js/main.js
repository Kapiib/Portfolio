document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');

    // Get the current page URL
    const currentPath = window.location.pathname;

    // Loop through each link and check if it matches the current URL
    links.forEach(link => {
        if (link.getAttribute('href').endsWith(currentPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // Add a click event listener to each link
        link.addEventListener('click', function(event) {
            // Prevent the default link navigation
            event.preventDefault();

            // Remove the 'active' class from all links
            links.forEach(link => link.classList.remove('active'));

            // Add the 'active' class to the clicked link
            this.classList.add('active');

            // Store the currently active link in localStorage
            localStorage.setItem('activeLink', this.getAttribute('href'));

            // Navigate to the link after the active class has been applied
            window.location.href = this.getAttribute('href');
        });
    });
});
