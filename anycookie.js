// AnyCookie 1.0.0 (C) 2016 by Yieme. See: github.com/yieme/anycookie. License: MIT
(function(WINDOW, DOCUMENT, COOKIE, LENGTH, NAMESPACE, options, cookieDomain, i, host, anycookie, globalStore, globalStoreHost, store) {
  WINDOW[NAMESPACE] = WINDOW[NAMESPACE] || [];
  anycookie         = WINDOW[NAMESPACE];
  host              = WINDOW.location.host.replace(/:\d+/, '');
  options           = options           || {}
  cookieDomain      = options.domain    || '.' + host;

  // get value from param-like string (eg, "x=y&name=VALUE")
  function getFromStr(name, text, nameEQ, ca, c, i) {
    if (typeof text !== "string") {
      return;
    }
    nameEQ = name + "="
    ca = text.split(/[;&]/)
    for (i = 0; i < ca[LENGTH]; i++) {
      c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c[LENGTH]);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ[LENGTH], c[LENGTH]);
      }
    }
  };

  // build array of stores with (G)et and (S)et operations
  function add(name, store, getFn, setFn) {
    if (store) {
      store.N = name
      store.G = getFn || store.getItem /* localStore, sessionStorage */
      store.S = setFn || store.setItem /* localStore, sessionStorage */
      anycookie.push(store)
    }
  }

  // add localStore and sessionStorage support
  ['localStore', 'sessionStorage'].forEach(function(value) {
    try {
      add(value, WINDOW[value])
    } catch(e) {}
  })

  // add globalStorage support
  globalStore = WINDOW.globalStorage
  add('globalStorage', globalStore, function(name) { // getFn
    return globalStorage[host][name];
  }, function (name, value) { // setFn
    return globalStorage[host][name] = value;
  })

  add('cookie', [], function(name) { // getFn
    return getFromStr(name, DOCUMENT[COOKIE]);
  }, function(name, value) { // setFn
//    DOCUMENT[COOKIE] = name + "=; expires=Mon, 20 Sep 2010 00:00:00 UTC; path=/; domain=" + cookieDomain; // is this needed?
    DOCUMENT[COOKIE] = name + "=" + value + "; expires=Tue, 31 Dec 2099 00:00:00 UTC; path=/; domain=" + cookieDomain;
  })

  // high level get/set operations against all data stores
  anycookie.get = function(name, result) {
    for(i=0; i < anycookie.length; i++) {
      store = anycookie[i]
      if (store) {
        try {
          result = store.G(name)
          if (undefined !== result) {   // found
            anycookie.set(name, result) // persist everywhere
            return result
          }
        } catch (e) {}
      }
    }
  }

  anycookie.dump = function(name, result) {
    result = {}
    for(i=0; i < anycookie.length; i++) {
      store = anycookie[i]
      if (store) {
        try {
          result[store.N] = store.G(name)
        } catch (e) {}
      }
    }
    return result
  }

  anycookie.set = function(name, value) {
    for(i=0; i < anycookie.length; i++) {
      store = anycookie[i]
      if (store) {
        try {
          store.S(name, value)
        } catch (e) {}
      }
    }
  }

})(window, document, 'cookie', 'length', 'AC')
