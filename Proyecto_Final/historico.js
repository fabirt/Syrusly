//--------------------------------------------------------
//Variables
//--------------------------------------------------------
var buscar = document.getElementById("search"),
    checkBox = document.getElementById("checkbox");

//Busqueda #1
var markersArray = [],
    latArray = [],
    lngArray = [],
    timeArray = [],
    co2Array = [],
    coArray = [],
    nh4Array = [];

//Busqueda #2
var markersArray2 = [],
    latArray2 = [],
    lngArray2 = [],
    timeArray2 = [],
    co2Array2 = [],
    coArray2 = [],
    nh4Array2 = [];

var map, Circle, heatmap;
//--------------------------------------------------------
//Datetime Picker
//--------------------------------------------------------
$("#datetimefull_start").datetimepicker();
$("#datetimefull_end").datetimepicker();

//--------------------------------------------------------
//Inicializar mapa
//--------------------------------------------------------
function initMap() {
        
        var cen = {lat: 11.018520, lng:  -74.850274};
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: cen
        });
    
        heatmap = new google.maps.visualization.HeatmapLayer({
          radius: 35
            
        });
        
        Circle = new google.maps.Circle({
            strokeColor: '#1B95B0',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#1B95B0',
            fillOpacity: 0.20,
            draggable: true,
            center: map.center,
            radius: 500,
            zIndex: 1,
            editable: true
        });  
        Circle.addListener("dragend", DragEnd);
    
    }

//--------------------------------------------------------
//Limpiar mapa
//--------------------------------------------------------
function clearOverlays() {
  for (var j = 0; j < markersArray.length; j++ ) {
    markersArray[j].setMap(null);
  }
    heatmap.setMap(null);
  markersArray.length = 0;
    latArray.length = 0;
    lngArray.length = 0;
    co2Array.length = 0;
    coArray.length = 0;
    nh4Array.length = 0;
}

function clearOverlays2() {
  for (var j = 0; j < markersArray2.length; j++ ) {
    markersArray2[j].setMap(null);
  }
    //heatmap.setMap(null);
  markersArray2.length = 0;
    latArray2.length = 0;
    lngArray2.length = 0;
    co2Array2.length = 0;
    coArray2.length = 0;
    nh4Array2.length = 0;
}

