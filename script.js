// GANTI DATA DI BAWAH INI DENGAN KONTAK ASLI KAMU.
const PROFILE = {
  email: "achmadrizky130310@gmail.com",
  instagram: "https://www.instagram.com/xevlky/",
  tiktok: "https://tiktok.com/",
  whatsapp: "https://wa.me/62895322190866"
};

const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");
menuButton.addEventListener("click", () => {
  const opened = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(opened));
  menuButton.setAttribute("aria-label", opened ? "Tutup menu" : "Buka menu");
});
document.querySelectorAll(".links a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const email = document.querySelector("#emailLink");
email.href = `mailto:${PROFILE.email}`;
email.textContent = `${PROFILE.email} ↗`;
document.querySelector("#instagramLink").href = PROFILE.instagram;
document.querySelector("#tiktokLink").href = PROFILE.tiktok;
document.querySelector("#whatsappLink").href = PROFILE.whatsapp;

const phrases = ["Creative Explorer", "Digital Learner", "Curious Thinker"];
let phrase = 0;
const rotating = document.querySelector("#rotatingText");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => {
    phrase = (phrase + 1) % phrases.length;
    rotating.style.opacity = "0";
    setTimeout(() => {
      rotating.textContent = phrases[phrase];
      rotating.style.opacity = "1";
    }, 180);
  }, 2600);
}
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".links a");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navItems.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
  }), {rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(section => observer.observe(section));
}
document.querySelector("#year").textContent = new Date().getFullYear();


// Smooth scroll reveal: elements appear gently as they enter the screen.
const revealTargets = [
  ".hero .eyebrow", ".hero .kicker", ".hero h1", ".hero h2",
  ".hero .hero-text", ".hero .actions", ".hero-foot", ".photo-wrap",
  ".section-head", ".two-col > *", ".facts > div",
  ".intro > *", ".interest-list article", ".projects > article",
  ".disclaimer", ".contact-foot", "footer .footer > *"
];
const revealElements = document.querySelectorAll(revealTargets.join(","));
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealElements.forEach((element, index) => {
    element.classList.add("reveal");
    if (index % 4 === 1) element.classList.add("reveal-delay-1");
    if (index % 4 === 2) element.classList.add("reveal-delay-2");
    if (index % 4 === 3) element.classList.add("reveal-delay-3");
  });
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("is-visible"));
}


// Scroll progress, subtle pointer light, and gentle desktop photo tilt.
const progressBar = document.querySelector(".scroll-progress");
const updateProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${progress}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const glow = document.querySelector(".cursor-glow");
if (glow && matchMedia("(hover:hover) and (pointer:fine)").matches) {
  window.addEventListener("pointermove", event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

const photoWrap = document.querySelector(".photo-wrap");
if (photoWrap && matchMedia("(hover:hover) and (pointer:fine)").matches &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  photoWrap.addEventListener("pointermove", event => {
    const rect = photoWrap.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    photoWrap.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  });
  photoWrap.addEventListener("pointerleave", () => {
    photoWrap.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  });
}
