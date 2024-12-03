export const fetchRidesAPI = async () => {
    const response = await fetch('http://localhost:8083/api/rides/getAllRides');
    if (!response.ok) {
        throw new Error('Failed to fetch rides');
    }
    return response.json();
};

export const fetchRideByIdAPI = async (id) => {
    const response = await fetch(`http://localhost:8083/api/rides/getRideById/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch ride by ID');
    }
    return response.json();
};

export const addRideToAPI = async (rideDetails) => {
    const response = await fetch('http://localhost:8083/api/rides/createRide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rideDetails),
    });
    if (!response.ok) {
        throw new Error('Failed to add ride');
    }
    return response.json();
};

export const fetchRidesByDriverIdAPI = async (driverId) => {
    const response = await fetch(`http://localhost:8083/api/rides/getRidesByDriverId/${driverId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch rides by driver ID');
    }
    return response.json();
};

export const updateRideInAPI = async (id, updatedRide) => {
    const response = await fetch(`http://localhost:8083/api/rides/updateRide/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRide),
    });
    if (!response.ok) {
        throw new Error('Failed to update ride');
    }
    return response.json();
};

export const deleteRideFromAPI = async (id) => {
    const response = await fetch(`http://localhost:8083/api/rides/deleteRide/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete ride');
    }
    return true; // Successfully deleted
};

export const searchRides = async (queryParams) => {
    const query = new URLSearchParams(queryParams).toString();
    const response = await fetch(`http://localhost:8083/api/rides/searchRides?${query}`);
    if (!response.ok) {
        throw new Error('Failed to search rides');
    }
    return response.json();
};