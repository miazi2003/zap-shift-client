import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import serviceCenterData from "../../data/warehouses.json";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// This component is used to programmatically change the map view
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  map.flyTo(center, zoom, {
    duration: 4, 
  });
  return null;
};

const ServiceCenterMap = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const mapRef = useRef();

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();

    const result = serviceCenterData.find((center) =>
      center.city.toLowerCase().includes(searchText.toLowerCase())
    );

    if (result) {
      setSelectedPosition([result.latitude, result.longitude]);
    } else {
      alert("City not found");
    }
  };

  return (
    <div className=" px-8 py-4 flex flex-col gap-4 bg-white rounded-3xl">

    <div className="text-4xl text-[#03373d] font-bold ">
      <h1>We are available in 64 districts</h1>
    </div>




      {/* Search input */}
      <form onSubmit={handleSearch} className="mb-4 flex  relative max-w-max">
        <input
          type="text"
          placeholder="Enter city name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border-none px-4 py-2 rounded-3xl lg:w-96 h-9 bg-gray-200 "
        />
        <button type="submit" className= "absolute right-0 bg-[#caeb66]  text-black text-sm font-bold px-4 py-2 rounded-3xl h-9 flex items-center justify-center">
          Search
        </button>
      </form>

      <div className="w-full border border-gray-200"></div>
      <div>
        <p className="text-lg font-bold text-[#03373d]">We Are Almost All Over Bangladesh </p>
      </div>

      {/* Map */}
      <div className="w-full h-[300px]">
        <MapContainer
          center={[23.8103, 90.4125]} // Default to Dhaka
          zoom={6}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {selectedPosition && <ChangeMapView center={selectedPosition} zoom={12}/>}

          {serviceCenterData.map((center, idx) => (
            <Marker key={idx} position={[center.latitude, center.longitude]}>
              <Popup>
                <b>Your Service Center</b>
                <p>{center.city}</p>
                <span>Region: {center.region}</span><br />
                <span>Status: {center.status}</span><br />
                <p>Coverage: {center.covered_area.join(", ")}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ServiceCenterMap;
