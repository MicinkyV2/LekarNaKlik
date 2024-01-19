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
			this.container.className =
				"pointer-events-auto flex flex-col items-center mt-2 mr-2 bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:border-gray-300";
			this.container.style.fontSize = "18px";
		}

		onAdd(map: mapboxgl.Map): HTMLElement {
			const zoomInButton = document.createElement("button");
			zoomInButton.innerHTML = `<img src="/public/mapUI/magnifying-glass-plus.svg" style="display: block; margin-left: auto; margin-right: auto; width: 20px">`;
			zoomInButton.style.width = "35px";
			zoomInButton.style.height = "40px";
			zoomInButton.addEventListener("click", () => {
				map.zoomIn();
			});
			zoomInButton.addEventListener("mouseover", () => {
				zoomInButton.style.backgroundColor = "#F5F5F5"; // replace with your hover style
			});
			zoomInButton.addEventListener("mouseout", () => {
				zoomInButton.style.backgroundColor = ""; // reset to original style
			});

			const zoomOutButton = document.createElement("button");
			zoomOutButton.innerHTML = `<img src="/public/mapUI/magnifying-glass-minus.svg" style="display: block; margin-left: auto; margin-right: auto; width: 20px">`;
			zoomOutButton.style.width = "35px";
			zoomOutButton.style.height = "40px";
			zoomOutButton.addEventListener("click", () => {
				map.zoomOut();
			});
			zoomOutButton.addEventListener("mouseover", () => {
				zoomOutButton.style.backgroundColor = "#F5F5F5"; // replace with your hover style
			});
			zoomOutButton.addEventListener("mouseout", () => {
				zoomOutButton.style.backgroundColor = ""; // reset to original style
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

	class LocationControl implements mapboxgl.IControl {
		private container: HTMLDivElement;

		constructor() {
			this.container = document.createElement("div");
			this.container.className =
				"pointer-events-auto flex flex-col items-center mt-2 mr-2 bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:border-gray-300";
			this.container.style.fontSize = "18px";
		}

		onAdd(map: mapboxgl.Map): HTMLElement {
			const locationButton = document.createElement("button");
			locationButton.innerHTML = `<img src="/public/mapUI/navigation-arrow.svg" style="display: block; margin-left: auto; margin-right: auto; width: 20px">`;
			locationButton.style.width = "35px";
			locationButton.style.height = "40px";
			locationButton.addEventListener("click", () => {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition((position) => {
						const { longitude, latitude } = position.coords;
						map.flyTo({
							center: [longitude, latitude],
							zoom: 14,
						});

						const el = document.createElement("div");
						el.className = "marker";
						el.style.width = "15px";
						el.style.height = "15px";
						el.style.backgroundColor = "#3FB1CE";
						el.style.borderRadius = "50%";
						el.style.border = "2px solid #fff";

						new mapboxgl.Marker(el).setLngLat([longitude, latitude]).addTo(map);
					});
				} else {
					console.log("Geolocation is not supported by this browser.");
				}
			});
			locationButton.addEventListener("mouseover", () => {
				locationButton.style.backgroundColor = "#F5F5F5"; // replace with your hover style
			});
			locationButton.addEventListener("mouseout", () => {
				locationButton.style.backgroundColor = ""; // reset to original style
			});

			this.container.appendChild(locationButton);

			return this.container;
		}

		onRemove(): void {
			this.container.parentNode?.removeChild(this.container);
			this.container = null!;
		}
	}

	class CombinedControl implements mapboxgl.IControl {
		private container: HTMLDivElement;

		constructor() {
			this.container = document.createElement("div");
		}

		onAdd(map: mapboxgl.Map): HTMLElement {
			const customControl = new CustomControl();
			this.container.appendChild(customControl.onAdd(map));

			const locationControl = new LocationControl();
			this.container.appendChild(locationControl.onAdd(map));

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

		map.current?.on("load", () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					const { longitude, latitude } = position.coords;
					map.current?.flyTo({
						center: [longitude, latitude],
						zoom: 14,
					});

					const el = document.createElement("div");
					el.className = "marker";
					el.style.width = "15px";
					el.style.height = "15px";
					el.style.backgroundColor = "#3FB1CE";
					el.style.borderRadius = "50%";
					el.style.border = "2px solid #fff";

					new mapboxgl.Marker(el)
						.setLngLat([longitude, latitude])
						.addTo(map.current!);
				});
			} else {
				console.log("Geolocation is not supported by this browser.");
			}
		});

		const combinedControl = new CombinedControl();
		map.current?.addControl(combinedControl, "top-right");
	});

	return (
		<div style={{ height: `${height}px` }}>
			<div ref={mapContainer} className="map-container w-full h-full" />
		</div>
	);
}
