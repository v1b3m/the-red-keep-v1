function initAnimations() {
  gsap.from(".experience-card", {
    scrollTrigger: { trigger: ".experience-card", start: "top 80%" },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
  });

  gsap.from(".timeline-item", {
    scrollTrigger: { trigger: ".timeline-item", start: "top 80%" },
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
  });
}

// Setup cursor hover targets
setupCursorHover("a, button, .experience-card");
