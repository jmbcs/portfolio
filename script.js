document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Theme ────────────────────────────────────────────────────────────────
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle.querySelector('use');

  function setTheme(theme) {
    const dark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.setAttribute('href', dark ? '#i-sun' : '#i-moon');
    themeToggle.setAttribute('aria-pressed', String(dark));
  }

  // Sync the toggle with the theme already applied by the inline <head> script
  setTheme(localStorage.getItem('theme') || 'dark');

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });

  // ── Nav: scroll state & active link ────────────────────────────────────────
  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-links a')];

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 8);

    const mid = window.scrollY + window.innerHeight * 0.4;
    let current = sections[0]?.id ?? '';
    for (const s of sections) {
      if (s.offsetTop <= mid) current = s.id;
    }

    for (const a of navLinks) {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    }
  }

  // Throttle to one run per animation frame
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateNav();
        ticking = false;
      });
    },
    { passive: true }
  );
  updateNav();

  // ── Mobile menu ──────────────────────────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');

  function closeMenu() {
    nav.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('menu-open');
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // ── Smooth scroll ──────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      window.scrollTo({
        top: target.offsetTop - 64,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
  });

  // ── Scroll reveal ──────────────────────────────────────────────────────────
  const revealTargets = document.querySelectorAll(
    [
      '#about .section-label',
      '#about .about-grid',
      '#experience .section-label',
      '.timeline-item',
      '#skills .section-label',
      '#skills .section-note',
      '.skill-group',
      '#projects .section-label',
      '.project-card',
      '#additional .section-label',
      '#additional .additional-grid',
      '#contact .section-label',
      '#contact .contact-intro',
      '#contact .contact-grid',
    ].join(', ')
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    entries =>
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      }),
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );

  revealTargets.forEach(el => revealObserver.observe(el));

  // ── Contact form ───────────────────────────────────────────────────────────
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.disabled = true;
    btnText.textContent = 'sending...';

    try {
      const res = await Promise.race([
        fetch('https://formspree.io/f/mleqnnpd', {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        }),
        new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10_000)),
      ]);

      if (!res.ok) throw new Error('error');
      submitBtn.classList.add('success');
      btnText.textContent = 'sent!';
      form.reset();
    } catch {
      submitBtn.classList.add('error');
      btnText.textContent = 'failed';
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.classList.remove('success', 'error');
        btnText.textContent = 'send message';
      }, 3000);
    }
  });
});
