/* Plain Privacy  - crawler
 * reads page,
 * loops over all anchor tags, looking for "privacy" string
 * returns privacy policy url is policy on page.
 * returns False otherwise, nothing happens
 */

var grabAnchors = function () {
      var anchors = document.getElementsByTagName('a');

      for (var i = 0; i < anchors.length; i++) {
          if (anchors[i].href.includes("privacy")) {
              console.log(anchors[i].href);
              console.log("True");
              // policy url
              return (anchors[i].href);
          }
      }
      console.log("Privacy policy not found.");
      return false;
}

grabAnchors();
