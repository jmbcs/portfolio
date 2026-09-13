// Runs as the last node in <body>: the DOM is complete, and swapping the
// language here happens earlier than it would on DOMContentLoaded.
(() => {
  const nav = document.getElementById('nav');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── i18n: English lives in the markup; pt-PT overrides it ──────────────────
  const PT = {
    skip: 'Saltar para o conteúdo',
    nav_about: 'sobre', nav_experience: 'experiência', nav_skills: 'competências',
    nav_projects: 'projetos', nav_contact: 'contacto',
    hero_label: '~/ engenheiro-backend',
    hero_desc:
      'Construo sistemas backend de nível de produção — APIs REST, integrações com canais OTA e pipelines de eventos distribuídos que mantêm milhares de propriedades de arrendamento de curta duração sincronizadas no Booking.com, Airbnb e Vrbo. Python e Django.',
    cta_contact: 'entrar em contacto', cta_cv: 'ver cv',
    sec_about: 'sobre', sec_experience: 'experiência', sec_skills: 'competências',
    sec_projects: 'projetos', sec_additional: 'adicional', sec_contact: 'contacto',
    about_p1:
      'Engenheiro backend com seis anos de experiência em produção, focado em design de APIs, sistemas distribuídos e serviços críticos para o desempenho — daqueles que se mantêm fiáveis sob carga, integram de forma limpa com sistemas externos e continuam fáceis de manter à medida que escalam.',
    about_p2:
      'Atualmente na GuestReady / RentalReady, a construir funcionalidades de integração e de preços para uma plataforma de gestão de propriedades em Django que orquestra disponibilidade, tarifas e distribuição por canais para milhares de propriedades no Booking.com, Airbnb e Vrbo. Anteriormente na Wavecom, desenhei microsserviços em Python e Go, construí infraestrutura de monitorização em tempo real para clusters HPC e entreguei pipelines ETL de raiz até produção.',
    about_p3:
      'Preocupo-me com as partes difíceis — consistência de dados, fronteiras entre serviços, desempenho de base de dados e contratos de API limpos — e escrevo código todos os dias, usando ferramentas de IA como o Claude Code e o Cursor para avançar mais depressa sem perder o fio à meada.',
    about_loc_label: 'localização', about_role_label: 'função', about_edu_label: 'educação',
    about_role_val: 'Engenheiro Backend @ GuestReady / RentalReady',
    about_edu_val: 'Mestrado em Eletrónica e Telecomunicações, Universidade de Aveiro',
    exp1_period: 'Out 2024 — Presente', exp1_loc: 'Remoto', exp1_role: 'Engenheiro Backend',
    exp1_b1: 'Construí e mantive integrações de canais em produção com Booking.com, Airbnb e Vrbo — sincronização em tempo real de disponibilidade, tarifas e reservas para milhares de propriedades de arrendamento de curta duração',
    exp1_b2: 'Entreguei funcionalidades de promoções que ligam a GuestReady ao Airbnb, Vrbo e Booking.com, permitindo campanhas de descontos dinâmicos nos canais OTA',
    exp1_b3: 'Construí tarefas agendadas e recorrentes em segundo plano com Celery para automatizar fluxos baseados em tempo — por exemplo, ativar promoções quando uma propriedade entra em funcionamento',
    exp1_b4: 'Construí uma camada de deduplicação baseada em hashes do Redis que evita o reprocessamento de eventos obsoletos, reduzindo trabalho redundante no pipeline de canais',
    exp1_b5: 'Implementei alarmes de monitorização no New Relic para observabilidade proativa em produção e resposta mais rápida a incidentes',
    exp1_b6: 'Fiz triagem de incidentes de produção com Sentry e Datadog; executei operações em massa sem downtime em tabelas PostgreSQL de grande dimensão',
    exp1_b7: 'Mantive a qualidade de engenharia através de revisão de código numa equipa distribuída de mais de 40 engenheiros',
    exp1_b8: 'Acompanhei programadores júnior, partilhando boas práticas de backend através de revisão de código e programação em par',
    exp1_b9: 'Entreguei trabalho de frontend a par do backend, incluindo uma renovação completa da página de Comodidades',
    exp1_b10: 'Acelerei a entrega com ferramentas de IA para programação (Claude Code, Cursor)',
    exp2_period: 'Jan 2021 — Out 2024', exp2_loc: 'Aveiro, PT (Híbrido)', exp2_role: 'Engenheiro de Software',
    exp2_b1: 'Desenhei e construí microsserviços em Python e Go, usando gRPC e Protocol Buffers para comunicação tipada entre serviços',
    exp2_b2: 'Construí APIs REST suportadas por bases de dados SQL e NoSQL; containerizei todos os serviços com Docker e Docker Compose',
    exp2_b3: 'Arquitetei uma plataforma de monitorização em tempo real para clusters HPC usando Grafana e VictoriaMetrics como backend de séries temporais',
    exp2_b4: 'Construí pipelines ETL com Telegraf e Pandas para processar, agregar e analisar telemetria de infraestrutura em escala',
    exp2_b5: 'Automatizei fluxos de build e deployment com Makefiles e Bash; avaliei tecnologias através de investigação e provas de conceito',
    edu_period: '2014 — 2020', edu_loc: 'Aveiro, PT',
    edu_role: 'Mestrado em Engenharia Eletrónica e de Telecomunicações',
    edu_note: '<strong>Tese:</strong> Recuperação e Identificação de Momentos — Nota: 19/20',
    edu_b1: 'Desenvolvi um sistema de recuperação de imagens em Python que associa imagens a momentos descritos em texto em linguagem natural',
    skills_note: 'Stack principal <span class="primary-marker">destacada</span>.',
    sk_languages: 'Linguagens', sk_frameworks: 'Frameworks', sk_databases: 'Bases de Dados',
    sk_apis: 'APIs & Mensageria', sk_infra: 'Infraestrutura', sk_observability: 'Observabilidade',
    sk_tooling: 'Ferramentas', sk_ai: 'Ferramentas de IA',
    projects_note: 'Projetos pessoais e, a seguir, produtos de equipa em que trabalhei — propriedade das respetivas empresas.',
    proj_group_personal: 'Pessoais', proj_group_work: 'Produtos de equipa em que trabalhei',
    proj1_desc: 'Aplicação de gestão de tarefas construída com Django e PostgreSQL. Design de API REST com modelação de dados estruturada e uma arquitetura backend fácil de manter.',
    proj2_desc: 'Porque alguém tem de ser responsabilizado. Regista incidentes de produção, identifica o culpado e deixa o quadro da vergonha fazer o resto.',
    proj3_role: 'Wavecom · Engenheiro de Software',
    proj3_desc: 'Projeto de investigação na Wavecom. Construí a plataforma de monitorização em tempo real para clusters HPC — coletores em Python, VictoriaMetrics como backend de séries temporais e dashboards em Grafana.',
    proj4_desc: 'Este site — construído sem frameworks, como uma página estática em HTML, CSS e JavaScript puros.',
    proj5_role: 'GuestReady · Engenheiro Backend',
    proj5_desc: 'PMS comercial propriedade da GuestReady, construído por uma equipa de engenharia distribuída. Trabalho na camada de integração de canais — sincronização de disponibilidade e tarifas, promoções e preços.',
    proj6_desc: 'Crawler web concorrente, restrito a um único domínio. Pool de workers em asyncio sobre uma fila com deduplicação, correspondência de robots.txt conforme a RFC 9309, e uma API de jobs opcional com Postgres.',
    add_links_label: 'Links Relevantes', add_languages_label: 'Idiomas',
    link_bighpc_site: 'BigHPC — Site do Projeto',
    link_bighpc_talk: 'BigHPC — Palestra em Conferência',
    link_thesis: 'Tese — Repositório da UA',
    link_thesis_paper: 'Artigo da Tese — Atas CEUR',
    lang_pt: 'Português', lang_pt_badge: 'Nativo', lang_en: 'Inglês', lang_en_badge: 'Fluente',
    contact_intro: 'Disponível para funções de engenharia backend e full-stack. Baseado em Portugal — totalmente remoto.',
    form_name: 'Nome', form_email: 'Email', form_message: 'Mensagem',
    btn_send: 'enviar mensagem', form_sending: 'a enviar...', form_sent: 'enviado!', form_failed: 'falhou',
    footer_built: 'feito com html · css · js puros',
  };

  // ── Theme ────────────────────────────────────────────────────────────────
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle.querySelector('use');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function setTheme(theme) {
    const dark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.setAttribute('href', dark ? '#i-sun' : '#i-moon');
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeMeta.setAttribute('content', cssVar('--c-bg'));
  }

  setTheme(localStorage.getItem('theme') || 'dark');

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });

  // ── Language ───────────────────────────────────────────────────────────────
  const langToggle = document.querySelector('[data-lang-toggle]');
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  const canonicalBase = canonicalLink.href;
  const I18N_PROPS = [
    ['data-i18n', 'textContent'],
    ['data-i18n-html', 'innerHTML'],
  ];

  // Transient button states are the only strings with no home in the markup
  const EN = { form_sending: 'sending...', form_sent: 'sent!', form_failed: 'failed' };

  for (const [attr, prop] of I18N_PROPS) {
    document.querySelectorAll(`[${attr}]`).forEach(el => {
      EN[el.getAttribute(attr)] = el[prop].replace(/\s+/g, ' ').trim();
    });
  }
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    EN[el.getAttribute('data-i18n-ph')] = el.placeholder;
  });

  function applyLang(lang) {
    const pt = lang === 'pt';
    const dict = pt ? PT : EN;
    document.documentElement.setAttribute('lang', pt ? 'pt' : 'en');
    localStorage.setItem('lang', pt ? 'pt' : 'en');

    for (const [attr, prop] of I18N_PROPS) {
      document.querySelectorAll(`[${attr}]`).forEach(el => {
        const v = dict[el.getAttribute(attr)];
        if (v != null) el[prop] = v;
      });
    }
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const v = dict[el.getAttribute('data-i18n-ph')];
      if (v != null) el.placeholder = v;
    });

    langToggle.textContent = pt ? 'EN' : 'PT';
    langToggle.setAttribute('aria-label', pt ? 'Switch to English' : 'Mudar para Português');

    // ?lang=pt makes the translation shareable and gives crawlers a URL to index
    const url = new URL(location.href);
    if (pt) url.searchParams.set('lang', 'pt');
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url);

    const canonical = canonicalBase + (pt ? '?lang=pt' : '');
    canonicalLink.href = canonical;
    ogUrl.setAttribute('content', canonical);
  }

  function t(key) {
    const dict = document.documentElement.getAttribute('lang') === 'pt' ? PT : EN;
    return dict[key] ?? EN[key] ?? key;
  }

  applyLang(new URLSearchParams(location.search).get('lang') || localStorage.getItem('lang'));

  langToggle.addEventListener('click', () => {
    applyLang(document.documentElement.getAttribute('lang') === 'pt' ? 'en' : 'pt');
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
    if (open) navLinks[0].focus();
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !nav.classList.contains('menu-open')) return;
    closeMenu();
    navToggle.focus();
  });

  // Leaving the mobile breakpoint hides the toggle — without this the open
  // menu would leave the body scroll-locked with no way to unlock it.
  window.matchMedia('(max-width: 680px)').addEventListener('change', e => {
    if (!e.matches) closeMenu();
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
        top: target.offsetTop - parseInt(cssVar('--nav-h'), 10),
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
      '#projects .section-note',
      '#projects .sub-label',
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

  document.getElementById('year').textContent = new Date().getFullYear();

  // ── Contact form ───────────────────────────────────────────────────────────
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.disabled = true;
    btnText.textContent = t('form_sending');

    try {
      const res = await fetch('https://formspree.io/f/mleqnnpd', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(10_000),
      });

      if (!res.ok) throw new Error('error');
      submitBtn.classList.add('success');
      btnText.textContent = t('form_sent');
      form.reset();
    } catch {
      submitBtn.classList.add('error');
      btnText.textContent = t('form_failed');
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.classList.remove('success', 'error');
        btnText.textContent = t('btn_send');
      }, 3000);
    }
  });
})();
