// import './App.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
import ExerciseCards from '../components/ExerciseCards';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import './OpenProgram.css';
import Navbar from '../components/Navbar';

function OpenProgram() {
  const { user, pid } = useParams();

  const [activeDiv, setActiveDiv] = useState(0);

  const [allExercises, setAllExercises] = useState([]);
  const [noOfDays, setNoOfDays] = useState(0);
  const [noOfExercises, setNoOfExercises] = useState(0);
  const [todayExercises, setTodayExercises] = useState([]);
  const [todayExercisesDetails, setTodayExercisesDetails] = useState([]);
  const [progress, setProgress] = useState(0);



  // get all the exercises details
  useEffect(() => {
    console.log("in open program: ", user);
    async function fetchProgramDetails(pid){
      console.log("piddddd: ", pid);
      try {
          const token = localStorage.getItem('jwtToken');
          if (!token) {
            // Token not found, navigate to login page
            navigate('/signin'); // Redirect to login page
            return; // Stop further execution
          }
          console.log("Hello")
          const response = await fetch(`http://localhost:5555/openProgram/${user}/${pid}`, {
            Headers: {
              'Authorization' : `Bearer ${token}`
            }
          });
          console.log(response);

          if (!response.ok) {
              throw new Error('Failed to open program');
          }

          const data = await response.json();
          console.log("printing data");
          // console.log(data);

          // setting all exercises
          console.log(data);
          setAllExercises(data);
          console.log(allExercises);

          // setting no. of days
          console.log(data.length);
          setNoOfDays(data.length);
          console.log("no of days: ", noOfDays);
          
          console.log("length", (allExercises[activeDiv]).length);
          setNoOfExercises(allExercises[activeDiv].length);
          console.log("no of exercises: ", noOfExercises);

          console.log(allExercises[activeDiv]);
          setTodayExercises(allExercises[activeDiv]);
          console.log("today ex: ", todayExercises);
      }
      catch(error){
          console.log("Failed to fetch exercises: ", error);
      }
    }

    fetchProgramDetails(pid);
  }, [])


  const buttonStyles = {
    backgroundColor: activeDiv
  };


  function openDiv(index){

    setActiveDiv(index);
    setTodayExercisesDetails([]);
    setTodayExercises(allExercises[activeDiv]);

    function replaceSpaces(inputString) {
      if(inputString === "Rest day"){
        return "rest";
      }
      return inputString.replace(/ /g, '%20');
    }

    const fetchExerciseData = async () => {
      console.log(todayExercises);
      const exData = [];
      for(let i = 0; i < todayExercises.length; i++){
        console.log("today ex: ", todayExercises[i]);
        const exe_in_string = replaceSpaces(todayExercises[i]);
        console.log(exe_in_string);

        try {
          const response = await fetch(`https://api.api-ninjas.com/v1/exercises?name=${exe_in_string}&X-Api-Key=13MAuVav/gFUbzpZyf0otw==Vs0QVFxfbcfJwLYR`);
          console.log(response);

          const data = await response.json();
          console.log("data: ", data);
          if(data.length > 1){
            for(const ele in data){
              if(ele.name === exe_in_string){
                exData.push(ele);
              }
            }
          }
          else{
            exData.push(data);
          }
        }
        catch(err) {
          console.log(err);
        }
      }

      console.log("all exercises data", exData);
      setTodayExercisesDetails(exData);
      console.log("today exercise details: ", todayExercisesDetails);
    }

    fetchExerciseData();
    
  }

  const day_buttons = Array.from({ length: noOfDays }, (_, index) => (
    <button className='day-button' key={index} onClick={() => openDiv(index) }>Day {index+1}</button>
  ));

  const all_exercises = Array.from({ length: noOfDays }, (_, index) => {
      return (
        // <div></div>
          <div key={index}>
              {activeDiv === index && (
                <div>{
                  (todayExercises[0]=== "Rest Day") ? (
                    <h1>Yayy!! Today's Rest!</h1>
                  ) : 
                    (todayExercisesDetails.length === 8) ? (
                    <div>
                    <h1 className='day-heading'>Day {index+1}</h1>
                        {todayExercisesDetails.map((exercise,index) => {
                          console.log("exercise: ", exercise);
                          return(
                            <div>
                            <ExerciseCards key={index} title={exercise[0].name} difficulty={exercise[0].difficulty}/>
                            </div>
                          )
                        })}
                    </div>
                  )
                   : (
                    <div>
                      <h2 className='h2'>You've chosen a right path to be yourself. Go for it!</h2>
                      <Spinner />
                    </div>
                  )}
                  
                </div>
              )}
          </div>
      );
  });

  function nextDayHandler() {
    setActiveDiv(activeDiv+1);

    setTodayExercises(allExercises[activeDiv]);

    function replaceSpaces(inputString) {
      if(inputString === "Rest day"){
        return "rest";
      }
      return inputString.replace(/ /g, '%20');
    }

    const fetchExerciseData = async () => {
      console.log(todayExercises);
      const exData = [];
      for(let i = 0; i < todayExercises.length; i++){
        console.log("today ex: ", todayExercises[i]);
        const exe_in_string = replaceSpaces(todayExercises[i]);
        console.log(exe_in_string);

        try {
          const response = await fetch(`https://api.api-ninjas.com/v1/exercises?name=${exe_in_string}&X-Api-Key=13MAuVav/gFUbzpZyf0otw==Vs0QVFxfbcfJwLYR`);
          console.log(response);

          const data = await response.json();
          console.log("data: ", data);
          if(data.length > 1){
            for(const ele in data){
              if(ele.name === exe_in_string){
                exData.push(ele);
              }
            }
          }
          else{
            exData.push(data);
          }
        }
        catch(err) {
          console.log(err);
        }
      }

      console.log("all exercises data", exData);
      setTodayExercisesDetails(exData);
      console.log("today exercise details: ", todayExercisesDetails);
    }

    fetchExerciseData();
    
  }


  return (
    
    <div>
        <Navbar />
        <div className='program-page-div'>
      <div className="program-div">
        <div className='daynos'>
          {
            day_buttons.map((button, index) => (
              <div key={index}>{button}</div>
            ))
          }
        </div>
        <div className='program-exercises'>
        {/* <h2>Progress: {progress}</h2> */}
        {all_exercises}
        <div>
          <button className='mark-as-done' onClick={nextDayHandler}>Mark as done</button>
        </div>
        </div>
        
      </div>
      
    </div>
    </div>
    
  );
}

export default OpenProgram;