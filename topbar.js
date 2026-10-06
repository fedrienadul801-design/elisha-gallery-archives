// Shared top bar: edit the logo, links or icon here once and every page updates.
(function () {
  const LINKS = [
    ["index.html", "HOME"],
    ["gallery.html", "GALLERY"],
    ["contact.html", "CONTACT"],
  ];
  const here = location.pathname.split("/").pop() || "index.html";
  const links = LINKS.map(([href, text]) =>
    `<a href="${href}"${href === here ? ' class="here"' : ""}>${text}</a>`
  ).join("");

  document.write(`
  <header class="topbar">
    <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">
      <span></span><span></span><span></span>
    </button>
    <a href="index.html" class="logo" aria-label="Dato Elisha's Gallery, home">
      <b>ELISHA'S ARCHIVES</b>
    </a>
    <a href="contact.html" class="person" aria-label="Contact">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>
    </a>
  </header>
  <div class="scrim" id="scrim"></div>
  <nav class="drawer" id="drawer">${links}</nav>`);

  // Menu behaviour (3 bars -> X, side drawer)
  const burger = document.getElementById("burger");
  const drawer = document.getElementById("drawer");
  const scrim = document.getElementById("scrim");
  function setMenu(open) {
    [burger, drawer, scrim].forEach(el => el.classList.toggle("open", open));
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  burger.addEventListener("click", () => setMenu(!drawer.classList.contains("open")));
  scrim.addEventListener("click", () => setMenu(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
})();
