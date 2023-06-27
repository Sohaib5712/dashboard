import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const sendEmail = async (user) => {
        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user
                })
            });

            const data = await res.json();
            console.log(data);

            if (data.status === 401 || !data) {
                console.log("Error sending email");
            } else {
                console.log("Email sent successfully");
            }
        } catch (error) {
            console.log("Error sending email:", error);
        }
    }

    const login = async (user, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user, password })
            })
            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }
            if (response.ok) {
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json))

                // update the auth context
                dispatch({ type: 'LOGIN', payload: json })

                // send email
                sendEmail(user);

                // update loading state
                setIsLoading(false)
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setIsLoading(false)
            setError("Failed to log in")
        }
    }

    return { login, isLoading, error }
}
