var button = document.getElementById("button");

var map, marker;
var latitude, longitude, date, time;

    function initMap() {
        
        var cen = {lat: 11.018520, lng:  -74.850274};
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: cen
        });
        marker = new google.maps.Marker({
          position: cen,
          draggable: true,
          map: map
        });
        marker.addListener("drag", onDrag);    
    }

function onDrag(){
    var today = new Date();
    
    var seconds = today.getSeconds();
    var minutes = today.getMinutes();
    var hour = today.getHours();
    if(hour<10){
        hour="0"+hour;
    }
    if(minutes<10){
        minutes="0"+minutes;
    }
    if(seconds<10){
        seconds="0"+seconds;
    }
    
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = yyyy+'-'+mm+'-'+dd;
    var todayTime = hour+":"+minutes+":"+seconds;
    date = today;
    time = todayTime;
    
    latitude = marker.getPosition().lat();
    longitude = marker.getPosition().lng();
    
    document.getElementById("date").innerHTML = date;
    document.getElementById("time").innerHTML = time;
    document.getElementById("lat").innerHTML = latitude;
    document.getElementById("lng").innerHTML = longitude;
}

function Enviar(){
    //insertar en la DB
    var infodb = function () {
        var temporal = null;
         $.ajax({
          'data': {LAT: latitude, LON: longitude, DATE: date, TIME: time},
          'async': false,
          'type': "POST",
          'global': false,
          'dataType': 'html',
          'url': 'fakeCar2.php',
          'success': function (data) {
              temporal = data;

          }
        });
      return temporal;
    }();
    alert("Informacion enviada :)");
}

button.addEventListener("click", Enviar);

