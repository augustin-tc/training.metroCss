// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/ItemDetail.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var selectedIndex = ViewModel.State.selectedItemIndex;
            var selectedItem = ViewModel.UserData.getItems().getAt(selectedIndex);
            document.getElementById("item").value = selectedItem.item;
            document.getElementById("quantity").value = selectedItem.quantity;
            var selectElement = WinJS.Utilities.query('select#stores')[0];
            WinJS.Utilities.empty(selectElement);
            var list = ViewModel.UserData.getStores();
            list.forEach(function (item) {
                var newOption = document.createElement("option");
                newOption.text = item;
                if (selectedItem.store == item) {
                    newOption.selected = true;
                }
                selectElement.add(newOption);
            });

        },


        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
    WinJS.Utilities.query('#itemEditor input, #itemEditor select')
        .listen("change", function () {
     ViewModel.UserData.getItems().setAt(selectedIndex, {
         item: document.getElementById("item").value,
         quantity: document.getElementById("quantity").value,
         store: document.getElementById("stores").value
     });
 });

})();
