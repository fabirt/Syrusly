//-----------------------------------------
//VARIABLES
//-----------------------------------------
var map;

//Car #1
var marker1, infowindow1, latArray1 = [], lngArray1 = [];

//Car #2
var marker2, infowindow2, latArray2 = [], lngArray2 = [];

//-----------------------------------------
//CLASES
//-----------------------------------------
class Car{
    
    //Consultar DB data
    getDbData(myURL){
       var infodb = function () {
        var temporal = null;
         $.ajax({
          'async': false,
          'type': "POST",
          'global': false,
          'dataType': 'html',
          'url': myURL,
          'success': function (data) {
              temporal = data;    
              }
            });
          return temporal;
        }();
      if (infodb==null) {
        infodb="";
      }
        var decode = infodb.split("\n");
        this.latitud = decode[0];
        this.longitud = decode[1];
        this.fecha = decode[2];
        this.hora = decode[3];      
    }
    
    //Consultar DB values
    getDbValues(myURL){
       var infodb = function () {
        var temporal = null;
         $.ajax({
          'async': false,
          'type': "POST",
          'global': false,
          'dataType': 'html',
          'url': myURL,
          'success': function (data) {
              temporal = data;    
              }
            });
          return temporal;
        }();
      if (infodb==null) {
        infodb="";
      }
        var decode = infodb.split("\n");
        this.CO2 = decode[0];
        this.CO = decode[1];
        this.ammonium = decode[2];   
    }
    
    //Concatenar informacion
    getInfoString(){
        var infoString = 
            '<div class="infowindow">'+
                '<div>'+
                    '<p><b>Latitud: </b>'+this.latitud+'</p>'+
                '</div>'+
                '<div>'+
                    '<p><b>Longitud: </b>'+this.longitud+'</p>'+
                '</div>'+
                '<div>'+
                    '<p><b>Fecha: </b>'+this.fecha+'</p>'+
                '</div>'+
                '<div>'+
                    '<p><b>Hora: </b>'+this.hora+'</p>'+
                '</div>'+
                '<div>'+
                    '<p><b>CO2: </b>'+this.CO2+'</p>'+
                '</div>'+
                '<div>'+
                    '<p><b>CO: </b>'+this.CO+'</p>'+
                '</div>'+
                '<div>'+
                    '<p><b>Amonio: </b>'+this.ammonium+'</p>'+
                '</div>'+
            '</div>';
        return infoString;
    }
    
}
//-----------------------------------------

//-----------------------------------------
//FUNCIONES
//-----------------------------------------

//Inicializar mapa
function initMap() { 
    var cen = {lat: 10.990779895096907, lng:  -74.79696241362012};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: cen
    });
}

//-----------------------------------------
//CARRO #1
//Agregar marcador #1
function addMarker1(myLat, myLng, myInfoString){
    latArray1.push(myLat);
    lngArray1.push(myLng);
    var myPos = {lat: myLat, lng: myLng};
    if(marker1!=null){
        marker1.setPosition(myPos) 
    }
        else{
             marker1 = new google.maps.Marker({
                position: myPos,
                map: map,
                title: "Vehiculo #1",
                icon: "images/car2.png"
            });
        }  
    /*var newCenter = new google.maps.LatLng(myLat, myLng);
    map.panTo(newCenter);*/
    
    if(infowindow1!=null){
        infowindow1.setContent(myInfoString);
       } else{
            infowindow1 = new google.maps.InfoWindow({
                content: myInfoString
            });

            marker1.addListener('click', function() {
                infowindow1.open(map, marker1);
            });
        }
    
}



//Agregar polilinea #1
function addPolyline1(myLatArray, myLngArray){
    var coordenadas = [];
    for (var i = 0; i < myLatArray.length; i++ ) {
        coordenadas[i] = {lat: myLatArray[i], lng: myLngArray[i]};
    }
    var camino = new google.maps.Polyline({
        path: coordenadas,
        geodesic: true,
        strokeColor: '#032D46',
        strokeOpacity: 1.0,
        strokeWeight: 5
    });
    camino.setMap(map);
}




//Tracking car #1
function trackingOne(){
    var dataURL = "getData1.php";
    var valuesURL = "getValues1.php";
    car1.getDbData(dataURL);
    car1.getDbValues(valuesURL);
    var infoString = car1.getInfoString();
    addMarker1(parseFloat(car1.latitud), parseFloat(car1.longitud),infoString);
    addPolyline1(latArray1,lngArray1);
    
}
//-----------------------------------------

//-----------------------------------------
//CARRO #2

//Agregar marcador #2
function addMarker2(myLat, myLng, myInfoString){
    latArray2.push(myLat);
    lngArray2.push(myLng);
    var myPos = {lat: myLat, lng: myLng};
    if(marker2!=null){
        marker2.setPosition(myPos) 
    }
        else{
             marker2 = new google.maps.Marker({
                position: myPos,
                map: map,
                title: "Vehiculo #2",
                icon: "images/car2.png"
            });
        }  
    /*var newCenter = new google.maps.LatLng(myLat, myLng);
    map.panTo(newCenter);*/
    
    if(infowindow2!=null){
        infowindow2.setContent(myInfoString);
       } else{
            infowindow2 = new google.maps.InfoWindow({
                content: myInfoString
            });

            marker2.addListener('click', function() {
                infowindow2.open(map, marker2);
            });
        }
    
}



//Agregar polilinea #2
function addPolyline2(myLatArray, myLngArray){
    var coordenadas = [];
    for (var i = 0; i < myLatArray.length; i++ ) {
        coordenadas[i] = {lat: myLatArray[i], lng: myLngArray[i]};
    }
    var camino = new google.maps.Polyline({
        path: coordenadas,
        geodesic: true,
        strokeColor: '#1B95B0',
        strokeOpacity: 1.0,
        strokeWeight: 5
    });
    camino.setMap(map);
}




//Tracking car #2
function trackingTwo(){
    var dataURL = "getData2.php";
    var valuesURL = "getValues2.php";
    car2.getDbData(dataURL);
    car2.getDbValues(valuesURL);
    var infoString = car2.getInfoString();
    addMarker2(parseFloat(car2.latitud), parseFloat(car2.longitud),infoString);
    addPolyline2(latArray2,lngArray2);
    
}
//-----------------------------------------

//-----------------------------------------
//EVENTOS
//-----------------------------------------
var car1 = new Car();
var car2 = new Car();
setInterval(trackingOne, 4500);
setInterval(trackingTwo, 4501);


