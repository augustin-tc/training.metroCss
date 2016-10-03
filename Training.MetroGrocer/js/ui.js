/// <reference path="//Microsoft.WinJS.0.6/js/base.js" />
/// <reference path="//Microsoft.WinJS.0.6/js/ui.js" />
(function () {
    "use strict";

    //app bar buttons
    WinJS.Namespace.define("UI.AppBar", {
        setupButtons: function () {
            var doneButton = document.getElementById("done");
            ViewModel.State.bind("selectedItemIndex", function (newValue, oldValue) {
                doneButton.disabled = (newValue == -1);
            });
            doneButton.addEventListener("click", function (e) {
                var selectedIndex = ViewModel.State.selectedItemIndex;
                ViewModel.UserData.getItems().splice(selectedIndex, 1);
                ViewModel.State.selectedItemIndex = -1;
            });
        }
    });

    // controls of the flyout
    WinJS.Namespace.define("UI.Flyouts", {
        setupAddItemFlyout: function () {
            var selectElement = WinJS.Utilities.query('select#stores')[0];
            WinJS.Utilities.empty(selectElement);
            var list = ViewModel.UserData.getStores();
            list.forEach(function (item) {
                var newOption = document.createElement("option");
                newOption.text = item;
                selectElement.add(newOption);
            });
            document.getElementById("addItemButton").addEventListener("click",
            function () {
                var item =
                WinJS.Utilities.query("#addItemFlyout #item")[0].value;
                var quantity =
 WinJS.Utilities.query("#addItemFlyout #quantity")[0].value;
                var store = WinJS.Utilities.query("#addItemFlyout #stores")[0].value;
                ViewModel.UserData.addItem(item, quantity, store);
                document.getElementById("addItemFlyout").winControl.hide();
                document.getElementById("appBar").winControl.hide();
            });
        }
    });
    //list of items 
    WinJS.Namespace.define("UI.List", {
        displayListItems: function () {
            var templateElement = document.getElementById("itemTemplate");
            var targetElement = document.getElementById("itemBody");
            WinJS.Utilities.empty(targetElement);
            var list = ViewModel.UserData.getItems();
            for (var i = 0; i < list.length; i++) {
                templateElement.winControl.render(list.getAt(i), targetElement);
            }
            WinJS.Utilities.children(targetElement).listen("click", function (e) {
                ViewModel.State.selectedItemIndex = this.rowIndex - 1;
                WinJS.Utilities.children(targetElement).removeClass("selected");
                WinJS.Utilities.addClass(this, "selected");
            });
        },
        setupListEvents: function () {
            var eventTypes = ["itemchanged", "iteminserted", "itemmoved", "itemremoved"];
            var itemsList = ViewModel.UserData.getItems();
            eventTypes.forEach(function (type) {
                itemsList.addEventListener(type, UI.List.displayListItems);
            });
        },
    });
})();