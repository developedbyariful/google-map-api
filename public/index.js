// The following example creates five accessible and
// focusable markers.
function initMap() {
  const tourStops = [];

  // Set LatLng and title text for the markers. The first marker (Boynton Pass)
  // receives the initial focus when tab is pressed. Use arrow keys to
  // move between markers; press tab again to cycle through the map controls.
  // console.log(tourStops);

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: { lat: 23.684994, lng: 90.356331 },
  });

  // Create an info window to share between markers.
  const infoWindow = new google.maps.InfoWindow();

  const getAllData = async () => {
    const fetchData = await fetch('http://localhost:3000/api/map');
    const locations = await fetchData.json();
    return locations;
  };
  const allData = getAllData();
  allData.then((locations) => {
    for (let i = 0; i < locations.length; i++) {
      const obj = {
        lat: parseFloat(locations[i].latitude),
        lng: parseFloat(locations[i].longitude),
      };
      const str = locations[i].name;
      const tempData = [];
      tempData.push(obj);
      tempData.push(str);
      tourStops.push(tempData);
    }

    // Create the markers.
    try {
      tourStops.forEach(([position, title], i) => {
        const marker = new google.maps.Marker({
          position,
          map,
          title: `${i + 1}. ${title}`, // !selcet name and title
          label: `${i + 1}`, // !number
          optimized: false,
        });
        // Add a click listener for each marker, and set up the info window.
        marker.addListener('click', () => {
          infoWindow.close();
          infoWindow.setContent(marker.getTitle());
          infoWindow.open(marker.getMap(), marker);
        });
      });
    } catch (error) {
      console.log(error)
    }
  });
}
window.initMap = initMap;
