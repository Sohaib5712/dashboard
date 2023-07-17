import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const sendEmail = async (user, ipAddress, currentTime, location) => {
        const { latitude, longitude } = location;
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user,
                    ipAddress,
                    currentTime,
                    location: { latitude, longitude }
                }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                console.log('Email sent successfully');
            } else {
                console.log('Error sending email');
            }
        } catch (error) {
            console.log('Error sending email:', error);
        }
    };

    const getLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    const login = async (user, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

            if (permissionStatus.state === 'granted') {
                // Location permission is granted, continue with the login process
                const response = await fetch('/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user, password }),
                });
                const json = await response.json();

                if (!response.ok) {
                    setIsLoading(false);
                    setError(json.error);
                }

                if (response.ok) {
                    // Save the user to local storage
                    localStorage.setItem('user', JSON.stringify(json));

                    // Update the auth context
                    dispatch({ type: 'LOGIN', payload: json });

                    // Get current date and time
                    const currentTime = new Date().toLocaleString();

                    // Get IP address
                    fetch('https://api.ipify.org/?format=json')
                        .then((response) => response.json())
                        .then((data) => {
                            const ipAddress = data.ip;

                            // Get location
                            getLocation()
                                .then((position) => {
                                    const { latitude, longitude } = position.coords;

                                    // Send email with user details
                                    sendEmail(user, ipAddress, currentTime, { latitude, longitude });
                                })
                                .catch((error) => {
                                    console.log('Error getting location:', error);
                                });
                        })
                        .catch((error) => {
                            console.log('Error getting IP address:', error);
                        });
                    setIsLoading(false);
                }
            } else if (permissionStatus.state === 'prompt') {
                // Location permission is not granted but is prompt able, show permission prompt
                permissionStatus.onchange = async () => {
                    if (permissionStatus.state === 'granted') {
                        // Permission granted, reload the page
                        window.location.reload();
                    } else if (permissionStatus.state === 'denied') {
                        // Permission denied, show error message or handle it accordingly
                        setIsLoading(false);
                        setError('Location permission denied, give Location permission by click on lock icon!');
                    }
                };
            } else if (permissionStatus.state === 'denied') {
                // Location permission is denied, show error message or handle it accordingly
                setIsLoading(false);
                setError('Location permission denied, give Location permission by click on lock icon!');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setIsLoading(false);
            setError('Failed to log in');
        }
    };

    return { login, isLoading, error };
};
