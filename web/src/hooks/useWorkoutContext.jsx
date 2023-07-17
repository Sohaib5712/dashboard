/**
 * This function returns the context of the WorkoutsContextProvider for use in a React component.
 * @returns The `useWorkoutsContext` custom hook is being returned, which returns the context object
 * from the `WorkoutsContext` provider using the `useContext` hook. If the context is not available, it
 * throws an error.
 */
import { WorkoutsContext } from "../context/WorkoutContext"
import { useContext } from "react"

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
    }

    return context
}