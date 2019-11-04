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

chrome.runtime.onStartup.addListener(function() {
  chrome.storage.local.clear();
});


/* browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.event == "copy") {
    alert("copy detected");
  }
  sendResponse({});
});
 */