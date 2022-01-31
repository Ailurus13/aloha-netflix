import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export function Map({ waypoint, className, id }) {
  return (
    <div id={id} className={className}>
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={[32.42, -90.13]}
        zoom={3}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {waypoint && (
          <Marker position={[waypoint.lat, waypoint.lng]}>
            <Popup>{waypoint.label}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
