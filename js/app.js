let map;
let service;
let infowindow;

function initMap() {
  const defaultLoc = { lat: 20.5937, lng: 78.9629 }; // India center

  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLoc,
    zoom: 5,
  });

  infowindow = new google.maps.InfoWindow();

  // 🔥 Enable autocomplete
  const input = document.getElementById("search-input");
  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['(cities)'], // Optional: Suggest only cities
    fields: ['geometry', 'name'],
  });

  // Prevent autocomplete from biasing results to the current map viewport
  autocomplete.bindTo("bounds", map);
}


function performSearch() {
  const input = document.getElementById("search-input").value;
  const serviceType = document.getElementById("service-type").value;

  if (!input) {
    alert("Please enter a location.");
    return;
  }

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: input }, (results, status) => {
    if (status === "OK" && results[0]) {
      const location = results[0].geometry.location;
      map.setCenter(location);
      map.setZoom(13);

      const request = {
        location: location,
        radius: '5000',
        type: [serviceType]
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
          results.forEach(place => {
            createMarker(place);
          });
        } else {
          alert("No results found or request denied.");
        }
      });

    } else {
      alert("Could not find location: " + status);
    }
  });
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(`<strong>${place.name}</strong><br>${place.vicinity || ''}`);
    infowindow.open(map, marker);
  });
}

// Initialize map and add click event listener when page loads
window.onload = () => {
  initMap();
  document.getElementById("search-btn").addEventListener("click", performSearch);
};
