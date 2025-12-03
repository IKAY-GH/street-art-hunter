import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  position: [number, number];
};

export default function ChangeMapView({ position }: Props) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 15);
  }, [map, position]);

  return null;
}
