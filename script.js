document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── i18n: translations (en / pt-PT) ─────────────────────────────────────────
  const I18N = {
    en: {
      skip: 'Skip to content',
      nav_about: 'about', nav_experience: 'experience', nav_skills: 'skills',
      nav_projects: 'projects', nav_contact: 'contact',
      hero_label: '~/ backend-engineer',
      hero_desc:
        'I build production-grade backend systems — REST APIs, OTA channel integrations, and distributed event pipelines that keep thousands of short-term rental properties in sync across Booking.com, Airbnb, and Vrbo. Python and Django.',
      cta_contact: 'get in touch', cta_cv: 'view cv',
      sec_about: 'about', sec_experience: 'experience', sec_skills: 'skills',
      sec_projects: 'projects', sec_additional: 'additional', sec_contact: 'contact',
      about_p1:
        'Backend engineer with six years of production experience, focused on API design, distributed systems, and performance-critical services — the kind that stay reliable under load, integrate cleanly with external systems, and remain maintainable as they scale.',
      about_p2:
        'Currently at GuestReady / RentalReady, building integration and pricing features for a Django-based property management platform that orchestrates availability, rates, and channel distribution for thousands of properties across Booking.com, Airbnb, and Vrbo. Previously at Wavecom, I designed microservices in Python and Go, built real-time monitoring infrastructure for HPC clusters, and delivered ETL pipelines from greenfield to production.',
      about_p3:
        'I care about the hard parts — data consistency, service boundaries, database performance, and clean API contracts — and I write code every day, using AI tools like Claude Code and Cursor to move faster without losing the thread.',
      about_loc_label: 'location', about_role_label: 'role', about_edu_label: 'education',
      about_role_val: 'Backend Engineer @ GuestReady / RentalReady',
      about_edu_val: 'M.Sc Electronics & Telecommunications, University of Aveiro',
      exp1_period: 'Oct 2024 — Present', exp1_loc: 'Remote', exp1_role: 'Backend Engineer',
      exp1_b1: 'Built and maintained live channel integrations with Booking.com, Airbnb, and Vrbo — real-time sync of availability, rates, and reservations for thousands of short-term rental properties',
      exp1_b2: 'Delivered promotions features connecting GuestReady to Airbnb, Vrbo, and Booking.com, enabling dynamic discount campaigns across OTA channels',
      exp1_b3: 'Built scheduled and recurring background tasks with Celery to automate time-based workflows — for example, activating promotions when a property goes live',
      exp1_b4: 'Built a Redis hash-based deduplication layer that prevents reprocessing of stale events, cutting redundant work in the channel pipeline',
      exp1_b5: 'Implemented New Relic monitoring alarms for proactive production observability and faster incident response',
      exp1_b6: 'Triaged production incidents with Sentry and Datadog; ran zero-downtime bulk operations on large PostgreSQL tables',
      exp1_b7: 'Maintained engineering quality through code review on a distributed team of 40+ engineers',
      exp1_b8: 'Mentored junior developers, sharing backend best practices through code review and pairing',
      exp1_b9: 'Delivered frontend work alongside backend, including a full revamp of the Amenities page',
      exp1_b10: 'Accelerated delivery with AI coding tools (Claude Code, Cursor)',
      exp2_period: 'Jan 2021 — Oct 2024', exp2_loc: 'Aveiro, PT (Hybrid)', exp2_role: 'Software Engineer',
      exp2_b1: 'Designed and built microservices in Python and Go, using gRPC and Protocol Buffers for typed inter-service communication',
      exp2_b2: 'Built REST APIs backed by SQL and NoSQL stores; containerized all services with Docker and Docker Compose',
      exp2_b3: 'Architected a real-time monitoring platform for HPC clusters using Grafana and VictoriaMetrics as the time-series backend',
      exp2_b4: 'Built ETL pipelines with Telegraf and Pandas to process, aggregate, and analyze infrastructure telemetry at scale',
      exp2_b5: 'Automated build and deployment workflows with Makefiles and Bash; evaluated technologies through research and PoCs',
      edu_period: '2014 — 2020', edu_loc: 'Aveiro, PT',
      edu_role: 'M.Sc Electronics & Telecommunications Engineering',
      edu_note: '<strong>Thesis:</strong> Recovery and Identification of Moments — Grade: 19/20',
      edu_b1: 'Developed a Python image retrieval system associating images to moments described in natural language text',
      skills_note: 'Core stack <span class="primary-marker">highlighted</span>.',
      sk_languages: 'Languages', sk_frameworks: 'Frameworks', sk_databases: 'Databases',
      sk_apis: 'APIs & Messaging', sk_infra: 'Infrastructure', sk_observability: 'Observability',
      sk_tooling: 'Tooling', sk_ai: 'AI Tooling',
      proj1_desc: 'Task management app built with Django and PostgreSQL. REST API design with structured data modeling and a maintainable backend architecture.',
      proj2_desc: 'Because someone has to be held accountable. Log production incidents, name the culprit, and watch the shame leaderboard do the rest.',
      proj3_desc: 'Real-time monitoring platform for HPC clusters. Aggregates metrics from distributed compute nodes using Python collectors, VictoriaMetrics as the time-series backend, and Grafana for visualization.',
      proj4_desc: 'This site — built without frameworks as a static page with vanilla HTML, CSS, and JavaScript.',
      proj5_desc: 'Enterprise PMS for short-term rentals. Backend powered by Django, PostgreSQL, RabbitMQ, and Redis — managing multi-channel distribution across global OTA platforms at scale.',
      add_links_label: 'Relevant Links', add_languages_label: 'Languages',
      link_bighpc_site: 'BigHPC — Project Website',
      link_bighpc_talk: 'BigHPC — Conference Talk',
      link_thesis: 'Thesis — UA Repository',
      link_thesis_paper: 'Thesis Paper — CEUR Proceedings',
      lang_pt: 'Portuguese', lang_pt_badge: 'Native', lang_en: 'English', lang_en_badge: 'Fluent',
      contact_intro: 'Open to backend and full-stack engineering roles. Based in Portugal — fully remote.',
      form_name: 'Name', form_email: 'Email', form_message: 'Message',
      btn_send: 'send message', form_sending: 'sending...', form_sent: 'sent!', form_failed: 'failed',
      footer_built: 'built with vanilla html · css · js',
    },
    pt: {
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
      proj1_desc: 'Aplicação de gestão de tarefas construída com Django e PostgreSQL. Design de API REST com modelação de dados estruturada e uma arquitetura backend fácil de manter.',
      proj2_desc: 'Porque alguém tem de ser responsabilizado. Regista incidentes de produção, identifica o culpado e deixa o quadro da vergonha fazer o resto.',
      proj3_desc: 'Plataforma de monitorização em tempo real para clusters HPC. Agrega métricas de nós de computação distribuídos usando coletores em Python, VictoriaMetrics como backend de séries temporais e Grafana para visualização.',
      proj4_desc: 'Este site — construído sem frameworks, como uma página estática em HTML, CSS e JavaScript puros.',
      proj5_desc: 'PMS empresarial para arrendamentos de curta duração. Backend assente em Django, PostgreSQL, RabbitMQ e Redis — a gerir distribuição multicanal por plataformas OTA globais em escala.',
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
    },
  };

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

  setTheme(localStorage.getItem('theme') || 'dark');

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });

  // ── Language ───────────────────────────────────────────────────────────────
  const langToggle = document.querySelector('[data-lang-toggle]');

  function applyLang(lang) {
    if (!I18N[lang]) lang = 'en';
    const dict = I18N[lang];
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = dict[el.getAttribute('data-i18n')];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = dict[el.getAttribute('data-i18n-html')];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const v = dict[el.getAttribute('data-i18n-ph')];
      if (v != null) el.setAttribute('placeholder', v);
    });

    if (langToggle) {
      langToggle.textContent = lang === 'en' ? 'PT' : 'EN';
      langToggle.setAttribute('aria-label', lang === 'en' ? 'Mudar para Português' : 'Switch to English');
    }
  }

  function t(key) {
    const lang = document.documentElement.getAttribute('lang') || 'en';
    return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  }

  applyLang(localStorage.getItem('lang') || 'en');

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('lang') === 'pt' ? 'en' : 'pt';
      applyLang(next);
    });
  }

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
    btnText.textContent = t('form_sending');

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
});
