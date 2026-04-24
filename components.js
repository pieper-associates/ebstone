/**
 * EB Stone — Component Loader
 * Fetches header.html and footer.html and injects them into
 * #site-header and #site-footer placeholders on every page.
 */
(function () {
  function loadComponent(id, url) {
    var el = document.getElementById(id);
    if (!el) return;
    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Could not load ' + url);
        return res.text();
      })
      .then(function (html) {
        el.innerHTML = html;
        // After header is loaded, set up hamburger menu functionality
        if (id === 'site-header') {
          setupHamburgerMenu();
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function setupHamburgerMenu() {
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');
    var mainNav = document.querySelector('.main-nav');

    if (!hamburger || !navLinks || !mainNav) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      mainNav.classList.toggle('menu-open');
    });

    // Close menu when a nav link is clicked
    var links = navLinks.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('menu-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!mainNav.contains(e.target)) {
        mainNav.classList.remove('menu-open');
      }
    });
  }

  loadComponent('site-header', 'header.html');
  loadComponent('site-footer', 'footer.html');
})();
