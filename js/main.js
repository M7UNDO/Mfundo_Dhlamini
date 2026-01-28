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
        <a href="../index.html" class="nav-logo">
            <svg class="logo" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 426.2 441.6" style="enable-background:new 0 0 426.2 441.6;" xml:space="preserve">
<g>
	<line x1="106.2" y1="195.3" x2="101.5" y2="186"/>
	<g>
		<line x1="106.2" y1="195.3" x2="101.5" y2="186"/>
		<polygon points="208.5,224.9 208.5,414.1 188.1,402.3 167.6,390.5 151.2,357.3 147.1,349 134.8,324.1 126.7,307.5 118.4,290.9 
			106.2,265.9 102,257.6 85.6,224.3 85.6,343.2 65.1,331.3 44.6,319.5 44.6,130.2 65.1,142.1 85.6,153.9 101.5,186 106.2,195.3 
			118.1,219.4 126.7,236.7 134.6,252.7 147.1,278 151.1,286 167.6,319.3 167.6,201.3 188.1,213.1 		"/>
	</g>
	<g>
		<polygon points="258.6,248.6 258.6,272.3 279.1,260.5 299.6,248.6 320.1,236.7 340.6,224.9 361.1,213 381.6,201.1 381.6,319.5 
			361.1,331.3 340.6,343.2 320.1,355 299.6,366.9 279.1,378.7 258.6,390.5 238.2,402.3 217.7,414.1 217.7,367.2 238.2,355.4 
			258.6,343.6 279.1,331.7 299.6,319.9 320.1,308 340.6,296.2 340.6,272.4 320.1,284.3 299.6,296.1 279.1,308 258.6,319.8 
			238.2,331.7 217.7,343.5 217.7,224.9 238.2,213.1 258.6,201.3 279.1,189.4 299.6,177.6 320.1,165.8 340.6,153.9 361.1,142.1 
			381.6,130.2 381.6,177.3 361.1,189.2 340.6,201.1 320.1,213 299.6,224.9 279.1,236.7 		"/>
	</g>
	<g>
		<polyline points="315.8,86.9 295.3,75 274.8,63.2 254.3,51.4 233.8,39.5 213.2,27.7 213.6,27.5 234.1,39.3 254.6,51.2 275.1,63 
			295.6,74.9 316.1,86.7 		"/>
		<polygon points="254.1,193.2 254.2,193.3 233.7,205.1 213.1,217 192.6,205.2 172.1,193.5 151.6,181.7 131,169.9 110.5,158.1 
			89.9,146.3 69.3,134.4 48.7,122.6 49.3,122.3 69.9,134.2 90.4,146 110.9,157.8 151.9,181.5 172.3,193.3 192.8,205.1 213.1,216.9 
			233.5,205.1 		"/>
		<polygon points="315.8,157.7 295.3,169.6 274.8,181.4 274.6,181.3 295.2,169.5 315.7,157.6 		"/>
		<line x1="315.8" y1="157.7" x2="315.7" y2="157.6"/>
		<line x1="295.3" y1="169.6" x2="295.2" y2="169.5"/>
		<line x1="274.8" y1="181.4" x2="274.6" y2="181.3"/>
		<line x1="254.2" y1="193.3" x2="254.1" y2="193.2"/>
		<line x1="233.7" y1="205.1" x2="233.5" y2="205.1"/>
		<polygon points="295.4,145.9 315.7,157.6 295.2,169.5 274.6,181.3 254.3,169.6 233.8,157.8 213.3,146 192.8,134.2 172.2,122.4 
			151.7,110.6 131.1,122.5 172.2,146.1 192.7,157.9 213.2,169.7 233.7,181.5 254.1,193.2 233.5,205.1 213.1,216.9 192.8,205.1 
			172.3,193.3 151.9,181.5 110.9,157.8 90.4,146 69.9,134.2 49.3,122.3 69.3,110.7 89.9,98.8 110.6,86.9 151.8,63.1 172.4,51.3 
			193,39.4 213.2,27.7 233.8,39.5 254.3,51.4 274.8,63.2 295.3,75 315.8,86.9 295.6,98.5 275,110.4 254.5,98.6 234,86.8 213.5,74.9 
			192.9,86.8 213.4,98.7 233.9,110.5 254.4,122.3 274.9,134.1 		"/>
		<line x1="192.8" y1="205.1" x2="192.6" y2="205.2"/>
		<line x1="172.3" y1="193.3" x2="172.1" y2="193.5"/>
		<line x1="316.1" y1="86.7" x2="315.8" y2="86.9"/>
		<line x1="151.9" y1="181.5" x2="151.6" y2="181.7"/>
		<line x1="295.6" y1="74.9" x2="295.3" y2="75"/>
		<line x1="131.4" y1="169.7" x2="131" y2="169.9"/>
		<line x1="275.1" y1="63" x2="274.8" y2="63.2"/>
		<line x1="110.9" y1="157.8" x2="110.5" y2="158.1"/>
		<line x1="254.6" y1="51.2" x2="254.3" y2="51.4"/>
		<line x1="90.4" y1="146" x2="89.9" y2="146.3"/>
		<line x1="234.1" y1="39.3" x2="233.8" y2="39.5"/>
		<line x1="69.9" y1="134.2" x2="69.3" y2="134.4"/>
	</g>
	<g>
		<g>
			<polygon points="333.2,124.3 326.1,117.5 326.1,153.7 			"/>
			<polygon points="319.1,124.3 326.2,117.5 326.2,153.7 			"/>
		</g>
		<g>
			<polygon points="319.1,110.6 326.2,117.5 326.2,81.3 			"/>
			<polygon points="333.2,110.6 326.1,117.5 326.1,81.3 			"/>
		</g>
		<g>
			<polygon points="333,110.5 326.2,117.5 362.4,117.5 			"/>
			<polygon points="333,124.5 326.2,117.5 362.4,117.5 			"/>
		</g>
		<g>
			<polygon points="319.3,124.5 326.1,117.4 289.9,117.4 			"/>
			<polygon points="319.3,110.4 326.1,117.5 289.9,117.5 			"/>
		</g>
	</g>
</g>
</svg>
        </a>

        <div class="nav-menu">
          <ul class="navlinks">
            <li><a href="../index.html">Home</a></li>
            <li><a href="../blogs/index.html">Blogs</a></li>
            <li><a href="../essays/index.html">Essays</a></li>
            <li><a href="../portfolio/index.html">Portfolio</a></li>
            <li><a href="../design/index.html">Design</a></li>
            <li><a href="../about/index.html">About</a></li>
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
  const logo = document.querySelector(".logo");
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
      fill: accentColour,
      scale: 1.2,
      duration: 0.1,
    });
  });

  logo.addEventListener("mouseleave", () => {
    gsap.to(logo, {
      fill: "",
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

//Scroll to top of the page
window.onscroll = function () {
  scrollFunction();
};

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    topFunction();
  });
}
