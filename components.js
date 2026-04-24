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
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  loadComponent('site-header', 'header.html');
  loadComponent('site-footer', 'footer.html');
})();
