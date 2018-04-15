
function loadPopup(domain){
  if ( domain == "stackoverflow" ){
    domain = "stackexchange";
  }
  chrome.storage.sync.get([domain], function(data){
    let allInfo = JSON.parse(data[domain]);
    results = allInfo.results;
    // console.log(results.length);
    // if ( !results.length ){
    //   document.getElementById("loader-gif").style.display = "none";
    //   document.getElementById("unable").style.display = "block";
    //   document.getElementsByTagName("body")[0].style.height = "auto";
    //   return;
    // }
    document.getElementById("why").innerHTML = allInfo.summary;
    document.getElementById("why").style.display = "none";
    // data is now loaded so hide loading gif
    document.getElementById("loader-gif").style.display = "none";
    document.getElementById("container").style.display = "flex";
    document.getElementById("container").style.flexDirection = "column";
    document.getElementById("what-butt").onclick = function(){
      document.getElementById("why").style.display = "none";
      document.getElementById("what").style.display = "block";
    }

    document.getElementById("why-butt").onclick = function(){
      document.getElementById("what").style.display = "none";
      document.getElementById("why").style.display = "block";
    }

    document.getElementsByTagName("body")[0].style.height = "auto";
    document.getElementById("may").innerHTML = title(domain) + " may";

    let allList = document.getElementById("all-list");


    for ( let key in results ){
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
