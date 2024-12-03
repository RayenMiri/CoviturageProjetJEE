export const loginUser  = async (credentials)=>{


        const response = await fetch('http://localhost:8083/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const signInResponseContentType = response.headers.get('content-type');

        if (!response.ok) {
            // Handle server-side error
            if (signInResponseContentType && signInResponseContentType.includes('application/json')) {
                const error = await response.json();
                throw new Error(error.message || 'Signin failed');
            } else {
                const errorText = await response.text();
                throw new Error(errorText || 'Signin failed');
            }
        }
        if (signInResponseContentType && signInResponseContentType.includes('application/json')) {

            return await response.json();
        } else {
            return await response.text();
        }



};

export const signupUser = async (username, email, password, role) => {

    const response = await fetch('http://localhost:8083/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
    });

    const signUpResponseContentType = response.headers.get('content-type');

    if (!response.ok) {

        if (signUpResponseContentType && signUpResponseContentType.includes('application/json')) {
            const error = await response.json();
            throw new Error(error.message || 'Signup failed');
        } else {
            const errorText = await response.text();
            throw new Error(errorText || 'Signup failed');
        }
    }

    if (signUpResponseContentType && signUpResponseContentType.includes('application/json')) {

        return await response.json();
    } else {
        return await response.text();
    }

}
