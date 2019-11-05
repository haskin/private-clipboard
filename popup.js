const TEMP_CLIP_KEY = "tempClipKey";

function temp_storage(){
  const storage = [
    "one",
    "two",
    "three"
  ]
  chrome.storage.sync.set({"tempClipKey": storage});
}
temp_storage();

console.log("about to sync");
chrome.storage.sync.get("tempClipKey", (object) => {
    clipboard = object.tempClipKey;
    clipboard.forEach((copy) => {
    const container = document.createElement("div");
    container.className = "copyContainer"
    console.log(container);
    const node = document.createElement("li"); // Create a <li> node
    node.innerHTML = copy;
    node.className = "copyContainer__content";
    const deleteButton = document.createElement("button");
    deleteButton.className = "copyContainer__delete";
    deleteButton.innerHTML = "delete";
    container.appendChild(node);
    container.appendChild(deleteButton);
    document.getElementById("items").appendChild(container); ///append Item
  }); 
});


// chrome.storage.sync.get(null, function(items) {
//   var allKeys = Object.keys(items);
//   console.log(allKeys);
//   allKeys.forEach(key => {
//     console.log("key: ", key);
//     chrome.storage.sync.get([key], dataObject => {
//       console.log("dataObject:", dataObject[key].pageUrl);
//       var node = document.createElement("LI"); // Create a <li> node
//       node.appendChild(dataObject[key]);
//       document.getElementById("items").appendChild(node); ///append Item
//     });
//   });
// });
