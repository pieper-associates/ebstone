/**
 * EB Stone — Component Loader
 * Fetches navigation.html and footer.html and injects them into
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
        // After navigation is loaded, execute its scripts
        if (id === 'site-header') {
          executeNavigationScripts();
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function executeNavigationScripts() {
    // Navigation scripts from navigation.html
    var hamburgerBtn = document.getElementById('hamburgerBtn');
    var navOverlay = document.getElementById('navOverlay');
    var mobileNav = document.getElementById('mobileNav');
    var mobileNavClose = document.getElementById('mobileNavClose');
    var toggleButtons = document.querySelectorAll('.mobile-nav-toggle');

    if (!hamburgerBtn) return;

    // Open menu
    hamburgerBtn.addEventListener('click', function () {
      mobileNav.classList.add('active');
      navOverlay.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });

    // Close menu
    var closeMenu = function () {
      mobileNav.classList.remove('active');
      navOverlay.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';

      // Close all submenus
      toggleButtons.forEach(function (btn) {
        btn.setAttribute('aria-expanded', 'false');
        var submenu = document.getElementById(btn.dataset.submenu + '-submenu');
        if (submenu) {
          submenu.classList.remove('active');
        }
      });
    };

    mobileNavClose.addEventListener('click', closeMenu);
    navOverlay.addEventListener('click', closeMenu);

    // Toggle submenus
    toggleButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var submenuId = btn.dataset.submenu;
        var submenu = document.getElementById(submenuId + '-submenu');
        var isExpanded = btn.getAttribute('aria-expanded') === 'true';

        btn.setAttribute('aria-expanded', !isExpanded);
        submenu.classList.toggle('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!mobileNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });
  }

  loadComponent('site-header', 'navigation.html');
  loadComponent('site-footer', 'footer.html');
})();
