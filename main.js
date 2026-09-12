/* ============================================================
   KYTECH — MAIN
   Core site interactivity: nav scroll state, industry accordion,
   FAQ accordion, and the mobile navigation menu.
   ============================================================ */
(function(){
  "use strict";

  /* ---------- Nav scroll state ---------- */
  var nav = document.getElementById('nav');
  function onScroll(){
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- Industry accordion ---------- */
  var industryData = {
    education: {
      title: 'Education',
      items: ['Website', 'Student portals', 'Parent communication', 'Attendance', 'Fee systems', 'Admin dashboards', 'AI automation']
    },
    fitness: {
      title: 'Fitness',
      items: ['Premium website', 'Membership systems', 'Booking', 'Lead capture', 'AI follow-ups', 'Customer dashboard', 'Communication automation']
    },
    health: {
      title: 'Health',
      items: ['Website', 'Appointment workflow', 'Customer communication', 'Reminders', 'Admin dashboard', 'Automation']
    },
    hospitality: {
      title: 'Hospitality',
      items: ['3D website', 'Digital menu', 'Ordering', 'Reservations', 'Loyalty', 'Advertising infrastructure']
    },
    retail: {
      title: 'Retail',
      items: ['Premium website', 'Product catalog', 'Customer engagement', 'Lead capture', 'Admin dashboard', 'Automation']
    },
    property: {
      title: 'Property',
      items: ['Premium website', 'Lead capture', 'AI qualification', 'Automated follow-ups', 'Sales dashboard']
    },
    professional: {
      title: 'Professional',
      items: ['Premium website', 'Booking / enquiry systems', 'Client communication', 'Admin dashboard', 'Automation']
    },
    custom: {
      title: 'Custom',
      items: ['Scoped entirely to the business — discussed during Discover']
    }
  };

  var grid = document.getElementById('industry-grid');
  var detail = document.getElementById('industry-detail');
  var detailInner = document.getElementById('industry-detail-inner');
  var activeCell = null;

  function renderIndustry(key){
    var data = industryData[key];
    if (!data) return;
    var html = '<h4 class="display">' + data.title + '</h4><ul>';
    data.items.forEach(function(item){ html += '<li>' + item + '</li>'; });
    html += '</ul>';
    detailInner.innerHTML = html;
  }

  if (grid){
    grid.addEventListener('click', function(e){
      var cell = e.target.closest('.industry-cell');
      if (!cell) return;
      var key = cell.getAttribute('data-industry');

      if (activeCell === cell && detail.classList.contains('open')){
        detail.classList.remove('open');
        cell.classList.remove('active');
        activeCell = null;
        return;
      }

      if (activeCell) activeCell.classList.remove('active');
      cell.classList.add('active');
      activeCell = cell;
      renderIndustry(key);
      detail.classList.add('open');

      // move the detail panel to sit directly after the row containing this cell
      var gridRect = grid.getBoundingClientRect();
      grid.parentNode.insertBefore(detail, grid.nextSibling);
    });
  }

  /* ---------- FAQ accordion ---------- */
  var faqList = document.getElementById('faq-list');
  if (faqList){
    faqList.addEventListener('click', function(e){
      var btn = e.target.closest('.faq-q');
      if (!btn) return;
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-a');
      var isOpen = item.classList.contains('open');

      faqList.querySelectorAll('.faq-item.open').forEach(function(openItem){
        if (openItem !== item){
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
        }
      });

      if (isOpen){
        item.classList.remove('open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  function closeMenu(){
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.documentElement.classList.remove('menu-open');
  }
  function toggleMenu(){
    var isOpen = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.documentElement.classList.toggle('menu-open', isOpen);
  }
  if (navToggle && mobileMenu){
    navToggle.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', closeMenu);
    });
  }

})();
