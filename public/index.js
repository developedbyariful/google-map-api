const plazaBtnElement = document.querySelector('#plazaBtn');
const serviceBtnElement = document.querySelector('#serviceBtn');
const smartBtnElement = document.querySelector('#smartBtn');
const allBtnElement = document.querySelector('#allBtn');

function initMap() {
  const tourStops = [];
  const clearTourStops = () => {
    // tourStops.forEach( stops => tourStops.pop(stops))
    // setMap(null)
  };
  // !Position of the map
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: { lat: 23.685, lng: 90.3563 }, // Bangladesh latitude and longitude
  });

  // !Button Click

  const fetchWaltonPlaza = () => {
    // const response = await fetch('http://localhost:3000/api/v1/map/waltonplaza');
    // const responseData = await response.json();
    apiURL = 'http://localhost:3000/api/v1/map/waltonplaza';
    clearTourStops();
    getMap();
  };
  const fetchWaltonServiceCenter = () => {
    apiURL = 'http://localhost:3000/api/v1/map/waltonservicecenter';
    clearTourStops()
    getMap();
  };
  const fetchWaltonSmartZone = () => {
    apiURL = 'http://localhost:3000/api/v1/map/waltonsmartzone';
    clearTourStops()
    getMap();
  };
  const fetchAll = () => {
    apiURL = 'http://localhost:3000/api/v1/map';
    clearTourStops();
    getMap();
  };
  let apiURL = 'http://localhost:3000/api/v1/map';

  plazaBtnElement.addEventListener('click', fetchWaltonPlaza);
  serviceBtnElement.addEventListener('click', fetchWaltonServiceCenter);
  smartBtnElement.addEventListener('click', fetchWaltonSmartZone);
  allBtnElement.addEventListener('click', fetchAll);

  //! Create an info window to share between markers.
  const infoWindow = new google.maps.InfoWindow();
  // const apiURL = 'http://localhost:3000/api/v1/map';

  const getMarkerPinPoint = () => {
    try {
      tourStops.forEach(
        (
          [position, title, city, country, contactno, address, email, flag],
          i
        ) => {
          //! Icons
          let iconLink = 0;
          const iconSize = new google.maps.Size(50, 50); // icon size
          if (flag === 1) {
            iconLink = {
              url: 'https://i.ibb.co/28nQhqD/BLUE.png', // icon url
              scaledSize: iconSize, // size
            };
          } else if (flag === 2) {
            iconLink = {
              url: 'https://waltonbd.com/image/catalog/new_website/icon/logo/m-logo-new.svg', // icon url
              scaledSize: iconSize, // size
            };
          } else if (flag === 3) {
            iconLink = {
              url: 'https://i.ibb.co/28nQhqD/BLUE.png', // icon url
              scaledSize: iconSize, // size
            };
          }
          const marker = new google.maps.Marker({
            position,
            map,
            city,
            country,
            contactno,
            address,
            email,
            // flag,
            title: `${title}`, // ! title
            // title: `${i + 1}. ${title}`, // !select name and title
            // label: `${i + 1}`, // !number
            icon: iconLink, // !custom icons
            optimized: false,
            animation: google.maps.Animation.DROP,
          });
          // Add a click listener for each marker, and set up the info window.

          // Event Listener function of marker
          const markerClickInfo = () => {
            infoWindow.close();
            // ! Inside content
            infoWindow.setContent(`
              <div>
              <img style="
              display: block;
              margin-left: auto;
              margin-right: auto;
              " src="https://waltonbd.com/image/catalog/new_website/icon/logo/m-logo-new.svg"  width="50px">
              </div>
  
              <div>
              <h1 class="infoWindowsHeading">${marker.getTitle()}</h3>
              </div>
              <div class="infoWindowsDisplayInline">
              <i class="fas fa-phone-alt infoWindowIcon"></i>
              <p class="infoWindowsText">${marker.contactno}</p>
              </div>
              <div class="infoWindowsDisplayInline">
              <i class="far fa-envelope infoWindowIcon"></i>
              <p class="infoWindowsText">${marker.email}</p>
              </div>
              <div class="infoWindowsDisplayInline">
              <i class="fas fa-map-marker-alt infoWindowIcon"></i>
              <p class="infoWindowsText">${marker.address}</p>
              </div>
              <div class="infoWindowsDisplayInline">
              <p class="infoWindowsText">${marker.city}, ${marker.country}</p>
              </div>
            `);
            infoWindow.open(marker.getMap(), marker);
          };
          // !Listening click event on markers
          marker.addListener('click', markerClickInfo);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  function getMap() {
    const getAllData = async () => {
      const fetchData = await fetch(apiURL);
      const locations = await fetchData.json();
      for (let i = 0; i < locations.length; i++) {
        const obj = {
          lat: parseFloat(locations[i].latitude),
          lng: parseFloat(locations[i].longitude),
        };
        const str = locations[i].name;
        const fetchedDataObj = [];
        fetchedDataObj.push(
          obj,
          str,
          locations[i].city,
          locations[i].country,
          locations[i].contactno,
          locations[i].address,
          locations[i].email,
          locations[i].flag
        );
        tourStops.push(fetchedDataObj);
      }

      // !Maekers
      // Create the markers.

      getMarkerPinPoint();
    };
    const allData = getAllData();
  }
}
window.initMap = initMap;
