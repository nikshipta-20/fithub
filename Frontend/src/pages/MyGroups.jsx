import React,{useState, useEffect} from 'react'
import Spinner from '../components/Spinner';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./MyGroups.css";
import Navbar from '../components/Navbar';

const MyGroups = () => {

    const navigate = useNavigate();
    const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          // Token not found, navigate to login page
          navigate('/signin'); // Redirect to login page
          return; // Stop further execution
        }
        // const response = await fetch(`http://localhost:5555/userGroups/${userID}`);
        const response = await fetch('http://localhost:5555/userGroups', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user groups');
        }
        const data = await response.json();
        setUserGroups(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user groups:', error);
        // Handle error appropriately (e.g., show error message)
      }
    };

    fetchUserGroups();
  }, [navigate]);
  return (
    <div>
      <Navbar/>
      <div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="myGroups-body">
            <div>
            <h1 className="myGroups-head">My Groups</h1>
            <ul className='myGroups-group'>
                {userGroups.map((group, index) => (
                <li key={index}>
                    <h2 className="myGroups-id">GroupID: {group.GroupID}</h2>
                    <h2 className="myGroups-name">GroupName: {group.GroupName}</h2>
                    <br /><br />
                    <Link to="/videocall"><button type="button" style={{backgroundColor: '#B31312',
                                                                    color: '#fff',
                                                                    border : "1px solid #B31312",
                                                                    padding: "10px 15px",
                                                                    transition: "0.1s ease",
                                                                    cursor: "pointer",
                                                                    fontWeight: "500",
                                                                    borderRadius: "8px"}}>Create a call</button></Link>
                </li>
                ))}
            </ul>
            </div>
            <div>
                <button type="button" className="myGroups-btn" style={{backgroundColor: '#B31312',
                                                                    color: '#fff',
                                                                    border : "1px solid #B31312",
                                                                    padding: "10px 15px",
                                                                    transition: "0.1s ease",
                                                                    cursor: "pointer",
                                                                    fontWeight: "500",
                                                                    borderRadius: "8px"}}><Link to="/createGroup">Create a Group</Link></button>
            </div>
        </div>
      )}
    </div>
    </div>
    
  );
};


export default MyGroups
