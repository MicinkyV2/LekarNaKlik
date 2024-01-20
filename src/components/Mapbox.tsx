import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import type { Doctor } from "../utils/types";

if (!import.meta.env.PUBLIC_MAPBOX_KEY) {
	console.error("Mapbox access token is not defined");
} else {
	mapboxgl.accessToken = import.meta.env.PUBLIC_MAPBOX_KEY;
}

async function getLatLng(item: Doctor) {
	if (!item.workplaceAddress) {
		console.warn("Missing workplaceAddress in item:", item);
		return null;
	}

	try {
		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
				item.workplaceAddress
			)}.json?access_token=${import.meta.env.PUBLIC_MAPBOX_KEY}`
		);

		if (!response.ok) {
			console.error("Geocoding API response error:", response);
			return null;
		}

		const responseData = await response.json();

		if (!responseData.features || responseData.features.length === 0) {
			console.warn("No geocoding data for address:", item.workplaceAddress);
			return null;
		}

		const coordinates = responseData.features[0].geometry.coordinates;
		return { ...item, coordinates };
	} catch (error) {
		console.error("Error fetching geocoding data:", error);
	}
}

export default function App({ height, regId }: { height: string, regId?: string }) {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map: React.MutableRefObject<mapboxgl.Map | null> = useRef(null);
	const [lng] = useState(15.5);
	const [lat] = useState(49.75);
	const [zoom] = useState(6);

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
			zoomInButton.innerHTML = `<img src="/mapUI/magnifying-glass-plus.svg" style="display: block; margin-left: auto; margin-right: auto; width: 20px">`;
			zoomInButton.style.width = "35px";
			zoomInButton.style.height = "40px";
			zoomInButton.addEventListener("click", () => {
				map.zoomIn();
			});
			zoomInButton.addEventListener("mouseover", () => {
				zoomInButton.style.backgroundColor = "#F5F5F5";
			});
			zoomInButton.addEventListener("mouseout", () => {
				zoomInButton.style.backgroundColor = "";
			});

			const zoomOutButton = document.createElement("button");
			zoomOutButton.innerHTML = `<img src="/mapUI/magnifying-glass-minus.svg" style="display: block; margin-left: auto; margin-right: auto; width: 20px">`;
			zoomOutButton.style.width = "35px";
			zoomOutButton.style.height = "40px";
			zoomOutButton.addEventListener("click", () => {
				map.zoomOut();
			});
			zoomOutButton.addEventListener("mouseover", () => {
				zoomOutButton.style.backgroundColor = "#F5F5F5";
			});
			zoomOutButton.addEventListener("mouseout", () => {
				zoomOutButton.style.backgroundColor = "";
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

	class FullscreenControl implements mapboxgl.IControl {
		private container: HTMLDivElement;

		constructor() {
			this.container = document.createElement("div");
			this.container.className =
				"pointer-events-auto flex flex-col items-center mt-2 ml-2 bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:border-gray-300";
			this.container.style.fontSize = "18px";
		}

		onAdd(map: mapboxgl.Map): HTMLElement {
			const fullscreenButton = document.createElement("button");
			fullscreenButton.innerHTML = `<img src="/mapUI/corners-out.svg" style="display: block; margin-left: auto; margin-right: auto; width: 25px">`;
			fullscreenButton.style.width = "35px";
			fullscreenButton.style.height = "35px";
			fullscreenButton.addEventListener("click", () => {
				if (document.fullscreenElement) {
					document.exitFullscreen();
				} else {
					map.getContainer().requestFullscreen();
				}
			});
			fullscreenButton.addEventListener("mouseover", () => {
				fullscreenButton.style.backgroundColor = "#F5F5F5";
			});
			fullscreenButton.addEventListener("mouseout", () => {
				fullscreenButton.style.backgroundColor = "";
			});

			this.container.appendChild(fullscreenButton);

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
			locationButton.innerHTML = `<img src="/mapUI/navigation-arrow.svg" style="display: block; margin-left: auto; margin-right: auto; width: 20px">`;
			locationButton.style.width = "35px";
			locationButton.style.height = "35px";
			locationButton.addEventListener("click", () => {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition((position) => {
						const { longitude, latitude } = position.coords;
						map.flyTo({
							center: [longitude, latitude],
							zoom: 13,
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
				locationButton.style.backgroundColor = "#F5F5F5";
			});
			locationButton.addEventListener("mouseout", () => {
				locationButton.style.backgroundColor = "";
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
		if (map.current) return;
		if (!mapContainer.current) {
			console.error("Map container is not defined");
			return;
		}
		try {
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
							zoom: 13,
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

			if(regId !== undefined && regId !== null && regId !== "") {
			fetch("/api/entry.json?regID=" + regId).then((res) => res.json()).then((data) => {

			getLatLng(data)
				.then((item) => {
						if (!item || typeof item.coordinates !== "object") {
							throw new Error("Invalid item in results");
						}

						const el = document.createElement("div");
						el.className = "marker";
						el.style.width = "15px";
						el.style.height = "15px";
						el.style.backgroundColor = "#ea3323";
						el.style.borderRadius = "50%";
						el.style.border = "2px solid #9d2217";

						const marker = new mapboxgl.Marker(el).setLngLat(item.coordinates);

						if (map.current) {
							marker.addTo(map.current);
						} else {
							console.error("Map is not initialized");
						}
				})
				.catch((error) => console.error(error));

			});

			}

			const combinedControl = new CombinedControl();
			const fullscreenControl = new FullscreenControl();
			map.current?.addControl(combinedControl, "top-right");
			map.current?.addControl(fullscreenControl, "top-left");
		} catch (error) {
			console.error("Failed to initialize map", error);
		}

		return () => {
			map.current?.remove();
		};
	}, [lng, lat, zoom]);

	return (
		<div style={{ height: `${height}` }}>
			<div ref={mapContainer} className="map-container w-full h-full" />
		</div>
	);
}
