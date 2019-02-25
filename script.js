var map;
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -40.9006, lng: 174.8860},
          zoom: 7
        }); // map
var x,y;
	$.ajax({
		url:'https://api.geonet.org.nz/quake?MMI=3',
		type:'GET',
		dataType:'json',
		success:function(dataFromJSON){
			console.log(dataFromJSON);
			for(var i=0; i<dataFromJSON.features.length; i++) {

			console.log(dataFromJSON.features[i].geometry.coordinates[0]); //longitude
			y = dataFromJSON.features[i].geometry.coordinates[0]; //longitude


			console.log(dataFromJSON.features[i].geometry.coordinates[1]); //latitude
			x = dataFromJSON.features[i].geometry.coordinates[1]; //latitude

			var marker = new google.maps.Marker({
				position: { lat: x, lng: y },
				map: map
      });

			}
		},//success
		error:function(error){
			console.log('Error');
			alert("Something wrong");
		} //error



	})//ajax




      } //initmap
