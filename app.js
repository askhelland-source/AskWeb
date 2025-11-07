
(function() {
  const path = window.location.pathname;
  const repo = "/AskWeb"; // your GitHub repo name

  // Works locally and on GitHub Pages
  if (path.endsWith("/admin")) {
    const base = path.includes(repo) ? repo : "";
    window.location.replace(base + "/Admin.html");
  }
})();

