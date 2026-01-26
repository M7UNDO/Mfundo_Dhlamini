gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(DrawSVGPlugin);

const overlay = document.querySelector(".overlay");
const currentPath = window.location.pathname.split("/").pop();

const root = document.documentElement;
const primaryColour = getComputedStyle(root).getPropertyValue("--primary-colour");
const accentColour = getComputedStyle(root).getPropertyValue("--accent-colour");
const typographyColour = getComputedStyle(root).getPropertyValue("--typography-colour");
const backgroundColour = getComputedStyle(root).getPropertyValue("--background-colour");
const transparentColour = getComputedStyle(root).getPropertyValue("--transparent-colour");

window.addEventListener("load", () => {
  const progressCircle = document.querySelector(".progress-circle");
  const loaderText = document.querySelector(".loader-text");
  const loader = document.querySelector(".loader");

  gsap.set(progressCircle, {opacity: 1, visibility: "visible", drawSVG: "0% 0%"});

  gsap.to(progressCircle, {
    duration: 1,
    drawSVG: "0% 100%",
    ease: "power2.inOut",
    onUpdate: function () {
      const progress = Math.round(this.progress() * 100);
      loaderText.textContent = `${progress}%`;
    },
    onComplete: function () {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => loader.remove(),
      });
    },
  });
});

window.addEventListener("DOMContentLoaded", () => {
  loadNav();
});

function loadNav() {
  const isGithub = window.location.hostname.includes("github.io");
  const repoName = isGithub ? "/LDN" : "";
  const header = document.querySelector("header");
  header.innerHTML = "";

  headerHTML = `
        <button class="menu-toggle" aria-label="Toggle menu">
        <span class="menu-lines"></span>
      </button>
      <nav class="nav-container">
        <div class="nav-logo">
          <a href="">M7UNDO</a>
        </div>

        <div class="nav-menu">
          <ul class="navlinks">
            <li><a href="../index.html">Home</a></li>
            <li><a href="../blogs/index.html">Blogs</a></li>
            <li><a href="">Essays</a></li>
            <li><a href="">Portfolio</a></li>
            <li><a href="">Design</a></li>
            <li><a href="">About</a></li>
          </ul>
        </div>
        <div class="socials-container">
          <a class="sm instagram" href="" target="_blanks"><i class="fa-brands fa-instagram"></i></a>
          <a class="sm linkedin" href="" target="_blanks"><i class="fa-brands fa-linkedin-in"></i></a>
        </div>
      </nav>
    `;

  header.innerHTML = headerHTML;

  const navlinks = document.querySelectorAll(".navlinks a");
  const socialIcon = document.querySelectorAll(".sm");
  const logo = document.querySelector(".nav-logo");
  const navContainer = document.querySelector(".nav-container");
  const menuToggle = document.querySelector(".menu-toggle");

  navlinks.forEach((navlink) => {
    const linkPage = navlink.getAttribute("href").split("/").pop();

    if (linkPage === currentPath) {
      navlink.classList.add("active");
    }

    navlink.addEventListener("mouseover", () => {
      gsap.to(navlink, {
        y: -2.5,
        color: accentColour,
        duration: 0.15,
        ease: "power2.in",
      });
    });

    navlink.addEventListener("mouseleave", () => {
      gsap.to(navlink, {
        y: 0,
        color: "",
        duration: 0.15,
        ease: "power2.out",
      });
    });
  });

  socialIcon.forEach((social) => {
    social.addEventListener("mouseover", () => {
      gsap.to(social, {
        color: accentColour,
        scale: 1.1,
        duration: 0.1,
        ease: "power1.inOut",
      });
    });

    social.addEventListener("mouseleave", () => {
      gsap.to(social, {
        color: "",
        scale: 1,
        duration: 0.1,
        ease: "power2.inOut",
      });
    });
  });

  logo.addEventListener("mouseover", () => {
    gsap.to(logo, {
      color: accentColour,
      scale: 1.1,
      duration: 0.1,
    });
  });

  logo.addEventListener("mouseleave", () => {
    gsap.to(logo, {
      color: "",
      scale: 1,
      duration: 0.2,
    });
  });

  document.querySelectorAll(".navlinks a.active").forEach((a) => {
    gsap.to(a, {duration: 0, onComplete: () => a.classList.add("active-loaded")});
  });

  menuToggle.addEventListener("click", () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    menuToggle.classList.toggle("menu-open");

    if (menuToggle.classList.contains("menu-open") && isMobile) {
      // Only show overlay on mobile
      gsap.set(navContainer, {x: "-100%", display: "flex"});
      gsap.set(overlay, {opacity: 0, display: "block"});

      gsap.to(navContainer, {x: 0, display: "flex", duration: 0.5, ease: "power3.inOut"});
      gsap.to(overlay, {opacity: 1, duration: 0.5, ease: "power3.inOut"});
    } else {
      // Hide overlay
      gsap.to(navContainer, {x: "-100%", duration: 0.5, ease: "power3.inOut"});
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => (overlay.style.display = "none"),
      });
    }
  });

  overlay.addEventListener("click", () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;

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

  function myFunction(x) {
    if (x.matches) {
      // Mobile
      gsap.set(navContainer, {x: "-100%", display: "flex"});
      overlay.style.display = "none"; // hidden by default
    } else {
      // Desktop
      gsap.set(navContainer, {x: "0", display: "flex"});
      gsap.set(overlay, {opacity: 0, display: "none"}); // force hide overlay
      menuToggle.classList.remove("menu-open");
    }
  }

  var x = window.matchMedia("(max-width: 768px)");

  myFunction(x);

  x.addEventListener("change", function () {
    myFunction(x);
  });
}

const backToTopBtn = document.querySelector(".back-to-top");

function scrollFunction() {
  if (!backToTopBtn) return;

  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}
