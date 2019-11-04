const TEMP_CLIP_KEY = "tempClipKey";

chrome.storage.sync.get(TEMP_CLIP_KEY, clipBoard => {
  clipBoard.forEach((copy) => {
    var node = document.createElement("LI"); // Create a <li> node
    node.text = copy;
    document.getElementById("items").appendChild(node); ///append Item
  }); 
});


chrome.storage.sync.get(null, function(items) {
  var allKeys = Object.keys(items);
  console.log(allKeys);
  allKeys.forEach(key => {
    console.log("key: ", key);
    chrome.storage.sync.get([key], dataObject => {
      console.log("dataObject:", dataObject[key].pageUrl);
      var node = document.createElement("LI"); // Create a <li> node
      node.appendChild(dataObject[key]);
      document.getElementById("items").appendChild(node); ///append Item
    });
  });
});
