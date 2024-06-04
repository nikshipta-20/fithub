import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          // Token not found, navigate to login page
          navigate('/signin'); // Redirect to login page
          return; // Stop further execution
        }

        const response = await fetch('http://localhost:5555/loggeduser', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data.user);

        const programIds = data.user.Programs.map(program => program.Pid);

        // Fetch program data for each pid
        const programPromises = programIds.map(pid =>
          fetch(`http://localhost:5555/program/${pid}`)
            .then(response => response.json())
        );

        //console.log(programPromises);

        // Resolve all promises and set programs state
        const programData = await Promise.all(programPromises);
        setPrograms(programData);

        console.log(programData)

      } catch (error) {
                console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [navigate]); // Add navigate to dependency array

  useEffect(() => {
    console.log("Programs state updated:", programs);
  }, [programs]);

  return (
    <div>
      <Navbar/>
      <div className='profile-main'>
      <h1 className='profile-head'>Profile Page</h1>
      {user ? (
        <div className='profile-card'>
          <div className='profile-card-body'>
            <h1>User ID: {user.UserID}</h1>
            <table>
                  <tbody>
                          <tr>
                              <td>Name</td>
                              <td>:</td>
                              <td>{user.Name}</td>
                          </tr>
                          <tr>
                              <td>Email</td>
                              <td>:</td>
                              <td>{user.Email}</td>
                          </tr>
                          <tr>
                              <td>Age</td>
                              <td>:</td>
                              <td>{user.Age}</td>
                          </tr>
                          <tr>
                              <td>Gender</td>
                              <td>:</td>
                              <td>{user.Gender}</td>
                          </tr>
                          <tr>
                              <td>Weight</td>
                              <td>:</td>
                              <td>{user.Weight}</td>
                          </tr>
                          <tr>
                              <td>Height</td>
                              <td>:</td>
                              <td>{user.Height}</td>
                          </tr>
                          <tr>
                            <td>Programs</td>
                            <td>:</td>
                            <td>
                            <ul>
                              {programs.map(program => (
                                <li key={program.Pid}>{program.PName}</li>
                              ))}
                            </ul>
                            </td>
                          </tr>
                      </tbody>
                </table>
          </div>
        </div>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
    </div>
    
  );
};

export default Profile;

