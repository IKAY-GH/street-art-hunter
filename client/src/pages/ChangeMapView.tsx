import { useEffect } from "react";
import { useMap } from "react-leaflet";

// Props for ChangeMapView component
type Props = {
  position: [number, number]; // GPS coordinates [latitude, longitude]
};

/**
 * Utility component to programmatically change Leaflet map view
 * Updates map center and zoom when position prop changes
 */
export default function ChangeMapView({ position }: Props) {
  const map = useMap();

  // Update map view whenever position changes
  useEffect(() => {
    map.setView(position, 15); // Zoom level 15 for detailed view
  }, [map, position]);

  // This component doesn't render anything visible
  return null;
}
