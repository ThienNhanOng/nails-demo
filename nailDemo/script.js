// Simple site interactions: smooth scroll and nav active state
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    let index = sections.length;
    while(--index && window.scrollY + 120 < sections[index].offsetTop) {}
    navLinks.forEach(link => link.classList.remove('active'));
    const id = sections[index].id;
    const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (activeLink) activeLink.classList.add('active');
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // CTA handler (placeholder)
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      // Replace with real booking flow later
      console.log('Book appointment clicked');
    });
  });

  // Pedicure menu accordion: whole .menu-item acts as the toggle
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    const detailsId = item.getAttribute('aria-controls');
    const details = document.getElementById(detailsId);

    function closeDetails(d) {
      d.classList.remove('open');
      const owner = document.querySelector(`.menu-item[aria-controls="${d.id}"]`);
      if (owner) owner.setAttribute('aria-expanded', 'false');
      setTimeout(() => d.setAttribute('hidden', ''), 360);
    }

    function openDetails(d, owner) {
      // close others
      document.querySelectorAll('.menu-details.open').forEach(d2 => closeDetails(d2));
      d.removeAttribute('hidden');
      requestAnimationFrame(() => {
        owner.setAttribute('aria-expanded', 'true');
        d.classList.add('open');
      });
    }

    // toggle when clicking the item header or the item itself
    item.addEventListener('click', (e) => {
      // if click originated inside the details area, ignore (so links/selects inside details still work)
      if (e.target.closest('.menu-details')) return;
      const isOpen = item.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        item.setAttribute('aria-expanded', 'false');
        details.classList.remove('open');
        setTimeout(() => details.setAttribute('hidden', ''), 360);
      } else {
        openDetails(details, item);
      }
    });

    // Keyboard support on the whole item (Enter/Space)
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
});

// Screen navigation functionality
// removed reviews & Google Places code; small site JS only


