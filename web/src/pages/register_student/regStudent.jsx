/* The above code is a React component that displays a table of registered students. It fetches the
student data from an API and displays it in a table. It also allows the user to add, edit, and
delete student records. The component also displays a modal with detailed information about a
selected student when the user clicks on the "eye" icon. The component uses various React hooks such
as useState, useEffect, and useContext to manage state and fetch data. */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { SideBar, Header } from '../../components';
import { useWorkoutsContext } from '../../hooks/useWorkoutContext';
import { RiQuillPenFill, RiDeleteBinLine, RiEyeFill } from 'react-icons/ri';
import Modal from 'react-modal';

const RegStudent = () => {
    const { students, dispatch } = useWorkoutsContext();
    const navigate = useNavigate();

    const { user } = useAuthContext();
    const [userRole, setUserRole] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const openModal = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setModalOpen(false);
    };

    const handleEdit = (rowId) => {
        navigate(`/reg-update/${rowId}`);
    };

    // Fetch user data and set user role
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (user?.user) {
                    const response = await fetch(
                        `http://localhost:4000/api/admin/user/${user.user}`
                    );
                    const data = await response.json();
                    if (response.ok) {
                        const userRole = data.users['role'];
                        setUserRole(userRole);
                    } else {
                        console.error(data.error);
                    }
                }
            } catch (error) {
                console.error('Error fetching user record:', error);
            }
        };
        fetchUser();
    }, [user]);

    // Delete row
    const handleDeleteStudent = async (studentId) => {
        try {
            const response = await fetch(
                `http://localhost:4000/api/admin/register/${studentId}`,
                {
                    method: 'DELETE',
                }
            );
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'DELETE_STUDENT', payload: studentId });
            } else {
                console.error(json.error);
            }
        } catch (error) {
            console.error('Delete Error:', error);
        }
    };

    // Fetch register student data
    
/**
 * This function fetches data from a specified API endpoint and dispatches the retrieved data to a
 * Redux store.
 */
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(
                    'http://localhost:4000/api/admin/register'
                );
                const json = await response.json();
                if (response.ok) {
                    dispatch({ type: 'SET_WORKOUTS', payload: json });
                }
            } catch (error) {
                console.error('Fetch Error:', error);
            }
        };

        fetchStudents();
    }, [dispatch]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="student-page">
            <SideBar role={userRole} />
            <div className="student-content">
                <Header role={userRole} />
                <div className="student-heading">
                    <h3>Total Number of users: {students ? students.length : 0}</h3>
                    <Link to="/add-reg-student">
                        <div className="add-btn">
                            <span className="add-icon">+</span> Add Student
                        </div>
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Roll Number</th>
                            <th>Course Applied For</th>
                            <th>Batch Name</th>
                            <th>Timing</th>
                            <th>Student Name</th>
                            <th>Father Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students &&
                            students.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{user.roll_no}</td>
                                    <td>{user.courseAppliedFor}</td>
                                    <td>{user.batchName}</td>
                                    <td>{user.timing}</td>
                                    <td>{user.name}</td>
                                    <td>{user.fatherName}</td>
                                    <td>{user.contactNumber}</td>
                                    <td>{user.email}</td>
                                    <td className="student-field-action">
                                        <RiEyeFill
                                            size={25}
                                            color="#0a142f"
                                            onClick={() => openModal(user)}
                                        />
                                        <RiQuillPenFill
                                            size={25}
                                            color="#FFB400"
                                            style={{ margin: '0px 1rem' }}
                                            onClick={() => handleEdit(user._id)}
                                        />
                                        <RiDeleteBinLine
                                            size={25}
                                            color="#F04445"
                                            onClick={() => handleDeleteStudent(user._id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {modalOpen && selectedUser && (
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    contentLabel="User Information"
                    className="custom-modal"
                >
                    <h1>Register Student</h1>
                    <ul>
                        <div className="f_row">
                            <li>
                                <span>Course Applied For: </span>
                                {selectedUser.courseAppliedFor}
                            </li>
                            <li>
                                <span>Batch Name: </span>
                                {selectedUser.batchName}
                            </li>
                            <li>
                                <span>Timing: </span>
                                {selectedUser.timing}
                            </li>
                        </div>
                        <h1>Personal Information</h1>
                        <li>
                            <span>Studennt Name: </span>
                            {selectedUser.name}
                        </li>
                        <li>
                            <span>Father's Name: </span>
                            {selectedUser.fatherName}
                        </li>
                        <li>
                            <span>Email: </span>
                            {selectedUser.email}
                        </li>
                        <div className="row">
                            <li>
                                <span>Religion: </span>
                                {selectedUser.religion}
                            </li>
                            <li>
                                <span>CNIC: </span>
                                {selectedUser.cnic}
                            </li>
                        </div>
                        <li>
                            <span>Date of Birth: </span>
                            {formatDate(selectedUser.dateOfBirth)}
                        </li>
                        <li>
                            <span>Nationality: </span>
                            {selectedUser.nationality}
                        </li>
                        <li>
                            <span>Mailing Address: </span>
                            {selectedUser.mailingAddress}
                        </li>
                        <li>
                            <span>Contact Numbers: </span>
                            {selectedUser.contactNumber}
                        </li>
                        <li>
                            <span>Father's Numbers: </span>
                            {selectedUser.fatherName}
                        </li>
                    </ul>

                    <h1>Academic Records</h1>
                    {selectedUser.academicRecords.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Degree</th>
                                    <th>Institute</th>
                                    <th>Year</th>
                                    <th>Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedUser.academicRecords.map((record) => (
                                    <tr key={record._id}>
                                        <td>{record.degree}</td>
                                        <td>{record.institute}</td>
                                        <td>{record.year}</td>
                                        <td>{record.marks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No academic records found.</p>
                    )}

                    <button className="add-btn" onClick={closeModal}>
                        Close
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default RegStudent;
