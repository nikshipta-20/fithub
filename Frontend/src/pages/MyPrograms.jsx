import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './MyPrograms.css';
import Navbar from "../components/Navbar";

function MyPrograms() {

    const [user, setUser] = useState(null);
    const [myPrograms, setMyPrograms] = useState([]);
    // const [loading, setLoading] = useState(true);

    const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        console.log("token",token);
        if (!token) {
          // Token not found, navigate to login page
          navigate('/signin'); // Redirect to login page
          return; // Stop further execution
        }

        const response = await fetch('http://localhost:5555/myprograms', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        

        // setting the user
        setUser(data.user);
        console.log("Printing the details of user: ");
        console.log(user);
        console.log("User in my programs page: ", user)

        // setting the corresponding programs of the user
        setMyPrograms(data.myprograms);
        console.log("I'm usr in my programs: ", data.user);
        console.log(data.myprograms.length);

        console.log("Printing my programs in myprograms page: ", myPrograms);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [navigate]);
    
  const handleOpenProgram = async (pid) => {
    console.log("user",user);
    console.log("pid",pid);
      if (user === null) {
          navigate('/signin');
      } 
      else {
          const progress = 1; // Assuming initial progress is 0
          try {
              console.log(user);
              const response = await fetch(`http://localhost:5555/myProgram/${user}/${pid}`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
              const responseData = await response.json(); // Parse the response as JSON
              console.log("response array", responseData); // Now this should display your array
              if (!response.ok) {
                  throw new Error('Failed to add program');
              }
              console.log("user in myprograms to open program:")
              console.log(user)
              navigate(`/openProgram/${user.UserID}/${pid}`);
          } catch (error) {
              console.error('Error adding program:', error);
          }
      }
  };
    

    return(
      <div>
        <Navbar />
        <div className="my-programs-body">
            <h1 className="my-programs-heading">My Programs</h1>
            <div className="my-programs">
                <ul>
                {myPrograms.map((myProgram) => (
                  <div className="my-program">
                    <li key={myProgram.Pid} >
                    {
                      (myProgram.Pid === 1) ? (
                        <div>
                          <h2 className="pname">2 weeks Abs Challenge</h2>
                        </div>
                      ) : ( (myProgram.Pid === 2) ? (
                        <div>
                          <h2 className="pname">1 month Full Body Workout</h2>
                        </div>
                        
                      ) :
                      (
                        <div>
                          <h2 className="pname">14 day Lower body Workout</h2>
                        </div>
                      )
                      )
                    }
                        
                        {/* <div>Progress: {myProgram.Progress}</div> */}
                        <div>
                        {/* <button></button> */}
                        <button className="open-program" onClick={() => handleOpenProgram(myProgram.Pid)}>Open Program</button>
                        </div>
                    </li>
                    </div>
                ))
                }
                </ul>
                {/* {(() => {
                    const elements = [];
                    for (let i = 0; i < myPrograms.length; i++) {
                    const myProgram = myPrograms[i];
                    elements.push(
                        <li key={myProgram.pid}>
                        <div>Program ID: {myProgram.pid}</div>
                        <div>Progress: {myProgram.progress}</div>
                        </li>
                    );
                    }
                    return elements;
                })()} */}
            </div>
        </div>
      </div>
        
    )
}

export default MyPrograms;