import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = import.meta.env.PUBLIC_MAPBOX_KEY;

export default function App({ height }: { height: number }) {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map: React.MutableRefObject<mapboxgl.Map | null> = useRef(null);
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);

	class CustomControl implements mapboxgl.IControl {
		private container: HTMLDivElement;

		constructor() {
			this.container = document.createElement("div");
			this.container.className = "mapboxgl-ctrl";
			this.container.style.fontSize = "18px";
		}

		onAdd(map: mapboxgl.Map): HTMLElement {
			const zoomInButton = document.createElement("button");
			zoomInButton.innerHTML = "+";
			zoomInButton.addEventListener("click", () => {
				map.zoomIn();
			});

			const zoomOutButton = document.createElement("button");
			zoomOutButton.innerHTML = "-";
			zoomOutButton.addEventListener("click", () => {
				map.zoomOut();
			});

			this.container.appendChild(zoomInButton);
			this.container.appendChild(zoomOutButton);

			return this.container;
		}

		onRemove(): void {
			this.container.parentNode?.removeChild(this.container);
			this.container = null!;
		}
	}

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current!,
			center: [lng, lat],
			zoom: zoom,
		});

		map.current?.on("style.load", () => {
			if (map.current?.getLayer("basemap")) {
				map.current?.setLayoutProperty("basemap", "lightPreset", "dusk");
			} else {
				console.log("Layer 'basemap' does not exist");
			}
		});

		const customControl = new CustomControl();
		map.current?.addControl(customControl, "top-right");
	});

	return (
		<div className={`h-[${height}px]`}>
			<div ref={mapContainer} className="map-container w-full h-full" />
		</div>
	);
}
