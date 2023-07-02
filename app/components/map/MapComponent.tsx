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
  { lat: 18.558908, lng: -68.389916 },
  { lat: 18.558853, lng: -68.389922 },
  { lat: 18.558375, lng: -68.389729 },
  { lat: 18.558032, lng: -68.389182 },
  { lat: 18.55805, lng: -68.388613 },
  { lat: 18.558256, lng: -68.388213 },
  { lat: 18.558744, lng: -68.387929 },
];

const ambulanceIcon = {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-C--YCy68RswHqrYRt8vr2ILTrIT2XCrsA&usqp=CAU",
  scaledSize: { width: 32, height: 32 },
  anchor: { x: 16, y: 16 },
};

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
    googleMapsApiKey: "AIzaSyDSvqFVfMDtPftyvZJMrEYeqF5R5dXc6nE" || "undefined",
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
        <Marker
          position={markerPosition}
          icon={{ ...ambulanceIcon, rotation: rotation }}
        />
      </GoogleMap>
    </>
  ) : (
    <div>Loading Google Maps...</div>
  );
};

export default MapComponent;
