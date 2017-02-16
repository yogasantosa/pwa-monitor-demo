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
            // enable the live data
            document.querySelector(".monitors-list").classList.remove('loading')
            // remove the offline message
            document.getElementById("offline").remove();
            // load the live data
        },
        showOfflineWarning: function() {
            // disable the live data
            document.querySelector(".monitors-list").classList.add('loading')
            alert('You are in offline mode');
        }
    }

})();
