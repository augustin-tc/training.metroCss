// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

(function () {
    "use strict";
   
    var app = WinJS.Application;
    app.onactivated = function (eventObject) {
        if (eventObject.detail.kind ===
        Windows.ApplicationModel.Activation.ActivationKind.launch) {
            if (eventObject.detail.previousExecutionState !==
            Windows.ApplicationModel.Activation.ApplicationExecutionState.terminated) {
                performInitialSetup(eventObject);
            } else {
                performRestore(eventObject);
            }
            WinJS.UI.processAll();
        }
    };
    app.oncheckpoint = function (eventObject) {
        performSuspend(eventObject);
    };
    app.start();
    function performInitialSetup(e) {

        WinJS.Binding.processAll(document.body, ViewModel);
        
        WinJS.UI.processAll().then(function () {
            UI.List.displayListItems();
            UI.List.setupListEvents();
        });

        WinJS.Utilities.query('#newZipButton').listen("click", function (e) {
            ViewModel.UserData.homeZipCode = WinJS.Utilities.query('#newZip')[0].value;
        });

        WinJS.Utilities.query('button').listen("click", function (e) {
            if (this.id == "addItemButton") {
                ViewModel.UserData.addItem("Ice Cream", 1, "Vanilla", "Walmart");
            } else {
                ViewModel.UserData.getItems().pop();
            }
        });
        var setValue = function () {
            var list = ViewModel.UserData.getItems();

            document.getElementById("listInfo").innerText = list.getAt(list.length - 1).item;
        };
        var eventTypes = ["itemchanged", "iteminserted", "itemmoved", "itemremoved"];
        eventTypes.forEach(function (type) {
            ViewModel.UserData.getItems().addEventListener(type, setValue);
        });
        setValue();

    };

  

    function performRestore(e) {
        // TODO
    }
    function performSuspend(e) {
        // TODO
    }
})();