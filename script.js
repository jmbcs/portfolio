document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');

  // ── Theme ──────────────────────────────────────────────────────────────────
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document.getElementById('theme-icon').className =
      theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  // Sync icon with theme already set by the inline <head> script
  setTheme(localStorage.getItem('theme') || 'dark');

  document.querySelector('.theme-toggle').addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });

  // ── Nav: scroll state & active link ───────────────────────────────────────
  const sections = [...document.querySelectorAll('section[id]')];

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 8);

    const mid = window.scrollY + window.innerHeight * 0.4;
    let current = sections[0]?.id ?? '';
    for (const s of sections) {
      if (s.offsetTop <= mid) current = s.id;
    }

    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ── Mobile menu ────────────────────────────────────────────────────────────
  document.querySelector('.nav-toggle').addEventListener('click', () => {
    const open = nav.classList.toggle('menu-open');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('menu-open');
      document.body.style.overflow = '';
    });
  });

  // ── Smooth scroll ──────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
    });
  });

  // ── Scroll reveal ──────────────────────────────────────────────────────────
  const revealTargets = document.querySelectorAll([
    '#about .section-label',
    '#about .about-grid',
    '#experience .section-label',
    '.timeline-item',
    '#skills .section-label',
    '.skill-group',
    '#projects .section-label',
    '.project-card',
    '#additional .section-label',
    '#additional .additional-grid',
    '#contact .section-label',
    '#contact .contact-intro',
    '#contact .contact-grid',
  ].join(', '));

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );

  revealTargets.forEach(el => revealObserver.observe(el));

  // ── Contact form ───────────────────────────────────────────────────────────
  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText   = submitBtn.querySelector('.btn-text');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';

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
      btnText.textContent = 'Sent!';
      form.reset();
    } catch {
      submitBtn.classList.add('error');
      btnText.textContent = 'Failed';
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.classList.remove('success', 'error');
        btnText.textContent = 'Send message';
      }, 3000);
    }
  });
});
