gsap.registerPlugin(ScrollTrigger);

const navContainer = document.querySelector(".nav-container");
const menuToggle = document.querySelector(".menu-toggle");
const overlay = document.querySelector(".overlay");

gsap.set(navContainer, {x: "-100%", display: "flex"});

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("menu-open");
  if (menuToggle.classList.contains("menu-open")) {
    gsap.set(navContainer, {x: "-100%", display: "flex"});
    gsap.set(overlay, {opacity: 0, display: "block"});

    gsap.to(navContainer, {x: 0, duration: 0.5, ease: "power3.inOut"});
    gsap.to(overlay, {opacity: 1, duration: 0.5, ease: "power3.inOut"});
  }
  else{
    gsap.to(navContainer, {x: "-100%", duration: 0.5, ease: "power3.inOut"});
    gsap.to(overlay, {opacity: 0, duration: 0.5, ease: "power3.inOut"});
  }
});

overlay.addEventListener("click", () => {
  menuToggle.classList.remove("menu-open");

  gsap.to(overlay, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => (overlay.style.display = "none"),
  });

  gsap.to(navContainer, {
    x: "-100%",
    duration: 0.5,
    ease: "power3.inOut",
  });
});
