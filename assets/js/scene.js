(() => {
  const scenes = document.querySelectorAll("[data-scene]");
  if (!scenes.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries)
      entry.target.toggleAttribute("data-paused", !entry.isIntersecting);
  });
  for (const scene of scenes) observer.observe(scene);
})();
