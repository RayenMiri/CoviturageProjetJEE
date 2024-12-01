import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import L from "leaflet";
import axios from "axios";
import { fetchRides } from "../../Store/Slices/ridesSlice";
import "leaflet/dist/leaflet.css";

// Custom icon for markers with different colors for departure and destination
const departureIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const destinationIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});



// Function to fetch coordinates from Nominatim API with Tunisia context
const fetchCoordinates = async (location) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                q: `${location}, Tunisia`, // Add Tunisia context
                format: "json",
                addressdetails: 1,
                limit: 1,
                countrycodes: 'tn' // Limit to Tunisia
            },
        });
        if (response.data.length > 0) {
            return {
                lat: parseFloat(response.data[0].lat),
                lng: parseFloat(response.data[0].lon),
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
};

// Map bounds adjuster component
function MapBoundsAdjuster({ coordinates }) {
    const map = useMap();

    useEffect(() => {
        if (coordinates && coordinates.length > 0) {
            const bounds = L.latLngBounds(coordinates.map(coord => {
                return [
                    coord.departureCoordinates?.lat || 0,
                    coord.departureCoordinates?.lng || 0
                ];
            }));

            coordinates.forEach(coord => {
                if (coord.destinationCoordinates) {
                    bounds.extend([
                        coord.destinationCoordinates.lat,
                        coord.destinationCoordinates.lng
                    ]);
                }
            });

            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [coordinates, map]);

    return null;
}

const RidesMap = () => {
    const { rides, loading, error } = useSelector((state) => state.rides);
    const dispatch = useDispatch();
    const [coordinates, setCoordinates] = useState([]);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchRides());
    }, [dispatch]);

    useEffect(() => {
        const getCoordinatesForRides = async () => {
            const coords = await Promise.all(
                rides.map(async (ride) => {
                    const departureCoordinates = await fetchCoordinates(ride.departureLocation);
                    const destinationCoordinates = await fetchCoordinates(ride.destination);

                    return {
                        id: ride.idRide,
                        departureCoordinates,
                        destinationCoordinates,
                        ride // Store the full ride object for popup data
                    };
                })
            );
            setCoordinates(coords.filter(coord =>
                coord.departureCoordinates && coord.destinationCoordinates
            ));
            setMapLoaded(true);
        };

        if (rides && rides.length > 0) {
            getCoordinatesForRides();
        }
    }, [rides]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[500px] flex items-center justify-center">
                <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg">
                    Error loading rides: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                Available Rides Map
            </h1>

            <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
                <MapContainer
                    center={[36.8065, 10.1815]} // Centered on Tunisia
                    zoom={7}
                    className="h-[600px] w-full z-0"
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {mapLoaded && <MapBoundsAdjuster coordinates={coordinates} />}

                    {coordinates.map((coord) => (
                        <React.Fragment key={coord.id}>
                            {coord.departureCoordinates && (
                                <Marker
                                    position={[coord.departureCoordinates.lat, coord.departureCoordinates.lng]}
                                    icon={departureIcon}
                                >
                                    <Popup>
                                        <div className="text-sm">
                                            <h3 className="font-bold mb-2">Departure Point</h3>
                                            <p><strong>Location: </strong> {coord.ride.departureLocation}</p>
                                            <p><strong>Date: </strong> {new Date(coord.ride.departureDateTime).toLocaleString()}</p>
                                            <p><strong>Available Seats: </strong> {coord.ride.availableSeats}</p>
                                            <p><strong>Destination : </strong>{coord.ride.destination}</p>
                                            <p><strong>Price: </strong> {coord.ride.pricePerSeat} TND</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            )}
                            {coord.destinationCoordinates && (
                                <Marker
                                    position={[coord.destinationCoordinates.lat, coord.destinationCoordinates.lng]}
                                    icon={destinationIcon}
                                >
                                    <Popup>
                                        <div className="text-sm">
                                            <h3 className="font-bold mb-2">Destination Point</h3>
                                            <p><strong>Location:</strong> {coord.ride.destination}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            )}
                        </React.Fragment>
                    ))}
                </MapContainer>
            </div>

            <div className="mt-4 flex gap-4 items-center justify-center">
                <div className="flex items-center gap-2">
                    <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
                         alt="Departure"
                         className="h-6" />
                    <span>Departure</span>
                </div>
                <div className="flex items-center gap-2">
                    <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
                         alt="Destination"
                         className="h-6" />
                    <span>Destination</span>
                </div>
            </div>
        </div>
    );
};

export default RidesMap;

