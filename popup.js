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

function deleteButtonOnClickHandler(event){
  /*Gets the index from the span element that is in 
  /the copy container with the delete button.*/
  const deleteIndex = event.path[1].children[0].innerHTML - 1;
  chrome.storage.sync.get("tempClipKey", (object) => {
    oldClipBoard = object.tempClipKey;
    //Filter based on index.
    newClipBoard = oldClipBoard.filter((copy, index) => index != deleteIndex);
    chrome.storage.sync.set({"tempClipKey": newClipBoard});
  });
}

console.log("about to sync");
chrome.storage.sync.get("tempClipKey", (object) => {
  clipboard = object.tempClipKey;
  clipboard.forEach((copy, index) => {
    console.log(index);
    const container = document.createElement("div");
    container.className = "copyContainer"
    const ordinal = document.createElement("span")
    ordinal.className = "copyContainer__ordinal"
    ordinal.innerHTML = index + 1;
    const node = document.createElement("li"); // Create a <li> node
    node.innerHTML = copy;
    node.className = "copyContainer__content";
    const deleteButton = document.createElement("button");
    deleteButton.className = "copyContainer__delete";
    deleteButton.innerHTML = "delete";
    deleteButton.onclick = deleteButtonOnClickHandler;
    container.appendChild(ordinal);
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
