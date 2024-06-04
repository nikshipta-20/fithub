// import React from 'react'
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const CreateGroup = () => {

//     const navigate = useNavigate();

//     const [groupName, setGroupName] = useState('');
//     const [users, setUsers] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const newGroup = {
//             GroupName: groupName,
//             Users: users.split(',').map(user => user.trim()) 
//         };

//         console.log(newGroup);

//         try {
//             const response = await fetch('http://localhost:5555/createGroup', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(newGroup)
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create group');
//             }

//             const data = await response.json();
//             console.log('Group created:', data);
//             navigate("/");
//         } catch (error) {
//             console.error('Error creating group:', error);
//         }
//     };
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="groupName">GroupName:</label>
//                 <input type="text" id="groupName" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
//             </div>
//             <div>
//                 <label htmlFor="users">Users (comma-separated):</label>
//                 <input type="text" id="users" value={users} onChange={(e) => setUsers(e.target.value)} />
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     </div>
//   )
// }

// export default CreateGroup

import React, { useState } from 'react';
import "./CreateGroup.css";
import Navbar from '../components/Navbar';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const handleAddUser = () => {
    if (userId.trim() !== '') {
      if (!users.some(user => user.UserID === userId)) {
        setUsers([...users, { UserID: userId }]);
        setUserId('');
        setError(''); // Reset error state
      } else {
        setError('User ID already added');
      }
    } else {
      setError('Please enter a user ID');
    }
  };

  const handleCreateGroup = async () => {
    try {
      const newGroup = {
        GroupName: groupName,
        Users: users // Send the entire users array to the backend
      };

      console.log(newGroup);

      const response = await fetch('http://localhost:5555/createGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGroup)
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      alert('Group created successfully');
      setGroupName('');
      setUsers([]);
      setError('');
    } catch (error) {
      console.error('Error creating group:', error);
      setError('Failed to create group. Please try again later.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='createGrp-body'>
      <h2 className='createGrp-head'>Create Group</h2>
      {error && <p>{error}</p>}
      <div className='createGrp-title'>
        <label>Group Name:</label>
        <br/>
        <input type="text" value={groupName} onChange={e => setGroupName(e.target.value)} />
      </div>
      <div className='createGrp-title'>
        <label>User ID:</label>
        <br/>
        <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
        <br/>
        <button onClick={handleAddUser} style={{backgroundColor: '#B31312',
                                                                    color: '#fff',
                                                                    border : "1px solid #B31312",
                                                                    padding: "10px 15px",
                                                                    transition: "0.1s ease",
                                                                    cursor: "pointer",
                                                                    fontWeight: "500",
                                                                    borderRadius: "8px"}}>Add User</button>
      </div>
      <div className='createGrp-title'>
        <h3>Users:</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.UserID}</li>
          ))}
        </ul>
      </div>
      <button className='createGrp-btn' onClick={handleCreateGroup} style={{backgroundColor: '#B31312',
                                                                    color: '#fff',
                                                                    border : "1px solid #B31312",
                                                                    padding: "10px 15px",
                                                                    transition: "0.1s ease",
                                                                    cursor: "pointer",
                                                                    fontWeight: "500",
                                                                    borderRadius: "8px"}}>Create Group</button>
    </div>
    </div>
    
  );
};

export default CreateGroup;
