/*
 * This file is based on a service worker implemented for a different project.
 * That original file can be found on my GitHub account here:
 * https://github.com/wbchristerson/mws-restaurant-stage-1/blob/master/service-worker.js
 *
 * From the original file: In completing this section of the assignment, I
 * referenced the Udacity course materials as well as the code and information
 * provided by this page: https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker
 *
 */

let staticCacheName = 'restaurant-cache-v1';

self.addEventListener('install', function(event) {
  // files to be added to cache automatically upon loading the home page
  let urlsToCache = [
    '/',
    'index.html',
    '../src/App.css',
    '../src/index.css',
    '../src/index.js',
    '../src/images/hibiscus.jpg',
    '../src/images/skyline.jpg',
    '../src/images/sunset.jpg',
    '../src/components/App.js',
    '../src/components/ErrorPage.js',
    '../src/components/InfoTab.js',
    '../src/components/MyMap.js',
    '../src/components/MyMarker.js',
    '../src/components/Panorama.js',
    '../src/components/Search.js'
  ];
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// add page resources to the cache when they have not already been visited
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request).then(function(response) {
        // check whether event request was resolved successfully
        if (response.status !== 404) {
          return caches.open(staticCacheName).then(function(cache) {
            cache.put(event.request.url, response.clone());
            return response;
          });
        }
      });
    })
  );
});
