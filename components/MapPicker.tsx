"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
interface LocationMarkerProps {
    position: [number, number];
    setPosition: (position: [number, number]) => void;
    onSelect: (position: [number, number]) => void;
}
const markerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
function LocationMarker({ position, setPosition, onSelect }: LocationMarkerProps) {
    useMapEvents({
        click(e) {
            const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
            setPosition(newPos);
            onSelect(newPos);
        },
    });

    return position === null ? null : (
        <Marker position={position} icon={markerIcon} />
    );
}

export default function MapPicker({ onLocationSelect }: { onLocationSelect: (latlng: [number, number]) => void }) {
    const [position, setPosition] = useState<[number, number]>([35.6997, 51.3380]);
    return (
        <div className="h-75 w-full rounded-2xl overflow-hidden border border-stroke z-0 relative shadow-inner">
            <MapContainer
                center={[35.6997, 51.3380]}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', zIndex: 1 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} setPosition={setPosition} onSelect={onLocationSelect} />
            </MapContainer>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-1000 bg-primary backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-text-main shadow-md pointer-events-none">
                برای انتخاب آدرس دقیق، روی نقشه کلیک کنید
            </div>
        </div>
    );
}