import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { SideBar, Header } from '../../components';
import { useWorkoutsContext } from '../../hooks/useWorkoutContext';
// import { RiQuillPenFill, RiDeleteBinLine, RiEyeFill, RiCloseFill, RiCheckFill } from 'react-icons/ri';
const StdFee = () => {
    const { students, dispatch } = useWorkoutsContext();
    // const navigate = useNavigate();

    const { user } = useAuthContext();
    const [userRole, setUserRole] = useState([]);

    // Fetch user data and set user role
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


    return (
        <div className="student-page">
            <SideBar role={userRole} />
            <div className="student-content">
                <Header role={userRole} />
                <div className="student-heading">
                    <h3>Total Number of users: {students ? students.length : 0}</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Roll Number</th>
                            <th>Course Applied For</th>
                            <th>Student Name</th>
                            <th>Phone Number</th>
                            <th>Student Fee (In Installment)</th>
                            <th>Discount</th>
                            <th>Fee Status</th>
                            <th>Fee Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students &&
                            students.map((user, index) => (
                                <tr key={user._id} className={
                                    user.feeStatus === 'None'
                                        ? 'bg-white'
                                        : user.feeStatus === 'first'
                                            ? 'bg-warning'
                                            : 'bg-success'
                                }>
                                    <td>{user.roll_no}</td>
                                    <td>{user.courseAppliedFor}</td>
                                    <td>{user.name}</td>
                                    <td>{user.contactNumber}</td>
                                    <td>
                                        <b>First</b>: <i>{user.stdFee?.first}</i>, <b>Second</b>: <i>{user.stdFee?.second}</i>
                                    </td>
                                    <td>{user.discount}</td>
                                    <td>{user.feeStatus}</td>
                                    <td><Link to={`/fee-form/${user._id}`}>
                                        <button className='add-btn' >Pay</button>
                                    </Link></td>
                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default StdFee
