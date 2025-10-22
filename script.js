// Hamburger menu
(function () {
  const button = document.querySelector('.hamburger-icon');
  const menu = document.getElementById('mobile-menu');

  if (!button || !menu) return;

  function setOpen(isOpen) {
    button.classList.toggle('open', isOpen);
    menu.classList.toggle('open', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('modal--open', isOpen); // lock body scroll
  }

  button.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('open');
    setOpen(isOpen);
  });

  // Close menu when clicking a menu link (data-close-menu)
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-close-menu]');
    if (a) setOpen(false);
  });

  // Close menu on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) setOpen(false);
  });
})();

// Modals
(function () {
  const openers = document.querySelectorAll('[data-open-modal]');
  const modals = new Map();

  function getModal(id) {
    if (modals.has(id)) return modals.get(id);
    const el = document.getElementById(id);
    if (el) modals.set(id, el);
    return el;
  }

  function openModal(id) {
    const modal = getModal(id);
    if (!modal) return;
    modal.hidden = false; // make it visible
    document.body.classList.add('modal--open');
    // focus first focusable element inside
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    (focusable || modal).focus({ preventScroll: false });
  }

  function closeModal(el) {
    if (!el) return;
    el.hidden = true;
    document.body.classList.remove('modal--open');
  }

  // Openers
  openers.forEach((card) => {
    card.addEventListener('click', () => openModal(card.getAttribute('data-open-modal')));
    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.getAttribute('data-open-modal'));
      }
    });
  });

  // Close buttons & backdrop click
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-close-modal]');
    if (closeBtn) {
      const modal = closeBtn.closest('.modal');
      closeModal(modal);
      return;
    }
    const modal = e.target.classList.contains('modal') ? e.target : null;
    if (modal) closeModal(modal);
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal:not([hidden])').forEach((m) => closeModal(m));
  });
})();


// Blog carousel arrows (optional; swipe/scroll works without this)
(function () {
  const blog = document.getElementById('blog');
  if (!blog) return;
  const track = blog.querySelector('.blog-track');
  const prev = blog.querySelector('.blog-nav--prev');
  const next = blog.querySelector('.blog-nav--next');
  if (!track || !prev || !next) return;

  function scrollByStep(dir = 1) {
    const step = Math.max(track.clientWidth * 0.9, 260);
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  }
  prev.addEventListener('click', () => scrollByStep(-1));
  next.addEventListener('click', () => scrollByStep(1));
})();
