function checkForPrivacyPolicy(callback){
  var anchors = document.getElementsByTagName('a');
  let openConnections = 0;
  let closedConnections = 0;
  for (var i = 0; i < anchors.length; i++) {
      if (anchors[i].href.includes("privacy")) {
          // Cacheing will be done here
          let domain = getIdentifyingDomainName(anchors[i].href);
          console.log(anchors[i].href);
          let xhr = getAnalysisResults(anchors[i].href, domain);
          openConnections += 1;

          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              let resp = xhr.responseText;
              // console.log("resp");
              // console.log(resp);
              let obj = {};
              obj[domain] = resp;

              console.log(resp);
              if ( resp.length > 100 ){
                chrome.storage.sync.set(obj);
                console.log("saved in: " + domain);
                chrome.storage.sync.set({"status": 1});
                chrome.runtime.sendMessage({data:"received"});

                callback(true);
                return;
              }
              closedConnections += 1;
              if (closedConnections == anchors.length - 1){
                console.log("CLOSED CONNECTIONS");
                return callback(false);
              }

            }
          }
      }

  }
}

function getAnalysisResults(url, domain){
  let xhr = new XMLHttpRequest();
  console.log("request: " + `https://plainprivacy.herokuapp.com/analyzeUrl?url=${url}`);
  xhr.open("GET", `https://plainprivacy.herokuapp.com/analyzeUrl?url=${url}`, true);
  chrome.storage.sync.set({"status": 0});
  xhr.send();

  return xhr;
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
    let pp = checkForPrivacyPolicy(sendResponse);
  }

  return true;

});
