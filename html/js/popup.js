//
// function loadPopup(domain){
//   chrome.storage.sync.get()
//
// }

var onInit = function(){
  console.log("hi");
  chrome.tabs.getCurrent(function(tab) {
    console.log(tab.url);
    let url = tab.url;
    url = url.replace("www.","");
    let strippedHTTPS = url.split('//')[1];
    let domain = strippedHTTPS.split('.')[0];
    console.log(domain);
    // loadPopup(domain);
  });
}
document.addEventListener('DOMContentLoaded', onInit, false);

// window.onload(onInit);
