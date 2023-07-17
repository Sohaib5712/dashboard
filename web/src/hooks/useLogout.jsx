/**
 * This function provides a hook for logging out a user and redirecting them to the login page in a
 * React application.
 * @returns The `useLogout` hook is returning an object with a single property `logout`, which is a
 * function that removes the user from local storage, dispatches a `LOGOUT` action to the
 * authentication context, and navigates the user to the login page.
 */
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
        navigate('/login');
    }

    return { logout }
}