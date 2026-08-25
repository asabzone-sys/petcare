/**
 * FurEver Care - Master JavaScript Engine
 * Pure Vanilla JavaScript: Accessible, Modular, High-Performance
 */

(function () {
  "use strict";

  // --- STATE & CONSTANTS ---
  const STORAGE_KEYS = {
    THEME: "furever_theme",
    USER_NAME: "furever_user_name",
    USER_ROLE: "furever_user_role",
    SAVED_PET: "furever_saved_pet_profile"
  };

  // --- 1. THEME MANAGER ---
  const ThemeManager = {
    init() {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      this.setTheme(savedTheme);

      const toggleButtons = document.querySelectorAll(".theme-toggle-btn");
      toggleButtons.forEach(btn => {
        btn.addEventListener("click", () => this.toggleTheme());
      });
    },

    setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      
      const toggleIcons = document.querySelectorAll(".theme-toggle-btn i");
      toggleIcons.forEach(icon => {
        if (theme === "dark") {
          icon.className = "fa-solid fa-sun";
          icon.parentElement.setAttribute("title", "Switch to Light Mode");
          icon.parentElement.setAttribute("aria-label", "Switch to Light Mode");
        } else {
          icon.className = "fa-solid fa-moon";
          icon.parentElement.setAttribute("title", "Switch to Dark Mode");
          icon.parentElement.setAttribute("aria-label", "Switch to Dark Mode");
        }
      });
    },

    toggleTheme() {
      const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      this.setTheme(next);
      Toast.show(`Switched to ${next === "dark" ? "Dark" : "Light"} theme`, "fa-solid fa-circle-half-stroke");
    }
  };

  // --- 2. LIVE CLOCK (DATE & TIME) ---
  const LiveClock = {
    init() {
      const update = () => {
        const now = new Date();
        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        const dateStr = now.toLocaleDateString('en-US', dateOptions);
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        
        document.querySelectorAll(".live-date-val").forEach(el => { el.textContent = dateStr; });
        document.querySelectorAll(".live-time-val").forEach(el => { el.textContent = timeStr; });
        document.querySelectorAll("#live-clock, .live-clock-val").forEach(el => { el.textContent = `${dateStr} • ${timeStr}`; });
      };

      update();
      setInterval(update, 1000);
    }
  };

  // --- 3. GEOLOCATION (SILENT DEFAULT - NO BROWSER PERMISSION PROMPT) ---
  const GeolocationManager = {
    init() {
      // Set reliable clinical location without triggering invasive browser permission popups
      document.querySelectorAll("#geo-indicator, .geo-indicator-val").forEach(el => {
        el.textContent = "Downtown Central Clinic & Regional Care Network";
      });
    }
  };

  // --- 4. SIMULATED VISITOR COUNTER ---
  const VisitorCounter = {
    baseCount: 12584,
    currentCount: 12584,
    hasAnimated: false,

    init() {
      // Calculate realistic simulated count
      const stored = localStorage.getItem("furever_simulated_visitors");
      if (stored) {
        this.currentCount = Math.max(parseInt(stored, 10), this.baseCount);
      } else {
        // Add random variation to feel realistic
        this.currentCount = this.baseCount + Math.floor(Math.random() * 45);
        localStorage.setItem("furever_simulated_visitors", this.currentCount.toString());
      }

      this.animateCounters();

      // Subtle occasional increment (every 25 seconds) to simulate live guardian visits
      setInterval(() => {
        this.currentCount += 1;
        localStorage.setItem("furever_simulated_visitors", this.currentCount.toString());
        this.updateDisplay(this.currentCount);
      }, 25000);
    },

    animateCounters() {
      const elements = document.querySelectorAll(".simulated-visitor-counter, [data-visitor-counter]");
      if (!elements.length) return;

      const target = this.currentCount;
      const duration = 1800; // ms
      const startTime = performance.now();

      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(easeProgress * target);

        this.updateDisplay(value);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          this.updateDisplay(target);
          this.hasAnimated = true;
        }
      };

      requestAnimationFrame(update);
    },

    updateDisplay(val) {
      const formatted = val.toLocaleString() + "+";
      const elements = document.querySelectorAll(".simulated-visitor-counter, [data-visitor-counter]");
      elements.forEach(el => {
        el.textContent = formatted;
      });
    }
  };

  // --- 5. PAGE LOADER & PERFORMANCE ---
  const PageLoader = {
    init() {
      const loader = document.getElementById("page-loader");
      if (!loader) return;

      const hideLoader = () => {
        loader.classList.add("loader-hidden");
        setTimeout(() => {
          if (loader.parentNode) {
            loader.style.display = "none";
          }
        }, 200);
      };

      // Fast dismiss: don't block user interaction
      hideLoader();
      if (document.readyState !== "complete") {
        window.addEventListener("load", hideLoader, { once: true });
      }
    }
  };

  // --- 5B. PERSISTENT SCROLL & DASHBOARD RESTORATION ---
  const ScrollRestorationManager = {
    init() {
      // Disable default jumpy browser scroll restoration
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      const pageKey = "furever_scroll_" + window.location.pathname;

      // Save scroll position on scroll (debounced) and on page exit
      let scrollTimer = null;
      const savePosition = () => {
        try {
          const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
          sessionStorage.setItem(pageKey, currentY.toString());
        } catch (e) {
          // ignore private storage limits
        }
      };

      window.addEventListener("scroll", () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(savePosition, 100);
      }, { passive: true });

      window.addEventListener("beforeunload", savePosition);
      window.addEventListener("pagehide", savePosition);

      // Restore scroll position upon navigation
      // Only restore if user didn't navigate directly to a hash anchor (#section)
      if (!window.location.hash) {
        try {
          const savedY = sessionStorage.getItem(pageKey);
          if (savedY !== null) {
            const targetY = parseInt(savedY, 10);
            if (targetY > 0) {
              // Attempt instant scroll first
              window.scrollTo(0, targetY);

              // Secondary deferred scroll to handle asynchronously rendered cards or images
              requestAnimationFrame(() => {
                window.scrollTo(0, targetY);
              });

              setTimeout(() => {
                window.scrollTo(0, targetY);
              }, 120);
            }
          }
        } catch (e) {
          // sessionStorage disabled
        }
      }
    }
  };

  // --- 6. SCROLL PROGRESS ---
  const ScrollProgress = {
    init() {
      const bar = document.getElementById("scroll-progress");
      if (!bar) return;

      window.addEventListener("scroll", () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        bar.style.width = scrolled + "%";
      }, { passive: true });
    }
  };

  // --- 7. CUSTOM DESKTOP CURSOR ---
  const CustomCursor = {
    init() {
      if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;

      const dot = document.querySelector(".custom-cursor-dot");
      const ring = document.querySelector(".custom-cursor-ring");
      if (!dot || !ring) return;

      let mouseX = -100, mouseY = -100;
      let ringX = -100, ringY = -100;

      window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      });

      const render = () => {
        ringX += (mouseX - ringX) * 0.22;
        ringY += (mouseY - ringY) * 0.22;
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);

      const interactives = "a, button, input, select, textarea, .card-interactive, .role-card, .chip-btn";
      document.addEventListener("mouseover", (e) => {
        if (e.target.closest(interactives)) {
          ring.classList.add("cursor-hover");
        }
      });
      document.addEventListener("mouseout", (e) => {
        if (e.target.closest(interactives)) {
          ring.classList.remove("cursor-hover");
        }
      });
    }
  };

  // --- 8. BACK TO TOP ---
  const BackToTop = {
    init() {
      const btn = document.getElementById("back-to-top");
      if (!btn) return;

      window.addEventListener("scroll", () => {
        if (window.scrollY > 350) {
          btn.classList.add("visible");
        } else {
          btn.classList.remove("visible");
        }
      }, { passive: true });

      btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  // --- 9. MOBILE DRAWER NAVIGATION ---
  const MobileNav = {
    init() {
      const openBtns = document.querySelectorAll(".mobile-menu-btn, #mobile-menu-btn");
      const overlay = document.querySelector(".mobile-nav-overlay, #mobile-nav, #mobile-nav-drawer");
      const closeBtns = document.querySelectorAll(".mobile-drawer-close, .mobile-nav-close, #mobile-nav-close");
      if (!openBtns.length || !overlay) return;

      const open = () => {
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
      };

      const close = () => {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
      };

      openBtns.forEach(btn => btn.addEventListener("click", open));
      closeBtns.forEach(btn => btn.addEventListener("click", close));
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("open")) close();
      });
    }
  };

  // --- 10. PERSONALIZATION & PET NAME ENGINE ---
  const Personalization = {
    defaultPet: {
      name: "Barnaby",
      species: "Dog",
      breed: "Golden Retriever Mix",
      age: "2.5 Years",
      gender: "Male (Neutered)",
      weight: "45.2 lbs",
      vaccinationStatus: "Verified Current",
      healthInfo: "Grain-free salmon diet. Sensitive to chicken proteins.",
      notes: "Next rabies booster due Aug 2027.",
      photo: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80"
    },

    init() {
      this.updateUI();
      this.initOnboardingForm();
    },

    getUserName() {
      return localStorage.getItem(STORAGE_KEYS.USER_NAME) || "";
    },

    getUserRole() {
      return localStorage.getItem(STORAGE_KEYS.USER_ROLE) || "";
    },

    getSavedPet() {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.SAVED_PET);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") return parsed;
        }
      } catch (e) {
        console.warn("Error reading pet profile:", e);
      }
      return null;
    },

    saveUser(name, role) {
      if (name) localStorage.setItem(STORAGE_KEYS.USER_NAME, name.trim());
      if (role) localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
      this.updateUI();
    },

    savePet(petObj) {
      if (!petObj || !petObj.name) return;
      localStorage.setItem(STORAGE_KEYS.SAVED_PET, JSON.stringify(petObj));
      this.updateUI();
    },

    updateUI() {
      const userName = this.getUserName();
      const userRole = this.getUserRole();
      const pet = this.getSavedPet() || this.defaultPet;
      const hasCustomPet = !!this.getSavedPet();

      // 1. User Name Displays
      const nameDisplays = document.querySelectorAll(".user-name-display");
      nameDisplays.forEach(el => {
        el.textContent = userName ? userName : (hasCustomPet ? "Pet Parent" : "Pet Parent");
      });

      // 2. Pet Name Personalization across top areas & dashboard headers
      const petNameDisplays = document.querySelectorAll(".pet-name-display");
      petNameDisplays.forEach(el => {
        el.textContent = pet && pet.name ? pet.name : "Your Companion";
      });

      const petCareTitles = document.querySelectorAll(".pet-care-title");
      petCareTitles.forEach(el => {
        if (pet && pet.name) {
          el.textContent = `${pet.name}'s Care Dashboard`;
        } else {
          el.textContent = "Set up your pet profile";
        }
      });

      const personalizedHeaders = document.querySelectorAll(".personalized-welcome-title");
      personalizedHeaders.forEach(el => {
        if (userName && pet && pet.name) {
          el.innerHTML = `Welcome, <span style="color: var(--primary-500);">${userName}</span> • <span style="color: var(--text-primary); font-family: 'Playfair Display', serif;">${pet.name}'s Care Dashboard</span>`;
        } else if (userName) {
          el.innerHTML = `Welcome, <span style="color: var(--primary-500);">${userName}</span>!`;
        } else if (pet && pet.name) {
          el.innerHTML = `Welcome to <span style="color: var(--primary-500);">${pet.name}'s Care Dashboard</span>`;
        } else {
          el.textContent = "Welcome to FurEver Care";
        }
      });

      // 3. Dynamic Pet Passport Elements
      if (pet) {
        document.querySelectorAll(".pet-passport-name").forEach(el => el.textContent = pet.name || "Companion");
        document.querySelectorAll(".pet-passport-species").forEach(el => el.textContent = pet.species || "Pet");
        document.querySelectorAll(".pet-passport-breed").forEach(el => el.textContent = `${pet.species || "Pet"} • ${pet.breed || "Companion"}`);
        document.querySelectorAll(".pet-passport-age").forEach(el => el.textContent = pet.age || "Active");
        document.querySelectorAll(".pet-passport-weight").forEach(el => el.textContent = pet.weight || "Healthy");
        document.querySelectorAll(".pet-passport-gender").forEach(el => el.textContent = pet.gender || "Healthy");
        document.querySelectorAll(".pet-passport-vaccines").forEach(el => el.textContent = pet.vaccinationStatus || "Verified Current");
        document.querySelectorAll(".pet-passport-health").forEach(el => el.textContent = pet.healthInfo || "Standard nutritional diet.");
        
        if (pet.photo) {
          document.querySelectorAll(".pet-passport-img").forEach(el => {
            el.src = pet.photo;
            el.alt = `${pet.name || "Pet"} photo`;
          });
        }
      }

      // 4. Role Badges in header and ticker
      const roleBadges = document.querySelectorAll(".user-role-badge");
      roleBadges.forEach(badge => {
        if (userRole) {
          let roleTitle = "Pet Owner";
          let roleIcon = "fa-paw";
          if (userRole === "veterinarian") {
            roleTitle = "Veterinarian";
            roleIcon = "fa-user-doctor";
          } else if (userRole === "shelter") {
            roleTitle = "Animal Shelter";
            roleIcon = "fa-shield-heart";
          }
          badge.innerHTML = `<i class="fa-solid ${roleIcon}"></i> <span>${roleTitle}</span>`;
          badge.style.display = "inline-flex";
        } else {
          badge.style.display = "none";
        }
      });
    },

    initOnboardingForm() {
      const form = document.getElementById("onboarding-form");
      const roleCards = document.querySelectorAll(".role-card");
      const nameInput = document.getElementById("onboarding-name-input");

      if (!form || !roleCards.length) return;

      let selectedRole = this.getUserRole() || "owner";

      roleCards.forEach(card => {
        if (card.dataset.role === selectedRole) {
          card.classList.add("selected");
        }
        card.addEventListener("click", () => {
          roleCards.forEach(c => c.classList.remove("selected"));
          card.classList.add("selected");
          selectedRole = card.dataset.role;
        });
      });

      if (nameInput) {
        nameInput.value = this.getUserName();
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameVal = nameInput ? nameInput.value.trim() : "";
        if (!nameVal) {
          Toast.show("Please enter your name to personalize your experience.", "fa-solid fa-circle-exclamation");
          if (nameInput) nameInput.focus();
          return;
        }

        this.saveUser(nameVal, selectedRole);

        let targetPage = "pet-owner.html";
        if (selectedRole === "veterinarian") targetPage = "veterinarian.html";
        else if (selectedRole === "shelter") targetPage = "animal-shelter.html";

        Toast.show(`Welcome aboard, ${nameVal}! Loading your portal...`, "fa-solid fa-heart");
        setTimeout(() => {
          window.location.href = targetPage;
        }, 600);
      });
    }
  };

  // --- 10. TOAST NOTIFICATIONS ---
  const Toast = {
    show(message, iconClass = "fa-solid fa-circle-check") {
      let container = document.querySelector(".toast-container");
      if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
      }

      const toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "alert");
      toast.innerHTML = `
        <div class="toast-icon"><i class="${iconClass}"></i></div>
        <div class="toast-message">${message}</div>
      `;

      container.appendChild(toast);

      // Force reflow for CSS animation
      void toast.offsetWidth;
      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
      }, 3500);
    }
  };

  // --- 11. MODAL DIALOG CONTROLLER ---
  const Modal = {
    init() {
      document.addEventListener("click", (e) => {
        // Open trigger
        const trigger = e.target.closest("[data-modal-open]");
        if (trigger) {
          e.preventDefault();
          const modalId = trigger.getAttribute("data-modal-open");
          if (modalId) this.open(modalId);
        }

        // Close trigger (supports explicit modal ID in data-modal-close or parent container lookup)
        const closeBtn = e.target.closest("[data-modal-close], .modal-close-btn");
        if (closeBtn) {
          e.preventDefault();
          const targetId = closeBtn.getAttribute("data-modal-close");
          if (targetId && targetId.trim() !== "" && targetId !== "true") {
            this.close(targetId.trim());
          } else {
            const modal = closeBtn.closest(".modal-overlay, .modal-backdrop, .modal, .search-overlay, [role='dialog'], [aria-modal='true']");
            if (modal && modal.id) this.close(modal.id);
          }
        }
      });

      // Close on backdrop click
      document.addEventListener("click", (e) => {
        const overlay = e.target.closest(".modal-overlay, .modal-backdrop, .search-overlay");
        if (overlay && e.target === overlay && overlay.id) {
          this.close(overlay.id);
        }
      });

      // Close on Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          const openModals = document.querySelectorAll(".modal-overlay.open, .modal-backdrop.open, .modal.open, .search-overlay.open");
          openModals.forEach(m => {
            if (m.id) this.close(m.id);
          });
        }
      });
    },

    open(modalId) {
      if (!modalId) return;
      const cleanId = modalId.replace(/^#/, "");
      const modal = document.getElementById(cleanId);
      if (!modal) return;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      // Focus first input or close button if present
      setTimeout(() => {
        const focusable = modal.querySelector("input:not([type='hidden']), textarea, select, button:not([disabled])");
        if (focusable) focusable.focus();
      }, 100);
    },

    close(modalId) {
      if (!modalId) return;
      const cleanId = modalId.replace(/^#/, "");
      const modal = document.getElementById(cleanId);
      if (!modal) return;

      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");

      // Check if any other modal is still open
      const remainingOpen = document.querySelectorAll(".modal-overlay.open, .modal-backdrop.open, .modal.open, .search-overlay.open");
      if (!remainingOpen.length) {
        document.body.style.overflow = "";
      }

      // Cleanup any playing video or audio
      modal.querySelectorAll("video").forEach(v => {
        try {
          v.pause();
          v.currentTime = 0;
        } catch (e) {}
      });
      modal.querySelectorAll("audio").forEach(a => {
        try {
          a.pause();
          a.currentTime = 0;
        } catch (e) {}
      });
    }
  };

  // --- 12. HERO CAROUSEL ---
  const HeroCarousel = {
    init() {
      const wrapper = document.querySelector(".hero-carousel");
      if (!wrapper) return;

      const slides = wrapper.querySelectorAll(".carousel-slide");
      const prevBtn = wrapper.querySelector(".carousel-prev");
      const nextBtn = wrapper.querySelector(".carousel-next");
      const indicatorsContainer = wrapper.querySelector(".carousel-indicators");
      const counterEl = wrapper.querySelector(".carousel-counter");

      if (!slides.length) return;

      let currentIndex = 0;
      let intervalId = null;

      // Build indicators
      if (indicatorsContainer) {
        indicatorsContainer.innerHTML = "";
        slides.forEach((_, idx) => {
          const dot = document.createElement("button");
          dot.className = `carousel-dot ${idx === 0 ? "active" : ""}`;
          dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
          dot.addEventListener("click", () => goTo(idx));
          indicatorsContainer.appendChild(dot);
        });
      }

      const updateUI = () => {
        slides.forEach((slide, idx) => {
          slide.classList.toggle("active", idx === currentIndex);
        });

        if (indicatorsContainer) {
          const dots = indicatorsContainer.querySelectorAll(".carousel-dot");
          dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentIndex);
          });
        }

        if (counterEl) {
          counterEl.textContent = `0${currentIndex + 1} / 0${slides.length}`;
        }
      };

      const next = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateUI();
      };

      const prev = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateUI();
      };

      const goTo = (idx) => {
        currentIndex = idx;
        updateUI();
        startAutoPlay();
      };

      const startAutoPlay = () => {
        stopAutoPlay();
        intervalId = setInterval(next, 5000);
      };

      const stopAutoPlay = () => {
        if (intervalId) clearInterval(intervalId);
      };

      if (prevBtn) prevBtn.addEventListener("click", () => { prev(); startAutoPlay(); });
      if (nextBtn) nextBtn.addEventListener("click", () => { next(); startAutoPlay(); });

      wrapper.addEventListener("mouseenter", stopAutoPlay);
      wrapper.addEventListener("mouseleave", startAutoPlay);

      // Touch / Swipe support
      let touchStartX = 0;
      let touchEndX = 0;
      wrapper.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      wrapper.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
          next();
          startAutoPlay();
        } else if (touchEndX - touchStartX > 50) {
          prev();
          startAutoPlay();
        }
      }, { passive: true });

      updateUI();
      startAutoPlay();
    }
  };

  // --- 13. PRODUCTS CATALOG ENGINE ---
  const ProductsCatalog = {
    init() {
      const grid = document.getElementById("products-grid");
      if (!grid || typeof window.PRODUCTS_DATA === "undefined") return;

      const searchInput = document.getElementById("product-search");
      const categoryChips = document.querySelectorAll("[data-product-filter]");
      const sortSelect = document.getElementById("product-sort");
      const countEl = document.getElementById("product-count");
      const clearBtn = document.getElementById("clear-product-filters");

      let currentCategory = "all";
      let currentQuery = "";
      let currentSort = "featured";

      const openQuickView = (prod) => {
        const qvTitle = document.getElementById("qv-title");
        const qvImage = document.getElementById("qv-image");
        const qvCategory = document.getElementById("qv-category");
        const qvPrice = document.getElementById("qv-price");
        const qvRating = document.getElementById("qv-rating");
        const qvDescription = document.getElementById("qv-description");
        const qvAddBtn = document.getElementById("qv-add-btn");

        if (qvTitle) qvTitle.textContent = prod.name;
        if (qvImage) {
          qvImage.src = prod.image;
          qvImage.alt = prod.name;
        }
        if (qvCategory) qvCategory.textContent = `${prod.category.toUpperCase()} • ${prod.petType.toUpperCase()}`;
        if (qvPrice) qvPrice.textContent = `Rs. ${prod.price.toLocaleString()}`;
        if (qvRating) qvRating.innerHTML = `★★★★★ <span style="color: var(--text-primary); font-weight: 700;">${prod.rating}</span> <span style="color: var(--text-muted);">(${prod.reviewsCount} reviews)</span>`;
        if (qvDescription) {
          let featHtml = "";
          if (prod.features && Array.isArray(prod.features)) {
            featHtml = `<ul style="margin: 10px 0 0 16px; padding: 0; font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5;">${prod.features.map(f => `<li>${f}</li>`).join("")}</ul>`;
          }
          qvDescription.innerHTML = `${prod.description}${featHtml}`;
        }
        if (qvAddBtn) {
          qvAddBtn.onclick = () => {
            Modal.close("quickview-modal");
            Toast.show(`"${prod.name}" added to demonstration cart. (Checkout is demo-only per SRS).`, "fa-solid fa-bag-shopping");
          };
        }

        Modal.open("quickview-modal");
      };

      const render = () => {
        let items = [...window.PRODUCTS_DATA];

        // Filter Category
        if (currentCategory !== "all") {
          items = items.filter(p => p.category === currentCategory);
        }

        // Filter Search
        if (currentQuery) {
          const q = currentQuery.toLowerCase();
          items = items.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            (p.features && p.features.some(f => f.toLowerCase().includes(q)))
          );
        }

        // Sort
        if (currentSort === "price-low") {
          items.sort((a, b) => a.price - b.price);
        } else if (currentSort === "price-high") {
          items.sort((a, b) => b.price - a.price);
        } else if (currentSort === "rating") {
          items.sort((a, b) => b.rating - a.rating);
        } else if (currentSort === "name-asc" || currentSort === "name") {
          items.sort((a, b) => a.name.localeCompare(b.name));
        } else if (currentSort === "name-desc") {
          items.sort((a, b) => b.name.localeCompare(a.name));
        }

        if (countEl) countEl.textContent = `${items.length} Product${items.length === 1 ? "" : "s"}`;

        if (!items.length) {
          grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 64px 20px;" class="card">
              <i class="fa-solid fa-basket-shopping" style="font-size: 3rem; color: var(--primary-400); margin-bottom: 16px;"></i>
              <h3 class="heading-md">No products found.</h3>
              <p class="body-lead" style="margin-top: 8px; font-size: 0.95rem;">Try adjusting your keywords or clearing the category filter.</p>
              <button class="btn btn-secondary btn-sm" id="reset-filter-btn" style="margin-top: 18px;">Reset All Filters</button>
            </div>
          `;
          const resetBtn = document.getElementById("reset-filter-btn");
          if (resetBtn) resetBtn.addEventListener("click", resetFilters);
          return;
        }

        grid.innerHTML = items.map(prod => `
          <div class="product-card" data-product-id="${prod.id}" style="cursor: pointer;">
            <div class="card-img-wrapper">
              <img src="${prod.image}" alt="${prod.name}" class="card-img" loading="lazy" />
              ${prod.badge ? `<span class="card-badge">${prod.badge}</span>` : ""}
            </div>
            <div class="card-body">
              <div class="card-tags">
                <span class="tag"><i class="fa-solid fa-paw"></i> ${prod.petType.toUpperCase()}</span>
                <span class="tag">${prod.category.toUpperCase()}</span>
              </div>
              <h3 class="heading-sm" style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 1.05rem;">${prod.name}</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">${prod.description}</p>
              <div style="display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--accent-amber);">
                <i class="fa-solid fa-star"></i>
                <span style="font-weight: 700; color: var(--text-primary);">${prod.rating}</span>
                <span style="color: var(--text-muted);">(${prod.reviewsCount} reviews)</span>
              </div>
              <div class="price-row" style="margin-top: auto; padding-top: 12px; border-top: 1px solid var(--border-light); display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <span class="current-price" style="font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 800; color: var(--primary-600);">Rs. ${prod.price.toLocaleString()}</span>
                  ${prod.originalPrice ? `<span class="original-price" style="font-size: 0.85rem; color: var(--text-muted); text-decoration: line-through; margin-left: 6px;">Rs. ${prod.originalPrice.toLocaleString()}</span>` : ""}
                </div>
                <button class="btn btn-primary btn-sm buy-now-btn" style="margin-left: auto;" data-name="${prod.name}">
                  <i class="fa-solid fa-bag-shopping"></i> Buy Now
                </button>
              </div>
            </div>
          </div>
        `).join("");

        // Attach clicks for QuickView and Buy Now
        grid.querySelectorAll(".product-card").forEach(card => {
          card.addEventListener("click", (e) => {
            if (e.target.closest(".buy-now-btn")) return;
            const pid = card.dataset.productId;
            const p = window.PRODUCTS_DATA.find(x => x.id === pid);
            if (p) openQuickView(p);
          });
        });

        // Attach non-functional Buy Now notice
        grid.querySelectorAll(".buy-now-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const prodName = btn.dataset.name;
            Toast.show(`"${prodName}" added to demonstration preview cart. (Checkout is demo-only per SRS).`, "fa-solid fa-bag-shopping");
          });
        });
      };

      const resetFilters = () => {
        currentCategory = "all";
        currentQuery = "";
        currentSort = "featured";
        if (searchInput) searchInput.value = "";
        if (sortSelect) sortSelect.value = "featured";
        categoryChips.forEach(chip => {
          chip.classList.toggle("active", chip.dataset.productFilter === "all");
        });
        render();
      };

      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          currentQuery = e.target.value.trim();
          render();
        });
      }

      if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
          currentSort = e.target.value;
          render();
        });
      }

      categoryChips.forEach(chip => {
        chip.addEventListener("click", () => {
          categoryChips.forEach(c => c.classList.remove("active"));
          chip.classList.add("active");
          currentCategory = chip.dataset.productFilter;
          render();
        });
      });

      if (clearBtn) clearBtn.addEventListener("click", resetFilters);

      render();
    }
  };

  // --- 14. ADOPTABLE PETS ENGINE ---
  const AdoptablePets = {
    init() {
      const grid = document.getElementById("pets-grid");
      if (!grid || typeof window.PETS_DATA === "undefined") return;

      const searchInput = document.getElementById("pet-search");
      const speciesChips = document.querySelectorAll("[data-pet-species]");
      const countEl = document.getElementById("pet-count");

      let currentSpecies = "all";
      let currentQuery = "";

      const render = () => {
        let items = [...window.PETS_DATA];

        if (currentSpecies !== "all") {
          items = items.filter(p => p.species === currentSpecies);
        }

        if (currentQuery) {
          const q = currentQuery.toLowerCase();
          items = items.filter(p => 
            p.name.toLowerCase().includes(q) ||
            p.breed.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q)
          );
        }

        if (countEl) countEl.textContent = `${items.length} Pet${items.length === 1 ? "" : "s"} Available`;

        if (!items.length) {
          grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 64px 20px;" class="card">
              <i class="fa-solid fa-shield-heart" style="font-size: 3rem; color: var(--primary-400); margin-bottom: 16px;"></i>
              <h3 class="heading-md">No pets found matching criteria</h3>
              <p class="body-lead" style="margin-top: 8px; font-size: 0.95rem;">Try selecting a different species or removing search filters.</p>
            </div>
          `;
          return;
        }

        grid.innerHTML = items.map(pet => `
          <div class="pet-card">
            <div class="card-img-wrapper">
              <img src="${pet.image}" alt="${pet.name}" class="card-img" loading="lazy" />
              <span class="card-badge" style="background-color: var(--primary-500); color: #FFFFFF;">
                <i class="fa-solid fa-heart"></i> ${pet.status}
              </span>
            </div>
            <div class="card-body">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <h3 class="heading-md">${pet.name}</h3>
                <span style="font-size: 0.85rem; font-weight: 600; color: var(--primary-500);">${pet.age}</span>
              </div>
              <p style="font-size: 0.88rem; color: var(--text-muted); font-weight: 500;">
                <i class="fa-solid fa-dna"></i> ${pet.breed}
              </p>
              <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">${pet.story}</p>
              <div class="card-tags">
                ${pet.traits.map(t => `<span class="tag">${t}</span>`).join("")}
              </div>
              <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border-light); display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                <span style="font-size: 0.8rem; color: var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${pet.location.split(',')[0]}</span>
                <button class="btn btn-primary btn-sm adopt-inquiry-btn" data-name="${pet.name}">
                  <i class="fa-solid fa-heart"></i> Inquire
                </button>
              </div>
            </div>
          </div>
        `).join("");

        grid.querySelectorAll(".adopt-inquiry-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const petName = btn.dataset.name;
            Toast.show(`Adoption interest recorded for ${petName}! Shelter team notified.`, "fa-solid fa-shield-heart");
          });
        });
      };

      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          currentQuery = e.target.value.trim();
          render();
        });
      }

      speciesChips.forEach(chip => {
        chip.addEventListener("click", () => {
          speciesChips.forEach(c => c.classList.remove("active"));
          chip.classList.add("active");
          currentSpecies = chip.dataset.petSpecies;
          render();
        });
      });

      render();
    }
  };

  // --- 15. INTERACTIVE FORMS (Pet Profile, Feedback, Contact) ---
  const FormsHandler = {
    init() {
      this.initPetProfileForm();
      this.initFeedbackForm();
      this.initContactForm();
    },

    initPetProfileForm() {
      const form = document.getElementById("pet-profile-form");
      const previewCard = document.getElementById("pet-profile-live-preview");
      if (!form) return;

      const nameInput = document.getElementById("profile-pet-name");
      const speciesSelect = document.getElementById("profile-pet-species");
      const breedInput = document.getElementById("profile-pet-breed");
      const ageInput = document.getElementById("profile-pet-age");
      const genderSelect = document.getElementById("profile-pet-gender");
      const weightInput = document.getElementById("profile-pet-weight");
      const photoInput = document.getElementById("profile-pet-photo-url");
      const vaccineInput = document.getElementById("profile-pet-vaccines");
      const healthInput = document.getElementById("profile-pet-health");
      const notesInput = document.getElementById("profile-pet-notes");

      const updatePreview = () => {
        if (!previewCard) return;
        const nameVal = nameInput ? nameInput.value.trim() || "Your Pet's Name" : "Your Pet's Name";
        const speciesVal = speciesSelect ? speciesSelect.value || "Dog" : "Dog";
        const breedVal = breedInput ? breedInput.value.trim() || "Golden Retriever Mix" : "Golden Retriever Mix";
        const ageVal = ageInput ? ageInput.value.trim() || "2.5 Years" : "2.5 Years";
        const weightVal = weightInput ? weightInput.value.trim() || "45 lbs" : "45 lbs";
        const photoVal = photoInput && photoInput.value.trim() ? photoInput.value.trim() : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80";

        const pName = previewCard.querySelector(".preview-name");
        const pBreed = previewCard.querySelector(".preview-breed");
        const pAge = previewCard.querySelector(".preview-age");
        const pWeight = previewCard.querySelector(".preview-weight");
        const pImg = previewCard.querySelector(".preview-img");

        if (pName) pName.textContent = nameVal;
        if (pBreed) pBreed.textContent = `${speciesVal} • ${breedVal}`;
        if (pAge) pAge.textContent = ageVal;
        if (pWeight) pWeight.textContent = weightVal;
        if (pImg) pImg.src = photoVal;
      };

      [nameInput, speciesSelect, breedInput, ageInput, genderSelect, weightInput, photoInput, vaccineInput, healthInput, notesInput].forEach(el => {
        if (el) el.addEventListener("input", updatePreview);
      });

      // Load existing saved pet profile if available
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.SAVED_PET);
        if (saved) {
          const data = JSON.parse(saved);
          if (nameInput && data.name) nameInput.value = data.name;
          if (speciesSelect && data.species) speciesSelect.value = data.species;
          if (breedInput && data.breed) breedInput.value = data.breed;
          if (ageInput && data.age) ageInput.value = data.age;
          if (genderSelect && data.gender) genderSelect.value = data.gender;
          if (weightInput && data.weight) weightInput.value = data.weight;
          if (photoInput && data.photo) photoInput.value = data.photo;
          if (vaccineInput && data.vaccinationStatus) vaccineInput.value = data.vaccinationStatus;
          if (healthInput && data.healthInfo) healthInput.value = data.healthInfo;
          if (notesInput && data.notes) notesInput.value = data.notes;
          updatePreview();
        }
      } catch (e) {
        console.warn("Could not load saved pet profile", e);
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const petObj = {
          name: nameInput ? nameInput.value.trim() : "",
          species: speciesSelect ? speciesSelect.value : "Dog",
          breed: breedInput ? breedInput.value.trim() : "Mixed Breed",
          age: ageInput ? ageInput.value.trim() : "2 Years",
          gender: genderSelect ? genderSelect.value : "Unknown",
          weight: weightInput ? weightInput.value.trim() : "25 lbs",
          vaccinationStatus: vaccineInput ? vaccineInput.value.trim() : "Verified Current",
          healthInfo: healthInput ? healthInput.value.trim() : "Standard wellness diet.",
          notes: notesInput ? notesInput.value.trim() : "Loving companion.",
          photo: photoInput ? photoInput.value.trim() : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80"
        };

        if (!petObj.name) {
          Toast.show("Please enter your pet's name to personalize the passport.", "fa-solid fa-circle-exclamation");
          if (nameInput) nameInput.focus();
          return;
        }

        Personalization.savePet(petObj);
        Toast.show(`Pet Profile for "${petObj.name}" saved! Dashboard updated.`, "fa-solid fa-shield-cat");
        
        // Update live preview immediately
        updatePreview();

        const successNotice = document.getElementById("profile-save-success-msg");
        if (successNotice) {
          successNotice.style.display = "block";
          successNotice.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    },

    initFeedbackForm() {
      const form = document.getElementById("feedback-form");
      if (!form) return;

      const starButtons = form.querySelectorAll(".rating-star-btn");
      const charCounter = document.getElementById("feedback-char-count");
      const feedbackText = document.getElementById("feedback-text");
      let currentRating = 5;

      starButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          currentRating = parseInt(btn.dataset.star, 10);
          starButtons.forEach((s, idx) => {
            const icon = s.querySelector("i");
            if (idx < currentRating) {
              icon.className = "fa-solid fa-star";
              s.style.color = "var(--accent-amber)";
            } else {
              icon.className = "fa-regular fa-star";
              s.style.color = "var(--border-medium)";
            }
          });
        });
      });

      if (feedbackText && charCounter) {
        feedbackText.addEventListener("input", () => {
          const len = feedbackText.value.length;
          charCounter.textContent = `${len} / 500`;
          if (len > 450) charCounter.style.color = "var(--accent-peach)";
          else charCounter.style.color = "var(--text-muted)";
        });
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("feedback-name")?.value || "";
        Toast.show(`Thank you, ${name || "friend"}! Your feedback has been received.`, "fa-solid fa-heart");
        form.reset();
        if (charCounter) charCounter.textContent = "0 / 500";
      });
    },

    initContactForm() {
      const form = document.getElementById("contact-form");
      if (!form) return;

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("contact-name")?.value || "";
        Toast.show(`Message received, ${name || "friend"}. Our care support team will follow up within 24 hours.`, "fa-solid fa-envelope-circle-check");
        form.reset();
      });
    }
  };

  // --- 16. ACCORDION & TABS CONTROLLER ---
  const TabsAndAccordions = {
    init() {
      // Tab switcher
      document.querySelectorAll("[data-tab-group]").forEach(group => {
        const triggers = group.querySelectorAll("[data-tab-target]");
        triggers.forEach(trigger => {
          trigger.addEventListener("click", () => {
            const targetId = trigger.getAttribute("data-tab-target");
            triggers.forEach(t => t.classList.remove("active"));
            trigger.classList.add("active");

            const contentPanels = document.querySelectorAll(`[data-tab-content-group="${group.getAttribute('data-tab-group')}"]`);
            contentPanels.forEach(panel => {
              panel.style.display = panel.id === targetId ? "block" : "none";
            });
          });
        });
      });

      // Accordion collapsible
      document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", () => {
          const parent = header.closest(".accordion-item");
          if (!parent) return;
          const isOpen = parent.classList.contains("active");
          
          const container = parent.closest(".accordion-container");
          if (container) {
            container.querySelectorAll(".accordion-item").forEach(item => item.classList.remove("active"));
          }

          if (!isOpen) parent.classList.add("active");
        });
      });
    }
  };

  // --- 17. GROOMING VIDEO PLAYER ENGINE ---
  const GroomingVideoPlayer = {
    currentIndex: 0,
    currentPlaylist: [],

    formatTime(seconds) {
      if (isNaN(seconds) || seconds < 0) return "0:00";
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s < 10 ? "0" : ""}${s}`;
    },

    getCompletedVideos() {
      try {
        return JSON.parse(localStorage.getItem("furever_completed_videos") || "[]");
      } catch (e) {
        return [];
      }
    },

    markVideoCompleted(videoId) {
      const completed = this.getCompletedVideos();
      if (!completed.includes(videoId)) {
        completed.push(videoId);
        localStorage.setItem("furever_completed_videos", JSON.stringify(completed));
      }
    },

    init() {
      const grid = document.getElementById("grooming-video-grid");
      const searchInput = document.getElementById("video-search");
      const filterChips = document.querySelectorAll("[data-grooming-filter]");
      const countEl = document.getElementById("grooming-count");

      const modal = document.getElementById("video-modal");
      const videoEl = document.getElementById("modal-html5-video");
      const videoSource = document.getElementById("modal-video-source");
      const centerPlayBtn = document.getElementById("modal-video-center-play-btn");
      const modalTitle = document.getElementById("modal-video-title");
      const modalInstructor = document.getElementById("modal-video-instructor");
      const modalDesc = document.getElementById("modal-video-desc");
      const modalCategory = document.getElementById("modal-video-category-tag");
      const modalDifficulty = document.getElementById("modal-video-difficulty");
      const modalDurationBadge = document.getElementById("modal-video-duration-badge");
      const modalWatchedBadge = document.getElementById("modal-watched-badge");
      const modalSteps = document.getElementById("modal-video-steps");
      const modalTip = document.getElementById("modal-video-tip");

      // Custom Control Elements
      const playPauseBtn = document.getElementById("vctrl-play-pause-btn");
      const rewindBtn = document.getElementById("vctrl-rewind-btn");
      const forwardBtn = document.getElementById("vctrl-forward-btn");
      const currentTimeText = document.getElementById("vctrl-current-time");
      const durationTimeText = document.getElementById("vctrl-duration-time");
      const seekSlider = document.getElementById("vctrl-seek-slider");
      const muteBtn = document.getElementById("vctrl-mute-btn");
      const volumeSlider = document.getElementById("vctrl-volume-slider");
      const speedSelect = document.getElementById("vctrl-speed-select");
      const pipBtn = document.getElementById("vctrl-pip-btn");
      const fullscreenBtn = document.getElementById("vctrl-fullscreen-btn");
      const prevVideoBtn = document.getElementById("modal-prev-video-btn");
      const nextVideoBtn = document.getElementById("modal-next-video-btn");
      const markWatchedBtn = document.getElementById("modal-mark-watched-btn");

      let currentCategory = "all";
      let currentQuery = "";
      let isSeeking = false;

      const updateCenterAndPlayControls = (isPlaying) => {
        if (centerPlayBtn) {
          centerPlayBtn.classList.toggle("playing", isPlaying);
          centerPlayBtn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play" style="margin-left: 4px;"></i>';
        }
        if (playPauseBtn) {
          playPauseBtn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
        }
      };

      const syncPlaylistItem = (index) => {
        const list = this.currentPlaylist.length > 0 ? this.currentPlaylist : (window.GROOMING_VIDEOS_DATA || []);
        if (!list || list.length === 0) return;
        if (index < 0) index = 0;
        if (index >= list.length) index = list.length - 1;
        this.currentIndex = index;
        playVideoItem(list[index]);
      };

      const playVideoItem = (video) => {
        if (!video) return;

        // Set playlist context
        const allList = window.GROOMING_VIDEOS_DATA || [];
        const foundIdx = allList.findIndex(x => x.id === video.id);
        if (foundIdx !== -1) {
          this.currentIndex = foundIdx;
        }

        if (modalTitle) modalTitle.textContent = video.title;
        if (modalInstructor) modalInstructor.textContent = `Instructor: ${video.instructor}`;
        if (modalDesc) modalDesc.textContent = video.description;
        if (modalCategory) modalCategory.textContent = video.categoryLabel || video.category;
        if (modalDifficulty) modalDifficulty.innerHTML = `<i class="fa-solid fa-gauge-high"></i> ${video.difficulty}`;
        if (modalDurationBadge) modalDurationBadge.textContent = `${video.duration} • HD`;
        if (modalTip) modalTip.textContent = ` ${video.techniqueTip || "Practice positive reinforcement with high-value treats and keep sessions calm and comfortable."}`;

        const completedList = this.getCompletedVideos();
        const isCompleted = completedList.includes(video.id);
        if (modalWatchedBadge) {
          modalWatchedBadge.style.display = isCompleted ? "inline-flex" : "none";
        }
        if (markWatchedBtn) {
          markWatchedBtn.innerHTML = isCompleted 
            ? '<i class="fa-solid fa-check-double"></i> Completed' 
            : '<i class="fa-solid fa-check"></i> Mark Lesson Completed';
          markWatchedBtn.classList.toggle("btn-secondary", isCompleted);
          markWatchedBtn.classList.toggle("btn-primary", !isCompleted);
        }

        if (modalSteps && video.steps && Array.isArray(video.steps)) {
          modalSteps.innerHTML = video.steps.map(s => `<li>${s}</li>`).join("");
        }

        if (videoEl) {
          videoEl.poster = video.thumbnail || "";
          
          // Reset controls and time
          if (seekSlider) seekSlider.value = 0;
          if (currentTimeText) currentTimeText.textContent = "0:00";
          if (durationTimeText) durationTimeText.textContent = video.duration || "8:45";

          // Robust source attachment
          if (videoSource) {
            videoSource.src = video.videoUrl;
          }
          videoEl.src = video.videoUrl;
          videoEl.load();

          // Attempt playback with fallback
          const playPromise = videoEl.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                updateCenterAndPlayControls(true);
              })
              .catch(() => {
                // If autoplay with sound is blocked by browser policy, keep ready in paused state
                updateCenterAndPlayControls(false);
              });
          }
        }

        Modal.open("video-modal");
      };

      // Video element event listeners
      if (videoEl) {
        videoEl.addEventListener("play", () => updateCenterAndPlayControls(true));
        videoEl.addEventListener("pause", () => updateCenterAndPlayControls(false));
        
        videoEl.addEventListener("timeupdate", () => {
          if (!isSeeking && videoEl.duration) {
            const pct = (videoEl.currentTime / videoEl.duration) * 100;
            if (seekSlider) seekSlider.value = pct;
            if (currentTimeText) currentTimeText.textContent = GroomingVideoPlayer.formatTime(videoEl.currentTime);
          }
        });

        videoEl.addEventListener("loadedmetadata", () => {
          if (durationTimeText && videoEl.duration) {
            durationTimeText.textContent = GroomingVideoPlayer.formatTime(videoEl.duration);
          }
        });

        videoEl.addEventListener("ended", () => {
          updateCenterAndPlayControls(false);
          // Auto-mark completed when finished
          const currentVideo = (window.GROOMING_VIDEOS_DATA || [])[GroomingVideoPlayer.currentIndex];
          if (currentVideo) {
            GroomingVideoPlayer.markVideoCompleted(currentVideo.id);
            if (modalWatchedBadge) modalWatchedBadge.style.display = "inline-flex";
            if (typeof Toast !== "undefined" && Toast.show) {
              Toast.show(`Great job! You completed "${currentVideo.title}".`, "success");
            }
          }
        });

        // Video playback error handling
        videoEl.addEventListener("error", (e) => {
          console.warn("Video playback event notice:", e);
          updateCenterAndPlayControls(false);
        });
      }

      // Center play/pause click
      if (centerPlayBtn && videoEl) {
        centerPlayBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (videoEl.paused) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      }

      // Custom Play / Pause control
      if (playPauseBtn && videoEl) {
        playPauseBtn.addEventListener("click", () => {
          if (videoEl.paused) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      }

      // Rewind & Forward 10s
      if (rewindBtn && videoEl) {
        rewindBtn.addEventListener("click", () => {
          videoEl.currentTime = Math.max(0, videoEl.currentTime - 10);
        });
      }
      if (forwardBtn && videoEl) {
        forwardBtn.addEventListener("click", () => {
          videoEl.currentTime = Math.min(videoEl.duration || 1000, videoEl.currentTime + 10);
        });
      }

      // Seek Slider
      if (seekSlider && videoEl) {
        seekSlider.addEventListener("mousedown", () => { isSeeking = true; });
        seekSlider.addEventListener("touchstart", () => { isSeeking = true; }, { passive: true });
        
        seekSlider.addEventListener("input", () => {
          if (videoEl.duration) {
            const targetTime = (seekSlider.value / 100) * videoEl.duration;
            if (currentTimeText) currentTimeText.textContent = GroomingVideoPlayer.formatTime(targetTime);
          }
        });

        seekSlider.addEventListener("change", () => {
          if (videoEl.duration) {
            videoEl.currentTime = (seekSlider.value / 100) * videoEl.duration;
          }
          isSeeking = false;
        });
      }

      // Mute / Unmute
      if (muteBtn && videoEl) {
        muteBtn.addEventListener("click", () => {
          videoEl.muted = !videoEl.muted;
          muteBtn.innerHTML = videoEl.muted 
            ? '<i class="fa-solid fa-volume-xmark" style="color: var(--accent-peach);"></i>' 
            : '<i class="fa-solid fa-volume-high"></i>';
          if (volumeSlider) {
            volumeSlider.value = videoEl.muted ? 0 : videoEl.volume;
          }
        });
      }

      // Volume slider
      if (volumeSlider && videoEl) {
        volumeSlider.addEventListener("input", (e) => {
          const val = parseFloat(e.target.value);
          videoEl.volume = val;
          videoEl.muted = val === 0;
          if (muteBtn) {
            muteBtn.innerHTML = val === 0 
              ? '<i class="fa-solid fa-volume-xmark" style="color: var(--accent-peach);"></i>' 
              : '<i class="fa-solid fa-volume-high"></i>';
          }
        });
      }

      // Speed selection
      if (speedSelect && videoEl) {
        speedSelect.addEventListener("change", (e) => {
          videoEl.playbackRate = parseFloat(e.target.value);
        });
      }

      // Picture in picture
      if (pipBtn && videoEl) {
        pipBtn.addEventListener("click", async () => {
          try {
            if (document.pictureInPictureElement) {
              await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
              await videoEl.requestPictureInPicture();
            }
          } catch (e) {
            console.log("Picture-in-picture not supported", e);
          }
        });
      }

      // Fullscreen
      if (fullscreenBtn && videoEl) {
        fullscreenBtn.addEventListener("click", () => {
          const container = document.getElementById("video-player-wrapper") || videoEl;
          if (!document.fullscreenElement) {
            if (container.requestFullscreen) {
              container.requestFullscreen();
            } else if (videoEl.webkitEnterFullscreen) {
              videoEl.webkitEnterFullscreen();
            }
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            }
          }
        });
      }

      // Previous & Next Lesson navigation
      if (prevVideoBtn) {
        prevVideoBtn.addEventListener("click", () => {
          const allList = window.GROOMING_VIDEOS_DATA || [];
          const nextIdx = (GroomingVideoPlayer.currentIndex - 1 + allList.length) % allList.length;
          syncPlaylistItem(nextIdx);
        });
      }
      if (nextVideoBtn) {
        nextVideoBtn.addEventListener("click", () => {
          const allList = window.GROOMING_VIDEOS_DATA || [];
          const nextIdx = (GroomingVideoPlayer.currentIndex + 1) % allList.length;
          syncPlaylistItem(nextIdx);
        });
      }

      // Mark Lesson Completed button
      if (markWatchedBtn) {
        markWatchedBtn.addEventListener("click", () => {
          const allList = window.GROOMING_VIDEOS_DATA || [];
          const currentVideo = allList[GroomingVideoPlayer.currentIndex];
          if (currentVideo) {
            GroomingVideoPlayer.markVideoCompleted(currentVideo.id);
            if (modalWatchedBadge) modalWatchedBadge.style.display = "inline-flex";
            markWatchedBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> Completed';
            markWatchedBtn.classList.remove("btn-primary");
            markWatchedBtn.classList.add("btn-secondary");
            if (typeof Toast !== "undefined" && Toast.show) {
              Toast.show(`Marked "${currentVideo.title}" as completed! 🎉`, "success");
            }
            render(); // Refresh cards to show completion badges
          }
        });
      }

      // Explicit Cancel & Close Button
      const modalCancelBtn = document.getElementById("modal-cancel-btn");
      if (modalCancelBtn) {
        modalCancelBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          Modal.close("video-modal");
        });
      }

      // Keyboard shortcuts when video modal is open
      document.addEventListener("keydown", (e) => {
        const videoModal = document.getElementById("video-modal");
        if (!videoModal || !videoModal.classList.contains("open") || !videoEl) return;

        // Space or K: Play/Pause
        if (e.code === "Space" || e.key.toLowerCase() === "k") {
          e.preventDefault();
          if (videoEl.paused) videoEl.play().catch(() => {});
          else videoEl.pause();
        }
        // F: Fullscreen
        else if (e.key.toLowerCase() === "f") {
          e.preventDefault();
          if (fullscreenBtn) fullscreenBtn.click();
        }
        // M: Mute
        else if (e.key.toLowerCase() === "m") {
          e.preventDefault();
          if (muteBtn) muteBtn.click();
        }
        // Arrow Left: -5s
        else if (e.key === "ArrowLeft") {
          e.preventDefault();
          videoEl.currentTime = Math.max(0, videoEl.currentTime - 5);
        }
        // Arrow Right: +5s
        else if (e.key === "ArrowRight") {
          e.preventDefault();
          videoEl.currentTime = Math.min(videoEl.duration || 1000, videoEl.currentTime + 5);
        }
        // Arrow Up: Volume +10%
        else if (e.key === "ArrowUp") {
          e.preventDefault();
          videoEl.volume = Math.min(1, videoEl.volume + 0.1);
          if (volumeSlider) volumeSlider.value = videoEl.volume;
        }
        // Arrow Down: Volume -10%
        else if (e.key === "ArrowDown") {
          e.preventDefault();
          videoEl.volume = Math.max(0, videoEl.volume - 0.1);
          if (volumeSlider) volumeSlider.value = videoEl.volume;
        }
      });

      const render = () => {
        if (!grid || typeof window.GROOMING_VIDEOS_DATA === "undefined") return;

        let items = [...window.GROOMING_VIDEOS_DATA];
        const completedVideos = this.getCompletedVideos();

        if (currentCategory !== "all") {
          items = items.filter(v => v.category === currentCategory);
        }

        if (currentQuery) {
          const q = currentQuery.toLowerCase();
          items = items.filter(v =>
            v.title.toLowerCase().includes(q) ||
            v.description.toLowerCase().includes(q) ||
            v.instructor.toLowerCase().includes(q) ||
            (v.categoryLabel && v.categoryLabel.toLowerCase().includes(q))
          );
        }

        this.currentPlaylist = items;

        if (countEl) {
          countEl.textContent = `${items.length} Lesson${items.length === 1 ? "" : "s"}`;
        }

        if (!items.length) {
          grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 64px 20px;" class="card">
              <i class="fa-solid fa-film" style="font-size: 3rem; color: var(--primary-400); margin-bottom: 16px;"></i>
              <h3 class="heading-md">No grooming tutorials found</h3>
              <p class="body-lead" style="margin-top: 8px; font-size: 0.95rem;">Try clearing your search keyword or selecting "All Lessons".</p>
              <button class="btn btn-secondary btn-sm" id="reset-video-filters-btn" style="margin-top: 18px;">Reset Video Filters</button>
            </div>
          `;
          const resetBtn = document.getElementById("reset-video-filters-btn");
          if (resetBtn) {
            resetBtn.addEventListener("click", () => {
              currentCategory = "all";
              currentQuery = "";
              if (searchInput) searchInput.value = "";
              filterChips.forEach(c => c.classList.toggle("active", c.dataset.groomingFilter === "all"));
              render();
            });
          }
          return;
        }

        grid.innerHTML = items.map((v, idx) => {
          const isDone = completedVideos.includes(v.id);
          return `
          <div class="video-card card hover-lift" data-video-id="${v.id}" data-index="${idx}" style="cursor: pointer; display: flex; flex-direction: column; height: 100%; border-radius: var(--radius-md); overflow: hidden; background: var(--bg-card); border: 1px solid var(--border-light); transition: all var(--transition-normal);">
            <div class="card-img-wrapper" style="position: relative; aspect-ratio: 16/9; overflow: hidden; background-color: transparent;">
              <img src="${v.thumbnail}" alt="${v.title}" class="card-img" style="width: 100%; height: 100%; object-fit: cover; filter: none !important; opacity: 1 !important; transition: transform var(--transition-slow);" loading="lazy" referrerpolicy="no-referrer" />
              <div class="video-play-overlay" style="position: absolute; inset: 0; background: transparent; backdrop-filter: none; -webkit-backdrop-filter: none; display: flex; align-items: center; justify-content: center;">
                <button class="video-play-btn" aria-label="Play ${v.title}" style="width: 48px; height: 48px; border-radius: var(--radius-full); background: var(--primary-500); color: #FFFFFF; border: 2px solid #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.25);">
                  <i class="fa-solid fa-play" style="margin-left: 3px;"></i>
                </button>
              </div>
              <span class="video-duration-badge" style="position: absolute; bottom: 10px; right: 10px; background: rgba(15, 23, 20, 0.85); color: #FFFFFF; font-size: 0.75rem; padding: 3px 8px; border-radius: 4px; font-weight: 600; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
                <i class="fa-regular fa-clock"></i> ${v.duration}
              </span>
              <span class="tag" style="position: absolute; top: 10px; left: 10px; background: #FFFFFF; color: var(--primary-800); font-weight: 700; font-size: 0.75rem; padding: 4px 10px; border-radius: var(--radius-xs); box-shadow: 0 2px 8px rgba(0,0,0,0.12); border: none;">
                ${v.categoryLabel || v.category}
              </span>
              ${isDone ? `
              <span style="position: absolute; top: 10px; right: 10px; background: #16A34A; color: #FFFFFF; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: var(--radius-xs); box-shadow: 0 2px 6px rgba(0,0,0,0.2); display: inline-flex; align-items: center; gap: 4px;">
                <i class="fa-solid fa-check"></i> Completed
              </span>` : ""}
            </div>
            <div class="card-body" style="padding: 20px; display: flex; flex-direction: column; flex-grow: 1;">
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 6px; font-weight: 600;">
                <i class="fa-solid fa-user-tie" style="color: var(--primary-500);"></i> ${v.instructor}
              </div>
              <h3 class="heading-sm" style="font-size: 1.05rem; line-height: 1.35; margin-bottom: 8px; color: var(--text-primary); font-family: 'Plus Jakarta Sans', sans-serif;">
                ${v.title}
              </h3>
              <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px; flex-grow: 1;">
                ${v.description}
              </p>
              <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-light); padding-top: 12px; margin-top: auto;">
                <span style="font-size: 0.78rem; color: var(--text-muted);">
                  <i class="fa-solid fa-gauge-high"></i> ${v.difficulty}
                </span>
                <button class="btn ${isDone ? "btn-secondary" : "btn-primary"} btn-sm play-lesson-btn" data-video-id="${v.id}">
                  <i class="fa-solid fa-circle-play"></i> Watch Lesson
                </button>
              </div>
            </div>
          </div>
        `;
        }).join("");

        // Wire up clicks on card and buttons
        grid.querySelectorAll(".video-card").forEach(card => {
          card.addEventListener("click", () => {
            const vidId = card.dataset.videoId;
            const item = window.GROOMING_VIDEOS_DATA.find(x => x.id === vidId);
            if (item) playVideoItem(item);
          });
        });
      };

      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          currentQuery = e.target.value.trim();
          render();
        });
      }

      filterChips.forEach(chip => {
        chip.addEventListener("click", () => {
          filterChips.forEach(c => c.classList.remove("active"));
          chip.classList.add("active");
          currentCategory = chip.dataset.groomingFilter;
          render();
        });
      });

      // Also support standalone trigger buttons from other pages
      document.querySelectorAll(".play-video-trigger").forEach(btn => {
        btn.addEventListener("click", () => {
          const videoId = btn.dataset.videoId;
          let videoItem = null;
          if (videoId && typeof window.GROOMING_VIDEOS_DATA !== "undefined") {
            videoItem = window.GROOMING_VIDEOS_DATA.find(v => v.id === videoId);
          }
          if (!videoItem) {
            videoItem = {
              title: btn.dataset.videoTitle || "Grooming Masterclass",
              description: btn.dataset.videoDesc || "Step-by-step professional grooming guidance for calm, healthy coats.",
              categoryLabel: btn.dataset.videoCategory || "Coat & Hygiene",
              instructor: btn.dataset.videoInstructor || "Dr. Areeba Khan",
              duration: btn.dataset.videoDuration || "8:45 mins",
              difficulty: "All Coat Types",
              thumbnail: btn.dataset.videoPoster || "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
              videoUrl: btn.dataset.videoSrc || "assets/videos/grooming-brushing.mp4",
              steps: [
                "Inspect coat for hotspots or tangles before wetting.",
                "Use lukewarm water and gentle tearless pet shampoo.",
                "Brush following the natural growth of the fur.",
                "Reward frequently with high-value healthy treats."
              ],
              techniqueTip: "Always praise calm behavior and stop immediately if your pet exhibits stress signals."
            };
          }
          playVideoItem(videoItem);
        });
      });

      render();
    }
  };

  // --- 18. AUDIO EDUCATIONAL & SPEECH ENGINE (Health & Training Tips) ---
  const AudioEducationalPlayer = {
    activeSynth: null,
    isPlaying: false,

    init() {
      this.initHealthAudioCards();
      this.initTrainingStepAudio();
      this.initGenericAudioButtons();
      this.initTranscriptToggles();
    },

    initGenericAudioButtons() {
      const audioButtons = document.querySelectorAll(".play-audio-btn");
      audioButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          const title = btn.getAttribute("data-audio-title") || "Educational Audio";
          const textToSpeak = btn.getAttribute("data-audio-text") || "Welcome to FurEver Care educational audio lesson.";

          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.rate = 0.95;
            utterance.pitch = 1.0;

            const originalHtml = btn.innerHTML;
            btn.innerHTML = `<i class="fa-solid fa-circle-stop" style="color: #EF4444;"></i> <span>Stop Audio</span>`;

            utterance.onend = () => {
              btn.innerHTML = originalHtml;
              Toast.show(`Finished playing: ${title}`, "fa-solid fa-circle-check");
            };

            utterance.onerror = () => {
              btn.innerHTML = originalHtml;
            };

            window.speechSynthesis.speak(utterance);
            Toast.show(`Playing audio guide: "${title}"`, "fa-solid fa-volume-high");

            // Allow stopping by clicking again
            const stopHandler = (e) => {
              if (btn.innerHTML.includes("Stop Audio")) {
                window.speechSynthesis.cancel();
                btn.innerHTML = originalHtml;
                Toast.show("Audio playback stopped.", "fa-solid fa-pause");
                btn.removeEventListener("click", stopHandler);
              }
            };
            btn.addEventListener("click", stopHandler, { once: true });
          } else {
            Toast.show(`Playing: ${title}`, "fa-solid fa-headphones");
          }
        });
      });
    },

    initTranscriptToggles() {
      const toggleButtons = document.querySelectorAll(".toggle-transcript-btn");
      toggleButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          const targetId = btn.getAttribute("data-target");
          if (!targetId) return;
          const targetEl = document.getElementById(targetId);
          if (!targetEl) return;

          const isHidden = targetEl.style.display === "none" || !targetEl.style.display;
          targetEl.style.display = isHidden ? "block" : "none";
          btn.classList.toggle("active", isHidden);
          btn.innerHTML = isHidden
            ? `<i class="fa-solid fa-chevron-up"></i> <span>Hide Transcript</span>`
            : `<i class="fa-solid fa-file-lines"></i> <span>Transcript</span>`;
        });
      });
    },

    initHealthAudioCards() {
      const audioCards = document.querySelectorAll(".health-audio-card");
      if (!audioCards.length) return;

      audioCards.forEach(card => {
        const playBtn = card.querySelector(".health-audio-play-btn");
        const pauseBtn = card.querySelector(".health-audio-pause-btn");
        const progressBar = card.querySelector(".health-audio-progress");
        const transcriptToggle = card.querySelector(".transcript-toggle-btn");
        const transcriptBody = card.querySelector(".transcript-body");
        const transcriptText = card.querySelector(".transcript-content")?.textContent || "";

        let timer = null;
        let elapsed = 0;
        const totalDuration = 180; // 3 mins simulated

        const speakText = () => {
          if (!('speechSynthesis' in window)) {
            Toast.show("Playing synthetic audio narration track.", "fa-solid fa-volume-high");
            return;
          }

          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(transcriptText.slice(0, 300) + "...");
          utterance.rate = 0.95;
          utterance.pitch = 1.0;
          
          utterance.onend = () => {
            if (playBtn) playBtn.style.display = "inline-flex";
            if (pauseBtn) pauseBtn.style.display = "none";
            clearInterval(timer);
            if (progressBar) progressBar.style.width = "100%";
          };

          window.speechSynthesis.speak(utterance);
        };

        if (playBtn) {
          playBtn.addEventListener("click", () => {
            // Stop other playing cards
            document.querySelectorAll(".health-audio-pause-btn").forEach(p => p.style.display = "none");
            document.querySelectorAll(".health-audio-play-btn").forEach(p => p.style.display = "inline-flex");

            playBtn.style.display = "none";
            if (pauseBtn) pauseBtn.style.display = "inline-flex";

            speakText();
            Toast.show("Playing educational audio guide. Adjust volume as needed.", "fa-solid fa-headphones");

            clearInterval(timer);
            timer = setInterval(() => {
              elapsed += 1;
              if (progressBar) {
                const pct = Math.min((elapsed / totalDuration) * 100, 100);
                progressBar.style.width = pct + "%";
              }
              if (elapsed >= totalDuration) {
                clearInterval(timer);
                if (playBtn) playBtn.style.display = "inline-flex";
                if (pauseBtn) pauseBtn.style.display = "none";
              }
            }, 1000);
          });
        }

        if (pauseBtn) {
          pauseBtn.addEventListener("click", () => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            clearInterval(timer);
            pauseBtn.style.display = "none";
            if (playBtn) playBtn.style.display = "inline-flex";
            Toast.show("Audio playback paused.", "fa-solid fa-pause");
          });
        }

        if (transcriptToggle && transcriptBody) {
          transcriptToggle.addEventListener("click", () => {
            const isHidden = transcriptBody.style.display === "none" || !transcriptBody.style.display;
            transcriptBody.style.display = isHidden ? "block" : "none";
            transcriptToggle.innerHTML = isHidden 
              ? `<i class="fa-solid fa-chevron-up"></i> Hide Transcript`
              : `<i class="fa-solid fa-chevron-down"></i> Read Full Transcript`;
          });
        }
      });
    },

    initTrainingStepAudio() {
      const stepGuides = document.querySelectorAll(".training-guide-interactive");
      if (!stepGuides.length) return;

      stepGuides.forEach(guide => {
        const playStepBtn = guide.querySelector(".play-step-audio-btn");
        const steps = guide.querySelectorAll(".training-step-item");
        const nextStepBtn = guide.querySelector(".next-step-btn");
        const prevStepBtn = guide.querySelector(".prev-step-btn");
        let activeIndex = 0;

        const updateActiveStep = (index) => {
          activeIndex = index;
          steps.forEach((s, idx) => {
            s.classList.toggle("active-step", idx === activeIndex);
            s.style.opacity = idx === activeIndex ? "1" : "0.55";
            s.style.borderLeft = idx === activeIndex ? "4px solid var(--primary-500)" : "4px solid transparent";
          });
        };

        if (steps.length) updateActiveStep(0);

        if (nextStepBtn) {
          nextStepBtn.addEventListener("click", () => {
            if (activeIndex < steps.length - 1) {
              updateActiveStep(activeIndex + 1);
            }
          });
        }

        if (prevStepBtn) {
          prevStepBtn.addEventListener("click", () => {
            if (activeIndex > 0) {
              updateActiveStep(activeIndex - 1);
            }
          });
        }

        if (playStepBtn) {
          playStepBtn.addEventListener("click", () => {
            const currentStep = steps[activeIndex];
            const textToSpeak = currentStep ? currentStep.textContent.trim() : "Follow the positive reinforcement marker and reward immediately.";
            
            if ('speechSynthesis' in window) {
              window.speechSynthesis.cancel();
              const utterance = new SpeechSynthesisUtterance(textToSpeak);
              utterance.rate = 0.92;
              window.speechSynthesis.speak(utterance);
              Toast.show(`Reading Step ${activeIndex + 1} Guidance aloud...`, "fa-solid fa-volume-high");
            } else {
              Toast.show(`Step ${activeIndex + 1}: ${textToSpeak.slice(0, 60)}...`, "fa-solid fa-graduation-cap");
            }
          });
        }
      });
    }
  };

  // --- 16. CALM / FOCUS MODE MANAGER ---
  const CalmMode = {
    init() {
      const isCalm = localStorage.getItem("furever_calm_mode") === "true";
      this.setCalm(isCalm);

      const btns = document.querySelectorAll(".calm-toggle-btn");
      btns.forEach(btn => {
        btn.addEventListener("click", () => this.toggle());
      });
    },

    setCalm(enabled) {
      if (enabled) {
        document.documentElement.setAttribute("data-calm", "true");
        localStorage.setItem("furever_calm_mode", "true");
      } else {
        document.documentElement.removeAttribute("data-calm");
        localStorage.setItem("furever_calm_mode", "false");
      }
      document.querySelectorAll(".calm-toggle-btn").forEach(btn => {
        btn.classList.toggle("active", enabled);
        btn.setAttribute("aria-pressed", enabled ? "true" : "false");
      });
    },

    toggle() {
      const current = document.documentElement.getAttribute("data-calm") === "true";
      this.setCalm(!current);
      Toast.show(
        !current ? "Calm & Focus Mode enabled (reduced motion and soft contrast)" : "Standard interaction mode restored",
        "fa-solid fa-leaf"
      );
    }
  };

  // --- 17. GLOBAL SEARCH OVERLAY ENGINE ---
  const GlobalSearch = {
    init() {
      const overlay = document.getElementById("global-search-overlay");
      const input = document.getElementById("global-search-input");
      const resultsContainer = document.getElementById("global-search-results");
      const clearBtn = document.getElementById("global-search-clear");
      const closeBtns = document.querySelectorAll(".search-modal-close, [data-search-close]");
      const openBtns = document.querySelectorAll(".search-open-btn, [data-search-open]");
      const suggestionChips = document.querySelectorAll("[data-search-suggest]");

      if (!overlay) return;

      const open = () => {
        overlay.classList.add("open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        if (input) {
          setTimeout(() => input.focus(), 100);
        }
      };

      const close = () => {
        overlay.classList.remove("open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      };

      openBtns.forEach(btn => btn.addEventListener("click", open));
      closeBtns.forEach(btn => btn.addEventListener("click", close));

      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("open")) close();
        // Shortcut Ctrl+K or Cmd+K
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          if (overlay.classList.contains("open")) close();
          else open();
        }
      });

      suggestionChips.forEach(chip => {
        chip.addEventListener("click", () => {
          if (input) {
            input.value = chip.dataset.searchSuggest;
            input.dispatchEvent(new Event("input"));
          }
        });
      });

      if (clearBtn && input) {
        clearBtn.addEventListener("click", () => {
          input.value = "";
          input.focus();
          this.renderResults("", resultsContainer);
        });
      }

      if (input && resultsContainer) {
        input.addEventListener("input", (e) => {
          const q = e.target.value.trim();
          this.renderResults(q, resultsContainer);
        });
      }
    },

    getIndex() {
      const index = [
        { title: "Pet Care Calendar", category: "Interactive Tool", url: "care-calendar.html", icon: "fa-calendar-check", desc: "Schedule vaccinations, grooming appointments, medication, and wellness checks." },
        { title: "How Well Do You Know Pet Care? Quiz", category: "Education & Quiz", url: "pet-care-quiz.html", icon: "fa-graduation-cap", desc: "Test your pet knowledge across 10 interactive questions and earn your certificate badge." },
        { title: "Pet Care Journal & Articles", category: "Knowledge Base", url: "pet-care-journal.html", icon: "fa-book-open", desc: "Read educational articles on canine hydration, feline coat brushing, and nutrition science." },
        { title: "Pet First-Aid Preparation Guide", category: "Clinical Guide", url: "pet-first-aid.html", icon: "fa-kit-medical", desc: "Essential first-aid kit checklists, emergency stabilization steps, and CPR fundamentals." },
        { title: "General Feeding Guidance Calculator", category: "Nutrition Tool", url: "feeding-guide.html#feeding-calculator", icon: "fa-calculator", desc: "Calculate daily food portions (grams & cups) based on species, weight, age, and activity." },
        { title: "Find Your Perfect Companion (Adoption Matcher)", category: "Adoption Tool", url: "animal-shelter.html#adoption-matcher", icon: "fa-heart", desc: "Interactive match wizard based on pet personality, species, size, and energy level." },
        { title: "Find Veterinary Help Directory", category: "Clinical Network", url: "veterinarian.html#vet-directory", icon: "fa-user-doctor", desc: "Verified 24/7 veterinary hospitals and specialized clinics near your location." },
        { title: "24/7 Emergency Quick Actions", category: "Emergency Care", url: "emergency.html", icon: "fa-triangle-exclamation", desc: "Immediate poison control helpline, bloat protocols, and urgent trauma routing." },
        { title: "Video Grooming Masterclasses", category: "Video Tutorials", url: "grooming-videos.html", icon: "fa-circle-play", desc: "6 complete high-definition lessons on bathing, brushing, nail trimming, and ear hygiene." },
        { title: "Pet Owner Dashboard & Passport", category: "Pet Portal", url: "pet-owner.html", icon: "fa-paw", desc: "Track today's wellness score, water reminders, vaccination status, and care journey." },
        { title: "Pet Profile & Memory Gallery", category: "Profile & Media", url: "pet-profile.html", icon: "fa-id-card", desc: "Manage companion records, upload photos to the memory gallery, and view journey timeline." },
        { title: "Certified Pet Nutrition & Health Products", category: "Products", url: "products.html", icon: "fa-store", desc: "Explore omega-3 supplements, dental water additives, calming chews, and gear." },
        { title: "Health Tips Audio Library", category: "Audio Guides", url: "health-tips.html", icon: "fa-headphones", desc: "Listen to veterinary audio walkthroughs with complete text transcripts." },
        { title: "Training Tips & Behavior Steps", category: "Behavior & Training", url: "training-tips.html", icon: "fa-dog", desc: "Interactive 4-step positive reinforcement training guides with audible markers." }
      ];

      // Merge Products
      if (window.PRODUCTS_DATA) {
        window.PRODUCTS_DATA.forEach(p => {
          index.push({
            title: p.name,
            category: `Product • ${p.category}`,
            url: `products.html?search=${encodeURIComponent(p.name)}`,
            icon: "fa-bag-shopping",
            desc: `Rs. ${p.price.toLocaleString()} • ${p.description.slice(0, 85)}...`
          });
        });
      }

      // Merge Adoptable Pets
      if (window.PETS_DATA) {
        window.PETS_DATA.forEach(pet => {
          index.push({
            title: `Adopt ${pet.name} (${pet.breed})`,
            category: `Shelter Pet • ${pet.species.toUpperCase()}`,
            url: `animal-shelter.html#adoptable-gallery`,
            icon: "fa-shield-heart",
            desc: `${pet.age} • ${pet.gender} • ${pet.location}. Traits: ${pet.traits.join(", ")}`
          });
        });
      }

      // Merge Grooming Videos
      if (window.GROOMING_VIDEOS_DATA) {
        window.GROOMING_VIDEOS_DATA.forEach(v => {
          index.push({
            title: `Video: ${v.title}`,
            category: "Grooming Masterclass",
            url: "grooming-videos.html",
            icon: "fa-video",
            desc: `${v.duration} • Instructor: ${v.instructor}. ${v.description.slice(0, 80)}...`
          });
        });
      }

      return index;
    },

    renderResults(query, container) {
      if (!container) return;

      if (!query) {
        container.innerHTML = `
          <div style="text-align: center; padding: 32px 16px; color: var(--text-muted);">
            <i class="fa-solid fa-magnifying-glass" style="font-size: 2.2rem; color: var(--primary-400); margin-bottom: 12px;"></i>
            <p style="font-size: 0.95rem; font-weight: 500;">Type keywords to search care guides, products, videos, clinics, or pets...</p>
            <div style="margin-top: 16px; display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary);">Suggested:</span>
              <button class="chip-btn" data-search-suggest="vaccine" style="padding: 3px 10px; font-size: 0.78rem;">Vaccines</button>
              <button class="chip-btn" data-search-suggest="feeding" style="padding: 3px 10px; font-size: 0.78rem;">Feeding</button>
              <button class="chip-btn" data-search-suggest="emergency" style="padding: 3px 10px; font-size: 0.78rem;">Emergency</button>
              <button class="chip-btn" data-search-suggest="grooming" style="padding: 3px 10px; font-size: 0.78rem;">Grooming</button>
            </div>
          </div>
        `;
        // re-bind suggestion clicks
        container.querySelectorAll("[data-search-suggest]").forEach(btn => {
          btn.addEventListener("click", () => {
            const input = document.getElementById("global-search-input");
            if (input) {
              input.value = btn.dataset.searchSuggest;
              this.renderResults(btn.dataset.searchSuggest, container);
            }
          });
        });
        return;
      }

      const q = query.toLowerCase();
      const index = this.getIndex();
      const matches = index.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      );

      if (!matches.length) {
        container.innerHTML = `
          <div style="text-align: center; padding: 40px 16px; color: var(--text-muted);">
            <i class="fa-solid fa-face-frown" style="font-size: 2.5rem; color: var(--accent-peach); margin-bottom: 12px;"></i>
            <h4 style="color: var(--text-primary); font-size: 1.05rem;">We couldn't find what you're looking for</h4>
            <p style="font-size: 0.88rem; margin-top: 6px;">Try checking your spelling or search broader terms like "dog", "cat", "first aid", or "diet".</p>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 10px; padding: 0 8px;">
          Found ${matches.length} result${matches.length === 1 ? "" : "s"}
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          ${matches.slice(0, 8).map(m => `
            <a href="${m.url}" class="search-result-item">
              <div class="search-result-icon"><i class="fa-solid ${m.icon}"></i></div>
              <div style="flex: 1; min-width: 0;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                  <span style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${m.title}</span>
                  <span style="font-size: 0.72rem; font-weight: 600; padding: 2px 8px; border-radius: var(--radius-full); background-color: var(--primary-50); color: var(--primary-700);">${m.category}</span>
                </div>
                <p style="font-size: 0.84rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.4;">${m.desc}</p>
              </div>
            </a>
          `).join("")}
        </div>
      `;
    }
  };

  // --- 18. SMART REMINDER CENTER ENGINE ---
  const ReminderCenter = {
    defaultReminders: [
      { id: "rem-1", title: "Annual Rabies Vaccination Due", pet: "Barnaby", date: "Sep 05, 2026", category: "Vaccination", icon: "fa-shield-virus", isRead: false },
      { id: "rem-2", title: "Undercoat Grooming & Micro-Nail Trim", pet: "Barnaby", date: "Tomorrow, 10:00 AM", category: "Grooming", icon: "fa-scissors", isRead: false },
      { id: "rem-3", title: "Semi-Annual Veterinary Wellness Checkup", pet: "Barnaby", date: "Oct 12, 2026", category: "Vet Visit", icon: "fa-stethoscope", isRead: false },
      { id: "rem-4", title: "Water Fountain Filter Replacement", pet: "Barnaby", date: "Every 2 Weeks", category: "Hydration", icon: "fa-droplet", isRead: true }
    ],

    init() {
      this.render();
      this.initEvents();
    },

    getReminders() {
      try {
        const stored = localStorage.getItem("furever_reminders");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {}
      return [...this.defaultReminders];
    },

    saveReminders(list) {
      localStorage.setItem("furever_reminders", JSON.stringify(list));
      this.render();
    },

    render() {
      const list = this.getReminders();
      const unreadCount = list.filter(r => !r.isRead).length;

      // Update badge indicators
      document.querySelectorAll(".reminders-badge-count").forEach(badge => {
        badge.textContent = unreadCount.toString();
        badge.style.display = unreadCount > 0 ? "flex" : "none";
      });

      const container = document.getElementById("reminders-list-container");
      if (!container) return;

      if (!list.length) {
        container.innerHTML = `
          <div style="text-align: center; padding: 48px 16px; color: var(--text-muted);">
            <i class="fa-solid fa-bell-slash" style="font-size: 2.4rem; color: var(--primary-400); margin-bottom: 14px;"></i>
            <h4 style="color: var(--text-primary); font-size: 1rem; margin-bottom: 6px;">All Caught Up!</h4>
            <p style="font-size: 0.86rem;">No pending pet reminders right now. Add a custom reminder anytime below.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = list.map(rem => `
        <div class="reminder-card ${rem.isRead ? "read" : ""}" data-reminder-id="${rem.id}">
          <div class="search-result-icon" style="width: 36px; height: 36px; font-size: 0.95rem;">
            <i class="fa-solid ${rem.icon}"></i>
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;">
              <span style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">${rem.title}</span>
              ${!rem.isRead ? `<span style="width: 8px; height: 8px; border-radius: var(--radius-full); background-color: var(--accent-peach); flex-shrink: 0; margin-top: 4px;" title="Unread"></span>` : ""}
            </div>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 0.76rem; color: var(--text-muted); margin-top: 4px;">
              <span><i class="fa-solid fa-clock"></i> ${rem.date}</span>
              <span>•</span>
              <span style="color: var(--primary-600); font-weight: 600;">${rem.category}</span>
            </div>
            <div style="margin-top: 8px; display: flex; gap: 8px;">
              <button class="btn btn-secondary btn-sm toggle-read-btn" data-id="${rem.id}" style="padding: 3px 10px; font-size: 0.74rem;">
                <i class="fa-solid ${rem.isRead ? "fa-envelope-open" : "fa-check"}"></i> ${rem.isRead ? "Mark Unread" : "Mark as Read"}
              </button>
              <button class="btn btn-sm delete-reminder-btn" data-id="${rem.id}" style="padding: 3px 8px; font-size: 0.74rem; color: var(--accent-peach); background: transparent; border: none;">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      `).join("");

      // Bind button events
      container.querySelectorAll(".toggle-read-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const updated = list.map(r => r.id === id ? { ...r, isRead: !r.isRead } : r);
          this.saveReminders(updated);
          Toast.show("Reminder status updated", "fa-solid fa-check-circle");
        });
      });

      container.querySelectorAll(".delete-reminder-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const updated = list.filter(r => r.id !== id);
          this.saveReminders(updated);
          Toast.show("Reminder dismissed", "fa-solid fa-trash-can");
        });
      });
    },

    initEvents() {
      const drawer = document.getElementById("reminders-drawer");
      const overlay = document.getElementById("reminders-overlay");
      const openBtns = document.querySelectorAll(".reminders-toggle-btn");
      const closeBtn = document.getElementById("reminders-close-btn");
      const markAllBtn = document.getElementById("reminders-mark-all-btn");
      const clearAllBtn = document.getElementById("reminders-clear-all-btn");
      const addForm = document.getElementById("add-reminder-form");

      if (!drawer || !overlay) return;

      const open = () => {
        drawer.classList.add("open");
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
      };

      const close = () => {
        drawer.classList.remove("open");
        overlay.classList.remove("open");
        document.body.style.overflow = "";
      };

      openBtns.forEach(btn => btn.addEventListener("click", open));
      if (closeBtn) closeBtn.addEventListener("click", close);
      overlay.addEventListener("click", close);

      if (markAllBtn) {
        markAllBtn.addEventListener("click", () => {
          const list = this.getReminders().map(r => ({ ...r, isRead: true }));
          this.saveReminders(list);
          Toast.show("All reminders marked as read", "fa-solid fa-check-double");
        });
      }

      if (clearAllBtn) {
        clearAllBtn.addEventListener("click", () => {
          this.saveReminders([]);
          Toast.show("All reminders cleared", "fa-solid fa-broom");
        });
      }

      if (addForm) {
        addForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const titleInput = document.getElementById("rem-input-title");
          const dateInput = document.getElementById("rem-input-date");
          const catInput = document.getElementById("rem-input-cat");

          if (!titleInput || !titleInput.value.trim()) return;

          const newRem = {
            id: `rem-${Date.now()}`,
            title: titleInput.value.trim(),
            pet: Personalization.getSavedPet() ? Personalization.getSavedPet().name : "Pet",
            date: dateInput && dateInput.value ? dateInput.value : "Upcoming",
            category: catInput ? catInput.value : "Care Task",
            icon: catInput && catInput.value === "Vaccination" ? "fa-shield-virus" : (catInput && catInput.value === "Grooming" ? "fa-scissors" : "fa-calendar-check"),
            isRead: false
          };

          const list = [newRem, ...this.getReminders()];
          this.saveReminders(list);
          Toast.show(`New reminder added: "${newRem.title}"`, "fa-solid fa-bell");
          addForm.reset();
          if (window.FurEverCare && window.FurEverCare.Modal) {
            window.FurEverCare.Modal.close("add-reminder-modal");
          }
        });
      }
    }
  };

  // --- 19. FLOATING HELP ASSISTANT & PAGE SUGGESTION ENGINE ---
  const HelpCenter = {
    helpPages: [
      { title: "Care Calendar", url: "care-calendar.html", icon: "fa-calendar-days", category: "Scheduling", desc: "Schedule shots, medication reminders, and vet checkups." },
      { title: "Pet Care Journal", url: "pet-care-journal.html", icon: "fa-book-journal-whills", category: "Health Logging", desc: "Log symptoms, daily stools, energy levels, and medical history." },
      { title: "Pet Care Knowledge Quiz", url: "pet-care-quiz.html", icon: "fa-brain", category: "Interactive Learning", desc: "Test your pet guardianship IQ across nutrition, safety, and hygiene." },
      { title: "Pet First Aid Protocol", url: "pet-first-aid.html", icon: "fa-kit-medical", category: "Emergency Care", desc: "Step-by-step guidance for bleeding, choking, heatstroke, and CPR." },
      { title: "Pet Passport & Profile Builder", url: "pet-profile.html", icon: "fa-id-card", category: "Personalization", desc: "Save companion breed, weight, microchip, and vaccine verification." },
      { title: "Grooming Masterclass Videos", url: "grooming-videos.html", icon: "fa-scissors", category: "Video Tutorials", desc: "Fear-free coat brushing, bathing, trimming, and nail grind videos." },
      { title: "Feeding & Nutrition Guide", url: "feeding-guide.html", icon: "fa-bowl-food", category: "Diet Calculator", desc: "Calculate daily calories, macro ratios, and explore toxic foods." },
      { title: "Health & Wellness Tips", url: "health-tips.html", icon: "fa-heart-pulse", category: "Clinical Advice", desc: "Oral hygiene tips, weight management, and vital signs reference." },
      { title: "Training & Behavior Hub", url: "training-tips.html", icon: "fa-graduation-cap", category: "Positive Training", desc: "Force-free markers, crate training, and leash manners." },
      { title: "24/7 Emergency Assistance", url: "emergency.html", icon: "fa-triangle-exclamation", category: "Urgent Care", desc: "Clinical emergency triage, poison hotlines, and urgent clinic finder." },
      { title: "Our Veterinary & Welfare Team", url: "team.html", icon: "fa-users", category: "Clinical Board", desc: "Meet board-certified surgeons, shelter directors, and behaviorists." },
      { title: "Community Feedback & Reviews", url: "feedback.html", icon: "fa-comment-dots", category: "Community", desc: "Share ratings, submit suggestions, and review community stories." }
    ],

    init() {
      this.ensureElementsExist();
      this.bindEvents();
    },

    ensureElementsExist() {
      // 1. Ensure Floating FAB exists
      let helpBtn = document.getElementById("floating-help-btn");
      if (!helpBtn) {
        helpBtn = document.createElement("button");
        helpBtn.type = "button";
        helpBtn.id = "floating-help-btn";
        helpBtn.className = "floating-help-btn";
        helpBtn.setAttribute("aria-label", "Help? Explore Pet Care Pages & Tools");
        helpBtn.setAttribute("title", "Help? Click for quick navigation & triage");
        helpBtn.innerHTML = `<i class="fa-solid fa-circle-question"></i> <span>Help?</span>`;
        document.body.appendChild(helpBtn);
      } else {
        helpBtn.innerHTML = `<i class="fa-solid fa-circle-question"></i> <span>Help?</span>`;
        helpBtn.setAttribute("aria-label", "Help? Explore Pet Care Pages & Tools");
        helpBtn.setAttribute("title", "Help? Click for quick navigation & triage");
      }

      // 2. Ensure Help Assistant Modal exists
      let modal = document.getElementById("help-assistant-modal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "help-assistant-modal";
        modal.className = "modal-overlay";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labelledby", "help-modal-title");
        modal.innerHTML = `
          <div class="modal-box" style="max-width: 680px;">
            <div class="modal-header">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div class="brand-icon-wrapper" style="width: 36px; height: 36px; font-size: 1rem; border-radius: var(--radius-sm); background-color: var(--primary-500); color: #FFFFFF;">
                  <i class="fa-solid fa-compass"></i>
                </div>
                <div>
                  <h3 class="heading-sm" id="help-modal-title" style="margin-bottom: 2px;">FurEver Care Page Navigator</h3>
                  <span style="font-size: 0.8rem; color: var(--text-muted);">Explore guides, clinical tools, and pet care resources</span>
                </div>
              </div>
              <button class="modal-close-btn" data-modal-close aria-label="Close Help Assistant"><i class="fa-solid fa-xmark"></i></button>
            </div>

            <!-- Instant Search Field -->
            <div style="margin-bottom: 18px; position: relative;">
              <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted);" aria-hidden="true"></i>
              <input type="text" id="help-instant-search-input" class="form-control" placeholder="What do you need help with? (e.g., vaccine, grooming, quiz, calendar, emergency)..." style="padding-left: 38px;">
            </div>

            <!-- Quick Filter Topic Chips -->
            <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 18px;" id="help-topic-chips">
              <button class="chip-btn active" data-help-filter="all" style="font-size: 0.76rem; padding: 4px 10px;">All Pages</button>
              <button class="chip-btn" data-help-filter="tools" style="font-size: 0.76rem; padding: 4px 10px;"><i class="fa-solid fa-screwdriver-wrench"></i> Interactive Tools</button>
              <button class="chip-btn" data-help-filter="guides" style="font-size: 0.76rem; padding: 4px 10px;"><i class="fa-solid fa-book-open"></i> Care Guides</button>
              <button class="chip-btn" data-help-filter="emergency" style="font-size: 0.76rem; padding: 4px 10px; color: var(--accent-peach);"><i class="fa-solid fa-kit-medical"></i> Emergency</button>
            </div>

            <!-- Suggested Pages List Container -->
            <div id="help-suggestions-list" style="max-height: 380px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 4px;">
              <!-- Populated dynamically -->
            </div>

            <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: var(--text-muted); flex-wrap: wrap; gap: 8px;">
              <span><i class="fa-solid fa-shield-heart" style="color: var(--primary-500);"></i> 100% Free Open Pet Welfare Tools</span>
              <button type="button" class="btn btn-secondary btn-sm" data-modal-close style="padding: 4px 14px; font-size: 0.78rem;">Close Navigator</button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
      }
    },

    renderSuggestions(filter = "all", query = "") {
      const container = document.getElementById("help-suggestions-list");
      if (!container) return;

      let list = [...this.helpPages];

      if (filter === "tools") {
        list = list.filter(p => ["care-calendar.html", "pet-care-journal.html", "pet-care-quiz.html", "pet-profile.html", "feeding-guide.html"].includes(p.url));
      } else if (filter === "guides") {
        list = list.filter(p => ["grooming-videos.html", "health-tips.html", "training-tips.html", "about.html", "team.html"].includes(p.url));
      } else if (filter === "emergency") {
        list = list.filter(p => ["pet-first-aid.html", "emergency.html", "contact.html"].includes(p.url));
      }

      if (query.trim()) {
        const q = query.toLowerCase().trim();
        list = list.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }

      if (!list.length) {
        container.innerHTML = `
          <div style="text-align: center; padding: 32px 16px; color: var(--text-muted);">
            <i class="fa-solid fa-circle-question" style="font-size: 2rem; color: var(--primary-400); margin-bottom: 8px;"></i>
            <p style="font-size: 0.9rem; font-weight: 600;">No matching pages found</p>
            <p style="font-size: 0.8rem; margin-top: 4px;">Try searching for "calendar", "quiz", "first aid", "grooming", or "emergency".</p>
          </div>
        `;
        return;
      }

      container.innerHTML = list.map(p => `
        <a href="${p.url}" class="help-suggestion-card">
          <div class="help-suggestion-icon">
            <i class="fa-solid ${p.icon}"></i>
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <strong style="font-size: 0.92rem; color: var(--text-primary);">${p.title}</strong>
              <span class="tag" style="font-size: 0.68rem; padding: 2px 6px;">${p.category}</span>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px; line-height: 1.35;">${p.desc}</p>
          </div>
          <i class="fa-solid fa-chevron-right" style="font-size: 0.8rem; color: var(--text-muted);"></i>
        </a>
      `).join("");
    },

    bindEvents() {
      const helpBtn = document.getElementById("floating-help-btn");
      if (helpBtn) {
        helpBtn.addEventListener("click", () => {
          this.renderSuggestions();
          Modal.open("help-assistant-modal");
          const searchInput = document.getElementById("help-instant-search-input");
          if (searchInput) {
            searchInput.value = "";
            setTimeout(() => searchInput.focus(), 150);
          }
        });
      }

      const searchInput = document.getElementById("help-instant-search-input");
      const chips = document.querySelectorAll("[data-help-filter]");

      let currentFilter = "all";

      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          this.renderSuggestions(currentFilter, e.target.value);
        });
      }

      chips.forEach(chip => {
        chip.addEventListener("click", () => {
          chips.forEach(c => c.classList.remove("active"));
          chip.classList.add("active");
          currentFilter = chip.dataset.helpFilter;
          const q = searchInput ? searchInput.value : "";
          this.renderSuggestions(currentFilter, q);
        });
      });
    }
  };

  // --- 20. SUBTLE PAW TRAIL ENGINE ---
  const PawTrail = {
    init() {
      if (window.matchMedia && (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;

      let lastX = 0, lastY = 0;
      let lastTime = 0;

      window.addEventListener("mousemove", (e) => {
        if (document.documentElement.getAttribute("data-calm") === "true") return;

        const now = performance.now();
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

        if (dist > 45 && now - lastTime > 90) {
          lastX = e.clientX;
          lastY = e.clientY;
          lastTime = now;

          const dot = document.createElement("i");
          dot.className = "fa-solid fa-paw paw-trail-dot";
          dot.style.left = `${e.clientX}px`;
          dot.style.top = `${e.clientY}px`;
          dot.style.transform = `translate(-50%, -50%) rotate(${Math.floor(Math.random() * 360)}deg) scale(${0.7 + Math.random() * 0.4})`;
          
          document.body.appendChild(dot);

          setTimeout(() => {
            dot.style.opacity = "0";
            dot.style.transform += " translateY(6px)";
            setTimeout(() => dot.remove(), 500);
          }, 350);
        }
      }, { passive: true });
    }
  };

  // --- 21. WELLNESS SCORE ENGINE ---
  const WellnessScoreEngine = {
    init() {
      const ring = document.querySelector(".wellness-ring-circle");
      const scoreNumEl = document.querySelector(".wellness-score-number");
      if (!ring && !scoreNumEl) return;

      const pet = Personalization.getSavedPet() || Personalization.defaultPet;
      
      // Calculate realistic score
      let score = 92;
      if (pet) {
        if (pet.vaccinationStatus && pet.vaccinationStatus.toLowerCase().includes("current")) score += 3;
        if (pet.healthInfo && pet.healthInfo.length > 20) score += 2;
        score = Math.min(score, 98);
      }

      if (scoreNumEl) {
        scoreNumEl.textContent = score.toString();
      }

      if (ring) {
        const circumference = 377;
        const offset = circumference - (score / 100) * circumference;
        setTimeout(() => {
          ring.style.strokeDashoffset = offset.toString();
        }, 300);
      }

      // Unlock Wellness Champion achievement
      AchievementsEngine.unlock("wellness_champion");
    }
  };

  // --- 22. ACHIEVEMENTS ENGINE ---
  const AchievementsEngine = {
    badges: {
      first_profile: { id: "first_profile", title: "First Pet Profile", icon: "fa-id-card", desc: "Created or customized a companion passport." },
      vaccine_ready: { id: "vaccine_ready", title: "Vaccination Ready", icon: "fa-shield-virus", desc: "Vaccination records up-to-date and verified." },
      grooming_pro: { id: "grooming_pro", title: "Grooming Pro", icon: "fa-scissors", desc: "Completed 2+ video grooming masterclasses." },
      caring_parent: { id: "caring_parent", title: "Caring Parent", icon: "fa-graduation-cap", desc: "Completed the Pet Care Knowledge Quiz." },
      wellness_champion: { id: "wellness_champion", title: "Wellness Champion", icon: "fa-heart-pulse", desc: "Reviewed daily interactive wellness score." },
      training_starter: { id: "training_starter", title: "Training Starter", icon: "fa-dog", desc: "Practiced positive reinforcement markers." },
      care_explorer: { id: "care_explorer", title: "Care Explorer", icon: "fa-compass", desc: "Explored 3+ specialized educational guides." }
    },

    init() {
      // Auto unlock check based on current state
      if (Personalization.getSavedPet()) {
        this.unlock("first_profile");
        this.unlock("vaccine_ready");
      }
      this.render();
    },

    getUnlocked() {
      try {
        const stored = localStorage.getItem("furever_achievements");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {}
      return ["first_profile", "care_explorer"];
    },

    unlock(badgeId) {
      if (!this.badges[badgeId]) return;
      const current = this.getUnlocked();
      if (!current.includes(badgeId)) {
        current.push(badgeId);
        localStorage.setItem("furever_achievements", JSON.stringify(current));
        this.render();
        Toast.show(`🏆 Care Achievement Unlocked: ${this.badges[badgeId].title}!`, "fa-solid fa-trophy");
      }
    },

    render() {
      const container = document.getElementById("achievements-grid-container");
      if (!container) return;

      const unlocked = this.getUnlocked();
      container.innerHTML = Object.values(this.badges).map(b => {
        const isUnlocked = unlocked.includes(b.id);
        return `
          <div class="achievement-badge-card ${isUnlocked ? "unlocked" : "locked"}" title="${b.desc}">
            <div class="achievement-icon-circle">
              <i class="fa-solid ${b.icon}"></i>
            </div>
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-primary); margin-top: 2px;">${b.title}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); line-height: 1.3;">${isUnlocked ? "Unlocked ✓" : "Locked"}</div>
          </div>
        `;
      }).join("");
    }
  };

  // --- 23. CARE JOURNEY TRACKER ENGINE ---
  const CareJourneyTracker = {
    init() {
      const container = document.getElementById("care-journey-progress-bar");
      const textEl = document.getElementById("care-journey-percent-text");
      const ctaBtn = document.getElementById("care-journey-cta-btn");
      if (!container && !textEl) return;

      const pet = Personalization.getSavedPet();
      let stepsCompleted = 4; // default demo progress
      if (pet) stepsCompleted = 5;

      const totalSteps = 7;
      const pct = Math.round((stepsCompleted / totalSteps) * 100);

      if (container) container.style.width = `${pct}%`;
      if (textEl) textEl.textContent = `${pct}% Complete (${stepsCompleted}/${totalSteps} milestones achieved)`;

      if (ctaBtn) {
        if (stepsCompleted < 7) {
          ctaBtn.innerHTML = `<span>Next Milestone: Review Nutrition Guide</span> <i class="fa-solid fa-arrow-right"></i>`;
          ctaBtn.href = "feeding-guide.html";
        } else {
          ctaBtn.innerHTML = `<span>All Care Milestones Completed</span> <i class="fa-solid fa-check-circle"></i>`;
        }
      }
    }
  };

  // --- 24. DAILY PET CARE TIP ENGINE ---
  const DailyTipEngine = {
    currentIndex: 0,

    init() {
      const tipBox = document.getElementById("daily-tip-box");
      const nextBtn = document.getElementById("next-tip-btn");
      if (!tipBox || typeof window.DAILY_CARE_TIPS_DATA === "undefined") return;

      this.render();

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          this.currentIndex = (this.currentIndex + 1) % window.DAILY_CARE_TIPS_DATA.length;
          this.render();
          Toast.show("Loaded next daily pet care tip", "fa-solid fa-lightbulb");
        });
      }
    },

    render() {
      const tipBox = document.getElementById("daily-tip-box");
      if (!tipBox || !window.DAILY_CARE_TIPS_DATA) return;

      const tip = window.DAILY_CARE_TIPS_DATA[this.currentIndex];
      if (!tip) return;

      tipBox.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 16px; animation: fadeIn 0.4s ease;">
          <div class="search-result-icon" style="background-color: var(--primary-50); color: ${tip.badgeColor}; width: 48px; height: 48px; font-size: 1.3rem;">
            <i class="fa-solid ${tip.icon}"></i>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
              <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary-600);">${tip.category}</span>
              <span style="font-size: 0.78rem; color: var(--text-muted);"><i class="fa-solid fa-user-doctor"></i> ${tip.author}</span>
            </div>
            <p style="font-size: 1.05rem; font-weight: 600; color: var(--text-primary); line-height: 1.5; margin-bottom: 8px;">"${tip.tip}"</p>
            <div style="font-size: 0.84rem; color: var(--text-secondary); background-color: var(--bg-card); padding: 8px 12px; border-radius: var(--radius-md); border-left: 3px solid var(--primary-500);">
              <strong>Clinical Fact:</strong> ${tip.fact}
            </div>
          </div>
        </div>
      `;
    }
  };

  // --- 25. CARE CALENDAR ENGINE (care-calendar.html) ---
  const CareCalendarEngine = {
    currentDate: new Date(),
    selectedDate: new Date(),
    defaultEvents: [
      { id: "ce-1", dateStr: "2026-08-25", title: "Undercoat Brushing & Nail Trim", type: "grooming", time: "10:00 AM", location: "Home Grooming Station", notes: "Use slicker brush followed by undercoat rake." },
      { id: "ce-2", dateStr: "2026-08-28", title: "Water Fountain Deep Clean", type: "wellness", time: "05:00 PM", location: "Kitchen", notes: "Replace carbon filter cartridge." },
      { id: "ce-3", dateStr: "2026-09-05", title: "Annual DHPP & Rabies Booster", type: "vaccine", time: "11:00 AM", location: "Al-Razi Companion Medical Pavilion", notes: "Bring vaccination passport booklet." },
      { id: "ce-4", dateStr: "2026-09-12", title: "Paws in the Park Adoption Camp", type: "wellness", time: "10:00 AM", location: "Fatima Jinnah Park", notes: "Community pet festival & agility demos." },
      { id: "ce-5", dateStr: "2026-09-20", title: "Flea & Tick Topical Treatment", type: "medication", time: "08:00 AM", location: "Home", notes: "Apply between shoulder blades on dry skin." }
    ],

    init() {
      const grid = document.getElementById("calendar-days-grid");
      if (!grid) return;

      this.initControls();
      this.render();
    },

    getEvents() {
      try {
        const stored = localStorage.getItem("furever_calendar_events");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {}
      return [...this.defaultEvents];
    },

    saveEvents(events) {
      localStorage.setItem("furever_calendar_events", JSON.stringify(events));
      this.render();
    },

    initControls() {
      const prevBtn = document.getElementById("cal-prev-month");
      const nextBtn = document.getElementById("cal-next-month");
      const todayBtn = document.getElementById("cal-today-btn");
      const addForm = document.getElementById("add-calendar-event-form");

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          this.currentDate.setMonth(this.currentDate.getMonth() - 1);
          this.render();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          this.currentDate.setMonth(this.currentDate.getMonth() + 1);
          this.render();
        });
      }

      if (todayBtn) {
        todayBtn.addEventListener("click", () => {
          this.currentDate = new Date();
          this.selectedDate = new Date();
          this.render();
          Toast.show("Jumped to today", "fa-solid fa-calendar-day");
        });
      }

      if (addForm) {
        addForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const title = document.getElementById("cal-input-title")?.value.trim();
          const date = document.getElementById("cal-input-date")?.value;
          const time = document.getElementById("cal-input-time")?.value || "09:00 AM";
          const type = document.getElementById("cal-input-type")?.value || "wellness";
          const location = document.getElementById("cal-input-loc")?.value.trim() || "Home";
          const notes = document.getElementById("cal-input-notes")?.value.trim() || "";

          if (!title || !date) return;

          const newEvt = {
            id: `ce-${Date.now()}`,
            dateStr: date,
            title,
            type,
            time,
            location,
            notes
          };

          const list = [...this.getEvents(), newEvt];
          this.saveEvents(list);
          Toast.show(`Care event "${title}" added to calendar`, "fa-solid fa-calendar-plus");
          addForm.reset();
          Modal.close("add-event-modal");
        });
      }

      // Explicit cancel handlers for Add Calendar Event modal
      const calCancelBtns = document.querySelectorAll("#add-event-modal [data-modal-close], #add-event-modal button.btn-secondary, [data-modal-close='add-event-modal']");
      calCancelBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          Modal.close("add-event-modal");
        });
      });
    },

    formatDateStr(d) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    render() {
      const grid = document.getElementById("calendar-days-grid");
      const titleEl = document.getElementById("cal-month-title");
      if (!grid) return;

      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();

      if (titleEl) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        titleEl.textContent = `${monthNames[month]} ${year}`;
      }

      const firstDayIndex = new Date(year, month, 1).getDay();
      const lastDay = new Date(year, month + 1, 0).getDate();
      const prevLastDay = new Date(year, month, 0).getDate();

      const events = this.getEvents();
      const todayStr = this.formatDateStr(new Date());
      const selectedStr = this.formatDateStr(this.selectedDate);

      let html = "";

      // Previous month days
      for (let x = firstDayIndex; x > 0; x--) {
        const d = prevLastDay - x + 1;
        html += `<div class="calendar-day-cell other-month"><span class="calendar-day-number">${d}</span></div>`;
      }

      // Current month days
      for (let i = 1; i <= lastDay; i++) {
        const thisDate = new Date(year, month, i);
        const thisDateStr = this.formatDateStr(thisDate);
        const isToday = thisDateStr === todayStr;
        const isSelected = thisDateStr === selectedStr;

        const dayEvents = events.filter(e => e.dateStr === thisDateStr);

        html += `
          <div class="calendar-day-cell ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}" data-date="${thisDateStr}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="calendar-day-number" style="${isToday ? "color: var(--primary-600); font-weight: 800;" : ""}">${i}</span>
              ${dayEvents.length ? `<span style="font-size: 0.65rem; font-weight: 700; color: var(--primary-600);">${dayEvents.length}</span>` : ""}
            </div>
            <div style="display: flex; flex-direction: column; gap: 3px; overflow: hidden;">
              ${dayEvents.slice(0, 2).map(e => `
                <div class="calendar-event-pill event-pill-${e.type}" title="${e.title}">
                  ${e.title}
                </div>
              `).join("")}
              ${dayEvents.length > 2 ? `<span style="font-size: 0.65rem; color: var(--text-muted);">+${dayEvents.length - 2} more</span>` : ""}
            </div>
          </div>
        `;
      }

      grid.innerHTML = html;

      // Bind day clicks
      grid.querySelectorAll(".calendar-day-cell[data-date]").forEach(cell => {
        cell.addEventListener("click", () => {
          const dateStr = cell.dataset.date;
          const [y, m, d] = dateStr.split("-").map(Number);
          this.selectedDate = new Date(y, m - 1, d);
          this.render();
          this.renderEventDetails(dateStr);
        });
      });

      this.renderEventDetails(selectedStr);
    },

    renderEventDetails(dateStr) {
      const container = document.getElementById("calendar-selected-details");
      if (!container) return;

      const events = this.getEvents().filter(e => e.dateStr === dateStr);
      const [y, m, d] = dateStr.split("-").map(Number);
      const displayDate = new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

      if (!events.length) {
        container.innerHTML = `
          <div class="card" style="padding: 24px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
              <h4 style="font-size: 1.05rem; font-family: 'Playfair Display', serif; color: var(--text-primary);">${displayDate}</h4>
              <button class="btn btn-primary btn-sm" data-modal-open="add-event-modal">
                <i class="fa-solid fa-plus"></i> Add Event
              </button>
            </div>
            <div style="text-align: center; padding: 28px 12px; color: var(--text-muted);">
              <i class="fa-solid fa-calendar-plus" style="font-size: 2.2rem; color: var(--primary-400); margin-bottom: 12px;"></i>
              <p style="font-size: 0.92rem; font-weight: 500;">No care appointments scheduled for this date.</p>
              <p style="font-size: 0.82rem; margin-top: 4px;">Click "+ Add Event" to record a vaccination, vet visit, or grooming reminder.</p>
            </div>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div class="card" style="padding: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 8px;">
            <div>
              <h4 style="font-size: 1.1rem; font-family: 'Playfair Display', serif; color: var(--text-primary);">${displayDate}</h4>
              <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">${events.length} Care Event${events.length === 1 ? "" : "s"} Scheduled</span>
            </div>
            <button class="btn btn-primary btn-sm" data-modal-open="add-event-modal">
              <i class="fa-solid fa-plus"></i> Add Event
            </button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${events.map(e => `
              <div style="padding: 16px; border-radius: var(--radius-lg); background-color: var(--bg-secondary); border: 1px solid var(--border-color); display: flex; gap: 14px; align-items: flex-start;">
                <div class="search-result-icon" style="width: 40px; height: 40px;">
                  <i class="fa-solid ${e.type === "vaccine" ? "fa-shield-virus" : (e.type === "grooming" ? "fa-scissors" : (e.type === "medication" ? "fa-pills" : "fa-heart-pulse"))}"></i>
                </div>
                <div style="flex: 1;">
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                    <span style="font-weight: 700; font-size: 0.98rem; color: var(--text-primary);">${e.title}</span>
                    <span class="calendar-event-pill event-pill-${e.type}">${e.type.toUpperCase()}</span>
                  </div>
                  <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px; display: flex; gap: 12px; flex-wrap: wrap;">
                    <span><i class="fa-solid fa-clock"></i> ${e.time}</span>
                    <span><i class="fa-solid fa-location-dot"></i> ${e.location}</span>
                  </div>
                  ${e.notes ? `<p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 8px; line-height: 1.4;">${e.notes}</p>` : ""}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }
  };

  // --- 26. PET CARE QUIZ ENGINE (pet-care-quiz.html) ---
  const PetQuizEngine = {
    currentQuestion: 0,
    score: 0,
    answers: [],

    init() {
      const container = document.getElementById("quiz-card-container");
      if (!container || typeof window.QUIZ_QUESTIONS_DATA === "undefined") return;

      this.render();
    },

    render() {
      const container = document.getElementById("quiz-card-container");
      const progressFill = document.getElementById("quiz-progress-fill");
      const stepText = document.getElementById("quiz-step-text");
      if (!container || !window.QUIZ_QUESTIONS_DATA) return;

      const total = window.QUIZ_QUESTIONS_DATA.length;
      const q = window.QUIZ_QUESTIONS_DATA[this.currentQuestion];

      if (progressFill) progressFill.style.width = `${((this.currentQuestion + 1) / total) * 100}%`;
      if (stepText) stepText.textContent = `Question ${this.currentQuestion + 1} of ${total}`;

      container.innerHTML = `
        <div class="card" style="padding: clamp(24px, 4vw, 40px); animation: fadeIn 0.3s ease;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <span style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary-600); display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid ${q.icon}"></i> ${q.topic}
            </span>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">Current Score: ${this.score} pts</span>
          </div>

          <h3 style="font-family: 'Playfair Display', serif; font-size: clamp(1.2rem, 2.5vw, 1.5rem); line-height: 1.4; color: var(--text-primary); margin-bottom: 24px;">
            ${q.question}
          </h3>

          <div style="display: flex; flex-direction: column; gap: 12px;" id="quiz-options-wrapper">
            ${q.options.map((opt, idx) => `
              <button class="quiz-option-btn" data-index="${idx}">
                <span>${opt}</span>
                <i class="fa-regular fa-circle" style="color: var(--text-muted);"></i>
              </button>
            `).join("")}
          </div>

          <div id="quiz-feedback-box" style="display: none; margin-top: 24px; padding: 18px; border-radius: var(--radius-lg); background-color: var(--bg-secondary); border-left: 4px solid var(--primary-500);">
            <div id="quiz-feedback-title" style="font-weight: 700; font-size: 0.95rem; margin-bottom: 4px;"></div>
            <p id="quiz-feedback-explanation" style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;"></p>
            <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
              <button class="btn btn-primary" id="quiz-next-btn">
                <span>${this.currentQuestion < total - 1 ? "Next Question" : "View Final Results"}</span> <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      `;

      // Option click handler
      const optionButtons = container.querySelectorAll(".quiz-option-btn");
      const feedbackBox = document.getElementById("quiz-feedback-box");
      const feedbackTitle = document.getElementById("quiz-feedback-title");
      const feedbackExpl = document.getElementById("quiz-feedback-explanation");
      const nextBtn = document.getElementById("quiz-next-btn");

      let answered = false;

      optionButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          if (answered) return;
          answered = true;

          const chosenIdx = parseInt(btn.dataset.index, 10);
          const isCorrect = chosenIdx === q.correctIndex;

          if (isCorrect) {
            this.score += 1;
            btn.classList.add("correct");
            btn.querySelector("i").className = "fa-solid fa-circle-check";
            feedbackTitle.innerHTML = `<span style="color: #2A9D8F;"><i class="fa-solid fa-circle-check"></i> Correct! Excellent understanding.</span>`;
          } else {
            btn.classList.add("incorrect");
            btn.querySelector("i").className = "fa-solid fa-circle-xmark";
            optionButtons[q.correctIndex].classList.add("correct");
            optionButtons[q.correctIndex].querySelector("i").className = "fa-solid fa-circle-check";
            feedbackTitle.innerHTML = `<span style="color: #E76F51;"><i class="fa-solid fa-circle-exclamation"></i> Helpful learning insight:</span>`;
          }

          feedbackExpl.textContent = q.explanation;
          feedbackBox.style.display = "block";
        });
      });

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          if (this.currentQuestion < total - 1) {
            this.currentQuestion += 1;
            this.render();
          } else {
            this.renderResults();
          }
        });
      }
    },

    renderResults() {
      const container = document.getElementById("quiz-card-container");
      if (!container || !window.QUIZ_QUESTIONS_DATA) return;

      const total = window.QUIZ_QUESTIONS_DATA.length;
      const pct = Math.round((this.score / total) * 100);

      let title = "Excellent Pet Care Knowledge!";
      let badge = "Master Guardian Certified";
      let summary = "You demonstrated exemplary mastery over canine & feline clinical nutrition, emergency recognition, gentle positive reinforcement, and preventive healthcare.";

      if (pct < 70) {
        title = "Great Caring Foundation!";
        badge = "Pet Care Enthusiast";
        summary = "You have a solid compassionate core. Reviewing our Grooming Videos, First-Aid Guide, and Journal articles will elevate your preventive care skills even further!";
      }

      AchievementsEngine.unlock("caring_parent");

      container.innerHTML = `
        <div class="card" style="padding: clamp(32px, 5vw, 56px); text-align: center; animation: fadeIn 0.4s ease;">
          <div class="achievement-icon-circle" style="width: 72px; height: 72px; font-size: 2rem; margin: 0 auto 20px; border-color: var(--accent-amber); color: var(--accent-amber); background-color: #FFF9F3;">
            <i class="fa-solid fa-trophy"></i>
          </div>

          <span class="badge" style="background-color: var(--primary-50); color: var(--primary-700); font-weight: 700; margin-bottom: 12px;">${badge}</span>
          <h2 style="font-family: 'Playfair Display', serif; font-size: clamp(1.6rem, 3vw, 2.2rem); color: var(--text-primary); margin-bottom: 12px;">
            ${this.score} / ${total} — ${title}
          </h2>

          <div style="font-size: 2.8rem; font-family: 'Playfair Display', serif; font-weight: 800; color: var(--primary-600); margin-bottom: 16px;">
            ${pct}%
          </div>

          <p style="max-width: 580px; margin: 0 auto 28px; color: var(--text-secondary); line-height: 1.6; font-size: 0.98rem;">
            ${summary}
          </p>

          <div style="padding: 16px; border-radius: var(--radius-md); background-color: var(--bg-secondary); border: 1px solid var(--border-light); max-width: 500px; margin: 0 auto 32px; font-size: 0.82rem; color: var(--text-muted);">
            <i class="fa-solid fa-shield-heart"></i> Educational Disclaimer: This interactive quiz is designed for guardian awareness and does not substitute for formal clinical veterinary certification.
          </div>

          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button class="btn btn-primary" id="quiz-restart-btn">
              <i class="fa-solid fa-rotate-right"></i> Retake Quiz
            </button>
            <a href="pet-care-journal.html" class="btn btn-secondary">
              <i class="fa-solid fa-book-open"></i> Read Care Journal
            </a>
          </div>
        </div>
      `;

      const restartBtn = document.getElementById("quiz-restart-btn");
      if (restartBtn) {
        restartBtn.addEventListener("click", () => {
          this.currentQuestion = 0;
          this.score = 0;
          this.render();
          Toast.show("Quiz restarted. Good luck!", "fa-solid fa-rotate-right");
        });
      }
    }
  };

  // --- 27. FEEDING CALCULATOR ENGINE (feeding-guide.html) ---
  const FeedingCalculatorEngine = {
    init() {
      const form = document.getElementById("feeding-calc-form");
      const resultBox = document.getElementById("feeding-calc-result");
      const resetBtn = document.getElementById("feeding-calc-reset");
      if (!form || !resultBox) return;

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const species = document.getElementById("calc-species")?.value || "dog";
        const ageGroup = document.getElementById("calc-age")?.value || "adult";
        const weightInput = parseFloat(document.getElementById("calc-weight")?.value || "15");
        const unit = document.getElementById("calc-unit")?.value || "kg";
        const activity = document.getElementById("calc-activity")?.value || "moderate";

        if (isNaN(weightInput) || weightInput <= 0) {
          Toast.show("Please enter a valid positive pet weight", "fa-solid fa-circle-exclamation");
          return;
        }

        // Convert weight to kg
        const weightKg = unit === "lbs" ? weightInput * 0.453592 : weightInput;

        // Basic Veterinary Resting Energy Requirement (RER) formula: 70 * (weightKg ^ 0.75)
        const rer = 70 * Math.pow(weightKg, 0.75);

        // Maintenance Energy Multipliers
        let multiplier = 1.6;
        if (species === "cat") multiplier = 1.2;
        else if (species === "rabbit") multiplier = 1.0;

        if (ageGroup === "puppy-kitten") multiplier += 0.8;
        else if (ageGroup === "senior") multiplier -= 0.2;

        if (activity === "low") multiplier -= 0.2;
        else if (activity === "high") multiplier += 0.4;

        const dailyCalories = Math.round(rer * multiplier);

        // Approximate 360 kcal per standard 100g dry kibble
        const gramsPerDay = Math.round((dailyCalories / 360) * 100);
        const cupsPerDay = (gramsPerDay / 115).toFixed(1); // approx 115g per standard measuring cup

        // Meal frequency
        let frequency = "2 Meals / Day (Morning & Evening)";
        if (ageGroup === "puppy-kitten") frequency = "3 to 4 Small Meals / Day";
        else if (species === "rabbit") frequency = "Unlimited Timothy Hay + 2 Daily Veggie Portions";

        // Baseline water
        const waterMl = Math.round(weightKg * 55);

        resultBox.style.display = "block";
        resultBox.innerHTML = `
          <div class="card" style="padding: 24px; border-left: 4px solid var(--primary-500); animation: fadeIn 0.4s ease;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
              <span style="font-weight: 700; font-size: 0.85rem; color: var(--primary-600); text-transform: uppercase; letter-spacing: 0.05em;">
                <i class="fa-solid fa-bowl-food"></i> Recommended Daily Nutrition
              </span>
              <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Weight: ${weightInput} ${unit}</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 14px; margin-bottom: 18px;">
              <div style="background-color: var(--bg-secondary); padding: 14px; border-radius: var(--radius-md); text-align: center;">
                <div style="font-size: 0.78rem; font-weight: 600; color: var(--text-muted);">Daily Kibble</div>
                <div style="font-size: 1.5rem; font-family: 'Playfair Display', serif; font-weight: 700; color: var(--text-primary); margin-top: 4px;">${gramsPerDay} g</div>
                <div style="font-size: 0.75rem; color: var(--primary-600); font-weight: 600;">(~${cupsPerDay} measuring cups)</div>
              </div>
              <div style="background-color: var(--bg-secondary); padding: 14px; border-radius: var(--radius-md); text-align: center;">
                <div style="font-size: 0.78rem; font-weight: 600; color: var(--text-muted);">Daily Energy</div>
                <div style="font-size: 1.5rem; font-family: 'Playfair Display', serif; font-weight: 700; color: var(--text-primary); margin-top: 4px;">${dailyCalories}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">kcal / day</div>
              </div>
              <div style="background-color: var(--bg-secondary); padding: 14px; border-radius: var(--radius-md); text-align: center;">
                <div style="font-size: 0.78rem; font-weight: 600; color: var(--text-muted);">Daily Hydration</div>
                <div style="font-size: 1.5rem; font-family: 'Playfair Display', serif; font-weight: 700; color: var(--text-primary); margin-top: 4px;">${waterMl} ml</div>
                <div style="font-size: 0.75rem; color: var(--accent-teal); font-weight: 600;">Fresh water minimum</div>
              </div>
            </div>

            <div style="padding: 12px 14px; border-radius: var(--radius-md); background-color: var(--bg-secondary); margin-bottom: 14px; font-size: 0.88rem; color: var(--text-primary);">
              <strong>Feeding Schedule:</strong> ${frequency}
            </div>

            <div style="padding: 12px 14px; border-radius: var(--radius-md); background-color: rgba(231, 111, 81, 0.08); border: 1px solid rgba(231, 111, 81, 0.2); font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
              <strong style="color: var(--accent-peach);"><i class="fa-solid fa-triangle-exclamation"></i> Educational Notice:</strong> This calculation is general guidance based on average metabolic rates. Actual caloric demands vary with body condition score, metabolism, and commercial food calorie density. Always consult your veterinarian for specialized prescription diets.
            </div>
          </div>
        `;

        Toast.show("Calculated general feeding guidance", "fa-solid fa-calculator");
      });

      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          form.reset();
          resultBox.style.display = "none";
          Toast.show("Feeding calculator reset", "fa-solid fa-rotate-left");
        });
      }
    }
  };

  // --- 28. ADOPTION COMPANION MATCHER ENGINE (animal-shelter.html) ---
  const AdoptionMatcherEngine = {
    init() {
      const matchForm = document.getElementById("adoption-match-form");
      const resultsArea = document.getElementById("adoption-match-results");
      const resetBtn = document.getElementById("adoption-match-reset");
      if (!matchForm || !resultsArea || typeof window.PETS_DATA === "undefined") return;

      const runMatch = () => {
        const species = document.getElementById("match-species")?.value || "all";
        const ageGroup = document.getElementById("match-age")?.value || "all";
        const size = document.getElementById("match-size")?.value || "all";
        const energy = document.getElementById("match-energy")?.value || "all";
        const personality = document.getElementById("match-personality")?.value || "all";

        let matched = [...window.PETS_DATA];

        if (species !== "all") {
          matched = matched.filter(p => p.species === species);
        }
        if (ageGroup !== "all") {
          matched = matched.filter(p => p.ageGroup === ageGroup || (ageGroup === "Young" && p.age.includes("Year")));
        }
        if (size !== "all") {
          matched = matched.filter(p => p.sizeCategory === size);
        }
        if (energy !== "all") {
          matched = matched.filter(p => p.energyLevel === energy);
        }
        if (personality !== "all") {
          matched = matched.filter(p => p.personality && p.personality.includes(personality));
        }

        resultsArea.style.display = "block";

        if (!matched.length) {
          resultsArea.innerHTML = `
            <div class="card" style="padding: 40px 20px; text-align: center; animation: fadeIn 0.3s ease;">
              <i class="fa-solid fa-shield-heart" style="font-size: 2.5rem; color: var(--accent-peach); margin-bottom: 12px;"></i>
              <h4 style="color: var(--text-primary); font-size: 1.1rem;">No pets match your exact combination</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 6px;">Try loosening your filters or selecting "Any Species" to discover more loving rescue companions.</p>
              <button class="btn btn-secondary btn-sm" id="reset-match-inner-btn" style="margin-top: 16px;">Reset Preferences</button>
            </div>
          `;
          document.getElementById("reset-match-inner-btn")?.addEventListener("click", () => {
            matchForm.reset();
            runMatch();
          });
          return;
        }

        resultsArea.innerHTML = `
          <div style="margin-bottom: 20px; text-align: center; animation: fadeIn 0.3s ease;">
            <span class="badge" style="background-color: var(--primary-50); color: var(--primary-700); font-weight: 700; font-size: 0.88rem; padding: 6px 16px;">
              ❤️ ${matched.length} companion${matched.length === 1 ? "" : "s"} match your lifestyle preferences!
            </span>
          </div>
          <div class="grid-3" style="animation: fadeIn 0.4s ease;">
            ${matched.map(pet => `
              <div class="card pet-card">
                <div class="card-img-wrapper" style="height: 220px; overflow: hidden; position: relative;">
                  <img src="${pet.image}" alt="${pet.name}" class="card-img" style="width: 100%; height: 100%; object-fit: cover;">
                  <span class="card-badge" style="position: absolute; top: 12px; right: 12px; background-color: var(--primary-600); color: #FFFFFF; font-size: 0.72rem; padding: 3px 10px; border-radius: var(--radius-full); font-weight: 600;">
                    ${pet.species.toUpperCase()}
                  </span>
                </div>
                <div style="padding: 20px; display: flex; flex-direction: column; flex: 1;">
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                    <h3 style="font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">${pet.name}</h3>
                    <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">${pet.age}</span>
                  </div>
                  <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 4px;">${pet.breed}</div>
                  
                  <div class="personality-tags-wrap" style="margin-top: 10px;">
                    ${(pet.personality || pet.traits).map(t => `<span class="personality-tag"><i class="fa-solid fa-tag"></i> ${t}</span>`).join("")}
                  </div>

                  <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 12px; line-height: 1.5; flex: 1;">
                    ${pet.story.slice(0, 110)}...
                  </p>

                  <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border-light); display: flex; align-items: center; justify-content: space-between;">
                    <span style="font-size: 0.78rem; color: var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${pet.location.split(",")[0]}</span>
                    <a href="contact.html?adopt=${encodeURIComponent(pet.name)}" class="btn btn-primary btn-sm" style="padding: 6px 14px; font-size: 0.8rem;">
                      <span>Meet ${pet.name.split(" ")[0]}</span> <i class="fa-solid fa-heart"></i>
                    </a>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        `;
      };

      matchForm.addEventListener("change", runMatch);
      matchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        runMatch();
      });

      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          matchForm.reset();
          resultsArea.style.display = "none";
          Toast.show("Adoption matcher reset", "fa-solid fa-rotate-left");
        });
      }
    }
  };

  // --- 29. PET MEMORIES GALLERY ENGINE (pet-profile.html) ---
  const PetMemoriesEngine = {
    defaultMemories: [
      { id: "mem-1", category: "First Day", title: "Welcome Home Gotcha Day", date: "Jan 15, 2024", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80" },
      { id: "mem-2", category: "Birthday", title: "2nd Birthday Celebration", date: "May 20, 2025", image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80" },
      { id: "mem-3", category: "Grooming Day", title: "Fluffy Spa Day Post-Bath", date: "Jun 14, 2026", image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80" },
      { id: "mem-4", category: "Adventure", title: "Margalla Hills Trail Hike", date: "Jul 08, 2026", image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=600&q=80" },
      { id: "mem-5", category: "Family Moments", title: "Sunday Cuddles on the Rug", date: "Aug 10, 2026", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80" }
    ],

    init() {
      const grid = document.getElementById("memories-grid");
      if (!grid) return;

      this.render();
      this.initUpload();
    },

    getMemories() {
      try {
        const stored = localStorage.getItem("furever_pet_memories");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {}
      return [...this.defaultMemories];
    },

    saveMemories(list) {
      localStorage.setItem("furever_pet_memories", JSON.stringify(list));
      this.render();
    },

    render() {
      const grid = document.getElementById("memories-grid");
      const activeFilter = document.querySelector("[data-memory-filter].active")?.dataset.memoryFilter || "all";
      if (!grid) return;

      let list = this.getMemories();
      if (activeFilter !== "all") {
        list = list.filter(m => m.category === activeFilter);
      }

      if (!list.length) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; color: var(--text-muted);" class="card">
            <i class="fa-solid fa-camera-retro" style="font-size: 2.5rem; color: var(--primary-400); margin-bottom: 12px;"></i>
            <h4 style="color: var(--text-primary); font-size: 1rem;">No memories in this category yet</h4>
            <p style="font-size: 0.85rem; margin-top: 4px;">Click "+ Add Memory" to capture a special moment.</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = list.map(m => `
        <div class="card" style="overflow: hidden; display: flex; flex-direction: column;">
          <div style="height: 180px; position: relative; overflow: hidden;">
            <img src="${m.image}" alt="${m.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-normal);" class="card-img">
            <span style="position: absolute; top: 10px; left: 10px; background-color: rgba(18, 43, 37, 0.75); color: #FFFFFF; font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: var(--radius-full); backdrop-filter: blur(4px);">
              ${m.category}
            </span>
            <button class="btn btn-sm delete-mem-btn" data-id="${m.id}" style="position: absolute; top: 8px; right: 8px; width: 28px; height: 28px; border-radius: var(--radius-full); background-color: rgba(231, 111, 81, 0.85); color: #FFFFFF; display: flex; align-items: center; justify-content: center; padding: 0; font-size: 0.75rem;" title="Delete photo">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
          <div style="padding: 14px;">
            <h4 style="font-weight: 700; font-size: 0.92rem; color: var(--text-primary);">${m.title}</h4>
            <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 4px;"><i class="fa-regular fa-calendar"></i> ${m.date}</div>
          </div>
        </div>
      `).join("");

      // Filter tabs
      document.querySelectorAll("[data-memory-filter]").forEach(tab => {
        tab.addEventListener("click", () => {
          document.querySelectorAll("[data-memory-filter]").forEach(t => t.classList.remove("active"));
          tab.classList.add("active");
          this.render();
        });
      });

      // Delete buttons
      grid.querySelectorAll(".delete-mem-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = btn.dataset.id;
          const updated = this.getMemories().filter(m => m.id !== id);
          this.saveMemories(updated);
          Toast.show("Memory photo removed", "fa-solid fa-trash-can");
        });
      });
    },

    initUpload() {
      const fileInput = document.getElementById("memory-file-input");
      const titleInput = document.getElementById("memory-title-input");
      const catInput = document.getElementById("memory-cat-input");
      const uploadForm = document.getElementById("add-memory-form");

      if (!uploadForm || !fileInput) return;

      uploadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const file = fileInput.files[0];
        const title = titleInput ? titleInput.value.trim() : "Pet Memory";
        const cat = catInput ? catInput.value : "Family Moments";

        if (!title) {
          Toast.show("Please enter a title for your memory", "fa-solid fa-circle-exclamation");
          return;
        }

        const addMemoryItem = (imgSrc) => {
          const newMem = {
            id: `mem-${Date.now()}`,
            category: cat,
            title,
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            image: imgSrc
          };
          const list = [newMem, ...this.getMemories()];
          this.saveMemories(list);
          Toast.show(`New memory added to ${cat}!`, "fa-solid fa-camera");
          uploadForm.reset();
          if (window.FurEverCare && window.FurEverCare.Modal) {
            window.FurEverCare.Modal.close("add-memory-modal");
          }
        };

        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            addMemoryItem(re.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          // Default fallback photo
          addMemoryItem("https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80");
        }
      });
    }
  };

  // --- 30. GROOMING PROGRESS TRACKER (grooming-videos.html) ---
  const GroomingProgressTracker = {
    init() {
      this.render();
    },

    getWatched() {
      try {
        const stored = localStorage.getItem("furever_watched_videos");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {}
      return ["groom-brushing", "groom-bathing"];
    },

    markWatched(videoId) {
      const watched = this.getWatched();
      if (!watched.includes(videoId)) {
        watched.push(videoId);
        localStorage.setItem("furever_watched_videos", JSON.stringify(watched));
        this.render();
        Toast.show("Grooming lesson completed! Progress updated.", "fa-solid fa-award");
        if (watched.length >= 2) {
          AchievementsEngine.unlock("grooming_pro");
        }
      }
    },

    render() {
      const totalLessons = window.GROOMING_VIDEOS_DATA ? window.GROOMING_VIDEOS_DATA.length : 6;
      const watched = this.getWatched();
      const pct = Math.round((watched.length / totalLessons) * 100);

      const countEl = document.getElementById("grooming-progress-count");
      const pctEl = document.getElementById("grooming-progress-pct");
      const barEl = document.getElementById("grooming-progress-bar");

      if (countEl) countEl.textContent = `${watched.length} / ${totalLessons} Lessons Completed`;
      if (pctEl) pctEl.textContent = `${pct}% Complete`;
      if (barEl) barEl.style.width = `${pct}%`;
    }
  };

  // --- 31. FIND VET HELP ENGINE (veterinarian.html & emergency.html) ---
  const FindVetHelpEngine = {
    init() {
      const grid = document.getElementById("clinics-directory-grid");
      const cityFilter = document.getElementById("clinics-city-filter");
      const erFilter = document.getElementById("clinics-247-filter");
      if (!grid || typeof window.CLINICS_DATA === "undefined") return;

      const render = () => {
        const city = cityFilter ? cityFilter.value : "all";
        const erOnly = erFilter ? erFilter.checked : false;

        let list = [...window.CLINICS_DATA];
        if (city !== "all") {
          list = list.filter(c => c.city.toLowerCase() === city.toLowerCase());
        }
        if (erOnly) {
          list = list.filter(c => c.isOpen247);
        }

        if (!list.length) {
          grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px;" class="card">
              <i class="fa-solid fa-hospital" style="font-size: 2.5rem; color: var(--primary-400); margin-bottom: 12px;"></i>
              <h4 style="color: var(--text-primary); font-size: 1.05rem;">No clinics matching your filters</h4>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 4px;">Try selecting "All Cities" or toggling the 24/7 filter off.</p>
            </div>
          `;
          return;
        }

        grid.innerHTML = list.map(c => `
          <div class="card" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 10px;">
                <span class="badge" style="background-color: ${c.isOpen247 ? "rgba(231, 111, 81, 0.12)" : "rgba(45, 106, 79, 0.12)"}; color: ${c.isOpen247 ? "var(--accent-peach)" : "var(--primary-600)"}; font-weight: 700;">
                  <i class="fa-solid ${c.isOpen247 ? "fa-bolt" : "fa-clock"}"></i> ${c.statusBadge}
                </span>
                <span style="font-size: 0.78rem; font-weight: 600; color: var(--text-muted);"><i class="fa-solid fa-location-arrow"></i> ${c.distanceDemo}</span>
              </div>

              <h3 style="font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; line-height: 1.3;">
                ${c.name}
              </h3>
              <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 12px;">
                <i class="fa-solid fa-location-dot" style="color: var(--primary-500);"></i> ${c.address}
              </p>

              <div style="margin-bottom: 14px;">
                <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 6px;">Clinical Capabilities:</div>
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                  ${c.specializations.map(s => `<span class="personality-tag" style="font-size: 0.7rem;">${s}</span>`).join("")}
                </div>
              </div>
            </div>

            <div style="padding-top: 14px; border-top: 1px solid var(--border-light); display: flex; align-items: center; justify-content: space-between; gap: 10px;">
              <a href="tel:${c.phone.replace(/[^0-9+]/g, '')}" class="btn btn-primary btn-sm" style="flex: 1; justify-content: center; font-size: 0.82rem;">
                <i class="fa-solid fa-phone"></i> Call Clinic
              </a>
              <button class="btn btn-secondary btn-sm map-directions-btn" data-name="${c.name}" style="padding: 6px 12px; font-size: 0.82rem;" title="Get Directions">
                <i class="fa-solid fa-diamond-turn-right"></i>
              </button>
            </div>
          </div>
        `).join("");

        grid.querySelectorAll(".map-directions-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            Toast.show(`Opening emergency transit route to ${btn.dataset.name}`, "fa-solid fa-map-location-dot");
          });
        });
      };

      if (cityFilter) cityFilter.addEventListener("change", render);
      if (erFilter) erFilter.addEventListener("change", render);
      render();
    }
  };

  // --- INITIALIZE ALL MODULES ON DOM READY ---
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Immediately dismiss loader
    try { PageLoader.init(); } catch (e) { console.warn(e); }

    // 2. Safe Module Executor
    const safeInit = (module, name) => {
      try {
        if (module && typeof module.init === "function") {
          module.init();
        }
      } catch (err) {
        console.warn(`[FurEver Care] ${name} initialization notice:`, err);
      }
    };

    safeInit(ScrollRestorationManager, "ScrollRestorationManager");
    safeInit(ThemeManager, "ThemeManager");
    safeInit(CalmMode, "CalmMode");
    safeInit(LiveClock, "LiveClock");
    safeInit(GeolocationManager, "GeolocationManager");
    safeInit(VisitorCounter, "VisitorCounter");
    safeInit(ScrollProgress, "ScrollProgress");
    safeInit(CustomCursor, "CustomCursor");
    safeInit(PawTrail, "PawTrail");
    safeInit(BackToTop, "BackToTop");
    safeInit(MobileNav, "MobileNav");
    safeInit(Personalization, "Personalization");
    safeInit(Modal, "Modal");
    safeInit(GlobalSearch, "GlobalSearch");
    safeInit(ReminderCenter, "ReminderCenter");
    safeInit(HelpCenter, "HelpCenter");
    safeInit(HeroCarousel, "HeroCarousel");
    safeInit(ProductsCatalog, "ProductsCatalog");
    safeInit(AdoptablePets, "AdoptablePets");
    safeInit(FormsHandler, "FormsHandler");
    safeInit(TabsAndAccordions, "TabsAndAccordions");
    safeInit(GroomingVideoPlayer, "GroomingVideoPlayer");
    safeInit(AudioEducationalPlayer, "AudioEducationalPlayer");
    safeInit(WellnessScoreEngine, "WellnessScoreEngine");
    safeInit(AchievementsEngine, "AchievementsEngine");
    safeInit(CareJourneyTracker, "CareJourneyTracker");
    safeInit(DailyTipEngine, "DailyTipEngine");
    safeInit(CareCalendarEngine, "CareCalendarEngine");
    safeInit(PetQuizEngine, "PetQuizEngine");
    safeInit(FeedingCalculatorEngine, "FeedingCalculatorEngine");
    safeInit(AdoptionMatcherEngine, "AdoptionMatcherEngine");
    safeInit(PetMemoriesEngine, "PetMemoriesEngine");
    safeInit(GroomingProgressTracker, "GroomingProgressTracker");
    safeInit(FindVetHelpEngine, "FindVetHelpEngine");
  });

  // Global helper exposures
  window.FurEverCare = {
    ThemeManager,
    CalmMode,
    Toast,
    Modal,
    GlobalSearch,
    ReminderCenter,
    Personalization,
    VisitorCounter,
    AchievementsEngine,
    GroomingProgressTracker,
    ScrollRestorationManager
  };

})();

