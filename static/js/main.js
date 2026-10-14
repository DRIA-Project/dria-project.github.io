/* Pure native JS; works with file:// and GitHub Pages subdirectories. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const main = document.querySelector('main');
  const nav = document.querySelector('#section-nav');
  const topLink = document.querySelector('.back-to-top');
  const inView = new Set();
  const userPaused = new WeakSet();
  let sections = [];
  let navLinks = [];
  let scrollQueued = false;

  /* ===== Dynamic navigation and active-section tracking ===== */
  function visible(element) {
    return !element.closest('[hidden]') && element.getClientRects().length > 0;
  }
  function syncNavigation() {
    if (!main || !nav) return;
    sections = Array.from(main.querySelectorAll('section[id][data-nav]')).filter(visible);
    nav.replaceChildren(...sections.map(section => {
      const link = document.createElement('a');
      link.href = `#${section.id}`;
      link.textContent = section.dataset.nav || section.querySelector('h2')?.textContent || section.id;
      return link;
    }));
    navLinks = Array.from(nav.querySelectorAll('a'));
    updateScrollState();
  }
  function updateScrollState() {
    scrollQueued = false;
    const navHeight = document.querySelector('.site-nav')?.getBoundingClientRect().height || 66;
    let current = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= navHeight + 100) current = section;
    }
    if (!current && sections[0]?.getBoundingClientRect().top < window.innerHeight * .6) current = sections[0];
    // Side-by-side sections share a row; prefer the clicked anchor, otherwise the first.
    if (current) {
      const row = sections.filter(section => Math.abs(section.getBoundingClientRect().top - current.getBoundingClientRect().top) < 2);
      current = row.find(section => `#${section.id}` === location.hash) || row[0];
    }
    for (const link of navLinks) {
      const active = link.hash === `#${current?.id}`;
      const wasActive = link.getAttribute('aria-current') === 'location';
      if (active) {
        link.setAttribute('aria-current', 'location');
        if (!wasActive) {
          const rect = link.getBoundingClientRect();
          const container = nav.getBoundingClientRect();
          if (rect.left < container.left || rect.right > container.right) {
            nav.scrollTo({ left: link.offsetLeft - nav.offsetLeft - (nav.clientWidth - link.clientWidth) / 2, behavior: 'auto' });
          }
        }
      } else link.removeAttribute('aria-current');
    }
    if (topLink) topLink.hidden = window.scrollY < 500;
  }
  function queueScrollUpdate() {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScrollState); }
  }
  window.addEventListener('scroll', queueScrollUpdate, { passive: true });
  window.addEventListener('resize', queueScrollUpdate, { passive: true });
  syncNavigation();
  if (main) new MutationObserver(records => {
    if (records.some(record => record.target === main || (record.type === 'attributes' && record.target.matches('section[id]')))) syncNavigation();
  }).observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'data-nav'] });

  /* ===== Anchor scrolling: preserve native URLs, focus, and reduced-motion preference ===== */
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const id = link.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target || !visible(target)) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
    try { history.pushState(null, '', `#${id}`); } catch (_) { /* file:// may restrict history */ }
    if (!target.matches('a, button, input, textarea, [tabindex]')) {
      target.tabIndex = -1;
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    target.focus({ preventScroll: true });
    queueScrollUpdate();
  });

  /* ===== Media loading: placeholder markers avoid requests for missing files ===== */
  function showMediaError(media) {
    const slot = media.closest('.video-slot, .image-slot');
    if (!slot) return;
    slot.classList.add('has-error');
    slot.classList.remove('has-media');
    if (!slot.querySelector('.media-placeholder')) {
      const placeholder = document.createElement('div');
      placeholder.className = 'media-placeholder';
      const label = document.createElement('span');
      label.textContent = `${media.tagName === 'VIDEO' ? 'Video' : 'Image'} placeholder`;
      const path = document.createElement('code');
      path.textContent = media.dataset.src || media.getAttribute('src') || '';
      placeholder.append(label, path);
      slot.append(placeholder);
    }
  }
  function playIfVisible(video) {
    if (!inView.has(video) || document.hidden || reducedMotion.matches || userPaused.has(video)) return;
    const promise = video.play();
    if (promise?.catch) promise.catch(() => { /* Playback controls remain available. */ });
  }
  function loadVideo(video) {
    if (video.hasAttribute('data-placeholder') || !visible(video)) return;
    if (!video.getAttribute('src') && video.dataset.src) {
      video.src = video.dataset.src;
      video.load();
    }
    playIfVisible(video);
  }
  const videoObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      const video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        inView.add(video);
        loadVideo(video);
      } else {
        inView.delete(video);
        video.pause();
      }
    }
  }, { threshold: [0, .1] }) : null;
  document.querySelectorAll('video').forEach(video => {
    video.muted = true;
    // Native autoplay is enabled only after IntersectionObserver attaches a source.
    if (video.hasAttribute('data-placeholder')) return;
    video.addEventListener('loadeddata', () => {
      video.closest('.video-slot')?.classList.add('has-media');
      if (!inView.has(video) || document.hidden || reducedMotion.matches || userPaused.has(video)) video.pause();
      else playIfVisible(video);
    });
    video.addEventListener('error', () => {
      showMediaError(video);
    });
    // Explicit keyboard/pointer controls can resume a video under reduced motion.
    video.addEventListener('pause', () => {
      if (document.activeElement === video && inView.has(video) && !document.hidden) userPaused.add(video);
    });
    video.addEventListener('play', () => {
      if (document.activeElement === video) userPaused.delete(video);
      if (!inView.has(video) || document.hidden) video.pause();
    });
    if (videoObserver) videoObserver.observe(video);
  });
  if (!videoObserver) {
    const updateVideoVisibility = () => document.querySelectorAll('video:not([data-placeholder])').forEach(video => {
      const rect = video.getBoundingClientRect();
      if (visible(video) && rect.bottom > 0 && rect.top < innerHeight) { inView.add(video); loadVideo(video); }
      else { inView.delete(video); video.pause(); }
    });
    window.addEventListener('scroll', updateVideoVisibility, { passive: true });
    window.addEventListener('resize', updateVideoVisibility, { passive: true });
    updateVideoVisibility();
  }
  document.addEventListener('visibilitychange', () => {
    document.querySelectorAll('video').forEach(video => {
      if (document.hidden) video.pause(); else playIfVisible(video);
    });
  });
  reducedMotion.addEventListener('change', () => {
    document.querySelectorAll('video').forEach(video => {
      if (reducedMotion.matches) video.pause(); else playIfVisible(video);
    });
  });

  /* ===== Optional logo ===== */
  document.querySelectorAll('img[data-optional-logo]').forEach(img => {
    img.addEventListener('load', () => { img.hidden = false; });
    img.addEventListener('error', () => { img.hidden = true; });
    if (!img.hasAttribute('data-placeholder')) img.src = img.dataset.src;
  });
  const imageObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || !visible(entry.target)) return;
      entry.target.src = entry.target.dataset.src;
      imageObserver.unobserve(entry.target);
    });
  }, { rootMargin: '150px' }) : null;
  document.querySelectorAll('.image-slot img[data-src]:not([data-placeholder])').forEach(img => {
    img.addEventListener('load', () => img.closest('.image-slot').classList.add('has-media'));
    img.addEventListener('error', () => showMediaError(img));
    if (imageObserver) imageObserver.observe(img); else img.src = img.dataset.src;
  });

  /* ===== BibTeX: stays hidden until enabled in HTML; file:// clipboard fallback ===== */
  const copyButton = document.querySelector('#copy-bibtex');
  const bibtex = document.querySelector('#bibtex-code');
  const status = document.querySelector('#copy-status');
  let copyTimeout;
  copyButton?.addEventListener('click', async () => {
    if (!bibtex || !status) return;
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(bibtex.textContent); copied = true; }
    } catch (_) { /* Fall back for direct file previews and restricted permissions. */ }
    if (!copied) {
      const text = document.createElement('textarea');
      text.value = bibtex.textContent;
      text.className = 'copy-fallback';
      text.setAttribute('readonly', '');
      document.body.append(text);
      text.select();
      try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
      text.remove();
      copyButton.focus({ preventScroll: true });
    }
    status.textContent = copied ? 'Copied!' : 'Copy unavailable. Please select and copy the citation.';
    clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => { status.textContent = ''; }, 2000);
  });
})();
