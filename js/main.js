var API_KEY = 'AAAA2sz2lT0:APA91bG3-YTz4k6CKaJDstKCwgmCT4iKAQTvuRtWkEzBteQNoHlaOaLp3cpdhUHjTZbwTo9rH5WZTQO914S4S6gqkFUG-VOQMzhaCAN3LzEzWhDb7MrXd3AovoytzaULBVtcYZ14fy3j';
var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';

// register the service worker if available
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
        console.log('Successfully registered service worker', reg);
    }).catch(function(err) {
        console.warn('Error whilst registering service worker', err);
    });
}

window.addEventListener('online', function(e) {
    // re-sync data with server
    console.log("You are online");
    Page.hideOfflineWarning();
    Monitors.loadData();
}, false);

window.addEventListener('offline', function(e) {
    // queue up events for server
    console.log("You are offline");
    Page.showOfflineWarning();
}, false);

// check if the user is connected
if (navigator.onLine) {
    Monitors.loadData();
} else {
    // show offline message
    Page.showOfflineWarning();
}

// set knockout view model bindings
ko.applyBindings(Page.vm);
