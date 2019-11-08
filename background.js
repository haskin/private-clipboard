console.log("Hello background");

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {}
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({"tempClipKey": []});
  chrome.tabs.query({"status":"complete"}, (tabs) => {
    tabs.forEach((tab) => {
      //Excludes chrome tabs including "chrome://extensions/"
      if(tab.url.substring(0,9) != "chrome://"){
        chrome.tabs.executeScript(tab.id, {file: "onCopy.js"}, function(result) {
          // Process |result| here (or maybe do nothing at all).
        });
      }
    });
  });
});


chrome.runtime.onStartup.addListener(function() {
  // chrome.storage.local.clear();
  chrome.storage.local.set({"tempClipKey": []});
  chrome.tabs.query({"status":"complete"}, (tabs) => {
    tabs.forEach((tab) => {
      //Excludes chrome tabs including "chrome://extensions/"
      if(tab.url.substring(0,9) != "chrome://"){
        chrome.tabs.executeScript(tab.id, {file: "onCopy.js"}, function(result) {
          // Process |result| here (or maybe do nothing at all).
        });
      }
    });
  });
});

// const TEMP_CLIP_KEY = "tempClipKey";
// chrome.storage.sync.set({"tempClipKey": []});

/* browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.event == "copy") {
    alert("copy detected");
  }
  sendResponse({});
});
 */