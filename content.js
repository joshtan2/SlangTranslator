var isClicked = false;
var isVisible = false;
document.addEventListener("contextmenu", myFunction);
var rightClick = null;

function myFunction(e) {
  rightClick = e;
  if (isClicked) {
    console.log("I clicked");
    const element = e.target;
    var text = element.innerHTML;
    isClicked = false;
  }
}

function showFunction() {
  console.log("testing show def");
  if (isVisible == false) {
    document.getElementsByClassName("dropdown-content")[0].style.display =
      "block";
    isVisible = true;
  } else {
    document.getElementsByClassName("dropdown-content")[0].style.display =
      "none";
    isVisible = false;
  }
}
function showDefinition() {
  console.log("testing show def");
  if (isVisible == false) {
    document.getElementsByClassName("dropdown-content")[0].style.display =
      "block";
    isVisible = true;
  } else {
    document.getElementsByClassName("dropdown-content")[0].style.display =
      "none";
    isVisible = false;
  }
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var selectedText = request.message.toLowerCase();
  var urbantext = "";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9a23e8135amsh97955907a5eb660p146193jsnb2c740c6ac0e",
      "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
    },
  };

  fetch(
    "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" +
      selectedText,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let def = response.list;
      console.log(def);
      urbantext = def[0].definition;
      console.log(urbantext);
      console.log(request.message);
      var selectedText = request.message;
      isClicked = true;
      console.log(rightClick.target);
      var text = rightClick.target.innerHTML;
      var index = text.indexOf(selectedText);
      var left = text.substring(0, index);
      var right = text.substring(index + selectedText.length, text.length);
      var dropdown = document.createElement("div");
      text =
        '<div style="position: relative; display: inline-block;" class="dropdown" ><button style="background-color: #3498DB; color: white; padding: 2px; font-size: 16px; border: none; cursor: pointer;" class="dropbtn">' +
        selectedText +
        '</button><div style="position: absolute;background-color: #f1f1f1;min-width: 160px;box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);z-index: 1;" id="myDropdown" class="dropdown-content" style="display: none; position: absolute;        background-color: #f1f1f1; min-width: 160px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1;"><p style="color: black;padding: 12px 16px;text-decoration: none;display: block;">' +
        urbantext +
        "</p></div></div>";

      rightClick.target.innerHTML = left + text + right;
      document
        .getElementsByClassName("dropbtn")[0]
        .addEventListener("click", showFunction);
      document.getElementsByClassName("dropdown-content")[0].style.display =
        "visible";

      //   rightClick.target.innerHTML =
      //     text.substring(0, index) +
      //     selectedText +
      //     " [definition:  " +
      //     urbantext +
      //     "]" +
      //     text.substring(index + selectedText.length, text.length);
    })
    .catch((err) => console.error(err));
});

// window.onclick = function (event) {
//   if (!event.target.matches(".dropbtn")) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// };
