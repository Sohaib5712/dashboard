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
