import L from "leaflet";
import "leaflet-routing-machine";
import {useEffect} from "react";
import {useMap} from "react-leaflet";

const RoutingControl = ({ coordinates }) => {
    const map = useMap();

    useEffect(() => {
        if (coordinates && coordinates.length > 0) {
            coordinates.forEach(({ departureCoordinates, destinationCoordinates }) => {
                if (departureCoordinates && destinationCoordinates) {
                    const routingControl = L.Routing.control({
                        waypoints: [
                            L.latLng(departureCoordinates.lat, departureCoordinates.lng),
                            L.latLng(destinationCoordinates.lat, destinationCoordinates.lng)
                        ],
                        routeWhileDragging: true,
                        showAlternatives: false,
                        addWaypoints: false,
                    }).addTo(map);

                    return () => {
                        map.removeControl(routingControl);
                    };
                }
            });
        }
    }, [coordinates, map]);

    return null;
};

export default RoutingControl;
