import React from 'react';
import { useLocation } from 'react-router-dom';

const Pass = () => {
  const location = useLocation();
  const { student } = location.state;

  return (
    <div>
      <h1>Passed Student</h1>
      <p>Student Name: {student.name}</p>
      <p>Roll Number: {student.roll_no}</p>
      <p>Course Applied For: {student.courseAppliedFor}</p>
      <p>Batch Name: {student.batchName}</p>
      {/* Display other student information */}
    </div>
  );
};

export default Pass;
