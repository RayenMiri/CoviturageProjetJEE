const BASE_URL = "http://localhost:8083/api/reviews";

export const createReviewAPI = async (review) => {
    console.log(JSON.stringify(review));
    const response = await fetch(`${BASE_URL}/createReview`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });
    console.log(await response.text());
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
};

export const getReviewByIdReviewedAPI = async (userId) => {
    const response = await fetch(`${BASE_URL}/getReviewByIdReviewed/${userId}`);

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
};

export const getReviewByIdRideAPI = async (idRide) => {
    console.log(idRide);
    const response = await fetch(`${BASE_URL}/getReviewByIdRide/${idRide}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    console.log(await response.json());
    return await response.json();
}

export const updateReviewAPI = async (review) => {
    const response = await fetch(`${BASE_URL}/updateReview`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
};