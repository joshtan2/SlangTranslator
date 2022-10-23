searchUrbanDict = function (word) {
  var query = word.selectionText;
  chrome.tabs.create({
    url: "http://www.urbandictionary.com/define.php?term=" + query,
  });
};

var contextMenuItem = {
  id: "selectedText",
  title: "Translate slang",
  contexts: ["selection"],
};
chrome.contextMenus.create(contextMenuItem);
// var test2 = function(){
//     var cb = function(html){
//         var t1 = document.getElementById("p");
//         var d = document.createElement("div");
//         d.id ="oiio";
//         d.innerHtml = html;
//         t1.appendChild(d);
//         console.timeEnd("load data with javascript");
//     };
//     console.time("load data with javascript");
//     $.get("test1.html", cb);
// }

// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//     chrome.tabs.sendMessage(tab.id, { message: "TEST" });
//   });
chrome.contextMenus.onClicked.addListener(function (clickData, tab) {
  console.log(clickData);
  console.log(tab.id);
  chrome.tabs.sendMessage(tab.id, { message: clickData.selectionText });
  //   searchUrbanDict(text);
});
