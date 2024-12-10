import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import L from "leaflet";
import axios from "axios";
import { fetchRides } from "../../Store/Slices/ridesSlice";
import AddRideForm from '../../Components/AddRideForm';
import "leaflet/dist/leaflet.css";

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

const fetchCoordinates = async (location) => {
    try {
        const response = await axios.get(`https://photon.komoot.io/api/`, {
            params: {
                q: `${location} , Tunisia`,
                lang: "en",
                limit: 1,
            },
        });
        if (response.data.features && response.data.features.length > 0) {
            const coords = response.data.features[0].geometry.coordinates;
            return {
                lat: coords[1], // Latitude
                lng: coords[0], // Longitude
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
};

const fetchAddress = async (lonlat) => {
    try {
        const response = await axios.get(`https://photon.komoot.io/reverse`, {
            params: {
                lat: lonlat.lat,
                lon: lonlat.lng,

            },
        });

        if (response.data.features && response.data.features.length > 0) {
            const properties = response.data.features[0].properties;

            // Combine relevant fields into a readable location string
            const name = properties.name || "";
            const state = properties.state || "";
            const country = properties.country || "";

            // Return a formatted location string
            const locationName = [name, state, country].filter(Boolean).join(", ");
            return locationName;
        }
        return null;
    } catch (error) {
        console.error("Error fetching address:", error);
        return null;
    }
};

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

const MapClickHandler = ({ onMapClick }) => {
    useMapEvents({
        click: (e) => {
            onMapClick(e.latlng);
        },
    });
    return null;
};

const RidesMap = () => {
    const { rides, loading, error } = useSelector((state) => state.rides);
    const dispatch = useDispatch();
    const [coordinates, setCoordinates] = useState([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [departureMarker, setDepartureMarker] = useState(null);
    const [destinationMarker, setDestinationMarker] = useState(null);
    const [isSettingDeparture, setIsSettingDeparture] = useState(true);
    const [destCoordsName, setDestCoordsName] = useState("");
    const [depCoordsName, setDepCoordsName] = useState("");

    const userID = JSON.parse(localStorage.getItem("user")).userId;
    const userRole = JSON.parse(localStorage.getItem("user")).role;

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
                        ride
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

    const handleMapClick = useCallback(async (latlng) => {
        const placeName = await fetchAddress(latlng);
        if (isSettingDeparture) {
            setDepartureMarker(latlng);
            setDepCoordsName(placeName);
        } else {
            setDestinationMarker(latlng);
            setDestCoordsName(placeName);
        }
    }, [isSettingDeparture]);

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

    const mapContent = (
        <MapContainer
            center={[36.8065, 10.1815]}
            zoom={7}
            className={`w-full ${userRole !== "RIDER" ? 'h-screen' : 'h-[600px]'}`}
            scrollWheelZoom={true}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mapLoaded && <MapBoundsAdjuster coordinates={coordinates} />}
            {userRole === "RIDER" &&  <MapClickHandler onMapClick={handleMapClick} />}
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
            {departureMarker && <Marker position={departureMarker} icon={departureIcon} />}
            {destinationMarker && <Marker position={destinationMarker} icon={destinationIcon} />}
        </MapContainer>
    );

    if (userRole !== "RIDER") {
        return (
            <div className="w-full h-screen">
                {mapContent}
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                Available Rides Map
            </h1>

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <AddRideForm userID={userID} coordsNames={{depCoordsName, destCoordsName}} />
                </div>
                <div className="col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Select Location on Map</h2>
                    <div className="mb-4">
                        <button
                            onClick={() => setIsSettingDeparture(true)}
                            className={`mr-2 px-4 py-2 rounded-lg ${
                                isSettingDeparture ? 'bg-green-500 text-white' : 'bg-gray-200'
                            }`}
                        >
                            Set Departure
                        </button>
                        <button
                            onClick={() => setIsSettingDeparture(false)}
                            className={`px-4 py-2 rounded-lg ${
                                !isSettingDeparture ? 'bg-red-500 text-white' : 'bg-gray-200'
                            }`}
                        >
                            Set Destination
                        </button>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {mapContent}
                    </div>
                </div>
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

