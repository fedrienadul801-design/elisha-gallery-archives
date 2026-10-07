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
    fade();
  }
  burger.addEventListener("click", () => setMenu(!drawer.classList.contains("open")));
  scrim.addEventListener("click", () => setMenu(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  // Scroll fade.
  //  - Home page: starts solid black (white icons/name), fades to transparent as you scroll.
  //  - Gallery / Contact: starts white (black icons), turns dark (white icons) as you scroll.
  const bar = document.querySelector(".topbar");
  const isHome = document.body.classList.contains("home");
  const FADE_DISTANCE = 320; // pixels of scrolling for a full fade (bigger = slower)
  const DARK = 11;           // dark bar colour on Gallery / Contact (11 = page background)
  const mix = (from, to, p) => Math.round(from + (to - from) * p);
  function fade() {
    const open = drawer.classList.contains("open");
    const p = Math.min(window.scrollY / FADE_DISTANCE, 1);
    if (isHome) {
      const q = open ? 0 : p; // open menu: solid black bar
      bar.style.background = `rgba(11,11,11,${1 - q})`;
      bar.style.borderBottomColor = `rgba(51,51,51,${1 - q})`;
      bar.style.color = burger.style.color = "#fff"; // icons and name stay white
    } else {
      const q = open ? 0 : p; // open menu: white bar, black icons
      const b = mix(255, DARK, q), l = mix(227, 51, q), c = mix(11, 255, q);
      bar.style.background = `rgb(${b},${b},${b})`;
      bar.style.borderBottomColor = `rgb(${l},${l},${l})`;
      bar.style.color = burger.style.color = `rgb(${c},${c},${c})`;
    }
  }
  window.addEventListener("scroll", fade, { passive: true });
  fade();
})();
