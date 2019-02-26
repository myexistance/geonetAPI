var map;
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -40.9006, lng: 174.8860},
          zoom: 7

        }); // map
      } //init map

//
// var myLatitude, myLongitude, myDepth;
//
 function getValues() {
  myLatitude = document.getElementById('latitude').value;
  myLongitude = document.getElementById('longitude').value;
  myDepth = document.getElementById('depth').value;


console.log(myLatitude,myLongitude,myDepth);




var x,y;
var marker =[];
var winCont = [];
var infowindow = [];
var depth;
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

  if ((x > parseFloat(myLatitude)) && (y > parseFloat(myLongitude))) {
  console.log(dataFromJSON.features[i].properties.depth)

    depth = dataFromJSON.features[i].properties.depth;

    if (depth > myDepth) {
      console.log(depth);

      // markers
			  marker[i] = new google.maps.Marker({
				position: { lat: x, lng: y },
				map: map,
        title: dataFromJSON.features[i].properties.locality
      });

      //content of info windows
      winCont[i] = "time: " + dataFromJSON.features[i].properties.time + "<br>" + "depth: " + dataFromJSON.features[i].properties.depth +
       "<br>" + "magnitude: " + dataFromJSON.features[i].properties.magnitude;

       //infowindows
       infowindow[i] = new google.maps.InfoWindow({
         content: winCont[i]
       });

      // marker click eventlistener
      google.maps.event.addListener(marker[i],'click', (function(marker,content,infowindow){
        return function() {
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }; //return
      }) (marker[i],winCont[i],infowindow[i]));

     }//depth criteria
   } //cordinates criteria
} //for
}, //success

		error:function(error){
			console.log('Error');
			alert("Something wrong");
		} //error



	})//ajax




 } //getValues
