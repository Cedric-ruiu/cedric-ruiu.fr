(() => {
  const toggle = document.getElementById("nav-toggle");
  const closeBtn = document.getElementById("nav-close");
  const panel = document.getElementById("nav-mobile");

  if (!toggle || !panel) return;

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

(() => {
  const list = document.querySelector("[data-nav-list]");
  if (!list) return;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let mark = list.querySelector(".nav-mark");
  let home = mark ? mark.parentElement : null;
  const resting = Boolean(mark);
  let target = home;
  let pinned = false;

  list.dataset.glide = "";

  function bar(link) {
    const box = link.getBoundingClientRect();
    const style = getComputedStyle(link);
    const left = parseFloat(style.paddingLeft);
    const right = parseFloat(style.paddingRight);
    return { x: box.left + left, w: box.width - left - right };
  }

  // The mark stays laid out under `home`; every position is a transform from it.
  function transform({ x, w }) {
    const origin = bar(home);
    return `translateX(${x - origin.x}px) scaleX(${w / origin.w})`;
  }

  function now() {
    const origin = bar(home);
    const matrix = new DOMMatrixReadOnly(getComputedStyle(mark).transform);
    return { x: origin.x + matrix.m41, w: origin.w * matrix.a };
  }

  function go(link) {
    if (link === target) return;
    target = link;

    if (!mark) {
      if (!link) return;
      mark = document.createElement("span");
      mark.className = "nav-mark";
      mark.setAttribute("aria-hidden", "true");
      link.append(mark);
      home = link;
      const start = bar(link);
      mark.style.transform = transform({ x: start.x + start.w / 2, w: 0 });
    }

    const from = now();
    let to;
    if (link) to = bar(link);
    else if (resting) to = bar(home);
    else to = { x: from.x + from.w / 2, w: 0 };

    const end = link === home || (!link && resting) ? "none" : transform(to);
    for (const animation of mark.getAnimations()) animation.cancel();
    mark.style.transform = end;
    if (reduced.matches) return;

    const frames = [{ transform: transform(from) }];
    if (from.w && to.w) {
      const left = Math.min(from.x, to.x);
      const right = Math.max(from.x + from.w, to.x + to.w);
      frames.push({ transform: transform({ x: left, w: right - left }) });
    }
    frames.push({ transform: end });
    mark.animate(
      frames.map((frame) => ({
        ...frame,
        easing: "cubic-bezier(0.5, 0, 0.2, 1)",
      })),
      { duration: frames.length === 3 ? 460 : 260 },
    );
  }

  list.addEventListener("pointerover", (event) => {
    const link = event.target.closest("a");
    if (link && event.pointerType === "mouse" && !pinned) go(link);
  });
  list.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse" && !pinned) go(null);
  });
  list.addEventListener("focusin", (event) => {
    if (!pinned) go(event.target.closest("a"));
  });
  list.addEventListener("focusout", (event) => {
    if (
      !pinned &&
      !list.contains(event.relatedTarget) &&
      !list.matches(":hover")
    )
      go(null);
  });
  list.addEventListener("click", (event) => {
    if (
      event.button ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link = event.target.closest("a");
    if (!link) return;
    pinned = true;
    go(link);
  });

  addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    pinned = false;
    go(null);
  });
})();
