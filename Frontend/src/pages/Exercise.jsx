import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ExerciseCards from '../components/ExerciseCards';
import './Exercise.css'
import Navbar from '../components/Navbar';

const Exercise = () => {
  const { type } = useParams(); // Retrieve the parameter from the URL
  const [exerciseData, setExerciseData] = useState(null);

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?type=${type}&X-Api-Key=13MAuVav/gFUbzpZyf0otw==Vs0QVFxfbcfJwLYR`);
        if (!response.ok) {
          throw new Error('Failed to fetch exercise data');
        }
        const data = await response.json();
        setExerciseData(data);
      } catch (error) {
        console.error(error);
        // Handle error appropriately (e.g., show error message)
      }
    };

    fetchExerciseData(); // Fetch data when component mounts

  }, [type]); 

  return (
    <div>
      <Navbar/>
      <div className="exercises-div">
        {exerciseData ? (
          <div className='Excards'>
            {exerciseData.map((exercise, index) => (
              <ExerciseCards key={index} title={exercise.name} difficulty={exercise.difficulty} name/>
            ))}
          </div>
        ) : (
          <Spinner/>
        )}
      </div>
    </div>
  );
};

export default Exercise;

