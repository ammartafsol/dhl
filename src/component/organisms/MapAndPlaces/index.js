import { useLoadScript } from "@react-google-maps/api";
import { config } from "@/config";
import PlacesInput from "@/component/molecules/PlacesInput";
import MapView from "@/component/molecules/MapView";

const defaultLocation = { lat: 32.715736, lng: -117.161087 };

// type = 'map' || 'places'
const MapAndPlaces = ({
  type = "map",
  className,
  mapClass,
  placeClass,
  setLocationData,
  address,
  location = defaultLocation,
  placeholder,
  label,
  leftIcon,
  data,
  loader,
  types,
  rightIcon,
  errorText,
  customIcon,
  zoomLevel,
  labelTextStl,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config?.googleMapApiKey,
    libraries: ["places", "visualization"],
  });
  if (!isLoaded) {
    return loader ? loader : <div>Loading</div>;
  }

  if (loadError) {
    return (
      <div>
        <span>Map cannot be loaded right now, sorry. </span>
      </div>
    );
  }

  return (
    <div className={`${className ? className : ""}`}>
      {type === "map" ? (
        <MapView
          data={data}
          location={location}
          className={mapClass}
          zoomLevel={zoomLevel}
          customIcon={customIcon}
        />
      ) : (
        <PlacesInput
          setLocationData={setLocationData}
          address={address}
          className={placeClass}
          placeholder={placeholder}
          label={label}
          leftIcon={leftIcon}
          types={types}
          rightIcon={rightIcon}
          errorText={errorText}
          labelTextStl={labelTextStl}
        />
      )}
    </div>
  );
};

export default MapAndPlaces;
