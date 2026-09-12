/* ============================================================
   KYTECH — CONCEPT CARD SWAP
   Drives #concepts-stage: cycles a stacked deck of concept
   cards, auto-advancing on a timer and syncing with clicks on
   the paired #concepts-list. Pure vanilla JS, no dependencies.
   Respects prefers-reduced-motion (stops auto-advance, still
   allows manual selection).
   ============================================================ */
(function(){
  "use strict";

  var stage = document.getElementById('concepts-stage');
  var list = document.getElementById('concepts-list');
  if (!stage || !list) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cards = Array.prototype.slice.call(stage.querySelectorAll('.cs-card'));
  var items = Array.prototype.slice.call(list.querySelectorAll('.concepts-list-item'));
  var total = cards.length;
  if (!total) return;

  var order = cards.map(function(_, i){ return i; }); // order[0] is front card
  var AUTO_MS = 4200;
  var timer = null;

  function render(){
    order.forEach(function(cardIndex, pos){
      var card = cards[cardIndex];
      if (pos < 4) card.setAttribute('data-pos', String(pos));
      else card.setAttribute('data-pos', 'hidden');
    });
    items.forEach(function(item, i){
      item.classList.toggle('active', i === order[0]);
    });
  }

  function advance(){
    var front = order[0];
    var card = cards[front];
    card.setAttribute('data-pos', 'exit');
    order.push(order.shift());
    // let the exit frame paint, then settle into the new stack order
    requestAnimationFrame(function(){
      requestAnimationFrame(render);
    });
  }

  function goTo(targetIndex){
    if (order[0] === targetIndex) return;
    // rotate `order` so targetIndex becomes the front card
    while (order[0] !== targetIndex){
      order.push(order.shift());
    }
    render();
    restartAuto();
  }

  function startAuto(){
    if (reduceMotion) return;
    timer = window.setInterval(advance, AUTO_MS);
  }
  function stopAuto(){
    if (timer) window.clearInterval(timer);
    timer = null;
  }
  function restartAuto(){
    stopAuto();
    startAuto();
  }

  items.forEach(function(item, i){
    item.addEventListener('click', function(){ goTo(i); });
    item.addEventListener('mouseenter', function(){ goTo(i); });
  });

  stage.addEventListener('mouseenter', stopAuto);
  stage.addEventListener('mouseleave', startAuto);

  render();
  startAuto();

})();
