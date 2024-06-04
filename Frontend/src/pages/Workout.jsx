import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import TextToSpeech from '../components/TextToSpeech';
import "./Workout.css";

const Workout = () => {
    //const { name } = useParams(); // Retrieve the parameter from the URL
    const { name } = useParams();
    const name1 = name;
    const [workoutData, setWorkoutData] = useState(null);
    const [timer, setTimer] = useState(120); // Initial timer value is 2 minutes (120 seconds)
    //const workoutArr = [];
  
    useEffect(() => {
      
      console.log(name);

          const fetchWorkoutData = async () => {
            console.log("fetching");
          try {
            const response = await fetch(`https://api.api-ninjas.com/v1/exercises?name=${name}&X-Api-Key=13MAuVav/gFUbzpZyf0otw==Vs0QVFxfbcfJwLYR`);
            console.log("fetch");
            if (!response.ok) {
              throw new Error('Failed to fetch exercise data');
            }
            const data = await response.json();
            // console.log("data: ", data);
            // if(data.length > 1){
            //   console.log("in if")
            //   for(const ele in data){
            //     console.log(data[ele]);
            //     if(data[ele].name === name1){
            //       workoutArr.push(data[ele])
            //     }
            //   }
            // }
            // else{
            //   console.log("in else")
            //   workoutArr.push(data[0])
            // }
            // console.log("arr",workoutArr);
            setWorkoutData(data);
            
          } catch (error) {
            console.error(error);
            // Handle error appropriately (e.g., show error message)
          }
        }; 
        fetchWorkoutData(); // Fetch data when component mounts
        
      const interval = setInterval(() => {
        console.log("time");
        setTimer(prevTimer => {
          if (prevTimer <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
  

      return () => clearInterval(interval); // Cleanup function to clear the interval
  
    }, [name]);

    function goBack() {
        window.history.back();
    }
  
    return (
      <div className='workout-body'>
        {workoutData ? (
          <div className='workout-div'>
              {workoutData.map((workout,index) => (
                  <div key={index}>
                      <h1 className='workout-head'>{workout.name}</h1>
                      <br /><br /><br /><br />
                      <p className='workout-content'>{workout.instructions}</p>
                      <TextToSpeech text={workout.instructions}/>
                  </div>
              ))}
              <div className='workout-timer'>
                <h2 >Timer: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' + timer % 60 : timer % 60}</h2>
              </div>  
              <button onClick={goBack} style={{backgroundColor: '#B31312',
                                                                    color: '#fff',
                                                                    border : "1px solid #B31312",
                                                                    padding: "10px 15px",
                                                                    transition: "0.1s ease",
                                                                    cursor: "pointer",
                                                                    fontWeight: "500",
                                                                    borderRadius: "8px",
                                                                    marginBottom: "10px"}}>Go Back</button>
          </div>
        ) : (<Spinner/>)}
      </div>
    )
}

export default Workout;

