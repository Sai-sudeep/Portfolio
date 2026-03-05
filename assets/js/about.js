// ============================================================
// ABOUT PAGE — Interactive Navigation & Slideshow
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ----------------------------------------------------------
  // CONFIG
  // ----------------------------------------------------------
  var TOTAL_IMAGES     = 29;
  var IMAGE_PATH       = '/images/';
  var AUTO_INTERVAL_MS = 5000;   // 5 s auto-advance
  var PAUSE_AFTER_MS   = 8000;   // 8 s pause after user action

  // Index of the "Artistic Dimension" section (0-based, matches button order)
  var SLIDESHOW_SECTION_INDEX = 2;

  // ----------------------------------------------------------
  // STEP 1 — Inject images into every .slideshow-wrapper
  //           that does not already contain <img> elements.
  // ----------------------------------------------------------
  function injectSlideshowImages() {
    var wrappers = document.querySelectorAll('.slideshow-wrapper');
    wrappers.forEach(function (wrapper) {
      if (wrapper.querySelectorAll('img').length === 0) {
        wrapper.innerHTML = ''; // clear any leftover HTML comments / whitespace
        for (var i = 1; i <= TOTAL_IMAGES; i++) {
          var img       = document.createElement('img');
          img.src       = IMAGE_PATH + i + '.jpg';
          img.alt       = 'Musical performance and artistic expression ' + i;
          img.loading   = i === 1 ? 'eager' : 'lazy';
          wrapper.appendChild(img);
        }
      }
    });
  }

  // ----------------------------------------------------------
  // STEP 2 — Build and start a slideshow for one container.
  //           Images are queried *inside* this function so they
  //           are always read from the live DOM after injection.
  // ----------------------------------------------------------
  function buildSlideshow(slideshowEl) {
    var wrapper        = slideshowEl.querySelector('.slideshow-wrapper');
    var dotsContainer  = slideshowEl.querySelector('.slideshow-dots');

    if (!wrapper) return;

    // Query images now — after injectSlideshowImages() has run.
    var images = wrapper.querySelectorAll('img');

    if (images.length === 0) return;

    var currentSlide  = 0;
    var slideInterval = null;
    var isPlaying     = false;

    // ---- Wrapper layout ----
    wrapper.style.display    = 'flex';
    wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    images.forEach(function (img) {
      img.style.flexShrink = '0';
      img.style.width      = '100%';
      img.style.objectFit  = 'cover';
    });

    // ---- Dots ----
    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      images.forEach(function (_, idx) {
        var dot = document.createElement('button');
        dot.className = idx === 0 ? 'dot active' : 'dot';
        dot.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
        dot.setAttribute('data-slide', idx);
        dot.addEventListener('click', function () {
          goToSlide(idx);
          resetInterval();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsContainer) return;
      var dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach(function (dot, idx) {
        dot.classList.toggle('active', idx === currentSlide);
        dot.setAttribute('aria-pressed', idx === currentSlide ? 'true' : 'false');
      });
    }

    // ---- Navigation ----
    function goToSlide(idx) {
      if (idx < 0 || idx >= images.length) return;
      currentSlide = idx;
      wrapper.style.transform = 'translateX(' + (-currentSlide * 100) + '%)';
      updateDots();
      announceSlide();
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % images.length);
    }

    function prevSlide() {
      goToSlide((currentSlide - 1 + images.length) % images.length);
    }

    // ---- Auto-play ----
    function startAuto() {
      if (images.length <= 1) return;
      if (slideInterval) return; // already running
      slideInterval = setInterval(nextSlide, AUTO_INTERVAL_MS);
      isPlaying = true;
      slideshowEl.classList.add('playing');
    }

    function stopAuto() {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
      isPlaying = false;
      slideshowEl.classList.remove('playing');
    }

    function resetInterval() {
      stopAuto();
      setTimeout(startAuto, PAUSE_AFTER_MS);
    }

    // ---- Accessibility live region ----
    function announceSlide() {
      var liveRegion = slideshowEl.querySelector('.slideshow-live-region');
      if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.className = 'slideshow-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        Object.assign(liveRegion.style, {
          position: 'absolute', width: '1px', height: '1px',
          padding: '0', margin: '-1px', overflow: 'hidden',
          clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: '0'
        });
        slideshowEl.appendChild(liveRegion);
      }
      var img = images[currentSlide];
      liveRegion.textContent = (img ? img.alt : '') +
        '. Slide ' + (currentSlide + 1) + ' of ' + images.length;
    }

    // ---- Image loading feedback ----
    images.forEach(function (img, idx) {
      img.addEventListener('load',  function () { this.classList.add('loaded'); });
      img.addEventListener('error', function () {
        console.warn('Slideshow: failed to load', this.src);
      });
    });

    // ---- Touch / swipe ----
    var touchStartX = 0;
    slideshowEl.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    slideshowEl.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
        resetInterval();
      }
    }, { passive: true });

    // ---- Keyboard ----
    slideshowEl.addEventListener('keydown', function (e) {
      switch (e.key) {
        case 'ArrowLeft':  e.preventDefault(); prevSlide(); resetInterval(); break;
        case 'ArrowRight': e.preventDefault(); nextSlide(); resetInterval(); break;
        case 'Home':       e.preventDefault(); goToSlide(0); resetInterval(); break;
        case 'End':        e.preventDefault(); goToSlide(images.length - 1); resetInterval(); break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          isPlaying ? stopAuto() : startAuto();
          break;
      }
    });

    // ---- Hover pause / resume ----
    slideshowEl.addEventListener('mouseenter', stopAuto);
    slideshowEl.addEventListener('mouseleave', startAuto);
    slideshowEl.addEventListener('focusin',    stopAuto);
    slideshowEl.addEventListener('focusout',   startAuto);

    // ---- Page Visibility API ----
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stopAuto() : startAuto();
    });

    // ---- Reduced motion ----
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wrapper.style.transition = 'none';
    }

    // ---- Window resize — keep position correct ----
    window.addEventListener('resize', function () {
      wrapper.style.transition = 'none';
      wrapper.style.transform  = 'translateX(' + (-currentSlide * 100) + '%)';
      // Re-enable transition after a tick
      setTimeout(function () {
        wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }, 50);
    });

    // ---- Expose a resume hook so the nav system can restart auto-play
    //      when the section becomes visible ----
    slideshowEl._slideshowResume = startAuto;
    slideshowEl._slideshowStop   = stopAuto;

    // ---- Initialise ----
    createDots();
    goToSlide(0);
    startAuto();

    // ARIA on container
    slideshowEl.setAttribute('role',     'region');
    slideshowEl.setAttribute('tabindex', '0');
  }

  // ----------------------------------------------------------
  // STEP 3 — Navigation buttons ↔ content sections
  // ----------------------------------------------------------
  function initNavigation() {
    var navButtons      = document.querySelectorAll('.nav-btn');
    var contentSections = document.querySelectorAll('.content-section');

    if (navButtons.length === 0) return;

    // Hide all sections except the first
    contentSections.forEach(function (section, idx) {
      section.style.display = idx === 0 ? 'block' : 'none';
    });

    // Mark first button active
    navButtons[0].classList.add('active');

    navButtons.forEach(function (btn, idx) {
      btn.addEventListener('click', function () {

        // Update active button
        navButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Show target section, hide others
        contentSections.forEach(function (section, sIdx) {
          if (sIdx === idx) {
            section.style.display = 'block';
            section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // If this section contains a slideshow, resume auto-play.
            // We restart the slideshow because it was initialised while hidden
            // (the container had height but IntersectionObserver may have paused it).
            if (idx === SLIDESHOW_SECTION_INDEX) {
              var slideshowEl = section.querySelector('.slideshow-container');
              if (slideshowEl && typeof slideshowEl._slideshowResume === 'function') {
                slideshowEl._slideshowResume();
              }
            }
          } else {
            // Pause any slideshow in sections being hidden
            var otherSlideshow = section.querySelector('.slideshow-container');
            if (otherSlideshow && typeof otherSlideshow._slideshowStop === 'function') {
              otherSlideshow._slideshowStop();
            }
            section.style.display = 'none';
          }
        });
      });
    });
  }

  // ----------------------------------------------------------
  // STEP 4 — Wire everything together
  // ----------------------------------------------------------

  // 4a. Inject images first (synchronous DOM operation)
  injectSlideshowImages();

  // 4b. Build slideshows (images now exist in DOM)
  document.querySelectorAll('.slideshow-container').forEach(function (el) {
    buildSlideshow(el);
  });

  // 4c. Set up navigation
  initNavigation();

  // ----------------------------------------------------------
  // Public API (optional — lets HTML call these if needed)
  // ----------------------------------------------------------
  window.controlSlideshow = function (slideshowId, action, slideIndex) {
    var el = document.getElementById(slideshowId);
    if (!el) return;
    if (action === 'resume' && el._slideshowResume) el._slideshowResume();
    if (action === 'stop'   && el._slideshowStop)   el._slideshowStop();
  };

  window.configureSlideshowSettings = function (settings) {
    // No-op stub kept for backwards compatibility with any existing calls.
    console.log('Slideshow settings (read-only in this version):', settings);
  };

  window.configureSlideshowSettings({
    autoSlideInterval:    AUTO_INTERVAL_MS,
    pauseAfterInteraction: PAUSE_AFTER_MS
  });

});
