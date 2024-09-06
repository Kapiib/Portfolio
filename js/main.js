document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    
    function setActiveLink() {
        const currentPath = window.location.pathname;

        links.forEach(link => {
            const linkHref = link.getAttribute('href');

            // Handle relative paths and anchors
            const linkPath = new URL(linkHref, window.location.href).pathname;
            const isActive = linkPath === currentPath || (currentPath.startsWith(linkPath) && linkPath !== '');

            if (isActive) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Call setActiveLink initially when the page is loaded
    setActiveLink();

    // Also apply active class after each navigation (browser back/forward)
    window.addEventListener('popstate', setActiveLink);
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.intro, .about-me'); 
    const offset = 250; 

    function activateNavLink() {
        let index = sections.length;

        while (--index && window.scrollY + offset < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        if (navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    }

    window.addEventListener('scroll', activateNavLink);
    activateNavLink();
});

document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById("project-img");
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("imgModalContent");
    const close = document.getElementsByClassName("close")[0];

    img.onclick = function() {
        modal.style.display = "flex"; 
        modalImg.src = this.src;
    }

    close.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".sections li");
    const skillBoxes = document.querySelectorAll(".skill-box");

    const handleFilter = (filter) => {
        if (filter === "all") {
            skillBoxes.forEach(box => box.classList.add("show"));
        } else {
            skillBoxes.forEach(box => {
                if (box.classList.contains(filter)) {
                    box.classList.add("show");
                } else {
                    box.classList.remove("show");
                }
            });
        }
    };

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            handleFilter(filter);
        });
    });

    handleFilter("all");
});
