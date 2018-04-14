function checkForValidUrl(tabId, changeInfo, tab)
{
  console.log(document.querySelector('body'));
    if (typeof tab != "undefined" && typeof tab != "null" ){
            console.log(document.querySelector('body'));
            // ... show the page action.
            chrome.pageAction.show(tabId);
    }
};

function checkForPrivacyPolicy(tabId, changeInfo, tab){
  console.log(document.querySelector('body'));
  // chrome.tabs.executeScript(tabId, {file:"scripts/checkForPP.js"}, function(){
  //   console.log("called");
  // });
}

function testFunc(){
  console.log('sup');
  console.log(document.querySelector('body'));
}


console.log("this script was loaded");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    testFunc();
    sendResponse(1);
});
