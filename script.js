document.addEventListener("DOMContentLoaded", function () {
  /* ---------------- Sticky Navbar ---------------- */
  const nav = document.getElementById("mainNav");
  function handleNavScroll() {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  handleNavScroll();
  window.addEventListener("scroll", handleNavScroll);

  // Collapse mobile menu after clicking a link
  document.querySelectorAll("#navMenu .rn-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  /* ---------------- Scroll Reveal ---------------- */
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---------------- Animated Counters ---------------- */
  const counters = document.querySelectorAll(".counter");
  let countersStarted = false;
  function animateCounters() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 1600;
      const startTime = performance.now();
      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else counter.textContent = target.toLocaleString();
      }
      requestAnimationFrame(tick);
    });
  }
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    const statsIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            animateCounters();
            statsIO.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    statsIO.observe(statsSection);
  }

  /* ---------------- Vehicle Filter ---------------- */
  const pills = document.querySelectorAll(".filter-pill");
  const vehicleItems = document.querySelectorAll(".vehicle-item");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      const filter = pill.getAttribute("data-filter");
      vehicleItems.forEach((item) => {
        const match =
          filter === "all" || item.getAttribute("data-cat") === filter;
        item.style.display = match ? "" : "none";
      });
    });
  });

  /* ---------------- Testimonial Carousel Dots ---------------- */
  const carouselEl = document.getElementById("testimonialCarousel");
  const dotsWrap = document.getElementById("carouselDots");
  const slides = carouselEl.querySelectorAll(".carousel-item");
  slides.forEach((slide, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      bootstrap.Carousel.getOrCreateInstance(carouselEl).to(i);
    });
    dotsWrap.appendChild(dot);
  });
  carouselEl.addEventListener("slide.bs.carousel", (e) => {
    dotsWrap.querySelectorAll("button").forEach((d, i) => {
      d.classList.toggle("active", i === e.to);
    });
  });

  /* ---------------- Booking Search (demo) ---------------- */
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById("vehicles")
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ---------------- Newsletter (demo) ---------------- */
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterMsg = document.getElementById("newsletterMsg");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector("input").value;
      newsletterMsg.textContent = `Thanks! We'll send updates to ${email}.`;
      newsletterForm.reset();
    });
  }

  /* ---------------- Back to Top ---------------- */
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
