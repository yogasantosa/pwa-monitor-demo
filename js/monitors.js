var Monitors = (function() {
    function MonitorsViewModel() {
        var self = this;
        self.title = "";
        self.status = "";
        self.description = "";
        self.time = "";
    }

    function MonitorsApiService() {
        var self = this;

        // retrieves all monitors from the API
        self.getAll = function() {
            return new Promise(function(resolve, reject) {
                var request = new XMLHttpRequest();
                request.open('GET', './api/data.json');

                request.onload = function() {
                    // success
                    if (request.status === 200) {
                        // resolve the promise with the parsed response text (assumes JSON)
                        resolve(JSON.parse(request.response));
                    } else {
                        // error retrieving file
                        reject(Error(request.statusText));
                    }
                };

                request.onerror = function() {
                    // network errors
                    reject(Error("Network Error"));
                };

                request.send();
            });
        };
    }

    function MonitorsAdapter() {
        var self = this;

        self.toMonitorsViewModel = function(data) {
            if (data) {
                var vm = new MonitorsViewModel();
                vm.title = data.title;
                vm.status = data.status;
                vm.description = data.description;
                vm.time = data.time;
                return vm;
            }
            return null;
        };

        self.toMonitorsViewModels = function(data) {
            if (data && data.length > 0) {
                return data.map(function(item) {
                    return self.toMonitorsViewModel(item);
                });
            }
            return [];
        };
    }

    function MonitorsController(monitorsApiService, monitorsAdapter) {
        var self = this;

        self.getAll = function() {
            // retrieve all the monitors from the API
            return monitorsApiService.getAll().then(function(response) {
                return monitorsAdapter.toMonitorsViewModels(response);
            });
        };
    }


    // initialize the services and adapters
    var monitorsApiService = new MonitorsApiService();
    var monitorsAdapter = new MonitorsAdapter();

    // initialize the controller
    var monitorsController = new MonitorsController(monitorsApiService, monitorsAdapter);

    return {
        loadData: function() {
            // retrieve all monitors
            document.querySelector(".monitors-list").classList.add('loading')
            monitorsController.getAll().then(function(response) {
                // bind the monitors to the UI
                Page.vm.monitors(response);
                document.querySelector(".monitors-list").classList.remove('loading')
            });
        }
    }

})();
