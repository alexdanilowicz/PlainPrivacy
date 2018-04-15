function checkForPrivacyPolicy(){
  var anchors = document.getElementsByTagName('a');

  for (var i = 0; i < anchors.length; i++) {
      if (anchors[i].href.includes("privacy")) {
          // Cacheing will be done here
          let domain = getIdentifyingDomainName(anchors[i].href);
          console.log(anchors[i].href);
          let results = getAnalysisResults(anchors[i].href, domain);

          return true;
      }
  }
  return false;
}

function getAnalysisResults(url, domain){
  let xhr = new XMLHttpRequest();
  console.log("request: " + `https://plainprivacy.herokuapp.com/analyzeUrl?url=${url}`);
  xhr.open("GET", `https://plainprivacy.herokuapp.com/analyzeUrl?url=${url}`, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      let resp = xhr.responseText;
      console.log("resp");
      console.log(resp);
      let obj = {};
      obj[domain] = resp;
      chrome.storage.sync.set(obj);
      console.log("saved in: " + domain);
      chrome.storage.sync.set({"status": 1});
      chrome.runtime.sendMessage({data:"received"});
    }
  }

  chrome.storage.sync.set({"status": 0});
  xhr.send();
}

function getIdentifyingDomainName(url){
  url = url.replace("www.","");
  let strippedHTTPS = url.split('//')[1];
  let domain = strippedHTTPS.split('.')[0];
  return domain;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if ( request.args.tabId ){
    let tabId = request.args.tabId;
    let pp = checkForPrivacyPolicy();
    sendResponse(pp);
  }
});
