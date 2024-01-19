import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = import.meta.env.PUBLIC_MAPBOX_KEY;

export default function App({ height }: { height: number }) {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map: React.MutableRefObject<mapboxgl.Map | null> = useRef(null);
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current!,
			center: [lng, lat],
			zoom: zoom,
		});

		map.current?.on("style.load", () => {
			map.current?.setLayoutProperty("background", "background-color", "dusk");
		});
	});

	return (
		<div className={`h-[${height}px]`}>
			<div ref={mapContainer} className="map-container w-full h-full" />
		</div>
	);
}
