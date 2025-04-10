// Wait until the entire DOM is loaded.
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggleButton = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme");
  
    // Load saved theme on startup.
    if (savedTheme === "dark") {
      body.classList.add("dark-theme");
    }
  
    // Theme Toggle Button Click Event.
    toggleButton.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
    });
  
    // Loader: hide after page fully loads.
    const loader = document.getElementById("loader");
    window.setTimeout(() => {
      loader.classList.add("hidden");
    }, 1000); // Adjust delay as needed
  
    // Navigation Toggle (Combined)
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");
    const navList = document.querySelector('.main-nav .nav-list');
  
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("is-active");
      mainNav.classList.toggle("is-active");
      navList.classList.toggle("active");
    });
  
    // Change header style on scroll
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.site-header');
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(link.getAttribute('href'));
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu if open
          if (navList.classList.contains('active')) {
            navList.classList.remove('active');
            navToggle.classList.remove("is-active");
            mainNav.classList.remove("is-active");
          }
        }
      });
    });
  
    // Section Animation Observer – slide from left and fade in.
    const sections = document.querySelectorAll("section");
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
  
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
  
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active state from all buttons and set on current button
        filterButtons.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');
  
        const filter = btn.getAttribute('data-filter');
  
        portfolioCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });
  