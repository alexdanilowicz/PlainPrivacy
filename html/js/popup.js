
function loadPopup(domain){
  // hardcoded this because it's a Hackathon LOL
  if ( domain == "stackoverflow" ){
    domain = "stackexchange";
  }

  summary = "";
  chrome.storage.sync.get(["status"], function(status){
    if ( status.status == 0 ){
      return;
    }
    chrome.storage.sync.get([domain], function(data){
      console.log(data[domain]);
      let allInfo;
      if ( typeof data[domain] == "undefined" || data[domain] == "undefined"){
        allInfo = null;
      }
      else {
        allInfo = JSON.parse(data[domain]);
        results = allInfo.results;
        document.getElementById("whycontent").innerHTML = allInfo.summary;
        summary = allInfo.summary;
      }
      document.getElementById("warning").style.display = "block";
      document.getElementById("why").style.display = "none";
      document.getElementById("loader-gif").style.display = "none";
      document.getElementById("container").style.display = "flex";
      document.getElementById("container").style.flexDirection = "column";
      document.getElementById("nav").style.display = "flex";
      document.getElementById("nav").style.flexDirection = "row";
      document.getElementById("nav").style.justifyContent = "space-around";

      if ( typeof data[domain] == "undefined" || data[domain] == "undefined" ){
        document.getElementById("warning").style.display = "none";
        document.getElementById("may").innerHTML = "We are unable to run our analysis on this website";
        return;
      }

      document.getElementById("what-butt").style.color = "white";
      document.getElementById("what-butt").style.backgroundColor = "#6666cc";
      document.getElementById("what-butt").onclick = function(){
        document.getElementById("why").style.display = "none";
        document.getElementById("what").style.display = "block";
        document.getElementById("warning").style.display = "block";

        document.getElementById("what-butt").style.color = "white";
        document.getElementById("what-butt").style.backgroundColor = "#6666cc";
        document.getElementById("why-butt").style.color = "#6666cc";
        document.getElementById("why-butt").style.backgroundColor = "white";
      }

      document.getElementById("why-butt").onclick = function(){
        document.getElementById("what").style.display = "none";
        document.getElementById("why").style.display = "block";
        document.getElementById("warning").style.display = "block";


        // Added
        if (summary != "We cannot provide a summary for this website's privacy policy.") {
          document.getElementById("warning").style.display = "block";
          document.getElementById("whysentence").innerHTML = title(domain) + " collects your data in order to: ";
        }

        document.getElementById("what-butt").style.color = "#6666cc";
        document.getElementById("what-butt").style.backgroundColor = "white";
        document.getElementById("why-butt").style.color = "white";
        document.getElementById("why-butt").style.backgroundColor = "#6666cc";
      }

      document.getElementsByTagName("body")[0].style.height = "auto";
      document.getElementById("may").innerHTML = title(domain) + " may: ";



      let didRun = false;
      if ( results == "We are unable to run our analysis on this website"){
        document.getElementsById("may").innerHTML = results;

      }
      else{
        document.getElementById("warning").style.display = "block";
        let allList = document.getElementById("all-list");
        for ( let key in results ){
          didRun = true;
          let newListItem = document.createElement("li");

          let keyTitle = title(key);
          let keywords = results[key];
          let lastWord = null;
          if ( keywords.length > 1 ){
            lastWord = keywords.pop();
          }

          let text = keywords.join(", ");

          newListItem.innerHTML = lastWord ? `<strong> ${keyTitle} </strong> ${text} and ${lastWord}` : `<strong> ${keyTitle} </strong> ${keywords[0]}`;

          allList.appendChild(newListItem);
        }
      }

      if ( !didRun ){
        document.getElementById("warning").display = "none";
        document.getElementById("may").innerHTML = "We are unable to run our analysis on this website";
      }
    });
  });

}

function title(str) {
  return str.replace(/\b\S/g, function(t) { return t.toUpperCase() });
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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  var views = chrome.extension.getViews({ type: "popup"});
  if ( request.args.data == 'received' && views.length > 0){
    onInit();
  }
});

document.addEventListener('DOMContentLoaded', onInit, false);

// window.onload(onInit);
