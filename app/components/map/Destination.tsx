"use client";
import axios from "axios";
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
import { type } from "os";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 18.559008,
  lng: -68.388881,
};

interface DestinationProps {
  placeholder: string;
}

const Destination: React.FunctionComponent<DestinationProps> = ({
  placeholder,
}) => {
  const [map, setMap] = useState(null);

  const [path, setPath] = useState([]);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [finalSource, setFinalSource] = useState({});
  const [finalDestination, setFinalDestination] = useState({});
  //   const sourceAutocompleteRef = useRef(null);
  //   const destinationAutocompleteRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "undefined",
    libraries: ["places"],
  });

  async function getRouteDetails(finalSource: any, finalDestination: any) {
    //maps.googleapis.com/maps/api/distancematrix/json?origins=22.5474164%2C88.3598025&destinations=22.5830002%2C88.3372909&key=AIzaSyDSvqFVfMDtPftyvZJMrEYeqF5R5dXc6nE
    let response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${finalSource.latLong.lat}%2C${finalSource.latLong.lng}&destinations=${finalDestination.latLong.lat}%2C${finalDestination.latLong.lng}&key=AIzaSyDSvqFVfMDtPftyvZJMrEYeqF5R5dXc6nE`
    );
    console.log("Resposne from distance and time api", response.data.rows);

    return response.data.rows;
  }
  async function handleClick() {
    const response = await getRouteDetails(finalSource, finalDestination);
    console.log("Response", response);
  }

  function handleDestinationChange(event: any) {
    setDestination(event);
  }

  function handleDestinationSelect(suggestDestination: any) {
    var testDestination: any = {};
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
    const fetchDirections = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${source}&destination=${destination}&key=AIzaSyDSvqFVfMDtPftyvZJMrEYeqF5R5dXc6nE`
        );
        const data = await response.json();
        const { routes } = data;

        if (routes.length > 0) {
          const { legs } = routes[0];
          const steps = legs.flatMap((leg: any) => leg.steps);
          const coordinates = steps.map((step: any) => ({
            lat: step.start_location.lat,
            lng: step.start_location.lng,
          }));
          setPath(coordinates);
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
      <div className="flex gap-3 items-start">
        <div className="">
          <PlacesAutocomplete
            value={destination}
            onChange={(event) => handleDestinationChange(event)}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }: any) => (
              <div className=" flex flex-col gap-4 w-full max-w-[300px] relative">
                <input
                  {...getInputProps({
                    placeholder: placeholder,
                    className: "location-search-input ",
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion: any) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    const style = suggestion.active ? {} : {};
                    return (
                      <div
                        key={suggestion.description}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          // style,
                        })}
                      >
                        <span
                          onClick={() =>
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
        <button
          className="w-[100px] h-[40px] bg-[#458ff6] rounded-[3.4375rem] text-center text-[#fff] text-[1rem] font-medium"
          onClick={() => handleClick()}
        >
          Submit
        </button>
      </div>
    </div>
  ) : (
    <div>Loading Google Maps...</div>
  );
};

export default Destination;
