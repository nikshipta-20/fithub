import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./ProgramPreview.css";


function ProgramPreview() {

    const { pid, userID } = useParams();

    // const [allExercises, setAllExercises] = useState([]);

    useEffect(() => {
        const addProgramToUser = async () => {
            try {
                const response = await fetch(`http://localhost:5555/addProgram/${pid}/${userID}`, {
                    method: 'POST'
                });

                if (!response.ok) {
                    throw new Error('Failed to add program to user');
                }

                const data = await response.json();

                console.log("Program successfully added to user:", data.message);                

                // setAllExercises(data.allExercises);
                // console.log("All exercises in program preview page: ", allExercises);
            }
            catch(error){
                console.log("Failed to fetch exercises: ", error);
            }
        }

        addProgramToUser();

    }, [pid, userID])

    return (
        <div className='maindiv'>
            <h1>Successfully added the program!!</h1>
            <br /><br />
            <Link className="myprog-link" to="/myprograms">
                Return to My Programs
            </Link>
        </div>
    );
}

export default ProgramPreview;