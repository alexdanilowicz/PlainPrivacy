
function loadPopup(domain){
  if ( domain == "stackoverflow" ){
    domain = "stackexchange";
  }

  chrome.storage.sync.get(["status"], function(status){
    if ( status.status == 0 ){
      return;
    }
    chrome.storage.sync.get([domain], function(data){
      console.log(data[domain]);
      let allInfo = JSON.parse(data[domain]);
      results = allInfo.results;

      document.getElementById("why").innerHTML = allInfo.summary;
      document.getElementById("why").style.display = "none";
      document.getElementById("loader-gif").style.display = "none";
      document.getElementById("container").style.display = "flex";
      document.getElementById("container").style.flexDirection = "column";
      document.getElementById("nav").style.display = "flex";
      document.getElementById("nav").style.flexDirection = "row";
      document.getElementById("nav").style.justifyContent = "space-around";
      document.getElementById("what-butt").style.color = "white";
      document.getElementById("what-butt").style.backgroundColor = "#6666cc";
      document.getElementById("what-butt").onclick = function(){
        document.getElementById("why").style.display = "none";
        document.getElementById("what").style.display = "block";

        document.getElementById("what-butt").style.color = "white";
        document.getElementById("what-butt").style.backgroundColor = "#6666cc";
        document.getElementById("why-butt").style.color = "#6666cc";
        document.getElementById("why-butt").style.backgroundColor = "white";
      }

      document.getElementById("why-butt").onclick = function(){
        document.getElementById("what").style.display = "none";
        document.getElementById("why").style.display = "block";

        document.getElementById("what-butt").style.color = "#6666cc";
        document.getElementById("what-butt").style.backgroundColor = "white";
        document.getElementById("why-butt").style.color = "white";
        document.getElementById("why-butt").style.backgroundColor = "#6666cc";
      }

      document.getElementsByTagName("body")[0].style.height = "auto";
      document.getElementById("may").innerHTML = title(domain) + " may";
      let didRun = false;
      if ( results == "We are unable to run our analysis on this website"){
        document.getElementsById("may").innerHTML = results;
      }
      else{
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

          newListItem.innerHTML = lastWord ? `${keyTitle} ${text} and ${lastWord}` : `${keyTitle}s ${keywords[0]}`;

          allList.appendChild(newListItem);
        }
      }

      if ( !didRun ){
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
