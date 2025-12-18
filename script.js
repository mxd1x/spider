/* ===============================
   PAGE LOAD CINEMATIC
================================ */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(() => {
    loader.style.transition = "opacity 0.6s ease";
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 700);
  }, 1200);
});

/* ===============================
   CURSOR GLOW
================================ */
const glow = document.querySelector(".cursor-glow");
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

if (glow) {
  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + "px";
    glow.style.top = glowY + "px";
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

/* ===============================
   NAV UNDERLINE
================================ */
const navLinks = document.querySelectorAll(".nav-link");
const underline = document.querySelector(".nav-underline");
const navWrap = document.querySelector(".nav-links");

if (underline && navWrap) {
  navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      const rect = link.getBoundingClientRect();
      const parentRect = navWrap.getBoundingClientRect();
      underline.style.width = rect.width + "px";
      underline.style.left = rect.left - parentRect.left + "px";
    });
  });

  navWrap.addEventListener("mouseleave", () => {
    underline.style.width = "0";
  });
}

/* ===============================
   SECTION REVEAL
================================ */
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ===============================
   TILT EFFECT
================================ */
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
  });
});

/* ===============================
   BUTTON PRESS
================================ */
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("mousedown", () => {
    btn.style.transform = "scale(0.96)";
  });
  btn.addEventListener("mouseup", () => {
    btn.style.transform = "scale(1)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
  });
});

/* ===============================
   PARTICLE BACKGROUND
================================ */
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.inset = "0";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";

const ctx = canvas.getContext("2d");
let w, h;
const particles = [];

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, w, h);

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,245,255,0.4)";
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ===============================
   GRID PARALLAX
================================ */
const grid = document.querySelector(".cyber-grid");
if (grid) {
  window.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    grid.style.transform = `translate(${x}px, ${y}px)`;
  });
}

/* ===============================
   CONTACT BUTTON FEEDBACK
================================ */
const sendBtn = document.querySelector(".send-btn");
if (sendBtn) {
  sendBtn.addEventListener("click", e => {
    e.preventDefault();
    sendBtn.innerText = "Sending...";
    setTimeout(() => {
      sendBtn.innerText = "Message Sent ✓";
      sendBtn.style.background = "#00f5ff";
      sendBtn.style.color = "#000";
    }, 1200);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const numbers = document.querySelectorAll(".stat-value span");

  numbers.forEach((el, index) => {
    const target = Number(el.dataset.value);
    let current = 0;
    const duration = 900;
    const startTime = performance.now() + index * 120;

    function update(time) {
      if (time < startTime) {
        requestAnimationFrame(update);
        return;
      }

      const progress = Math.min((time - startTime) / duration, 1);
      current = Math.floor(progress * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  });
});
const serviceCards = document.querySelectorAll(".service-card");

const serviceObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.transition =
        "opacity .8s ease, transform .8s ease";
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      serviceObserver.unobserve(entry.target);
    }
  });
},{ threshold:0.15 });

serviceCards.forEach(card=>serviceObserver.observe(card));

const cards = document.querySelectorAll(".maint-card");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
},{ threshold:0.25 });

cards.forEach(c=>observer.observe(c));
document.querySelectorAll(".social").forEach((icon, i) => {
  icon.style.opacity = "0";
  icon.style.transform = "translateY(10px)";
  setTimeout(() => {
    icon.style.transition = ".4s ease";
    icon.style.opacity = "1";
    icon.style.transform = "translateY(0)";
  }, 150 * i);
});


/* ==========================================
   ZERO-HTML-CHANGE SCROLL ANIMATION SYSTEM
   SAFE FOR FILE / GITHUB / NETLIFY
========================================== */

(function () {

  /* 1️⃣ Inject animation CSS automatically */
  const style = document.createElement("style");
  style.innerHTML = `
    .auto-reveal {
      opacity: 0;
      transform: translateY(40px);
      transition:
        opacity 0.8s cubic-bezier(.2,.8,.2,1),
        transform 0.8s cubic-bezier(.2,.8,.2,1);
      will-change: transform, opacity;
    }

    .auto-reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Scale animation for cards */
    .auto-reveal.scale {
      transform: scale(0.94);
    }

    .auto-reveal.visible.scale {
      transform: scale(1);
    }
  `;
  document.head.appendChild(style);

  /* 2️⃣ Pick elements automatically (NO HTML EDIT) */
  const selectors = [
    "section",
    ".card",
    ".price-card",
    ".maint-card",
    ".contact-card",
    ".contact-info",
    ".stat-item",
    "footer",
    "h1",
    "h2",
    "h3"
  ];

  const elements = document.querySelectorAll(selectors.join(","));

  elements.forEach(el => {
    // Avoid double-adding
    if (!el.classList.contains("auto-reveal")) {
      el.classList.add("auto-reveal");

      // Cards get scale animation
      if (
        el.classList.contains("price-card") ||
        el.classList.contains("maint-card") ||
        el.classList.contains("card")
      ) {
        el.classList.add("scale");
      }
    }
  });

  /* 3️⃣ Intersection Observer */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"
    }
  );

  elements.forEach(el => observer.observe(el));

})();




/* ==========================================
   SCROLL PROGRESS BAR (NO HTML REQUIRED)
========================================== */

(function () {

  // Create bar
  const progressBar = document.createElement("div");
  progressBar.id = "scroll-progress";

  document.body.appendChild(progressBar);

  // Inject CSS
  const style = document.createElement("style");
  style.innerHTML = `
    #scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      width: 0%;
      background: linear-gradient(
        90deg,
        #00f5ff,
        rgba(0,245,255,0.6)
      );
      z-index: 9999;
      box-shadow: 0 0 18px rgba(0,245,255,0.7);
      transition: width 0.08s linear;
    }
  `;
  document.head.appendChild(style);

  // Scroll logic
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + "%";
  });

})();
