function updateStorage(newContent) {
	try {
		chrome.storage.local.get("tempClipKey", (object) => {
			const storage = (object.tempClipKey) || []
			storage.push(newContent);
			chrome.storage.local.set({"tempClipKey": storage})
		});
	}catch(error){
		console.log(error);
	}
};

document.addEventListener("copy", (event) => {
	const copyContent = window.getSelection().toString();
	updateStorage(copyContent);
});

