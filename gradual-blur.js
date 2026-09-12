/* ============================================================
   KYTECH — GRADUAL BLUR
   Builds a progressive-blur strip on any element carrying
   [data-gradual-blur]. Options via data attributes:
     data-gradual-blur-edge   "top" | "bottom"   (default "bottom")
     data-gradual-blur-height CSS length          (default "6rem")
     data-gradual-blur-strength number             (default 2)
     data-gradual-blur-layers integer               (default 6)
   The host element must have position: relative (or be the
   viewport root for a fixed strip — not used on this site).
   ============================================================ */
(function(){
  "use strict";

  function buildBlur(host){
    var edge = host.getAttribute('data-gradual-blur-edge') || 'bottom';
    var height = host.getAttribute('data-gradual-blur-height') || '6rem';
    var strength = parseFloat(host.getAttribute('data-gradual-blur-strength')) || 2;
    var layerCount = parseInt(host.getAttribute('data-gradual-blur-layers'), 10) || 6;

    var wrap = document.createElement('div');
    wrap.className = 'gradual-blur';
    wrap.setAttribute('data-edge', edge);
    wrap.style.height = height;
    wrap.setAttribute('aria-hidden', 'true');

    var direction = edge === 'top' ? 'to top' : 'to bottom';

    for (var i = 1; i <= layerCount; i++){
      var progress = i / layerCount;
      var blurValue = (0.0625 * (progress * layerCount + 1) * strength).toFixed(3);

      var increment = 100 / layerCount;
      var p1 = Math.max(0, Math.round((increment * i - increment) * 10) / 10);
      var p2 = Math.round(increment * i * 10) / 10;
      var p3 = Math.round((increment * i + increment) * 10) / 10;
      var p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      var gradient = 'transparent ' + p1 + '%, black ' + p2 + '%';
      if (p3 <= 100) gradient += ', black ' + p3 + '%';
      if (p4 <= 100) gradient += ', transparent ' + p4 + '%';

      var layer = document.createElement('div');
      layer.className = 'gradual-blur-layer';
      layer.style.maskImage = 'linear-gradient(' + direction + ', ' + gradient + ')';
      layer.style.webkitMaskImage = layer.style.maskImage;
      layer.style.backdropFilter = 'blur(' + blurValue + 'rem)';
      layer.style.webkitBackdropFilter = layer.style.backdropFilter;
      wrap.appendChild(layer);
    }

    host.appendChild(wrap);
  }

  function init(){
    var hosts = document.querySelectorAll('[data-gradual-blur]');
    hosts.forEach(buildBlur);
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
