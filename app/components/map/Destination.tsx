"use client";
const axios = require("axios");
// import { useState, useEffect } from "react";
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const center = {
//   lat: 18.559008,
//   lng: -68.388881,
// };

// const vehicleIcon = {
//   path: "M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8 4.41 0 8 3.59 8 8 0 4.41-3.59 8-8 8zm-2-12h4v8h-4z",
//   fillColor: "#FF0000",
//   fillOpacity: 1,
//   strokeWeight: 0,
//   rotation: 0,
//   scale: 1,
//   anchor: { x: 12, y: 12 },
// };

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [markerPosition, setMarkerPosition] = useState(center);

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyDSvqFVfMDtPftyvZJMrEYeqF5R5dXc6nE",
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Update marker position with new coordinates
//       const newMarkerPosition = {
//         lat: markerPosition.lat + 0.0001, // Example: Increment latitude by 0.0001 for animation
//         lng: markerPosition.lng + 0.0001, // Example: Increment longitude by 0.0001 for animation
//       };
//       setMarkerPosition(newMarkerPosition);
//     }, 1000); // Adjust the interval time as needed

//     return () => {
//       clearInterval(interval);
//     };
//   }, [markerPosition]);

//   const onLoad = (map) => {
//     setMap(map);
//   };

//   if (loadError) {
//     return <div>Error loading Google Maps</div>;
//   }

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={16}
//       onLoad={onLoad}
//     >
//       <Marker position={markerPosition} icon={vehicleIcon} />
//     </GoogleMap>
//   ) : (
//     <div>Loading Google Maps...</div>
//   );
// };

// export default MapComponent;

// import { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   Marker,
//   Polyline,
//   useLoadScript,
// } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const center = {
//   lat: 18.559008,
//   lng: -68.388881,
// };

// const path = [
//   { lat: 18.558908, lng: -68.389916 },
//   { lat: 18.558853, lng: -68.389922 },
//   { lat: 18.558375, lng: -68.389729 },
//   { lat: 18.558032, lng: -68.389182 },
//   { lat: 18.55805, lng: -68.388613 },
//   { lat: 18.558256, lng: -68.388213 },
//   { lat: 18.558744, lng: -68.387929 },
// ];

// const ambulanceIcon = {
//   url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-C--YCy68RswHqrYRt8vr2ILTrIT2XCrsA&usqp=CAU",
//   scaledSize: { width: 32, height: 32 },
//   anchor: { x: 16, y: 16 },
// };

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [markerPosition, setMarkerPosition] = useState(path[0]);
//   const [rotation, setRotation] = useState(0);

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyDSvqFVfMDtPftyvZJMrEYeqF5R5dXc6nE",
//   });

//   useEffect(() => {
//     let currentIndex = 0;

//     const interval = setInterval(() => {
//       // Move to the next coordinate in the path
//       currentIndex = (currentIndex + 1) % path.length;
//       const newMarkerPosition = path[currentIndex];
//       setMarkerPosition(newMarkerPosition);

//       // Calculate the angle between current and next position
//       const { lat: lat1, lng: lng1 } = markerPosition;
//       const { lat: lat2, lng: lng2 } = newMarkerPosition;
//       const angle = Math.atan2(lat2 - lat1, lng2 - lng1) * (180 / Math.PI);

//       setRotation(angle);
//     }, 1000); // Adjust the interval time as needed

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   const onLoad = (map) => {
//     setMap(map);
//   };

//   if (loadError) {
//     return <div>Error loading Google Maps</div>;
//   }

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={16}
//       onLoad={onLoad}
//     >
//       <Polyline path={path} options={{ strokeColor: "#FF0000" }} />
//       <Marker
//         position={markerPosition}
//         icon={{ ...ambulanceIcon, rotation: rotation }}
//       />
//     </GoogleMap>
//   ) : (
//     <div>Loading Google Maps...</div>
//   );
// };

// export default MapComponent;

import { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 18.559008,
  lng: -68.388881,
};

const Destination = () => {
  const [map, setMap] = useState(null);

  const [path, setPath] = useState([]);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [finalSource, setFinalSource] = useState({});
  const [finalDestination, setFinalDestination] = useState({});
  //   const sourceAutocompleteRef = useRef(null);
  //   const destinationAutocompleteRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDSvqFVfMDtPftyvZJMrEYeqF5R5dXc6nE",
    libraries: ["places"],
  });

  async function getRouteDetails(finalSource: any, finalDestination: any) {
    //maps.googleapis.com/maps/api/distancematrix/json?origins=22.5474164%2C88.3598025&destinations=22.5830002%2C88.3372909&key=AIzaSyDSvqFVfMDtPftyvZJMrEYeqF5R5dXc6nE
    let response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${finalSource.latLong.lat}%2C${finalSource.latLong.lng}&destinations=${finalDestination.latLong.lat}%2C${finalDestination.latLong.lng}&key=AIzaSyDSvqFVfMDtPftyvZJMrEYeqF5R5dXc6nE`
    );
    console.log("Resposne from distance and time api", response.data.rows);

    // let polylineEncoded = response.data.routes[0].overview_polyline.points;
    // let polyline = L.decode(polylineEncoded);
    // let duration = response.data.routes[0].legs[0].duration.value;
    // console.log(polyline, duration);
    return response.data.rows;
  }
  async function handleClick() {
    const response = await getRouteDetails(finalSource, finalDestination);
    console.log("Response", response);
  }

  function handleDestinationChange(event) {
    setDestination(event);
  }

  function handleDestinationSelect(suggestDestination) {
    var testDestination = {};
    geocodeByAddress(suggestDestination)
      .then((results) => {
        testDestination.destination = results[0].formatted_address;
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        testDestination.latLong = latLng;
        setFinalDestination(testDestination);
      })
      .catch((error) => console.error("Error", error));
  }

  useEffect(() => {
    // Fetch the directions/path using the Google Maps Directions API
    const fetchDirections = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${source}&destination=${destination}&key=AIzaSyDSvqFVfMDtPftyvZJMrEYeqF5R5dXc6nE`
        );
        const data = await response.json();
        const { routes } = data;

        if (routes.length > 0) {
          const { legs } = routes[0];
          const steps = legs.flatMap((leg) => leg.steps);
          const coordinates = steps.map((step) => ({
            lat: step.start_location.lat,
            lng: step.start_location.lng,
          }));
          setPath(coordinates);
          setCurrentIndex(0);
        } else {
          console.log("No routes found");
        }
      } catch (error) {
        console.log("Error fetching directions:", error);
      }
    };

    if (source && destination) {
      fetchDirections();
    }
  }, [source, destination]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return isLoaded ? (
    <div>
      <div className="grid gap-4 mb-2 m-auto px-16">
        <div className="relative grid gap-4">
          <PlacesAutocomplete
            value={destination}
            onChange={(event) => handleDestinationChange(event)}
            // onSelect={() => handleDestinationSelect()}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }: any) => (
              <div className="">
                {/* <div className="mb-2">Destination </div> */}
                <input
                  {...getInputProps({
                    placeholder: "Enter your location",
                    className: "location-search-input px-10",
                  })}
                />
                <div className="autocomplete-dropdown-container px-10">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? {
                          backgroundColor: "#fafafa",
                          cursor: "pointer",
                        }
                      : {
                          backgroundColor: "#ffffff",
                          cursor: "pointer",
                        };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span
                          onClick={() =>
                            // handleSuggestionSource(
                            //   suggestion.description
                            // )
                            handleDestinationSelect(suggestion.description)
                          }
                        >
                          {suggestion.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <div className="vline"></div>
        </div>
        <button onClick={() => handleClick()}>Submit</button>
      </div>
    </div>
  ) : (
    <div>Loading Google Maps...</div>
  );
};

export default Destination;
