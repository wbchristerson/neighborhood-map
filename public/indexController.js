// This file is taken from a previous project that I completed which involved
// the use of a service worker. The original file can be found on my GitHub
// account here: https://github.com/wbchristerson/mws-restaurant-stage-1/blob/master/js/indexController.js

(function() {
  'use strict';
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('service-worker.js')
    .catch(function(error) {
      console.log("Registration failed:", error);
    });
  }
})();
