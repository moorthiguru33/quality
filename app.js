(() => {
  "use strict";

  /* ================================================================
     DEFAULT DATA (Factory settings - easily restored anytime)
     ================================================================ */
  const DEFAULT_DATA = {
    adminPassword: "admin123",
    branding: {
      logo: "logo.png",
      dealerLogo: "tvs-logo.jpeg"
    },
    vehicles: [
      {
        id: "v1",
        badge: "Bestseller",
        badgeColor: "",
        category: "Passenger",
        catClass: "",
        name: "TVS King Deluxe",
        tagline: "Maximum comfort for passengers — the city's choice.",
        engine: "200cc, 4-Stroke",
        fuel: "Petrol / CNG",
        payload: "3 Passengers + Driver",
        mileage: "35–40 km/l",
        price: "₹2.20 Lakh*",
        img: "tvs_king_deluxe.jpg"
      },
      {
        id: "v2",
        badge: "Cargo King",
        badgeColor: "vslider__badge-top--blue",
        category: "Cargo",
        catClass: "vslider__model-tag--cargo",
        name: "TVS King Duramax",
        tagline: "Built for heavy-duty cargo, built to last.",
        engine: "245cc, 4-Stroke DI",
        fuel: "Diesel",
        payload: "500 kg",
        mileage: "28–32 km/l",
        price: "₹2.80 Lakh*",
        img: "tvs_king_duramax.jpg"
      },
      {
        id: "v3",
        badge: "Eco Choice",
        badgeColor: "vslider__badge-top--green",
        category: "CNG / Eco",
        catClass: "vslider__model-tag--eco",
        name: "TVS King CNG",
        tagline: "Lower running cost, zero compromise on power.",
        engine: "200cc, 4-Stroke CNG",
        fuel: "CNG + Petrol Dual",
        payload: "3 Passengers + Driver",
        mileage: "180–200 km/tank",
        price: "₹2.40 Lakh*",
        img: "tvs_king_cng.jpg"
      },
      {
        id: "v4",
        badge: "New Launch",
        badgeColor: "vslider__badge-top--purple",
        category: "Electric",
        catClass: "vslider__model-tag--ev",
        name: "TVS King EV",
        tagline: "Zero fuel cost. Zero emissions. Zero compromise.",
        engine: "Electric, 8kW Motor",
        fuel: "Zero (Battery)",
        payload: "120–140 km/charge",
        mileage: "4–5 Hours Full",
        price: "₹3.10 Lakh*",
        img: "tvs_king_ev.jpg"
      }
    ],
    offers: [
      {
        id: "o1",
        pill: "🔥 Limited Time",
        title: "Free 20-Point Safety Inspection",
        desc: "With every paid service — brakes, tyres, lights, fluids & more. No extra charge.",
        btnText: "Claim on WhatsApp",
        btnClass: "btn--amber",
        cardClass: "obanner__card--1",
        deco: "FREE<br/>INSPECTION",
        bgImg: ""
      },
      {
        id: "o2",
        pill: "💰 New Customers",
        title: "10% Off on Genuine Spare Parts",
        desc: "First-time customers get a flat 10% discount on all genuine TVS spare parts on their first bill.",
        btnText: "Claim on WhatsApp",
        btnClass: "btn--dark",
        cardClass: "obanner__card--2",
        deco: "10%<br/>OFF",
        bgImg: ""
      },
      {
        id: "o3",
        pill: "📅 Annual Plan",
        title: "AMC Care Package — Save More",
        desc: "Four scheduled services at a fixed annual price. Priority slots, no surprise bills.",
        btnText: "Get Details",
        btnClass: "btn--amber",
        cardClass: "obanner__card--3",
        deco: "AMC<br/>PLAN",
        bgImg: ""
      },
      {
        id: "o4",
        pill: "🚗 Vehicle Offer",
        title: "New TVS King Purchase — Zero Down Payment*",
        desc: "Special festive finance offer. Subject to bank approval. Contact us today!",
        btnText: "Enquire Now",
        btnClass: "btn--dark",
        cardClass: "obanner__card--4",
        deco: "0%<br/>DOWN",
        bgImg: ""
      }
    ],
    gallery: [
      "tvs_king_deluxe.jpg",
      "tvs_king_duramax.jpg",
      "tvs_king_cng.jpg",
      "tvs_king_ev.jpg",
      "logo.png",
      "tvs-logo.jpeg",
      "auto-1.png"
    ],
    contact: {
      salesPhone: "+91 90473 99473",
      servicePhone: "+91 90878 40878",
      landline: "04144-230434",
      email: "qualityautos@tvsmdealers.co.in",
      address: "Quality Auto's, No.4, JB Samy Complex, Chidambaram to Cuddalore Bypass Road, North Thillainayagapuram, Chidambaram – 608001.",
      gstin: "33AOBPV0596F2ZV",
      hours: "Mon – Sat: 8:00 AM – 8:00 PM | Sunday: 9:00 AM – 5:00 PM"
    },
    hero: {
      eyebrow: "Authorized TVS 3-Wheeler Dealer — Chidambaram",
      title: "Chidambaram's #1 TVS Three-Wheeler <em>Sales & Service.</em>",
      desc: "Your trusted TVS authorised dealer for sales, genuine spare parts, service & 24/7 breakdown support — serving Chidambaram for over 15 years.",
      img: "auto-1.png"
    },
    about: {
      title: "Chidambaram's premier TVS three-wheeler dealer, since day one.",
      p1: "Quality Auto's has spent over fifteen years becoming Chidambaram's trusted TVS three-wheeler specialist. What started as a small roadside shop is now a full-fledged authorized dealership with dedicated service bays, a showroom, and a team that treats every auto like it's their own.",
      p2: "We are an Authorized Dealer for TVS Motor Company 3 Wheeler — offering new vehicle sales, genuine spare parts, AMC packages, and certified workshop service all under one roof.",
      img: "auto-1.png"
    }
  };

  /* ---------------- cPanel Hybrid State Manager (LocalStorage + Server API) ---------------- */
  function loadSiteData() {
    try {
      const stored = localStorage.getItem("qa_site_data");
      if (stored) {
        return Object.assign({}, DEFAULT_DATA, JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
    return DEFAULT_DATA;
  }

  // Asynchronously fetch latest data from cPanel site_data.json via api.php
  async function fetchServerData() {
    try {
      const res = await fetch('api.php?action=get_data');
      if (res.ok) {
        const json = await res.json();
        if (json && json.vehicles) {
          siteData = Object.assign({}, DEFAULT_DATA, json);
          localStorage.setItem("qa_site_data", JSON.stringify(siteData));
          renderVehicleSlides();
          renderOfferSlides();
          renderContactDetails();
          console.log("Synced latest site data from cPanel server.");
        }
      }
    } catch (e) {
      // If opened as local file (file://) or server offline, localStorage acts as backup
      console.log("Running in offline/local storage mode:", e.message);
    }
  }

  async function saveSiteData(data) {
    try {
      localStorage.setItem("qa_site_data", JSON.stringify(data));
      showAdminToast("Changes saved successfully!");

      // Attempt to persist to cPanel server file system via api.php
      try {
        const res = await fetch('api.php?action=save_data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.success) {
            showAdminToast("Synced with cPanel server file (site_data.json)!");
          }
        }
      } catch (err) {
        // Will gracefully fail if tested locally without PHP server
        console.log("Server sync skipped (local/static environment). LocalStorage active.");
      }
    } catch (e) {
      alert("Error saving: " + e.message);
    }
  }

  // Upload image to cPanel /uploads/ folder
  async function uploadImageToServer(file, onProgress) {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('api.php?action=upload_image', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          return json.url; // e.g. uploads/qa_12345.jpg
        }
      }
    } catch (e) {
      console.warn("Server upload not available, falling back to base64 DataURL.");
    }
    return null;
  }

  let siteData = loadSiteData();

  /* ---------------- Toast Notification ---------------- */
  function showAdminToast(msg) {
    const existing = document.querySelector(".admin-toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.className = "admin-toast";
    toast.innerHTML = `<svg class="icon"><use href="#i-check-circle"/></svg> <span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.4s ease";
      setTimeout(() => { if (toast && typeof toast.remove === "function") toast.remove(); }, 400);
    }, 3200);
  }

  /* ---------------- Mobile navigation ---------------- */
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  const scrim = document.getElementById("nav-scrim");

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("is-open");
    if (menuToggle) {
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
    if (scrim) scrim.classList.remove("is-visible");
  }

  function toggleNav() {
    if (!nav || !menuToggle) return;
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    if (scrim) scrim.classList.toggle("is-visible", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleNav);
    if (scrim) scrim.addEventListener("click", closeNav);
    nav.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", closeNav);
    });
  }

  /* ---------------- Sticky header shadow ---------------- */
  const header = document.getElementById("site-header");
  function onScrollHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------- Active nav link on scroll ---------------- */
  const sectionIds = ["home", "vehicles", "services", "parts", "about", "offers", "contact"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
    revealObserver.observe(el);
  });

  /* ---------------- Animated counters ---------------- */
  const counters = document.querySelectorAll("[data-count]");
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value.toLocaleString("en-IN");
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString("en-IN");
      }
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  /* ================================================================
     DYNAMIC RENDERERS (Vehicles, Offers, Contacts)
     ================================================================ */

  // 1. Render Vehicles in Slider
  function renderVehicleSlides() {
    const track = document.getElementById("vslider-track");
    if (!track) return;
    track.innerHTML = "";

    siteData.vehicles.forEach((v) => {
      const slide = document.createElement("div");
      slide.className = "vslider__slide";
      slide.innerHTML = `
        <div class="vslider__card">
          <div class="vslider__img-wrap">
            <span class="vslider__badge-top ${v.badgeColor || ''}">${v.badge}</span>
            <img src="${v.img}" alt="${v.name}" class="vslider__img" onerror="this.src='auto-1.png'" />
          </div>
          <div class="vslider__info">
            <div class="vslider__model-tag ${v.catClass || ''}">${v.category}</div>
            <h3>${v.name}</h3>
            <p class="vslider__tagline">${v.tagline}</p>
            <ul class="vslider__specs">
              <li><span>Engine</span><strong>${v.engine}</strong></li>
              <li><span>Fuel</span><strong>${v.fuel}</strong></li>
              <li><span>Payload</span><strong>${v.payload}</strong></li>
              <li><span>Mileage</span><strong>${v.mileage}</strong></li>
            </ul>
            <div class="vslider__price">
              <span>Starting from</span>
              <strong>${v.price}</strong>
            </div>
            <div class="vslider__actions">
              <a href="https://wa.me/919047399473?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20${encodeURIComponent(v.name)}." target="_blank" rel="noopener" class="btn btn--amber btn--sm">
                <svg><use href="#i-whatsapp"/></svg> Enquire Now
              </a>
              <a href="tel:+919047399473" class="btn btn--outline btn--sm">
                <svg><use href="#i-phone"/></svg> Call Us
              </a>
            </div>
          </div>
        </div>
      `;
      track.appendChild(slide);
    });

    // Rebuild slider
    buildSlider({
      trackId: "vslider-track",
      dotsId: "vslider-dots",
      prevId: "vslider-prev",
      nextId: "vslider-next",
      slidesPerView: 3,
      autoInterval: 5500,
    });
  }

  // 2. Render Offers in Banner Slider
  function renderOfferSlides() {
    const track = document.getElementById("obanner-track");
    if (!track) return;
    track.innerHTML = "";

    siteData.offers.forEach((o) => {
      const slide = document.createElement("div");
      slide.className = "obanner__slide";
      const customBg = o.bgImg ? `style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${o.bgImg}') center/cover no-repeat;"` : "";
      slide.innerHTML = `
        <div class="obanner__card ${o.cardClass || 'obanner__card--1'}" ${customBg}>
          <div class="obanner__content">
            <span class="obanner__pill">${o.pill}</span>
            <h3>${o.title}</h3>
            <p>${o.desc}</p>
            <a href="https://wa.me/919047399473?text=Hi%2C%20I%27d%20like%20to%20claim%20offer%3A%20${encodeURIComponent(o.title)}." target="_blank" rel="noopener" class="btn ${o.btnClass || 'btn--amber'}">
              <svg><use href="#i-whatsapp"/></svg> ${o.btnText}
            </a>
          </div>
          <div class="obanner__deco" aria-hidden="true">${o.deco || ''}</div>
        </div>
      `;
      track.appendChild(slide);
    });

    // Rebuild offer slider
    buildSlider({
      trackId: "obanner-track",
      dotsId: "obanner-dots",
      prevId: "obanner-prev",
      nextId: "obanner-next",
      slidesPerView: 1,
      autoInterval: 4000,
    });
  }

  // 3. Render Contact details across page
  function renderContactDetails() {
    const c = siteData.contact;
    if (!c) return;

    // GSTIN in footer
    const gstinEls = document.querySelectorAll(".footer__gstin, .about__badges small");
    gstinEls.forEach(el => el.textContent = `GSTIN: ${c.gstin}`);

    // Phones
    const phoneSalesLinks = document.querySelectorAll("a[href^='tel:']");
    const cleanSales = c.salesPhone.replace(/\s+/g, '');
    phoneSalesLinks.forEach(link => {
      if (link.textContent.includes("90473") || link.closest(".header__call") || link.closest(".topbar")) {
        link.setAttribute("href", `tel:${cleanSales}`);
      }
    });

    const headerStrong = document.querySelector(".header__call strong");
    if (headerStrong) headerStrong.textContent = c.salesPhone;

    const topbarPhone = document.querySelector(".topbar__info a[href^='tel']");
    if (topbarPhone) topbarPhone.innerHTML = `<svg class="icon"><use href="#i-phone"/></svg> ${c.salesPhone}`;
  }

  // 4. Render Hero & About sections
  function renderHeroAndAbout() {
    const h = siteData.hero;
    const a = siteData.about;

    if (h) {
      const eyebrow = document.querySelector(".hero__eyebrow");
      if (eyebrow) eyebrow.innerHTML = `<svg><use href="#i-badge"/></svg> ${h.eyebrow}`;

      const title = document.querySelector(".hero h1");
      if (title) title.innerHTML = h.title;

      const desc = document.querySelector(".hero p.lead");
      if (desc) desc.textContent = h.desc;

      const heroImg = document.querySelector(".hero__frame img");
      if (heroImg && h.img) heroImg.src = h.img;
    }

    if (a) {
      const aboutTitle = document.querySelector(".about__text h2");
      if (aboutTitle) aboutTitle.textContent = a.title;

      const pEls = document.querySelectorAll(".about__text > p");
      if (pEls[0] && a.p1) pEls[0].textContent = a.p1;
      if (pEls[1] && a.p2) pEls[1].innerHTML = a.p2;

      const aboutImg = document.querySelector(".about__art img");
      if (aboutImg && a.img) aboutImg.src = a.img;
    }
  }

  // 5. Render Branding (Site Logo & Dealer Logo across all areas)
  function renderBranding() {
    const b = siteData.branding || DEFAULT_DATA.branding;
    if (!b) return;

    // Header logo
    const headerLogo = document.querySelector(".brand img");
    if (headerLogo && b.logo) headerLogo.src = b.logo;

    // Footer logo
    const footerLogo = document.querySelector(".footer__brand > img");
    if (footerLogo && b.logo) footerLogo.src = b.logo;

    // TVS Dealer Logo in Footer & About
    const dealerLogos = document.querySelectorAll(".footer__dealer img, .about__badges img");
    dealerLogos.forEach(img => {
      if (b.dealerLogo) img.src = b.dealerLogo;
    });

    // Admin page brand logo
    const adminPageLogo = document.getElementById("admin-page-brand-logo");
    if (adminPageLogo && b.logo) adminPageLogo.src = b.logo;
  }

  /* ================================================================
     GENERIC CAROUSEL BUILDER (Swipe + Drag + Dots + Keyboard)
     ================================================================ */
  function buildSlider({ trackId, dotsId, prevId, nextId, slidesPerView, autoInterval }) {
    const track = document.getElementById(trackId);
    const dotsWrap = document.getElementById(dotsId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);

    if (!track) return;

    const slides = Array.from(track.children);
    const totalSlides = slides.length;
    let index = 0;
    let autoTimer;
    let startX = 0;
    let isDragging = false;
    let dragStartX = 0;

    function getPerView() {
      if (window.innerWidth <= 420) return 1;
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 1024) return Math.min(2, slidesPerView);
      return slidesPerView;
    }

    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        const cls = trackId === "vslider-track" ? "vslider__dot" : "obanner__dot";
        dot.className = cls + (i === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

    function updateDots() {
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    }

    function goTo(i) {
      const perView = getPerView();
      const maxIndex = Math.max(0, totalSlides - perView);
      index = Math.max(0, Math.min(i, maxIndex));
      const slideWidth = 100 / perView;
      track.style.transform = `translateX(-${index * slideWidth}%)`;
      slides.forEach(slide => {
        if (trackId === "vslider-track") {
          slide.style.flex = `0 0 ${slideWidth}%`;
        }
      });
      updateDots();
      resetAuto();
    }

    function resetAuto() {
      clearInterval(autoTimer);
      if (autoInterval && totalSlides > 1) {
        autoTimer = setInterval(() => {
          const perView = getPerView();
          const maxIndex = Math.max(0, totalSlides - perView);
          goTo(index >= maxIndex ? 0 : index + 1);
        }, autoInterval);
      }
    }

    if (prevBtn) {
      prevBtn.onclick = () => goTo(index - 1);
    }
    if (nextBtn) {
      nextBtn.onclick = () => goTo(index + 1);
    }

    // Touch support
    track.ontouchstart = (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      clearInterval(autoTimer);
    };

    track.ontouchend = (e) => {
      if (!isDragging) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? index + 1 : index - 1);
      } else {
        resetAuto();
      }
      isDragging = false;
    };

    // Mouse drag
    track.onmousedown = (e) => {
      dragStartX = e.clientX;
      isDragging = true;
      track.classList.add("is-dragging");
      clearInterval(autoTimer);
    };

    window.onmouseup = (e) => {
      if (!isDragging) return;
      const diff = dragStartX - e.clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? index + 1 : index - 1);
      } else {
        resetAuto();
      }
      isDragging = false;
      track.classList.remove("is-dragging");
    };

    track.setAttribute("tabindex", "0");
    track.onkeydown = (e) => {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    };

    window.onresize = () => goTo(index);

    goTo(0);
    resetAuto();
  }

  /* ================================================================
     TESTIMONIAL SLIDER
     ================================================================ */
  const slidesTrack = document.getElementById("testi-slides");
  const dotsWrap = document.getElementById("testi-dots");
  const prevBtn = document.getElementById("testi-prev");
  const nextBtn = document.getElementById("testi-next");

  if (slidesTrack) {
    const slides = Array.from(slidesTrack.children);
    let index = 0;
    let autoTimer;

    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "testi__dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", `Show testimonial ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }
    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      slidesTrack.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle("is-active", di === index));
      resetAuto();
    }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(index + 1), 6500);
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));

    let tsX = 0;
    slidesTrack.addEventListener("touchstart", (e) => { tsX = e.touches[0].clientX; }, { passive: true });
    slidesTrack.addEventListener("touchend", (e) => {
      const diff = tsX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? index + 1 : index - 1);
    }, { passive: true });

    resetAuto();
  }

  /* ================================================================
     FAQ ACCORDION
     ================================================================ */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-item__q");
    const answer = item.querySelector(".faq-item__a");

    function setState(open) {
      item.classList.toggle("is-open", open);
      answer.style.maxHeight = open ? `${answer.scrollHeight}px` : "0px";
    }

    setState(item.classList.contains("is-open"));

    question.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".faq-item__a").style.maxHeight = "0px";
        }
      });
      setState(willOpen);
    });
  });

  /* ================================================================
     EMI CALCULATOR
     ================================================================ */
  const emiPrice   = document.getElementById("emi-price");
  const emiDown    = document.getElementById("emi-down");
  const emiRate    = document.getElementById("emi-rate");
  const emiTenure  = document.getElementById("emi-tenure");

  const emiPriceVal   = document.getElementById("emi-price-val");
  const emiDownVal    = document.getElementById("emi-down-val");
  const emiRateVal    = document.getElementById("emi-rate-val");
  const emiTenureVal  = document.getElementById("emi-tenure-val");

  const emiMonthly   = document.getElementById("emi-monthly");
  const emiTotal     = document.getElementById("emi-total");
  const emiInterest  = document.getElementById("emi-interest");

  function formatINR(n) {
    return "₹" + Math.round(n).toLocaleString("en-IN");
  }

  function calcEMI() {
    if (!emiPrice) return;

    const price   = parseFloat(emiPrice.value);
    const down    = parseFloat(emiDown.value);
    const rateAnn = parseFloat(emiRate.value);
    const months  = parseInt(emiTenure.value, 10);

    const principal = Math.max(0, price - down);
    const r = rateAnn / 12 / 100;
    let emi;

    if (r === 0) {
      emi = principal / months;
    } else {
      emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    }

    const totalAmt   = emi * months;
    const totalInt   = totalAmt - principal;

    if (emiPriceVal)  emiPriceVal.textContent   = formatINR(price);
    if (emiDownVal)   emiDownVal.textContent    = formatINR(down);
    if (emiRateVal)   emiRateVal.textContent    = rateAnn + "%";
    if (emiTenureVal) emiTenureVal.textContent  = months + " Months";

    if (emiMonthly)  emiMonthly.textContent  = formatINR(emi);
    if (emiTotal)    emiTotal.textContent    = formatINR(totalAmt);
    if (emiInterest) emiInterest.textContent = formatINR(Math.max(0, totalInt));
  }

  if (emiPrice) {
    [emiPrice, emiDown, emiRate, emiTenure].forEach((input) => {
      input.addEventListener("input", calcEMI);
    });
    calcEMI();
  }

  /* ================================================================
     CONTACT FORM
     ================================================================ */
  const form = document.getElementById("contact-form");
  const successMsg = document.getElementById("form-success");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (successMsg) {
        successMsg.classList.add("is-visible");
        successMsg.scrollIntoView({ behavior: "smooth", block: "nearest" });
        setTimeout(() => successMsg.classList.remove("is-visible"), 7000);
      }
      form.reset();
    });
  }

  /* ================================================================
     BACK TO TOP
     ================================================================ */
  const backToTop = document.getElementById("back-to-top");
  function onScrollTop() {
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 500);
  }
  window.addEventListener("scroll", onScrollTop, { passive: true });
  onScrollTop();
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ================================================================
     ADMIN CONTROL PANEL (CMS)
     ================================================================ */
  const adminModal = document.getElementById("admin-modal");
  const openAdminLink = document.getElementById("open-admin-link");
  const closeAdminBtn = document.getElementById("close-admin-btn");
  const adminScrim = document.getElementById("admin-scrim");

  const loginView = document.getElementById("admin-login-view");
  const dashboardView = document.getElementById("admin-dashboard-view");
  const loginForm = document.getElementById("admin-login-form");
  const loginPassInput = document.getElementById("admin-pass");
  const loginErr = document.getElementById("admin-login-err");
  const authStatus = document.getElementById("admin-auth-status");
  const logoutBtn = document.getElementById("admin-logout-btn");

  // Admin authentication state
  let isAdminAuthenticated = false;
  try {
    isAdminAuthenticated = window.sessionStorage && window.sessionStorage.getItem("qa_admin_auth") === "true";
  } catch (e) {
    isAdminAuthenticated = false;
  }

  const isStandaloneAdminPage = window.location.pathname.endsWith("admin.html") || window.location.pathname.includes("admin.html");

  function openAdmin() {
    if (adminModal) {
      adminModal.classList.add("is-active");
      adminModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    if (isAdminAuthenticated) {
      showDashboard();
    } else {
      showLogin();
    }
  }

  function closeAdmin() {
    if (isStandaloneAdminPage) {
      window.location.href = "index.html";
      return;
    }
    if (adminModal) {
      adminModal.classList.remove("is-active");
      adminModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  if (openAdminLink) openAdminLink.addEventListener("click", openAdmin);
  if (closeAdminBtn) closeAdminBtn.addEventListener("click", closeAdmin);
  if (adminScrim) adminScrim.addEventListener("click", closeAdmin);

  // If on admin.html, automatically trigger view based on current authentication state
  if (isStandaloneAdminPage) {
    if (isAdminAuthenticated) {
      showDashboard();
    } else {
      showLogin();
    }
  }

  // Secret shortcut: Alt + A or Shift + Alt + A opens Admin anywhere
  window.addEventListener("keydown", (e) => {
    if (e.altKey && (e.key === "a" || e.key === "A")) {
      e.preventDefault();
      openAdmin();
    }
    if (e.key === "Escape" && adminModal && adminModal.classList.contains("is-active")) {
      closeAdmin();
    }
  });

  // Check URL parameter: ?admin or #admin opens admin panel directly
  if (window.location.search.includes("admin") || window.location.hash === "#admin") {
    setTimeout(openAdmin, 400);
  }

  function showLogin() {
    if (loginView) loginView.style.display = isStandaloneAdminPage ? "flex" : "block";
    if (dashboardView) dashboardView.style.display = "none";
    if (authStatus) {
      authStatus.textContent = "🔒 Locked";
      authStatus.style.color = "var(--amber)";
    }
    if (loginPassInput) loginPassInput.value = "";
    if (loginErr) loginErr.style.display = "none";
  }

  function showDashboard() {
    if (loginView) loginView.style.display = "none";
    if (dashboardView) {
      dashboardView.style.display = "block";
      dashboardView.style.height = "100%";
    }
    if (authStatus) {
      authStatus.textContent = "🔓 Authorized (Admin)";
      authStatus.style.color = "#4ade80";
    }
    try {
      populateAdminVehicles();
      populateAdminOffers();
      populateAdminGallery();
      populateAdminBranding();
      populateAdminHeroAbout();
      populateAdminContact();
    } catch (err) {
      console.error("Error populating admin dashboard:", err);
    }
  }

  function processLogin() {
    const entered = (loginPassInput ? loginPassInput.value : "").trim();
    const pass = (siteData && siteData.adminPassword) ? siteData.adminPassword : DEFAULT_DATA.adminPassword;

    if (entered === pass) {
      isAdminAuthenticated = true;
      try {
        if (window.sessionStorage) window.sessionStorage.setItem("qa_admin_auth", "true");
      } catch (err) {}
      if (loginErr) loginErr.style.display = "none";
      showDashboard();
    } else {
      if (loginErr) {
        loginErr.textContent = "Incorrect password. Default is: admin123";
        loginErr.style.display = "block";
      }
      if (loginPassInput) {
        if (typeof loginPassInput.focus === "function") loginPassInput.focus();
        if (typeof loginPassInput.select === "function") loginPassInput.select();
      }
    }
  }

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      processLogin();
    });
  }

  const unlockBtn = document.getElementById("admin-unlock-btn");
  if (unlockBtn) {
    unlockBtn.addEventListener("click", (e) => {
      e.preventDefault();
      processLogin();
    });
  }

  if (loginPassInput) {
    loginPassInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        processLogin();
      }
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      isAdminAuthenticated = false;
      try {
        if (window.sessionStorage) window.sessionStorage.removeItem("qa_admin_auth");
      } catch (err) {}
      showLogin();
    });
  }

  // Tab navigation in Admin
  const navTabs = document.querySelectorAll(".admin-nav__tab");
  navTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      navTabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      const targetId = tab.getAttribute("data-tab");
      document.querySelectorAll(".admin-tab-pane").forEach((pane) => {
        pane.classList.toggle("is-active", pane.id === targetId);
      });
    });
  });

  /* ---------- Admin: Vehicles Management ---------- */
  function populateAdminVehicles() {
    const list = document.getElementById("admin-vehicles-list");
    if (!list) return;
    list.innerHTML = "";

    if (!siteData.vehicles || !Array.isArray(siteData.vehicles)) {
      siteData.vehicles = (DEFAULT_DATA.vehicles || []).slice();
    }

    siteData.vehicles.forEach((v, index) => {
      const card = document.createElement("div");
      card.className = "admin-item-card";
      card.innerHTML = `
        <div class="admin-item-topbar">
          <h5><svg class="icon" style="width:16px;height:16px;"><use href="#i-truck"/></svg> Vehicle #${index + 1}: ${v.name || 'Untitled Model'}</h5>
          <button type="button" class="btn btn--danger btn--sm adm-del-vehicle-btn" data-index="${index}" title="Remove this vehicle">
            <svg class="icon" style="width:13px;height:13px;display:inline-block;vertical-align:middle;"><use href="#i-trash"/></svg> Delete Vehicle
          </button>
        </div>
        <div class="admin-item-preview">
          <img src="${v.img}" alt="${v.name}" id="v-preview-${index}" onerror="this.src='auto-1.png'" style="object-fit:contain;background:#f1f3f6;" />
          <label class="admin-file-label">
            📁 Choose New Photo
            <input type="file" accept="image/*" style="display:none" class="adm-img-uploader" data-index="${index}" data-type="vehicle" />
          </label>
          <input type="text" class="form-control" style="font-size:0.75rem;padding:6px;" id="v-img-${index}" value="${v.img}" placeholder="or paste Image URL" />
        </div>
        <div class="admin-item-fields">
          <div class="form-group">
            <label class="form-label">Vehicle Name</label>
            <input type="text" class="form-control" id="v-name-${index}" value="${v.name}" />
          </div>
          <div class="form-group">
            <label class="form-label">Showroom Starting Price</label>
            <input type="text" class="form-control" id="v-price-${index}" value="${v.price}" />
          </div>
          <div class="form-group">
            <label class="form-label">Category / Badge</label>
            <input type="text" class="form-control" id="v-cat-${index}" value="${v.category}" />
          </div>
          <div class="form-group">
            <label class="form-label">Highlight Tag (e.g. Bestseller)</label>
            <input type="text" class="form-control" id="v-badge-${index}" value="${v.badge}" />
          </div>
          <div class="form-group" style="grid-column: 1 / -1;">
            <label class="form-label">Marketing Tagline</label>
            <input type="text" class="form-control" id="v-tagline-${index}" value="${v.tagline}" />
          </div>
          <div class="form-group">
            <label class="form-label">Engine Spec</label>
            <input type="text" class="form-control" id="v-engine-${index}" value="${v.engine}" />
          </div>
          <div class="form-group">
            <label class="form-label">Fuel Type</label>
            <input type="text" class="form-control" id="v-fuel-${index}" value="${v.fuel}" />
          </div>
          <div class="form-group">
            <label class="form-label">Seating / Payload</label>
            <input type="text" class="form-control" id="v-payload-${index}" value="${v.payload}" />
          </div>
          <div class="form-group">
            <label class="form-label">Mileage / Range</label>
            <input type="text" class="form-control" id="v-mileage-${index}" value="${v.mileage}" />
          </div>
        </div>
      `;
      list.appendChild(card);
    });

    // Delete Vehicle Handler
    list.querySelectorAll(".adm-del-vehicle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        const vName = (siteData.vehicles && siteData.vehicles[idx]) ? siteData.vehicles[idx].name : "this vehicle";
        if (confirm(`Are you sure you want to delete "${vName}" from your vehicle showcase?`)) {
          siteData.vehicles.splice(idx, 1);
          saveSiteData(siteData);
          renderVehicleSlides();
          populateAdminVehicles();
          showAdminToast(`Vehicle "${vName}" deleted.`);
        }
      });
    });

    // Handle Local Image File Uploads for Vehicles
    list.querySelectorAll(".adm-img-uploader").forEach((input) => {
      input.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        const idx = e.target.getAttribute("data-index");
        if (file) {
          const preview = document.getElementById(`v-preview-${idx}`);
          const textInput = document.getElementById(`v-img-${idx}`);

          const localUrl = URL.createObjectURL(file);
          if (preview) preview.src = localUrl;

          const uploadedServerUrl = await uploadImageToServer(file);
          if (uploadedServerUrl) {
            if (preview) preview.src = uploadedServerUrl;
            if (textInput) textInput.value = uploadedServerUrl;
            showAdminToast("Uploaded to server /uploads/ directory!");
          } else {
            const reader = new FileReader();
            reader.onload = (re) => {
              const dataUrl = re.target.result;
              if (textInput) textInput.value = dataUrl;
            };
            reader.readAsDataURL(file);
          }
        }
      });
    });
  }

  // Add New Vehicle Button Handler
  const addVehicleBtn = document.getElementById("add-vehicle-btn");
  if (addVehicleBtn) {
    addVehicleBtn.addEventListener("click", () => {
      if (!siteData.vehicles) siteData.vehicles = [];
      const newV = {
        id: "v" + Date.now(),
        badge: "New Model",
        badgeColor: "",
        category: "Passenger",
        catClass: "",
        name: "New TVS King Model",
        tagline: "High performance three-wheeler built for high earnings.",
        engine: "200cc, 4-Stroke",
        fuel: "Petrol / CNG",
        payload: "3 Passengers + Driver",
        mileage: "35–40 km/l",
        price: "₹2.50 Lakh*",
        img: "tvs_king_deluxe.jpg"
      };
      siteData.vehicles.push(newV);
      saveSiteData(siteData);
      renderVehicleSlides();
      populateAdminVehicles();
      showAdminToast("New vehicle added! Fill in the details and click Save.");
    });
  }

  const saveVehiclesBtn = document.getElementById("save-vehicles-btn");
  if (saveVehiclesBtn) {
    saveVehiclesBtn.addEventListener("click", () => {
      siteData.vehicles.forEach((v, index) => {
        const nameEl = document.getElementById(`v-name-${index}`);
        const priceEl = document.getElementById(`v-price-${index}`);
        const catEl = document.getElementById(`v-cat-${index}`);
        const badgeEl = document.getElementById(`v-badge-${index}`);
        const taglineEl = document.getElementById(`v-tagline-${index}`);
        const engineEl = document.getElementById(`v-engine-${index}`);
        const fuelEl = document.getElementById(`v-fuel-${index}`);
        const payloadEl = document.getElementById(`v-payload-${index}`);
        const mileageEl = document.getElementById(`v-mileage-${index}`);
        const imgEl = document.getElementById(`v-img-${index}`);

        if (nameEl) v.name = nameEl.value;
        if (priceEl) v.price = priceEl.value;
        if (catEl) v.category = catEl.value;
        if (badgeEl) v.badge = badgeEl.value;
        if (taglineEl) v.tagline = taglineEl.value;
        if (engineEl) v.engine = engineEl.value;
        if (fuelEl) v.fuel = fuelEl.value;
        if (payloadEl) v.payload = payloadEl.value;
        if (mileageEl) v.mileage = mileageEl.value;
        if (imgEl) v.img = imgEl.value;
      });

      saveSiteData(siteData);
      renderVehicleSlides();
      showAdminToast("All vehicle updates saved successfully!");
    });
  }

  /* ---------- Admin: Offers Management ---------- */
  function populateAdminOffers() {
    const list = document.getElementById("admin-offers-list");
    if (!list) return;
    list.innerHTML = "";

    if (!siteData.offers || !Array.isArray(siteData.offers)) {
      siteData.offers = (DEFAULT_DATA.offers || []).slice();
    }

    siteData.offers.forEach((o, index) => {
      const card = document.createElement("div");
      card.className = "admin-item-card";
      const customBg = o.bgImg ? `background: url('${o.bgImg}') center/cover no-repeat;` : "background:#1e3a5f;";
      card.innerHTML = `
        <div class="admin-item-topbar">
          <h5><svg class="icon" style="width:16px;height:16px;"><use href="#i-tag"/></svg> Offer Banner #${index + 1}: ${o.title || 'Untitled Offer'}</h5>
          <button type="button" class="btn btn--danger btn--sm adm-del-offer-btn" data-index="${index}" title="Remove this offer">
            <svg class="icon" style="width:13px;height:13px;display:inline-block;vertical-align:middle;"><use href="#i-trash"/></svg> Delete Offer
          </button>
        </div>
        <div class="admin-item-preview">
          <div style="width:100%;height:110px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;text-align:center;padding:10px;border:1px solid var(--line);${customBg}" id="o-preview-box-${index}">
            ${o.bgImg ? '' : o.title}
          </div>
          <label class="admin-file-label">
            🖼️ Upload Custom Banner
            <input type="file" accept="image/*" style="display:none" class="adm-offer-uploader" data-index="${index}" />
          </label>
          <input type="text" class="form-control" style="font-size:0.75rem;padding:6px;" id="o-img-${index}" value="${o.bgImg || ''}" placeholder="or paste Banner Image URL" />
        </div>
        <div class="admin-item-fields">
          <div class="form-group">
            <label class="form-label">Badge / Pill Text</label>
            <input type="text" class="form-control" id="o-pill-${index}" value="${o.pill}" />
          </div>
          <div class="form-group">
            <label class="form-label">Watermark Text</label>
            <input type="text" class="form-control" id="o-deco-${index}" value="${(o.deco || '').replace(/<br\s*[\/]?>/gi, ' ')}" />
          </div>
          <div class="form-group" style="grid-column: 1 / -1;">
            <label class="form-label">Offer Title</label>
            <input type="text" class="form-control" id="o-title-${index}" value="${o.title}" />
          </div>
          <div class="form-group" style="grid-column: 1 / -1;">
            <label class="form-label">Offer Description &amp; Details</label>
            <textarea class="form-control" rows="2" id="o-desc-${index}">${o.desc}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">CTA Button Label</label>
            <input type="text" class="form-control" id="o-btn-${index}" value="${o.btnText}" />
          </div>
        </div>
      `;
      list.appendChild(card);
    });

    // Delete Offer Handler
    list.querySelectorAll(".adm-del-offer-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        const oTitle = (siteData.offers && siteData.offers[idx]) ? siteData.offers[idx].title : "this offer";
        if (confirm(`Are you sure you want to delete offer "${oTitle}"?`)) {
          siteData.offers.splice(idx, 1);
          saveSiteData(siteData);
          renderOfferSlides();
          populateAdminOffers();
          showAdminToast(`Offer "${oTitle}" deleted.`);
        }
      });
    });

    // Handle Local Image File Uploads for Offers
    list.querySelectorAll(".adm-offer-uploader").forEach((input) => {
      input.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        const idx = e.target.getAttribute("data-index");
        if (file) {
          const textInput = document.getElementById(`o-img-${idx}`);
          const previewBox = document.getElementById(`o-preview-box-${idx}`);
          const localUrl = URL.createObjectURL(file);
          if (previewBox) {
            previewBox.style.background = `url('${localUrl}') center/cover no-repeat`;
            previewBox.textContent = "";
          }

          const uploadedServerUrl = await uploadImageToServer(file);
          if (uploadedServerUrl) {
            if (textInput) textInput.value = uploadedServerUrl;
            if (previewBox) previewBox.style.background = `url('${uploadedServerUrl}') center/cover no-repeat`;
            showAdminToast("Banner uploaded to server /uploads/ directory!");
          } else {
            const reader = new FileReader();
            reader.onload = (re) => {
              const dataUrl = re.target.result;
              if (textInput) textInput.value = dataUrl;
            };
            reader.readAsDataURL(file);
          }
        }
      });
    });
  }

  // Add New Offer Button Handler
  const addOfferBtn = document.getElementById("add-offer-btn");
  if (addOfferBtn) {
    addOfferBtn.addEventListener("click", () => {
      if (!siteData.offers) siteData.offers = [];
      const newO = {
        id: "o" + Date.now(),
        pill: "🎉 Special Scheme",
        title: "Exclusive TVS Seasonal Offer",
        desc: "Special discount, zero processing fee and lowest interest rates available this month.",
        btnText: "Claim on WhatsApp",
        btnClass: "btn--amber",
        cardClass: "obanner__card--1",
        deco: "SPECIAL<br/>OFFER",
        bgImg: ""
      };
      siteData.offers.push(newO);
      saveSiteData(siteData);
      renderOfferSlides();
      populateAdminOffers();
      showAdminToast("New offer banner added! Fill in details and click Save.");
    });
  }

  const saveOffersBtn = document.getElementById("save-offers-btn");
  if (saveOffersBtn) {
    saveOffersBtn.addEventListener("click", () => {
      siteData.offers.forEach((o, index) => {
        const pillEl = document.getElementById(`o-pill-${index}`);
        const decoEl = document.getElementById(`o-deco-${index}`);
        const titleEl = document.getElementById(`o-title-${index}`);
        const descEl = document.getElementById(`o-desc-${index}`);
        const btnEl = document.getElementById(`o-btn-${index}`);
        const imgEl = document.getElementById(`o-img-${index}`);

        if (pillEl) o.pill = pillEl.value;
        if (decoEl) o.deco = decoEl.value.replace(/\s+/g, '<br/>');
        if (titleEl) o.title = titleEl.value;
        if (descEl) o.desc = descEl.value;
        if (btnEl) o.btnText = btnEl.value;
        if (imgEl) o.bgImg = imgEl.value;
      });

      saveSiteData(siteData);
      renderOfferSlides();
      showAdminToast("All offer updates saved successfully!");
    });
  }

  /* ---------- Admin: Media & Images Gallery ---------- */
  function populateAdminGallery() {
    const list = document.getElementById("admin-gallery-list");
    if (!list) return;
    list.innerHTML = "";

    if (!siteData.gallery || !Array.isArray(siteData.gallery)) {
      siteData.gallery = (DEFAULT_DATA.gallery || []).slice();
    }

    if (siteData.gallery.length === 0) {
      list.innerHTML = `<p style="grid-column: 1 / -1; color: var(--text-soft); padding: 24px; text-align:center;">No images in media library yet. Click <strong>"Add More Images"</strong> above to upload!</p>`;
      return;
    }

    siteData.gallery.forEach((url, index) => {
      const card = document.createElement("div");
      card.className = "admin-gallery-card";
      card.innerHTML = `
        <img src="${url}" alt="Asset ${index + 1}" class="admin-gallery-thumb" onerror="this.src='auto-1.png'" />
        <div class="admin-gallery-meta" title="${url}">${url}</div>
        <div class="admin-gallery-actions">
          <button type="button" class="btn btn--outline btn--sm adm-copy-img-btn" data-url="${url}">📋 Copy URL</button>
          <button type="button" class="btn btn--danger btn--sm adm-del-img-btn" data-index="${index}" title="Remove image">🗑️</button>
        </div>
      `;
      list.appendChild(card);
    });

    // Copy URL handler
    list.querySelectorAll(".adm-copy-img-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const imgUrl = btn.getAttribute("data-url");
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(imgUrl).then(() => {
            showAdminToast("Image URL copied to clipboard: " + imgUrl);
          }).catch(() => {
            prompt("Copy image path/URL:", imgUrl);
          });
        } else {
          prompt("Copy image path/URL:", imgUrl);
        }
      });
    });

    // Delete image handler
    list.querySelectorAll(".adm-del-img-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        if (confirm("Remove this image from your Media Library?")) {
          siteData.gallery.splice(idx, 1);
          saveSiteData(siteData);
          populateAdminGallery();
          showAdminToast("Image removed from library.");
        }
      });
    });
  }

  // Multi-image uploader for Gallery
  const galleryUploader = document.getElementById("adm-gallery-uploader");
  if (galleryUploader) {
    galleryUploader.addEventListener("change", async (e) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      if (!siteData.gallery) siteData.gallery = [];

      showAdminToast(`Uploading ${files.length} image(s)...`);

      let addedCount = 0;
      for (const file of files) {
        const serverUrl = await uploadImageToServer(file);
        if (serverUrl) {
          siteData.gallery.unshift(serverUrl);
          addedCount++;
        } else {
          await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (re) => {
              siteData.gallery.unshift(re.target.result);
              addedCount++;
              resolve();
            };
            reader.onerror = resolve;
            reader.readAsDataURL(file);
          });
        }
      }

      saveSiteData(siteData);
      populateAdminGallery();
      galleryUploader.value = "";
      showAdminToast(`Successfully added ${addedCount} image(s) to Media Library!`);
    });
  }

  /* ---------- Admin: Contact Info Management ---------- */
  function populateAdminContact() {
    const c = siteData.contact;
    if (!c) return;

    const phoneSales = document.getElementById("adm-phone-sales");
    const phoneService = document.getElementById("adm-phone-service");
    const phoneLandline = document.getElementById("adm-phone-landline");
    const email = document.getElementById("adm-email");
    const address = document.getElementById("adm-address");
    const gstin = document.getElementById("adm-gstin");
    const hours = document.getElementById("adm-hours");

    if (phoneSales) phoneSales.value = c.salesPhone;
    if (phoneService) phoneService.value = c.servicePhone;
    if (phoneLandline) phoneLandline.value = c.landline;
    if (email) email.value = c.email;
    if (address) address.value = c.address;
    if (gstin) gstin.value = c.gstin;
    if (hours) hours.value = c.hours;
  }

  const saveContactBtn = document.getElementById("save-contact-btn");
  if (saveContactBtn) {
    saveContactBtn.addEventListener("click", () => {
      const c = siteData.contact;
      c.salesPhone = document.getElementById("adm-phone-sales").value;
      c.servicePhone = document.getElementById("adm-phone-service").value;
      c.landline = document.getElementById("adm-phone-landline").value;
      c.email = document.getElementById("adm-email").value;
      c.address = document.getElementById("adm-address").value;
      c.gstin = document.getElementById("adm-gstin").value;
      c.hours = document.getElementById("adm-hours").value;

      saveSiteData(siteData);
      renderContactDetails();
    });
  }

  /* ---------- Admin: Hero & About Management ---------- */
  function populateAdminHeroAbout() {
    const h = siteData.hero || DEFAULT_DATA.hero;
    const a = siteData.about || DEFAULT_DATA.about;

    // Hero elements
    const heroTag = document.getElementById("adm-hero-tag");
    const heroTitle = document.getElementById("adm-hero-title");
    const heroDesc = document.getElementById("adm-hero-desc");
    const heroImg = document.getElementById("adm-hero-img");
    const heroImgPrev = document.getElementById("adm-hero-img-prev");
    const heroFile = document.getElementById("adm-hero-file");

    if (heroTag) heroTag.value = h.eyebrow;
    if (heroTitle) heroTitle.value = h.title;
    if (heroDesc) heroDesc.value = h.desc;
    if (heroImg) heroImg.value = h.img;
    if (heroImgPrev && h.img) heroImgPrev.src = h.img;

    if (heroFile) {
      heroFile.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const localUrl = URL.createObjectURL(file);
          if (heroImgPrev) heroImgPrev.src = localUrl;
          const serverUrl = await uploadImageToServer(file);
          if (serverUrl) {
            if (heroImg) heroImg.value = serverUrl;
            if (heroImgPrev) heroImgPrev.src = serverUrl;
            showAdminToast("Hero image uploaded to server!");
          } else {
            const reader = new FileReader();
            reader.onload = (re) => {
              if (heroImg) heroImg.value = re.target.result;
            };
            reader.readAsDataURL(file);
          }
        }
      };
    }

    // About elements
    const aboutTitle = document.getElementById("adm-about-title");
    const aboutP1 = document.getElementById("adm-about-p1");
    const aboutP2 = document.getElementById("adm-about-p2");
    const aboutImg = document.getElementById("adm-about-img");
    const aboutImgPrev = document.getElementById("adm-about-img-prev");
    const aboutFile = document.getElementById("adm-about-file");

    if (aboutTitle) aboutTitle.value = a.title;
    if (aboutP1) aboutP1.value = a.p1;
    if (aboutP2) aboutP2.value = a.p2;
    if (aboutImg) aboutImg.value = a.img;
    if (aboutImgPrev && a.img) aboutImgPrev.src = a.img;

    if (aboutFile) {
      aboutFile.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const localUrl = URL.createObjectURL(file);
          if (aboutImgPrev) aboutImgPrev.src = localUrl;
          const serverUrl = await uploadImageToServer(file);
          if (serverUrl) {
            if (aboutImg) aboutImg.value = serverUrl;
            if (aboutImgPrev) aboutImgPrev.src = serverUrl;
            showAdminToast("About image uploaded to server!");
          } else {
            const reader = new FileReader();
            reader.onload = (re) => {
              if (aboutImg) aboutImg.value = re.target.result;
            };
            reader.readAsDataURL(file);
          }
        }
      };
    }
  }

  const saveHeroAboutBtn = document.getElementById("save-hero-about-btn");
  if (saveHeroAboutBtn) {
    saveHeroAboutBtn.addEventListener("click", () => {
      if (!siteData.hero) siteData.hero = Object.assign({}, DEFAULT_DATA.hero);
      if (!siteData.about) siteData.about = Object.assign({}, DEFAULT_DATA.about);

      const heroTag = document.getElementById("adm-hero-tag");
      const heroTitle = document.getElementById("adm-hero-title");
      const heroDesc = document.getElementById("adm-hero-desc");
      const heroImg = document.getElementById("adm-hero-img");

      if (heroTag) siteData.hero.eyebrow = heroTag.value;
      if (heroTitle) siteData.hero.title = heroTitle.value;
      if (heroDesc) siteData.hero.desc = heroDesc.value;
      if (heroImg) siteData.hero.img = heroImg.value;

      const aboutTitle = document.getElementById("adm-about-title");
      const aboutP1 = document.getElementById("adm-about-p1");
      const aboutP2 = document.getElementById("adm-about-p2");
      const aboutImg = document.getElementById("adm-about-img");

      if (aboutTitle) siteData.about.title = aboutTitle.value;
      if (aboutP1) siteData.about.p1 = aboutP1.value;
      if (aboutP2) siteData.about.p2 = aboutP2.value;
      if (aboutImg) siteData.about.img = aboutImg.value;

      saveSiteData(siteData);
      renderHeroAndAbout();
    });
  }

  /* ---------- Admin: Branding & Logo Management ---------- */
  function populateAdminBranding() {
    const b = siteData.branding || DEFAULT_DATA.branding;
    const logoUrl = document.getElementById("adm-logo-url");
    const logoPrev = document.getElementById("adm-logo-prev");
    const logoFile = document.getElementById("adm-logo-file");

    const dealerLogoUrl = document.getElementById("adm-dealer-logo-url");
    const dealerLogoPrev = document.getElementById("adm-dealer-logo-prev");
    const dealerLogoFile = document.getElementById("adm-dealer-logo-file");

    if (logoUrl) logoUrl.value = b.logo;
    if (logoPrev && b.logo) logoPrev.src = b.logo;

    if (dealerLogoUrl) dealerLogoUrl.value = b.dealerLogo;
    if (dealerLogoPrev && b.dealerLogo) dealerLogoPrev.src = b.dealerLogo;

    if (logoFile) {
      logoFile.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const localUrl = URL.createObjectURL(file);
          if (logoPrev) logoPrev.src = localUrl;
          const serverUrl = await uploadImageToServer(file);
          if (serverUrl) {
            if (logoUrl) logoUrl.value = serverUrl;
            if (logoPrev) logoPrev.src = serverUrl;
            showAdminToast("Logo uploaded to server!");
          } else {
            const reader = new FileReader();
            reader.onload = (re) => {
              if (logoUrl) logoUrl.value = re.target.result;
            };
            reader.readAsDataURL(file);
          }
        }
      };
    }

    if (dealerLogoFile) {
      dealerLogoFile.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const localUrl = URL.createObjectURL(file);
          if (dealerLogoPrev) dealerLogoPrev.src = localUrl;
          const serverUrl = await uploadImageToServer(file);
          if (serverUrl) {
            if (dealerLogoUrl) dealerLogoUrl.value = serverUrl;
            if (dealerLogoPrev) dealerLogoPrev.src = serverUrl;
            showAdminToast("Dealer badge uploaded to server!");
          } else {
            const reader = new FileReader();
            reader.onload = (re) => {
              if (dealerLogoUrl) dealerLogoUrl.value = re.target.result;
            };
            reader.readAsDataURL(file);
          }
        }
      };
    }
  }

  const saveBrandingBtn = document.getElementById("save-branding-btn");
  if (saveBrandingBtn) {
    saveBrandingBtn.addEventListener("click", () => {
      if (!siteData.branding) siteData.branding = Object.assign({}, DEFAULT_DATA.branding);

      const logoUrl = document.getElementById("adm-logo-url");
      const dealerLogoUrl = document.getElementById("adm-dealer-logo-url");

      if (logoUrl && logoUrl.value.trim()) siteData.branding.logo = logoUrl.value.trim();
      if (dealerLogoUrl && dealerLogoUrl.value.trim()) siteData.branding.dealerLogo = dealerLogoUrl.value.trim();

      saveSiteData(siteData);
      renderBranding();
    });
  }

  /* ---------- Admin: Security (Password & Factory Reset) ---------- */
  const passForm = document.getElementById("admin-password-form");
  if (passForm) {
    passForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const curr = document.getElementById("adm-curr-pass").value;
      const next = document.getElementById("adm-new-pass").value;

      if (curr !== (siteData.adminPassword || DEFAULT_DATA.adminPassword)) {
        alert("Current password does not match!");
        return;
      }
      if (next.length < 4) {
        alert("New password must be at least 4 characters.");
        return;
      }

      siteData.adminPassword = next;
      saveSiteData(siteData);
      alert("Password updated successfully!");
      passForm.reset();
    });
  }

  const resetAllBtn = document.getElementById("admin-reset-all-btn");
  if (resetAllBtn) {
    resetAllBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all vehicles, prices, and banners to original defaults?")) {
        localStorage.removeItem("qa_site_data");
        siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));
        renderVehicleSlides();
        renderOfferSlides();
        renderContactDetails();
        renderHeroAndAbout();
        renderBranding();
        populateAdminVehicles();
        populateAdminOffers();
        populateAdminGallery();
        populateAdminBranding();
        populateAdminHeroAbout();
        populateAdminContact();
        showAdminToast("Reset to factory defaults complete!");
      }
    });
  }

  /* ================================================================
     INITIAL PAGE LOAD
     ================================================================ */
  renderVehicleSlides();
  renderOfferSlides();
  renderContactDetails();
  renderHeroAndAbout();
  renderBranding();
  fetchServerData(); // Sync with cPanel server site_data.json if hosted online

})();
