import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { SideBar, Header } from '../../components';
import { useWorkoutsContext } from '../../hooks/useWorkoutContext';
import { RiQuillPenFill, RiDeleteBinLine, RiEyeFill, RiCloseFill, RiCheckFill } from 'react-icons/ri';
import Modal from 'react-modal';

const RegStudent = () => {
    const { students, dispatch } = useWorkoutsContext();
    const navigate = useNavigate();

    const { user } = useAuthContext();
    const [userRole, setUserRole] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(Array(students.length).fill(false));
    const [selectedStatus, setSelectedStatus] = useState('');

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

/* The above code is a React useEffect hook that fetches user data from an API endpoint. It checks if
the `user` object exists and if it does, it makes a GET request to
`http://localhost:4000/api/admin/user/{user.user}`. If the response is successful, it extracts the
user's role from the response data and sets it using the `setUserRole` function. If there is an
error in the response, it logs the error message to the console. The useEffect hook is triggered
whenever the `user` object changes. */
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (user?.user) {
                    const response = await fetch(`http://localhost:4000/api/admin/user/${user.user}`);
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
            const response = await fetch(`http://localhost:4000/api/admin/register/${studentId}`, {
                method: 'DELETE',
            });
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
                const response = await fetch('http://localhost:4000/api/admin/register');
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

/**
 * The `formatDate` function takes a date string as input and returns a formatted date string in the
 * format "MM/DD/YYYY".
 * @returns The function `formatDate` returns a formatted date string in the format "MM/DD/YYYY".
 */
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

/**
 * The function `handleStatusChange` updates the selected status and the dropdown open state in a React
 * component.
 */
    const handleStatusChange = (event, index) => {
        setSelectedStatus(event.target.value);
        const updatedDropdownOpen = [...dropdownOpen];
        setDropdownOpen(updatedDropdownOpen);
    };

/**
 * The function `handleStatusUpdate` is an asynchronous function that sends a PUT request to update the
 * status of a student and handles the response accordingly.
 */
    const handleStatusUpdate = async (studentId, index) => {
        try {
            const response = await fetch(`http://localhost:4000/api/admin/register/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: selectedStatus }),
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'UPDATE_STATUS', payload: { studentId, status: selectedStatus } });
                setSelectedStatus('');
                const updatedDropdownOpen = [...dropdownOpen];
                updatedDropdownOpen[index] = false; // Close the dropdown after updating the status
                setDropdownOpen(updatedDropdownOpen);
            } else {
                console.error(json.error);
            }
        } catch (error) {
            console.error('Update Error:', error);
        }
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
                            <th>Status</th>
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
                                    <td className="student-status">
                                        {dropdownOpen[index] ? (
                                            <div className="status-dropdown">
                                                <select
                                                    className="status-select"
                                                    value={selectedStatus}
                                                    onChange={(event) => handleStatusChange(event, index)}
                                                >
                                                    <option value="InProcess">InProcess</option>
                                                    <option value="PassOut">PassOut</option>
                                                    <option value="BlackList">BlackList</option>
                                                    <option value="DropOut">DropOut</option>
                                                </select>
                                                <div className="status-btn">
                                                <button
                                                    className="status-update"
                                                    onClick={() => handleStatusUpdate(user._id, index)}
                                                >
                                                    <RiCheckFill/>
                                                </button>
                                                <button
                                                    className="status-cancel"
                                                    onClick={() => {
                                                        const updatedDropdownOpen = [...dropdownOpen];
                                                        updatedDropdownOpen[index] = false; // Close the dropdown without updating
                                                        setDropdownOpen(updatedDropdownOpen);
                                                    }}
                                                >
                                                    <RiCloseFill />
                                                </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="status-text">
                                                {user.status}
                                                <span
                                                    className="status-change-icon"
                                                    onClick={() => {
                                                        const updatedDropdownOpen = [...dropdownOpen];
                                                        updatedDropdownOpen[index] = true; // Open the dropdown for the clicked row
                                                        setDropdownOpen(updatedDropdownOpen);
                                                    }}
                                                >
                                                        <RiQuillPenFill
                                                            size={25}
                                                            color="#FFB400"
                                                            style={{ margin: '0px .2rem' }}
                                                        />
                                                </span>
                                            </div>
                                        )}
                                    </td>
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
                            <span>Student Name: </span>
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
                            {selectedUser.fatherNumber}
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
