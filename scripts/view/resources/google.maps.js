window.CCP = window.CCP || {};

window.CCP.maps = {

  setGmap: function (latitude, longitude, elementId, googleOptions) {

    window.googlemapCb = function() {
      try {
        if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
          //default to Metro Manila
          latitude = 14.6443697;
          longitude = 121.033510;
        }

        var latlng = new google.maps.LatLng(parseInt(latitude), parseInt(longitude));

        if (!googleOptions.branchMap) {
          var myOptions = {
            zoom: 13,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          googleOptions.branchMap = new google.maps.Map($(elementId)[0], myOptions);
        } else {

          googleOptions.branchMap.setCenter(latlng);
        }

        if (!googleOptions.branchMarker) {

          var markerOptions = {
            draggable : false,
            map : googleOptions.branchMap,
            position : latlng,
            animation : google.maps.Animation.DROP
          };

          googleOptions.branchMarker = new google.maps.Marker(markerOptions);

          $(elementId).bind('DOMNodeInserted', function(event){
              var dom = $(this).html();

              if(dom.search('exceeded') > 0){
                  var nLink = 'http://maps.google.com/maps?q=' + latitude + ',' + longitude;
                  $('<a href="'+nLink+'" target="_blank">Click here to view the map</a>').insertAfter(this);
              }
          });
        } else {
          googleOptions.branchMarker.setPosition(latlng);
        }
      }
      catch (err) {
        console.log(err);
      }
    };
    
    if ( _.size($('#googlemap-js')) > 0 ) {
        window.googlemapCb();
        return;
    }
    
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=googlemapCb";
    script.setAttribute('id', 'googlemap-js');
    document.body.appendChild(script);
  }
}
