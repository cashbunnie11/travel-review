/* =========================================================
   Swiss Escapes - JavaScript
   Features: mobile menu, carousel, place cards, filter + search,
   favourites, modal, accordion, review form, back-to-top.
   ========================================================= */

/* ---------- Small helpers ---------- */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// localStorage can fail in private mode, so wrap it safely
const store = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* ignore */
    }
  }
};

// Turn a number like 4.6 into star characters
function starsHTML(rating) {
  const full = Math.round(rating);
  return "&#9733;".repeat(full) + "&#9734;".repeat(5 - full);
}

// Escape user text so it cannot inject HTML
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* =========================================================
   1. MOBILE NAVIGATION MENU
   ========================================================= */
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", () => {
  setMenu(!navLinks.classList.contains("open"));
});

// Close the menu after tapping a link
$$("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

/* =========================================================
   2. IMAGE CAROUSEL
   ========================================================= */
const slides = $$(".slide");
const dotsBox = $("#dots");
const carousel = $("#carousel");
let current = 0;
let timer = null;

// Build one dot per slide
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.setAttribute("aria-label", "Go to slide " + (i + 1));
  dot.addEventListener("click", () => {
    showSlide(i);
    restartAutoplay();
  });
  dotsBox.appendChild(dot);
});
const dots = $$(".dot");

function showSlide(index) {
  current = (index + slides.length) % slides.length; // wraps around
  slides.forEach((s, i) => s.classList.toggle("active", i === current));
  dots.forEach((d, i) => d.classList.toggle("active", i === current));
}

function startAutoplay() {
  timer = setInterval(() => showSlide(current + 1), 5000);
}
function stopAutoplay() {
  clearInterval(timer);
}
function restartAutoplay() {
  stopAutoplay();
  startAutoplay();
}

$("#nextBtn").addEventListener("click", () => { showSlide(current + 1); restartAutoplay(); });
$("#prevBtn").addEventListener("click", () => { showSlide(current - 1); restartAutoplay(); });

// Pause while the mouse is over the carousel
carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);

// Swipe support for phones
let touchStartX = 0;
carousel.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
carousel.addEventListener("touchend", (e) => {
  const diff = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diff) > 40) {
    showSlide(diff < 0 ? current + 1 : current - 1);
    restartAutoplay();
  }
}, { passive: true });

// Keyboard arrows
document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("open")) return;
  if (e.key === "ArrowRight") { showSlide(current + 1); restartAutoplay(); }
  if (e.key === "ArrowLeft") { showSlide(current - 1); restartAutoplay(); }
});

showSlide(0);
startAutoplay();

/* =========================================================
   3. PLACE CARDS, FILTER, SEARCH, FAVOURITES
   ========================================================= */
const grid = $("#placesGrid");
const emptyMsg = $("#emptyMsg");
let activeFilter = "all";
let searchText = "";
let favourites = store.get("swiss-favs", []);

function renderPlaces() {
  const list = PLACES.filter((p) => {
    const matchType = activeFilter === "all" || p.type === activeFilter;
    const matchText = p.name.toLowerCase().includes(searchText) || p.summary.toLowerCase().includes(searchText);
    return matchType && matchText;
  });

  grid.innerHTML = list.map((p) => `
    <article class="card">
      <div class="card-img" data-open="${p.id}">
        <img src="${p.image}" alt="${p.name} illustration" loading="lazy" />
        <span class="tag">${TYPE_LABELS[p.type]}</span>
        <button class="fav-btn ${favourites.includes(p.id) ? "on" : ""}" data-fav="${p.id}"
          aria-label="Save ${p.name} to favourites" aria-pressed="${favourites.includes(p.id)}">&#9829;</button>
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <div class="stars">${starsHTML(p.rating)}<small>${p.rating.toFixed(1)} / 5</small></div>
        <p>${p.summary}</p>
        <div class="card-foot">
          <button class="read-more" data-open="${p.id}">Read review &rarr;</button>
        </div>
      </div>
    </article>
  `).join("");

  emptyMsg.hidden = list.length > 0;
}

// One click listener for the whole grid (event delegation)
grid.addEventListener("click", (e) => {
  const favBtn = e.target.closest("[data-fav]");
  if (favBtn) {
    toggleFavourite(favBtn.dataset.fav);
    return;
  }
  const openBtn = e.target.closest("[data-open]");
  if (openBtn) openModal(openBtn.dataset.open);
});

function toggleFavourite(id) {
  favourites = favourites.includes(id)
    ? favourites.filter((f) => f !== id)
    : [...favourites, id];
  store.set("swiss-favs", favourites);
  renderPlaces();
  updateStats();
}

