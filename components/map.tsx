import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";

const Map: React.FC<{}> = (props) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState<number | string>(5);
  const [lat, setLat] = useState<number | string>(34);
  const [zoom, setZoom] = useState<number | string>(1.5);

  const handleClickFunction = () => {};

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
      container: mapContainerRef.current as any,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng as number, lat as number],
      zoom: zoom as number,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4) as string);
      setLat(map.getCenter().lat.toFixed(4) as string);
      setZoom(map.getZoom().toFixed(2) as string);
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ paddingTop: "50px" }}>
      <div>
        <div
          style={{ width: "500px", height: "500px", margin: "auto" }}
          ref={mapContainerRef}
        />
      </div>

      <button
        onClick={() => {
          handleClickFunction();
        }}
      ></button>
    </div>
  );
};

export default Map;
