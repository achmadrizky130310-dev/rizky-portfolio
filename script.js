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


// V2 motion layer: animated particle field, pointer spotlight and card tilt.
(() => {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas && canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canvas || !ctx || reduce) return;
  const mobile = window.matchMedia("(max-width: 650px)").matches;
  let w = 0, h = 0, points = [], raf = 0;
  const count = mobile ? 27 : 58;
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.floor(w*dpr); canvas.height = Math.floor(h*dpr);
    canvas.style.width = w+"px"; canvas.style.height = h+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
    points = Array.from({length:count}, () => ({
      x:Math.random()*w, y:Math.random()*h,
      vx:(Math.random()-.5)*.34, vy:(Math.random()-.5)*.34,
      r:Math.random()*1.7+.5, a:Math.random()*.42+.12
    }));
  };
  const draw = () => {
    ctx.clearRect(0,0,w,h);
    for (let i=0;i<points.length;i++) {
      const p=points[i]; p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(169,151,255,${p.a})`;ctx.fill();
      for(let j=i+1;j<points.length;j++){
        const q=points[j], dx=p.x-q.x,dy=p.y-q.y,dist=Math.hypot(dx,dy);
        if(dist<mobile?72:112) {
          const limit=mobile?72:112;
          ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
          ctx.strokeStyle=`rgba(91,218,218,${(1-dist/limit)*.18})`;ctx.lineWidth=.65;ctx.stroke();
        }
      }
    }
    raf=requestAnimationFrame(draw);
  };
  resize(); draw();
  window.addEventListener("resize",resize,{passive:true});
  document.addEventListener("visibilitychange",()=> {
    if(document.hidden) cancelAnimationFrame(raf);
    else if(!reduce) draw();
  });
})();

const spotlight = document.querySelector(".spotlight");
if (spotlight && matchMedia("(hover:hover) and (pointer:fine)").matches) {
  window.addEventListener("pointermove", e => {
    spotlight.style.left = e.clientX+"px";
    spotlight.style.top = e.clientY+"px";
  }, {passive:true});
}
document.querySelectorAll(".project-art").forEach(card => {
  if (!matchMedia("(hover:hover) and (pointer:fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  card.addEventListener("pointermove", e => {
    const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(800px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-5px)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="perspective(800px) rotateX(0) rotateY(0)");
});
