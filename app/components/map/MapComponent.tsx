"use client";
import { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";

import Autocomplete from "react-google-autocomplete";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 18.559008,
  lng: -68.388881,
};

const path = [
  { lat: 18.566516, lng: -68.435996 },
  { lat: 18.5644, lng: -68.423036 },
  { lat: 18.563586, lng: -68.418744 },
  { lat: 18.562339, lng: -68.410725 },
  { lat: 18.560927, lng: -68.402459 },
  { lat: 18.559605, lng: -68.394354 },
  { lat: 18.559028, lng: -68.391003 },
  { lat: 18.558841, lng: -68.390594 },
  { lat: 18.558795, lng: -68.390387 },
  { lat: 18.558767, lng: -68.390312 },
  { lat: 18.558744, lng: -68.390256 },
  { lat: 18.558726, lng: -68.390202 },
  { lat: 18.55867, lng: -68.390124 },
  { lat: 18.558663, lng: -68.390111 },
  { lat: 18.558602, lng: -68.389995 },
  { lat: 18.5585, lng: -68.389867 },
  { lat: 18.558462, lng: -68.389837 },
  { lat: 18.558396, lng: -68.389781 },
  { lat: 18.55828, lng: -68.389641 },
  { lat: 18.558234, lng: -68.389557 },
  { lat: 18.558143, lng: -68.389469 },
  { lat: 18.558089, lng: -68.389362 },
  { lat: 18.558062, lng: -68.389265 },
  { lat: 18.558011, lng: -68.389069 },
  { lat: 18.557985, lng: -68.388965 },
  { lat: 18.557988, lng: -68.38879 },
  { lat: 18.558032, lng: -68.388603 },
  { lat: 18.55806, lng: -68.388525 },
  { lat: 18.558113, lng: -68.388425 },
  { lat: 18.558192, lng: -68.388297 },
  { lat: 18.558301, lng: -68.388181 },
  { lat: 18.558497, lng: -68.388045 },
  { lat: 18.558571, lng: -68.388002 },
  { lat: 18.558701, lng: -68.387927 },
  { lat: 18.558863, lng: -68.387895 },
  { lat: 18.559046, lng: -68.387887 },
  { lat: 18.559308, lng: -68.387922 },
  { lat: 18.559677, lng: -68.388185 },
  { lat: 18.559824, lng: -68.388314 },
  { lat: 18.559929, lng: -68.388397 },
  { lat: 18.560018, lng: -68.388512 },
  { lat: 18.560203, lng: -68.388607 },
  { lat: 18.560472, lng: -68.388615 },
  { lat: 18.560655, lng: -68.388613 },
  { lat: 18.560957, lng: -68.388572 },
  { lat: 18.561206, lng: -68.388521 },
];

// const ambulanceIcon = {
//   url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-C--YCy68RswHqrYRt8vr2ILTrIT2XCrsA&usqp=CAU",
//   scaledSize: new window.google.maps.Size(32, 32),
//   // anchor: { x: 16, y: 16 },
// };
const ambulanceIcon: any = {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-C--YCy68RswHqrYRt8vr2ILTrIT2XCrsA&usqp=CAU",
};

if (typeof window !== "undefined") {
  ambulanceIcon.scaledSize = new window.google.maps.Size(32, 32);
}

const MapComponent = () => {
  const [map, setMap] = useState(null);
  // const path = [
  //   { lat: 18.558908, lng: -68.389916 },
  //   { lat: 18.558853, lng: -68.389922 },
  //   { lat: 18.558375, lng: -68.389729 },
  //   { lat: 18.558032, lng: -68.389182 },
  //   { lat: 18.55805, lng: -68.388613 },
  //   { lat: 18.558256, lng: -68.388213 },
  //   { lat: 18.558744, lng: -68.387929 },
  // ];
  const [markerPosition, setMarkerPosition] = useState(path[0]);
  const [rotation, setRotation] = useState(0);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const sourceAutocompleteRef = useRef(null);
  const destinationAutocompleteRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDSvqFVfMDtPftyvZJMrEYeqF5R5dXc6nE" || "",
  });

  // useEffect(() => {
  //   // Fetch the directions/path using the Google Maps Directions API
  //   const fetchDirections = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://maps.googleapis.com/maps/api/directions/json?origin=${source}&destination=${destination}&key=AIzaSyDSvqFVfMDtPftyvZJMrEYeqF5R5dXc6nE`
  //       );
  //       const data = await response.json();
  //       console.log("Rspone", response);
  //       const { routes } = data;

  //       if (routes.length > 0) {
  //         const { legs } = routes[0];
  //         const steps = legs.flatMap((leg) => leg.steps);
  //         const coordinates = steps.map((step) => ({
  //           lat: step.start_location.lat,
  //           lng: step.start_location.lng,
  //         }));
  //         // setPath(coordinates);
  //         setCurrentIndex(0);
  //       } else {
  //         console.log("No routes found");
  //       }
  //     } catch (error) {
  //       console.log("Error fetching directions:", error);
  //     }
  //   };
  //   if (source && destination) {
  //     fetchDirections();
  //   }
  // }, [source, destination]);

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      // Move to the next coordinate in the path
      currentIndex = (currentIndex + 1) % path.length;
      const newMarkerPosition = path[currentIndex];
      setMarkerPosition(newMarkerPosition);

      // Calculate the angle between current and next position
      const { lat: lat1, lng: lng1 } = markerPosition;
      const { lat: lat2, lng: lng2 } = newMarkerPosition;
      const angle = Math.atan2(lat2 - lat1, lng2 - lng1) * (180 / Math.PI);

      setRotation(angle);
    }, 1000); // Adjust the interval time as needed

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onLoad = (map: any) => {
    setMap(map);
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={onLoad}
      >
        <Polyline path={path} options={{ strokeColor: "#FF0000" }} />
        <Marker position={markerPosition} icon={ambulanceIcon} />
      </GoogleMap>
    </>
  ) : (
    <div>Loading Google Maps...</div>
  );
};

export default MapComponent;
