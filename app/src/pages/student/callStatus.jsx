import React, { useEffect, useState } from 'react';
import { useWorkoutsContext } from "../../hooks/useWorkoutContext";
import { RiAddFill } from "react-icons/ri";

const CallStatus = ({ student, index }) => {
    const { students, dispatch } = useWorkoutsContext();
    const [newDataArray, setNewDataArray] = useState([]);

    useEffect(() => {
        setNewDataArray([]);
    }, [students]);

    const handleUpdate = async (e, studentId) => {
        e.preventDefault();
    
        try {
            const updatedStudents = students.map((s, i) => {
                if (i === index) {
                    return {
                        ...s,
                        callStatus: [...s.callStatus, newDataArray[index]],
                    };
                }
                return s;
            });
    
            // Send a POST request to the backend API to update the data
            const response = await fetch(`http://localhost:4000/api/admin/${studentId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newData: newDataArray[index] }),
            });
    
            if (response.ok) {
                // Data successfully updated in the database
                dispatch({ type: 'SET_WORKOUTS', payload: updatedStudents });
            } else {
                // Error occurred while updating data
                const error = await response.json();
                console.error("Update Error:", error);
            }
        } catch (error) {
            console.error("Update Error:", error);
        }
    };
    

    const handleNewDataChange = (index, value) => {
        setNewDataArray((prevDataArray) => {
            const newDataArrayCopy = [...prevDataArray];
            newDataArrayCopy[index] = value;
            return newDataArrayCopy;
        });
    };

    const renderCallStatusFields = (student, index) => {
        const callStatuses = student.callStatus || [];
        const fields = [];

        for (let i = 0; i < callStatuses.length; i++) {
            fields.push(
                <div key={i}>
                    <strong>Call Status {i + 1}:</strong> {callStatuses[i]}
                </div>
            );
        }

        if (callStatuses.length < 3) {
            fields.push(
                <div key={callStatuses.length} className='call-status-field'>
                    <form onSubmit={(e) => handleUpdate(e, student._id)}>
                        <input
                            type="text"
                            placeholder={`Call Status ${callStatuses.length + 1}`}
                            value={newDataArray[index] || ""}
                            onChange={(e) => handleNewDataChange(index, e.target.value)}
                        />
                        <button className="submit-btn">
                            <span className="add-icon"><RiAddFill /></span>
                        </button>
                    </form>
                </div>
            );
        }

        return fields;
    };

    return (
        <td className='call-status'>
            {renderCallStatusFields(student, index)}
        </td>
    );
};

export default CallStatus;
