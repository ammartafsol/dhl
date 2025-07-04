import { GoogleMap, Marker } from "@react-google-maps/api";
import classes from "./MapView.module.css";

export default function MapView({ data, location, className, zoomLevel = 16 }) {
  return (
    <div className={`${classes?.container} ${className && className}`}>
      <GoogleMap
        zoom={zoomLevel}
        center={location}
        mapContainerClassName={classes["map-container"]}
        options={{
          disableDefaultUI: true, // Disable all default UI elements
          clickableIcons: false, // Prevent callout for POIs
        }}
      >
        {data ? (
          data.map((item, index) => (
            <Marker key={index} position={item?.coordinates} />
          ))
        ) : (
          <Marker key={0} position={location} />
        )}
      </GoogleMap>
    </div>
  );
}
