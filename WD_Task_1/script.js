document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavLink() {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const targetId = section.id;

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').slice(1) === targetId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  function throttle(func, limit) {
    let timeout;
    return function() {
      const context = this,
            args = arguments;
      if (!timeout) {
        func.apply(context, args);
        timeout = true;
        setTimeout(() => {
          timeout = false;
        }, limit);
      }
    };
  }

  const throttledHighlightNavLink = throttle(highlightNavLink, 200);

  highlightNavLink(); // Highlight initially
  window.addEventListener('scroll', throttledHighlightNavLink);
});


function toggleMenu() {
  const menuIcon = document.querySelector('.menu-icon');
  const overlay = document.querySelector('.overlay');
  const nav = document.querySelector('nav');
  const ul = document.querySelector('ul');

  // Check if the menu icon has the active class
  const isOpen = menuIcon.classList.contains('active');

  // Toggle the active class on each element
  menuIcon.classList.toggle('active');
  overlay.classList.toggle('active');
  nav.classList.toggle('active');
  ul.classList.toggle('active');
  
  // If the menu was open and now closed, remove active class from all elements
  if (isOpen && !menuIcon.classList.contains('active')) {
    menuIcon.classList.remove('active');
    overlay.classList.remove('active');
    nav.classList.remove('active');
    ul.classList.remove('active');
  }
}
const navbarToggle = navbar.querySelector("#navbar-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinksContainer = navbarMenu.querySelector(".navbar-links");
let isNavbarExpanded = navbarToggle.getAttribute("aria-expanded") === "true";

const toggleNavbarVisibility = () => {
  isNavbarExpanded = !isNavbarExpanded;
  navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);
};

navbarToggle.addEventListener("click", toggleNavbarVisibility);

navbarLinksContainer.addEventListener("click", (e) => e.stopPropagation());
navbarMenu.addEventListener("click", toggleNavbarVisibility);
