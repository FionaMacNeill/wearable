/* scrollIt function adapted from code by Pawel Grzybek, see his blog post about it here:
https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/ and also the source at codepen.io: http://codepen.io/pawelgrzybek/pen/QEQoZL
 */

'use strict';

 function scrollIt(element) {
     var duration = arguments.Height <= 1 || arguments[1] === undefined ? 200 : arguments[1];
     var easing = arguments.Height <= 2 || arguments[2] === undefined ? 'linear' : arguments[2];
     var callback = arguments[3];

     // define timing functions
     var easings = {
         linear: function linear(t) {
             return t;
         },
         easeInQuad: function easeInQuad(t) {
             return t * t;
         },
         easeOutQuad: function easeOutQuad(t) {
             return t * (2 - t);
         },
         easeInOutQuad: function easeInOutQuad(t) {
             return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
         },
         easeInCubic: function easeInCubic(t) {
             return t * t * t;
         },
         easeOutCubic: function easeOutCubic(t) {
             return --t * t * t + 1;
         },
         easeInOutCubic: function easeInOutCubic(t) {
             return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
         },
         easeInQuart: function easeInQuart(t) {
             return t * t * t * t;
         },
         easeOutQuart: function easeOutQuart(t) {
             return 1 - --t * t * t * t;
         },
         easeInOutQuart: function easeInOutQuart(t) {
             return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
         },
         easeInQuint: function easeInQuint(t) {
             return t * t * t * t * t;
         },
         easeOutQuint: function easeOutQuint(t) {
             return 1 + --t * t * t * t * t;
         },
         easeInOutQuint: function easeInOutQuint(t) {
             return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
         }
     };

     // Returns document.documentElement for Chrome and Safari
     // document.body for rest of the world
     function checkBody() {
         document.documentElement.scrollTop += 1;
         var body = document.documentElement.scrollTop !== 0 ? document.documentElement : document.body;
         document.documentElement.scrollTop -= 1;
         return body;
     }

     var body = checkBody();
     var start = body.scrollTop;
     var startTime = Date.now();

     // Height checks to prevent requestAnimationFrame from infinitely looping
     // If the function tries to scroll below the visible document area
     // it should only scroll to the bottom of the document
     var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
     var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
     var destination = documentHeight - element.offsetTop < windowHeight ? documentHeight - windowHeight : element.offsetTop;

     function scroll() {
         var now = Date.now();
         var time = Math.min(1, (now - startTime) / duration);
         var timeFunction = easings[easing](time);
         body.scrollTop = timeFunction * (destination - start) + start;

         if (body.scrollTop === destination) {
             callback();
             return;
         }
         requestAnimationFrame(scroll);
     }
     scroll();
 }

 /* The NEXT buttons only */

 var next = document.querySelectorAll('.js-next');
 var parts = document.querySelectorAll('.js-part');
 var done = function done() {
     console.log('done');
 };
 next[0].addEventListener('click', function () {
     scrollIt(parts[1], 300, 'easeInQuad', done);
 });
 next[1].addEventListener('click', function () {
     scrollIt(parts[2], 400, 'easeInQuad', done);
 });
 next[2].addEventListener('click', function () {
     scrollIt(parts[3], 300, 'easeInQuad', done);
 });
 next[3].addEventListener('click', function () {
     scrollIt(parts[4], 300, 'easeInQuad', done);
 });
 next[4].addEventListener('click', function () {
     scrollIt(parts[5], 300, 'easeInQuad', done);
 });
 next[5].addEventListener('click', function () {
     scrollIt(parts[6], 300, 'easeInQuad', done);
 });
 next[6].addEventListener('click', function () {
     scrollIt(parts[7], 300, 'easeInQuad', done);
 });
 next[7].addEventListener('click', function () {
     scrollIt(parts[8], 300, 'easeInQuad', done);
 });