// Filter chips
$("#filters").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  $$(".chip").forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");
  activeFilter = chip.dataset.filter;
  renderPlaces();
});

// Search box
$("#search").addEventListener("input", (e) => {
  searchText = e.target.value.trim().toLowerCase();
  renderPlaces();
});

/* =========================================================
   4. STATS (counts up when the page loads)
   ========================================================= */
function animateNumber(el, target, decimals) {
  const duration = 900;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = (target * progress).toFixed(decimals);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function updateStats() {
  const avg = PLACES.reduce((sum, p) => sum + p.rating, 0) / PLACES.length;
  $("#statFav").textContent = favourites.length;
  if (!updateStats.done) {
    animateNumber($("#statPlaces"), PLACES.length, 0);
    animateNumber($("#statAvg"), avg, 1);
    updateStats.done = true;
  }
}

/* =========================================================
   5. MODAL (full review pop-up)
   ========================================================= */
const modal = $("#modal");
let lastFocused = null;

function openModal(id) {
  const p = PLACES.find((place) => place.id === id);
  if (!p) return;
  lastFocused = document.activeElement;

  $("#modalImg").src = p.image;
  $("#modalImg").alt = p.name + " illustration";
  $("#modalTag").textContent = TYPE_LABELS[p.type];
  $("#modalTitle").textContent = p.name;
  $("#modalStars").innerHTML = starsHTML(p.rating) + "<small>" + p.rating.toFixed(1) + " / 5</small>";
  $("#modalReview").textContent = p.review;
  $("#modalHighlights").innerHTML = p.highlights.map((h) => "<li>" + h + "</li>").join("");
  $("#modalInfo").innerHTML = p.info.map((i) => "<li>" + i + "</li>").join("");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

$("#modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

/* =========================================================
   6. ACCORDION (travel tips)
   ========================================================= */
$$(".acc-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = btn.nextElementSibling;
    const isOpen = btn.getAttribute("aria-expanded") === "true";

    // Close all others first
    $$(".acc-btn").forEach((b) => {
      b.setAttribute("aria-expanded", "false");
      b.nextElementSibling.style.maxHeight = null;
    });

    if (!isOpen) {
      btn.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

/* =========================================================
   7. REVIEW FORM (saved in the browser only)
   ========================================================= */
const form = $("#reviewForm");
const formMsg = $("#formMsg");
const rText = $("#rText");
let userReviews = store.get("swiss-reviews", []);

// Fill the "place" dropdown from our data
$("#rPlace").innerHTML = PLACES.map((p) => `<option value="${p.name}">${p.name}</option>`).join("");

rText.addEventListener("input", () => {
  $("#counter").textContent = rText.value.length + " / 300";
});

function renderUserReviews() {
  const box = $("#userReviews");
  if (userReviews.length === 0) {
    box.innerHTML = "";
    return;
  }
  box.innerHTML = userReviews.map((r, i) => `
    <div class="user-review">
      <header>
        <strong>${escapeHTML(r.name)} &middot; ${escapeHTML(r.place)}</strong>
        <span class="stars">${starsHTML(r.rating)}</span>
      </header>
      <p>${escapeHTML(r.text)}</p>
      <button class="del" data-del="${i}">Delete</button>
    </div>
  `).join("");
}

$("#userReviews").addEventListener("click", (e) => {
  const del = e.target.closest("[data-del]");
  if (!del) return;
  userReviews.splice(Number(del.dataset.del), 1);
  store.set("swiss-reviews", userReviews);
  renderUserReviews();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#rName").value.trim();
  const text = rText.value.trim();

  if (name.length < 2) return showMsg("Please enter your name.", "error");
  if (text.length < 10) return showMsg("Please write at least 10 characters in your review.", "error");

  userReviews.unshift({
    name,
    place: $("#rPlace").value,
    rating: Number($("#rRating").value),
    text
  });
  store.set("swiss-reviews", userReviews);
  renderUserReviews();
  form.reset();
  $("#counter").textContent = "0 / 300";
  showMsg("Thanks! Your review has been added below.", "ok");
});

function showMsg(message, type) {
  formMsg.textContent = message;
  formMsg.className = "form-msg " + type;
}

/* =========================================================
   8. BACK-TO-TOP BUTTON + ACTIVE NAV LINK + FOOTER YEAR
   ========================================================= */
const backToTop = $("#backToTop");
window.addEventListener("scroll", () => {
  backToTop.hidden = window.scrollY < 500;
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Highlight the nav link of the section currently on screen
const sections = $$("main section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      $$("#navLinks a").forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
sections.forEach((s) => observer.observe(s));

$("#year").textContent = new Date().getFullYear();

/* ---------- Start everything ---------- */
renderPlaces();
renderUserReviews();
updateStats();
