/**
 * Mobile menu. No Tailwind class is ever toggled here — assets/js/ isn't a
 * @source path of main.css, so state rides on the `hidden` attribute,
 * aria-expanded, and body.style.overflow instead.
 *
 * No click-outside handler: the panel is `fixed inset-0` and covers the
 * viewport edge to edge, so such a handler could never fire.
 */
(() => {
  const toggle = document.getElementById("nav-toggle");
  const closeBtn = document.getElementById("nav-close");
  const panel = document.getElementById("nav-mobile");

  if (!toggle || !panel) return;

  // The button ships hidden so it never sits there inert without JS.
  toggle.hidden = false;

  const focusableSelector = "a[href], button:not([disabled])";
  let lastFocused = null;

  function getFocusable() {
    return [...panel.querySelectorAll(focusableSelector)];
  }

  function onKeydown(event) {
    if (event.key === "Escape") {
      closeMenu();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = getFocusable();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openMenu() {
    lastFocused = document.activeElement;
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fermer le menu");
    document.body.style.overflow = "hidden";

    // Focus the close button, not the first focusable node (the logo link).
    const first = closeBtn || getFocusable()[0];
    if (first) first.focus();

    document.addEventListener("keydown", onKeydown);
  }

  function closeMenu() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
    document.body.style.overflow = "";

    document.removeEventListener("keydown", onKeydown);

    if (lastFocused) lastFocused.focus();
  }

  toggle.addEventListener("click", () => {
    if (panel.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
})();
