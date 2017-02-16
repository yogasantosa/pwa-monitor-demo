var Page = (function() {

    // declare the view model used within the page
    function ViewModel() {
        var self = this;
        self.monitors = ko.observableArray([]);
    }

    // expose the view model through the Page module
    return {
        vm: new ViewModel(),
        hideOfflineWarning: function() {
            // remove the offline message
            document.getElementById("offline-container").setAttribute('style', 'display:none');
        },
        showOfflineWarning: function() {
            // disable the live data
            document.getElementById("offline-container").setAttribute('style', 'display:block');

            if ("vibrate" in navigator) {
            	navigator.vibrate(1000);
            }
        }
    }
})();
