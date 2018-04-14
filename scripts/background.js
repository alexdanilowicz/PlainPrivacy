chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {

    chrome.tabs.sendMessage(tabId, {args: {"tabId": tabId }}, function(response) {
      if ( response ){
        chrome.pageAction.show(tabId);
      }
      console.log("finished running");
    });
  }
});
