import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateReg = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/admin/register/${id}`); 
                // Update the endpoint URL accordingly
                const data = await response.json();
                console.log(data)
                if (response.ok) {
                    setStudent(data.student);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error fetching student record:', error);
            }
        };
        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        setStudent((prevStudent) => ({
            ...prevStudent,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/api/admin/register/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/reg-student');

            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error updating student record:', error);
        }
    };
    

return (
  <div>
    {student ? (
     <div className="admission-form-container">
      <h2>Admission Form</h2>
        <form className="admission-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="courseAppliedFor">Course Applied For</label>
                <input type="text" id="courseAppliedFor"  name="courseAppliedFor" value={student.courseAppliedFor}
                    onChange={handleChange} required/>
                    </div>
                      <div className="form-group">
                        <label htmlFor="batchName">Batch Name</label>
                          <input type="text" id="batchName" name="batchName"
                                    value={student.batchName} onChange={handleChange}
                                    required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="timing">Timing</label>
                                <input
                                    type="text"
                                    id="timing"
                                    name="timing"
                                    value={student.timing}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <h3>Personal Infomation</h3>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={student.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fatherName">Father's Name</label>
                            <input
                                type="text"
                                id="fatherName"
                                name="fatherName"
                                value={student.fatherName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="religion">Religion</label>
                            <input
                                type="text"
                                id="religion"
                                name="religion"
                                value={student.religion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cnic">CNIC</label>
                            <input
                                type="text"
                                id="cnic"
                                name="cnic"
                                value={student.cnic}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={student.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </div> */}
                        <div className="form-group">
                            <label htmlFor="nationality">Nationality</label>
                            <input
                                type="text"
                                id="nationality"
                                name="nationality"
                                value={student.nationality}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mailingAddress">Mailing Address</label>
                            <textarea
                                id="mailingAddress"
                                name="mailingAddress"
                                value={student.mailingAddress}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactNumber">Contact Number</label>
                            <input
                                type="text"
                                id="contactNumber"
                                name="contactNumber"
                                value={student.contactNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fatherNumber">Father's Number</label>
                            <input
                                type="text"
                                id="fatherNumber"
                                name="fatherNumber"
                                value={student.fatherNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
    <label htmlFor="status">Status</label>
    <select
        id="status"
        name="status"
        value={student.status}
        onChange={handleChange}
        required
    >
        <option value="">Select Status</option>
        <option value="inprocess">In Process</option>
        <option value="pass">Pass</option>
        <option value="black">Black</option>
        <option value="out">Out</option>
    </select>
</div>

                        <button className='add-btn' type="submit">Submit</button>
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdateReg;
