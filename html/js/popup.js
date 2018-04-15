
function loadPopup(domain){
  chrome.storage.sync.get([domain], function(data){
    console.log(data[domain]);
    // data is now loaded so hide loading gif
    document.getElementById("loading-gif").id = "hide";
  });
}

var onInit = function(){
  var query = { active: true, currentWindow: true };

  function callback(tabs){
    let url = tabs[0].url;
    url = url.replace("www.","");
    let strippedHTTPS = url.split('//')[1];
    let domain = strippedHTTPS.split('.')[0];
    loadPopup(domain);
  }

  chrome.tabs.query(query, callback);
}

document.addEventListener('DOMContentLoaded', onInit, false);

// window.onload(onInit);
