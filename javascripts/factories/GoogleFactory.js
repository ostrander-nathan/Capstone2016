"use strict";

app.factory("GoogleFactory", function($q, $http, FIREBASE_CONFIG, GOOGLEAPIKEY) {


    var getLocationItems = (map, query) => {
        return new Promise((resolve, reject) => {
            var request = {
                location: map.getCenter(),
                radius: '500',
                query: query
            };
            var service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callback);

            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                    }
                    resolve(results);
                }
                reject();
            }

        });
    };
    return {
        getLocationItems: getLocationItems
    };
});
