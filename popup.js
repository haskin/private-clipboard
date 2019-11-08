function setPopUp() {

  /* Deletes the copiesContainer that has all copies. This is done to 
   * refresh the popup when one of the copies is deleted. copiesContainer
   * is added back once the storage is imported.*/
  const tempContainer = document.querySelector(".copiesContainer");
  if(tempContainer)
    tempContainer.remove();

  //Container that stores all the copyContainer
  const copiesContainer = document.createElement("div");
  copiesContainer.className = "copiesContainer";
  document.getElementById("mainBody").appendChild(copiesContainer); ///append Item

  chrome.storage.local.get("tempClipKey", (object) => {
    // console.log(object.tempClipKey || []);
  
    
    clipboard = (object.tempClipKey) || [];
    console.log(clipboard);
    // clipboard.reverse().forEach((copy, index) => {
    clipboard.reverse().forEach((copy, index) => {
      console.log(index);
  
      //Container for each copy
      const container = document.createElement("div");
      container.className = "copyContainer"
  
      // Ordinal Number
      const ordinal = document.createElement("span")
      ordinal.className = "copyContainer__ordinal"
      ordinal.innerHTML = index + 1;
      ordinal.style.visibility = "hidden";
  
      //Content node element
      const node = document.createElement("li"); // Create a <li> node
      node.innerHTML = copy;
      node.className = "copyContainer__content";
  
      //Copy Button
      const copyButton = document.createElement("button");
      copyButton.className = "copyContainer__copy";
      copyButton.innerHTML = "Copy";
      copyButton.onclick = copyButtonOnClickHandler;
  
      //Delete Button
      const deleteButton = document.createElement("button");
      deleteButton.className = "copyContainer__delete";
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = deleteButtonOnClickHandler;
  
      //Append everthing to container and then to document
      container.appendChild(ordinal);
      const line = document.createElement("HR"); 
      container.appendChild(node);
      container.appendChild(copyButton);
      container.appendChild(deleteButton);
      container.appendChild(line);
      document.querySelector(".copiesContainer").appendChild(container); ///append Item
    }); 
  });
}

function copyButtonOnClickHandler(event){
  let range = document.createRange();

  //Clears any selections(highligthed) elements.
  let selection = window.getSelection();
  selection.removeAllRanges();

  //Adds copyContainer__content to range.
  range.selectNode(event.path[1].children[1]);

  // Add that range to the selection.
  selection.addRange(range);
  document.execCommand("copy"); 

  //Clears the selections so it's not highlighted.
  selection.removeAllRanges();
}

function deleteButtonOnClickHandler(event){
  /*Gets the index from the span element that is in 
  /the copy container with the delete button.*/
  
  const deleteIndex = event.path[1].children[0].innerHTML - 1;
  chrome.storage.local.get("tempClipKey", (object) => {
   
    oldClipBoard = object.tempClipKey;
    //Filter based on index.
    newClipBoard = oldClipBoard.reverse().filter((copy, index) => index != deleteIndex);
    chrome.storage.local.set({"tempClipKey": newClipBoard});
    setPopUp()
  });
}

setPopUp();
