"use strict";

let GoogleApiKeys = {};

app.factory("GoogleFactory",function($q, $http, FIREBASE_CONFIG, GOOGLEAPIKEY){

	let googleList = (searchText) => {
		return $q ((resolve, reject)=>{

			let authHeader = 'Client-ID '+`${GOOGLEAPIKEY.client_id}`;

			$http({
				method:'GET',
				headers:{
					'Authorization': authHeader
				},
				url:`https://maps.googleapis.com/maps/api/js?key=AIzaSyCNWcrjeWrwU9Yoo4DtzVx_3TE3HF7Czl4{searchText}`
			}).then( (response) => {
				console.log('google response', response.data.data.items);
				resolve(response.data.data.items);

			}, (errorResponse) => {
				console.log('google fail', errorResponse);
				reject(errorResponse);
			});	
		});
	};


	return {googleList: googleList};
});

