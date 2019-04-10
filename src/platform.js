var api;
if (process.env.NODE_ENV === 'development') {
  var e = '';
  api = window.api = {
    storage: {
      local: {
        get: function(e, cb) {
          cb && cb(e);
        },
        set: function(e) {}
      }
    },
    runtime: {
      sendMessage: function(data, cb) {
        cb && cb(e);
      }
    },
    sendMessage: function(data, cb) {
      cb && cb(e);
    },
    extension: {
      onMessage: {
        addListener: function(fn) {}
      }
    },
    webRequest: {
      onBeforeSendHeaders: {
        addListener: function(fn, urls, options) {}
      }
    },
    identity: {
      getProfileUserInfo: function(cb) {
        cb && cb(e)
      }
    }
  }
} else {
  api = window.api = {
    storage: {
      local: {
        get: function(e, cb) {
          chrome.storage.local.get(e, function(e) {
            cb && cb(e);
          })
        },
        set: function(e) {
          chrome.storage.local.set(e);
        }
      }
    },
    runtime: {
      sendMessage: function(data, cb) {
        chrome.runtime.sendMessage(data, function(e) {
          cb && cb(e);
        })
      }
    },
    sendMessage: function(data, cb) {
      chrome.sendMessage(data, function(e) {
        cb && cb(e);
      })
    },
    extension: {
      onMessage: {
        addListener: function(fn) {
          chrome.runtime.onMessage.addListener(fn)
        }
      }
    },
    webRequest: {
      onBeforeSendHeaders: {
        addListener: function(fn, urls, options) {
          chrome.webRequest.onBeforeSendHeaders.addListener(fn, urls, options)
        }
      }
    },
    identity: {
      getProfileUserInfo: function(cb) {
        chrome.identity.getProfileUserInfo(function(e) {
          cb && cb(e)
        })
      }
    }
  }

}
