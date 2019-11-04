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