//--------------------------------------------------------
//Mostrar marcadores
//--------------------------------------------------------
function getHistorial(){
    
    clearOverlays();
    
    //Fecha Inicial
    var datetimefull_start =            document.getElementById("datetimefull_start").value;
    datetimefull_start = datetimefull_start.split(" "); 
    var dateIni = datetimefull_start[0].replace("/","-");
    dateIni = dateIni.replace("/", "-");
    var timeIni = datetimefull_start[1]+":00";
    
    //Fecha final
    var datetimefull_end =            document.getElementById("datetimefull_end").value;
    datetimefull_end = datetimefull_end.split(" "); 
    var dateEnd = datetimefull_end[0].replace("/","-");
    dateEnd = dateEnd.replace("/", "-");
    var timeEnd = datetimefull_end[1]+":00";
    
    if(dateIni==""||dateEnd==""||dateIni>dateEnd){
        alert("X Digite rango de fechas correcto X");
   }
    if(dateIni==dateEnd){
        if(timeIni>timeEnd){
            alert("X Digite rango de fechas correcto X");
        }
   }
    
    //Búsqueda en la DB
    var infodb = function () {
        var temporal = null;
         $.ajax({
          'data': {date_time_start: dateIni,               date_time_end: dateEnd},
          'async': false,
          'type': "POST",
          'global': false,
          'dataType': 'html',
          'url': 'historico.php',
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

    for (i = 0; i < decode.length-1; i++) { 
        var data = decode[i].split(" ");
        var lat = data[0];
        var lng = data[1];
        var date = data[2];
        var time = data[3];
        var co2 = data[4];
        var co = data[5];
        var nh4 = data[6];
        //Filtrado
       if(date>dateIni && date<dateEnd){
            var position = {lat: parseFloat(lat), lng: parseFloat(lng)};    
            var marcador = new google.maps.Marker({
                position: position,
                map: map,
                strokeColor: '#1B95B0',
                icon: "images/marker4.png",
                title:  "Vehiculo #1" +"\n"+
                        date+"\n"+time+"\n"+
                        "CO2: "+co2+"\n"+
                        "CO: "+co+"\n"+
                        "NH4: "+nh4,
                zIndex: 2
            });
            markersArray.push(marcador);
           latArray.push(parseFloat(lat));
           lngArray.push(parseFloat(lng));
           timeArray.push(time);
           co2Array.push(parseFloat(co2));
           coArray.push(parseFloat(co));
           nh4Array.push(parseFloat(nh4));
           
         }else if(date == dateIni && date == dateEnd){
             if(time > timeIni && time < timeEnd){
                 
                 var position = {lat: parseFloat(lat), lng: parseFloat(lng)};    
                var marcador = new google.maps.Marker({
                position: position,
                map: map,
                strokeColor: '#1B95B0',
                icon: "images/marker4.png",
                title: "Vehiculo #1" +"\n"+
                    date+"\n"+time+"\n"+
                        "CO2: "+co2+"\n"+
                        "CO: "+co+"\n"+
                        "NH4: "+nh4,
                zIndex: 2
            });
            markersArray.push(marcador);
            latArray.push(parseFloat(lat));
           lngArray.push(parseFloat(lng));
                 timeArray.push(time);
           co2Array.push(parseFloat(co2));
           coArray.push(parseFloat(co));
           nh4Array.push(parseFloat(nh4));
             }     
                  }else if(date == dateEnd){
                      if(time < timeEnd){
                          
                            var position = {lat: parseFloat(lat), lng: parseFloat(lng)};    
                            var marcador = new google.maps.Marker({
                                position: position,
                                map: map,
                                strokeColor: '#1B95B0',
                                icon: "images/marker4.png",
                                title:  "Vehiculo #1" +"\n"+
                                        date+"\n"+time+"\n"+
                                        "CO2: "+co2+"\n"+
                                        "CO: "+co+"\n"+
                                        "NH4: "+nh4,
                                zIndex: 2
                            });
                            markersArray.push(marcador);
                            latArray.push(parseFloat(lat));
                           lngArray.push(parseFloat(lng));
                          timeArray.push(time);
                           co2Array.push(parseFloat(co2));
                           coArray.push(parseFloat(co));
                           nh4Array.push(parseFloat(nh4));
                         }
                           
                           }else if(date == dateIni){
                              if(time > timeIni){

                                    var position = {lat: parseFloat(lat), lng: parseFloat(lng)};    
                                    var marcador = new google.maps.Marker({
                                        position: position,
                                        map: map,
                                        strokeColor: '#1B95B0',
                                        icon: "images/marker4.png",
                                        title: "Vehiculo #1" +"\n"+ 
                                        date+"\n"+time+"\n"+
                                        "CO2: "+co2+"\n"+
                                        "CO: "+co+"\n"+
                                        "NH4: "+nh4,
                                        zIndex: 2
                                    });
                                    markersArray.push(marcador);
                                  latArray.push(parseFloat(lat));
                               lngArray.push(parseFloat(lng));
                                  timeArray.push(time);
                               co2Array.push(parseFloat(co2));
                               coArray.push(parseFloat(co));
                               nh4Array.push(parseFloat(nh4));
                                 }
                           
                           }
        
    }
    try{
        //heatmap.setData(getPoints());
        //heatmap.setMap(map);
    }catch(err){
        
    }
    
    map.panTo(position);
    
        
}

//--------------------------------------------------------
//Get historial #2
function getHistorial2(){
    
    clearOverlays2();
    
    //Fecha Inicial
    var datetimefull_start =            document.getElementById("datetimefull_start").value;
    datetimefull_start = datetimefull_start.split(" "); 
    var dateIni = datetimefull_start[0].replace("/","-");
    dateIni = dateIni.replace("/", "-");
    var timeIni = datetimefull_start[1]+":00";
    
    //Fecha final
    var datetimefull_end =            document.getElementById("datetimefull_end").value;
    datetimefull_end = datetimefull_end.split(" "); 
    var dateEnd = datetimefull_end[0].replace("/","-");
    dateEnd = dateEnd.replace("/", "-");
    var timeEnd = datetimefull_end[1]+":00";
    
    if(dateIni==""||dateEnd==""||dateIni>dateEnd){
        alert("X Digite rango de fechas correcto X");
   }
    if(dateIni==dateEnd){
        if(timeIni>timeEnd){
            alert("X Digite rango de fechas correcto X");
        }
   }
    
    //Búsqueda en la DB
    var infodb = function () {
        var temporal = null;
         $.ajax({
          'data': {date_time_start: dateIni,               date_time_end: dateEnd},
          'async': false,
          'type': "POST",
          'global': false,
          'dataType': 'html',
          'url': 'historico2.php',
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

    for (i = 0; i < decode.length-1; i++) { 
        var data = decode[i].split(" ");
        var lat = data[0];
        var lng = data[1];
        var date = data[2];
        var time = data[3];
        var co2 = data[4];
        var co = data[5];
        var nh4 = data[6];
        //Filtrado
       if(date>dateIni && date<dateEnd){
            var position = {lat: parseFloat(lat), lng: parseFloat(lng)};    
            var marcador = new google.maps.Marker({
                position: position,
                map: map,
                strokeColor: '#1B95B0',
                icon: "images/marker4.png",
                title: "Vehiculo #2" +"\n"+
                        date+"\n"+time+"\n"+
                        "CO2: "+co2+"\n"+
                        "CO: "+co+"\n"+
                        "NH4: "+nh4,
                zIndex: 2
            });
            markersArray2.push(marcador);
           latArray2.push(parseFloat(lat));
           lngArray2.push(parseFloat(lng));
           timeArray2.push(time);
           co2Array2.push(parseFloat(co2));
           coArray2.push(parseFloat(co));
           nh4Array2.push(parseFloat(nh4));
           
         }else if(date == dateIni && date == dateEnd){
             if(time > timeIni && time < timeEnd){
                 
                 var position = {lat: parseFloat(lat), lng: parseFloat(lng)};    
                var marcador = new google.maps.Marker({
                position: position,
                map: map,
                strokeColor: '#1B95B0',
                icon: "images/marker4.png",
                title: "Vehiculo #2" +"\n"+
                        date+"\n"+time+"\n"+
                        "CO2: "+co2+"\n"+
                        "CO: "+co+"\n"+
                        "NH4: "+nh4,
                zIndex: 2
            });
            markersArray2.push(marcador);
            latArray2.push(parseFloat(lat));
           lngArray2.push(parseFloat(lng));
                 timeArray2.push(time);
           co2Array2.push(parseFloat(co2));
           coArray2.push(parseFloat(co));
           nh4Array2.push(parseFloat(nh4));
             }     
                  }else if(date == dateEnd){
                      if(time < timeEnd){
                          
                            var position = {lat: parseFloat(lat), lng: parseFloat(lng)};    
                            var marcador = new google.maps.Marker({
                                position: position,
                                map: map,
                                strokeColor: '#1B95B0',
                                icon: "images/marker4.png",
                                title:  "Vehiculo #2" +"\n"+
                                        date+"\n"+time+"\n"+
                                        "CO2: "+co2+"\n"+
                                        "CO: "+co+"\n"+
                                        "NH4: "+nh4,
                                zIndex: 2
                            });
                            markersArray2.push(marcador);
                            latArray2.push(parseFloat(lat));
                           lngArray2.push(parseFloat(lng));
                          timeArray2.push(time);
                           co2Array2.push(parseFloat(co2));
                           coArray2.push(parseFloat(co));
                           nh4Array2.push(parseFloat(nh4));
                         }
                           
                           }else if(date == dateIni){
                              if(time > timeIni){

                                    var position = {lat: parseFloat(lat), lng: parseFloat(lng)};    
                                    var marcador = new google.maps.Marker({
                                        position: position,
                                        map: map,
                                        strokeColor: '#1B95B0',
                                        icon: "images/marker4.png",
                                        title:  "Vehiculo #2" +"\n"+ 
                                        date+"\n"+time+"\n"+
                                        "CO2: "+co2+"\n"+
                                        "CO: "+co+"\n"+
                                        "NH4: "+nh4,
                                        zIndex: 2
                                    });
                                    markersArray2.push(marcador);
                                  latArray2.push(parseFloat(lat));
                               lngArray2.push(parseFloat(lng));
                                  timeArray2.push(time);
                               co2Array2.push(parseFloat(co2));
                               coArray2.push(parseFloat(co));
                               nh4Array2.push(parseFloat(nh4));
                                 }
                           
                           }
        
    }
    try{
        heatmap.setData(getPoints());
        heatmap.setMap(map);
    }catch(err){
        
    }
    
    map.panTo(position);
    
        
}
//--------------------------------------------------------

//--------------------------------------------------------
//Búsqueda por área
//--------------------------------------------------------
function checkFunction(){
    
    /*if (checkBox.checked == true){
        Circle.setMap(map);
        Circle.setCenter(map.center);
        for (var j = 0; j < markersArray.length; j++ ) {
            markersArray[j].setVisible(false);
        }
        
    } else {
        Circle.setMap(null);
    }*/
    
}
function DragEnd(){
    
    /*for (var k = 0; k < markersArray.length; k++ ) {
        var markerLat = markersArray[k].getPosition().lat();
        var markerLng = markersArray[k].getPosition().lng();
        var bounds = Circle.getBounds();

        var myLatLng = new google.maps.LatLng({
            lat: markerLat,
            lng: markerLng
        });
        
        if(bounds.contains(myLatLng)==true){
            markersArray[k].setVisible(true);
        }else{
            markersArray[k].setVisible(false);
        }
    }*/
      
}

//Heatmap data
function getPoints(){
    var heatMapData = [];
    for(var h = 0; h < latArray.length; h++){
        var peso = (co2Array[h]+coArray[h]+nh4Array[h]).toString;
        heatMapData[h] = {location: new google.maps.LatLng(latArray[h], lngArray[h]), weight:       parseFloat(peso[0])
                         };
    }
    for(var h = latArray.length; h < (latArray.length + latArray2.length); h++){
        var peso = (co2Array2[h-latArray.length]+coArray2[h-latArray.length]+nh4Array2[h-latArray.length]).toString;
        heatMapData[h] = {location: new google.maps.LatLng(latArray2[h-latArray.length], lngArray2[h-latArray.length]), weight:       parseFloat(peso[0])
                         };
    }
    return heatMapData;
}


//Dibujar Line Chart
function drawChart() {
    
    var chartRows = [];
    for(var c = 0; c < co2Array.length + co2Array2.length; c++){
        //chartRows[c] = [timeArray[c], co2Array[c], coArray[c], nh4Array[c] ];
        if(c < co2Array.length){
            chartRows[c] = [c, co2Array[c], coArray[c], nh4Array[c] ];
            
           }else{
               chartRows[c] = [c, co2Array2[c-co2Array.length], coArray2[c-co2Array.length], nh4Array2[c-co2Array.length] ];
               
           }
        
    }
    
    
      var data_chart = new google.visualization.DataTable();
      data_chart.addColumn('number', 'X');
      data_chart.addColumn('number', 'CO2');
      data_chart.addColumn('number', 'CO');
      data_chart.addColumn('number', 'NH4');

      data_chart.addRows(chartRows);

      var options_chart = {

          title: 'Concentracion de gases durante recorrido',
          
        hAxis: {
          title: 'Sample',
          logScale: true,
            textStyle: {
            fontSize: 14,
            fontName: 'Verdana',
            bold: false,
            italic: false
          },
            titleTextStyle: {
            fontSize: 16,
            fontName: 'Verdana',
            bold: false,
            italic: false
          }
        },
        vAxis: {
          title: 'Concentration (PPM)',
          logScale: true,
            textStyle: {
            fontSize: 14,
            fontName: 'Verdana',
            bold: false,
            italic: false
          },
            titleTextStyle: {
            fontSize: 16,
            fontName: 'Verdana',
            bold: false,
            italic: false
          }
        },
        colors: ['#4ACDC9', '#4A70CD', '#000000']
      };

      var lineChart = new google.visualization.LineChart(document.getElementById('chart_div'));
      lineChart.draw(data_chart, options_chart);
    }
//Cargar Line Chart
function setChart(){
    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(drawChart);
}


//--------------------------------------------------------
//Eventos
//--------------------------------------------------------
buscar.addEventListener("click", getHistorial);
buscar.addEventListener("click", getHistorial2);
buscar.addEventListener("click", setChart);


