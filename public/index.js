

 // The following example creates five accessible and
// focusable markers.
function initMap() {
    const locations = [
        {
          name: "Dhaka",
          lat: 23.810331,
          lng: 90.412521,
        },
        {
          name: "Sylhet",
          lat: 24.894930,
          lng: 91.868706,
        },
        {
          name: "Rajshahi",
          lat: 24.3745,
          lng: 88.6042,
        },
        {
          name: "Khulna",
          lat: 22.8456,
          lng: 89.5403,
        },
        {
            name: "Rangpur",
            lat: 25.743893,
            lng: 89.275230,
        },
        {
            name: "Barishal",
            lat: 22.701002,
            lng: 90.353455,
        }
      ];

    // Set LatLng and title text for the markers. The first marker (Boynton Pass)
    // receives the initial focus when tab is pressed. Use arrow keys to
    // move between markers; press tab again to cycle through the map controls.
    const tourStops = [];
    for(let i = 0; i < locations.length; i++) {
        const obj = {
            lat: locations[i].lat,
            lng: locations[i].lng
        }
        const str = locations[i].name;

        const tempData = [];
        tempData.push(obj);
        tempData.push(str);
        tourStops.push(tempData);
    }
    console.log(tourStops);


    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: { lat: 23.684994, lng: 90.356331 },
      });
    
    // Create an info window to share between markers.
    const infoWindow = new google.maps.InfoWindow();
  
    // Create the markers.
    tourStops.forEach(([position, title], i) => {
      const marker = new google.maps.Marker({
        position,
        map,
        title: `${i + 1}. ${title}`, // !selcet name and title
        label: `${i + 1}`, // !number
        optimized: false,
      });
      // Add a click listener for each marker, and set up the info window.
      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(marker.getMap(), marker);
      });
    });
  }
  
  window.initMap = initMap;