/// <reference path="//Microsoft.WinJS.0.6/js/base.js" />
/// <reference path="//Microsoft.WinJS.0.6/js/ui.js" />
(function () {
    "use strict";
    WinJS.UI.Pages.define("/html/noselection.html", {
        ready: function (targetElement) {
            document.getElementById("numberCount").innerText
     = ViewModel.UserData.getItems().length;
        }
    });

    WinJS.UI.Pages.define("/html/storeDetail.html", {
        ready: function (targetElement) {
            ViewModel.State.bind("selectedItemIndex", function (newValue) {
                document.getElementById('noStoreSelectionContainer').style.display
                = (newValue != -1 ? "none" : "");
                document.getElementById('storeSelectionContainer').style.display
                = (newValue == -1 ? "none" : "");
                if (newValue != -1) {
                    var store = ViewModel.UserData.getItems().getAt(newValue).store;
                    var url = "http://" + store.replace(" ", "") + ".com";
                    url = "https://www.bing.com/search?q=" + store;
                    document.getElementById("storeFrame").src = url;
                }
            });
        }
    })
})();