chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {

    chrome.tabs.sendMessage(tabId, {}, function(response) {
      console.log("finished running");
    });
  }
});
