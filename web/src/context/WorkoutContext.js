/* This code is creating a React context and a reducer function for managing state related to workouts.
It also creates a context provider component that wraps its children with the context and provides
the state and dispatch function to its children. The reducer function handles actions related to
setting, updating, and deleting workouts. */
import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUTS":
            return {
                students: action.payload,
            };

        case "UPDATE_WORKOUT":
            const updatedStudents = state.students.map((student) => {
                if (student._id === action.payload.studentId) {
                    return {
                        ...student,
                        ...action.payload.newData,
                    };
                }
                return student;
            });
            return {
                students: updatedStudents,
            };

        case "DELETE_STUDENT":
            const filteredStudents = state.students.filter(
                (student) => student._id !== action.payload
            );
            return {
                students: filteredStudents,
            };

        case "UPDATE_STATUS":
            const updatedStatusStudents = state.students.map((student) => {
                if (student._id === action.payload.studentId) {
                    return {
                        ...student,
                        status: action.payload.status,
                    };
                }
                return student;
            });
            return {
                students: updatedStatusStudents,
            };

        default:
            return state;
    }
};

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        students: [], // Initialize students as an empty array
    });

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    );
};
