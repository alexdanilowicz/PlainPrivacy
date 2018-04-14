function checkForPrivacyPolicy(){
  var anchors = document.getElementsByTagName('a');

  for (var i = 0; i < anchors.length; i++) {
      if (anchors[i].href.includes("privacy")) {
          // Code to call server will be here
          getAnalysisResults();
          console.log(anchors[i].href)
          return true;
      }
  }
  return false;
}

function getAnalysisResults(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://plainprivacy.herokuapp.com/testroute", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = xhr.responseText;
      console.log(resp);
    }
  }
  xhr.send();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let tabId = request.args.tabId;
    let pp = checkForPrivacyPolicy();
    sendResponse(pp);
});
