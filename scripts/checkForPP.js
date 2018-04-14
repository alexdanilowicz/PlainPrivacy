// function checkForValidUrl(tabId, changeInfo, tab)
// {
//   console.log(document.querySelector('body'));
//     if (typeof tab != "undefined" && typeof tab != "null" ){
//             console.log(document.querySelector('body'));
//             // ... show the page action.
//             chrome.pageAction.show(tabId);
//     }
// };
//
// function checkForPrivacyPolicy(tabId, changeInfo, tab){
//   console.log(document.querySelector('body'));
//   // chrome.tabs.executeScript(tabId, {file:"scripts/checkForPP.js"}, function(){
//   //   console.log("called");
//   // });
// }

function checkForPrivacyPolicy(){
  var anchors = document.getElementsByTagName('a');

  for (var i = 0; i < anchors.length; i++) {
      if (anchors[i].href.includes("privacy")) {
          // console.log(anchors[i].href);
          // console.log("True");
          // policy url

          // Code to call server will be here
          console.log(anchors[i].href)
          return true;
      }
  }
  return false;
}


console.log("this script was loaded");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let tabId = request.args.tabId;
    let pp = checkForPrivacyPolicy();
    sendResponse(pp);
});
