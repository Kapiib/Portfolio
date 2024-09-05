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

// main.js
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.intro, .about-me'); // Include other sections as needed
    const offset = 250; // Adjust this value to control when the section becomes active

    function activateNavLink() {
        let index = sections.length;

        while (--index && window.scrollY + offset < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        if (navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    }

    window.addEventListener('scroll', activateNavLink);
    activateNavLink(); // To activate on load
});

document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById("project-img");
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("imgModalContent");
    const close = document.getElementsByClassName("close")[0];

    img.onclick = function() {
        modal.style.display = "flex"; // Use flex to center the modal content
        modalImg.src = this.src;
    }

    close.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal if the user clicks anywhere outside the modal content
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
