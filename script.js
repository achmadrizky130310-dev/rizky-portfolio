// GANTI DATA DI BAWAH INI DENGAN KONTAK ASLI KAMU.
const PROFILE = {
  email: "hello@example.com",
  instagram: "https://instagram.com/",
  tiktok: "https://tiktok.com/",
  whatsapp: "https://wa.me/"
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
