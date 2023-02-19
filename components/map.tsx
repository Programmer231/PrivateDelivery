import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Marker from "react-map-gl/dist/esm/components/marker";
import { useSession } from "next-auth/react";
import getDistance from "./distance";

const Map: React.FC<{ data: any }> = (props) => {
  const { data: session } = useSession();
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState<number | string>(5);
  const [lat, setLat] = useState<number | string>(34);
  const [zoom, setZoom] = useState<number | string>(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
      container: mapContainerRef.current as any,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng as number, lat as number],
      zoom: zoom as number,
    });
    {
      props?.data?.data?.map((data: any) => {
        console.log(data);
        const el = document.createElement("div");
        el.style.backgroundColor = "red";
        el.style.width = "30px";
        el.style.height = "30px";
        el.innerHTML = "";
        el.style.borderRadius = "50%";
        new mapboxgl.Marker(el)
          .setLngLat({
            lat: data.personalLongitude,
            lon: data.personalLatitude,
          })
          .addTo(map);
      });
    }
    const distanceArray = [];
    {
      props?.data?.data?.map((data: any) => {
        let color;
        if (data.Driver !== null && data.Driver.id !== session?.user.id) {
          color = "green";
        } else {
          color = "blue";
        }
        const el = document.createElement("div");
        el.style.backgroundColor = color;
        el.style.width = "30px";
        el.style.height = "30px";
        el.innerHTML = "";
        el.style.borderRadius = "50%";
        new mapboxgl.Marker(el)
          .setLngLat({
            lat: data.pickupLongitude,
            lon: data.pickupLatitude,
          })
          .addTo(map);
      });
    }

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4) as string);
      setLat(map.getCenter().lat.toFixed(4) as string);
      setZoom(map.getZoom().toFixed(2) as string);
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        showUserLocation: true,
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      }),
      "top-right"
    );

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ paddingTop: "50px" }}>
      <div id="map">
        <div
          style={{ width: "500px", height: "500px", margin: "auto" }}
          ref={mapContainerRef}
        />
      </div>
    </div>
  );
};

export default Map;
