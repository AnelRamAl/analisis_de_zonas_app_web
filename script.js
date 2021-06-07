const gradosARadianes = deg => (deg * Math.PI) / 180.0;
const r1 = 0.029307207202325616
var markersArray = [];
var rl = 0;
var R = 6371; //6371 Km

var lat1 =0;
var lng1 =0;
var deltaLat=0;
var deltaLng=0;
var a1=0;
var a2=0;
var a=0;
var c=0;
var d=0;

window.onload=initMap();

//Fórmula de Haversine
  lat1 = gradosARadianes(19.0454584);
  lng1 = gradosARadianes( -98.207479);
  lat2 = gradosARadianes(19.0267998);
  lng2 = gradosARadianes(-98.1848788);

  
  deltaLat = lat2-lat1; //debe pasarse a radianes
  deltaLng = lng2-lng1;
  
  a1 = Math.sin((deltaLat/2));
  a2 = Math.sin((deltaLng/2));
 
  a = (a1*a1 + Math.cos(lat1))*Math.cos(lat2)*a2*a2;
  c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  d = R*c;

  console.log(d);

  lat1 = 19.0454584;
  lng1 = -98.207479;
  lat2 = 19.0267998;
  lng2 = -98.1848788;

  rl=Math.sqrt((lat2-lat1)*(lat2-lat1)+(lng2-lng1)*(lng2-lng1));
  console.log(rl);


function initMap() {
    var myLatlng = {lat:19.0454584,lng:  -98.207479};
  
    var map = window.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: myLatlng
    });
    console.log(map);
  
    var marker = new google.maps.Marker({
        position: myLatlng,
             //map: map  
    });
    
   /* google.maps.event.addListener(marker, "click", function (event) {
        console.log(this.position);
    });*/ // forma 1 de asignar un escucha al marcador
     
    marker.addListener('click', function() {
      //map.setZoom(16);
      let position = marker.getPosition()
      map.setCenter(position);
      console.log(position.lat(),position.lng())
    }); // forma 2 de asignar un escucha al marcador
  
 
  }

            


function cargarDatos(la,lg){
    let map = window.map;
    //console.log( window.map);
    if(markersArray-length != 0){
        clearOverlays();
        $('#datos').val('');
        
        }

    
    d3.csv("src/copia.csv").then(locales => {

       $('#datos').val('@relation coordenadas' + "@@@" + "@@@"+ '@ATTRIBUTE latitud NUMERIC' + "@@@"+ '@ATTRIBUTE longitud NUMERIC' + "@@@" + "@@@" + '@DATA' + "@@@");

        locales.forEach(local => { 
            
            if (la!=undefined || lg!=undefined ) {
            lat1 =la;
            lng1 = lg;
            
            lat2 = local.latitud;
            lng2 = local.longitud;
            
            r=Math.sqrt((lat2-lat1)*(lat2-lat1)+(lng2-lng1)*(lng2-lng1));
            
            if (r<=r1){                
                console.table(lat2,lng2," radio:",r1," radio2:",r);
                  var marker = new google.maps.Marker({
                  position:{lat: parseFloat(local.latitud), lng: parseFloat(local.longitud)},
                  map: map
                });
                markersArray.push(marker);
            
                marker.addListener('click', function() {
                    //map.setZoom(16);
                    let position = marker.getPosition()
                    map.setCenter(position);
                    console.log(position.lat(),position.lng())
                    cargarDatos(position.lat(),position.lng())

                    
                  }); // forma 2 de asignar un escucha al marcador
                  $('#datos').val($('#datos').val() + parseFloat(local.latitud) + ',' +  parseFloat(local.longitud) + "@@@");
                  
                  $('#resultados').html('Centro (latitud,longitud):  ' + lat1 + ',' + lng1 +'<br />'+ 'Radio:  3km a la redonda.');
              } 
            }
            else{
                var marker = new google.maps.Marker({
                    position:{lat: parseFloat(local.latitud), lng: parseFloat(local.longitud)},
                    map: map
                  });

                  markersArray.push(marker);
                  /*google.maps.event.addListener(marker, "click", function (event) {
                      console.log(event)
                      console.log(this.position);
                  });*/ // forma 1 de asignar un escucha al marcador
  
                  marker.addListener('click', function() {
                      //map.setZoom(16);
                      let position = marker.getPosition()
                      map.setCenter(position);
                      console.log(position.lat(),position.lng())
                      cargarDatos(position.lat(),position.lng())
  
                      
                    }); // forma 2 de asignar un escucha al marcador
            }

            
        });
            
          $('#datos').val( $('#datos').val()+ "@@@"  + '% Centro: '+ parseFloat(lat1) + ',' +  parseFloat(lng1) + "@@@" );
        
         
    });
    
        
}


function clearOverlays() {
    for (var i = 0; i < markersArray.length; i++ ) {
      markersArray[i].setMap(null);
    }
    markersArray.length = 0;
  }

  function archivoGuardar() {
    $.ajax({
        type: "GET",
        url: "archivoGuardar.php",
        data: { datos: $('#datos').val() }
    }).done(function( result ) {
      document.location = "descargar.php";
    });
}

