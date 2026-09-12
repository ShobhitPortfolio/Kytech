/* ============================================================
   KYTECH — ANIMATIONS
   Scroll-progress bar, custom cursor ring, hero load-in sequence,
   reveal-on-scroll system, and magnetic button hover effect.
   Depends on: styles.css + animations.css classes already in the DOM.
   Load after main.js, or independently — this file is self-contained.
   ============================================================ */
(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll progress bar ---------- */
  var scrollProgress = document.getElementById('scroll-progress');
  function onScrollProgress(){
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }
  window.addEventListener('scroll', onScrollProgress, { passive:true });
  window.addEventListener('resize', onScrollProgress);
  onScrollProgress();

  /* ---------- Custom cursor ring (desktop only) ---------- */
  var cursorRing = document.getElementById('cursor-ring');
  var hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (cursorRing && hasFinePointer && !reduceMotion){
    var ringX = 0, ringY = 0, targetX = 0, targetY = 0;
    document.addEventListener('mousemove', function(e){
      targetX = e.clientX;
      targetY = e.clientY;
      cursorRing.classList.add('visible');
    });
    document.addEventListener('mouseleave', function(){
      cursorRing.classList.remove('visible');
    });
    function animateRing(){
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      cursorRing.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px) translate(-50%,-50%)';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    var hoverTargets = 'a, button, .industry-cell, input, textarea, [role="button"]';
    document.addEventListener('mouseover', function(e){
      if (e.target.closest(hoverTargets)) cursorRing.classList.add('hover');
    });
    document.addEventListener('mouseout', function(e){
      if (e.target.closest(hoverTargets)) cursorRing.classList.remove('hover');
    });
  } else if (cursorRing){
    cursorRing.style.display = 'none';
  }

  /* ---------- Hero load-in ---------- */
  var hero = document.getElementById('hero');
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){ hero.classList.add('loaded'); });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)){
    revealEls.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  }

  /* ---------- Magnetic buttons (desktop only, respects reduced motion) ---------- */
  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches){
    document.querySelectorAll('.btn').forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width/2;
        var y = e.clientY - rect.top - rect.height/2;
        btn.style.transform = 'translate(' + (x*0.12) + 'px,' + (y*0.28) + 'px)';
      });
      btn.addEventListener('mouseleave', function(){
        btn.style.transform = '';
      });
    });
  }

})();
