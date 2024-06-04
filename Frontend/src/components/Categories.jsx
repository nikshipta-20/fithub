import React from 'react';
import {exerciseTypes} from '../data/CategoriesData';
import './Categories.css'
import { useNavigate } from 'react-router-dom';

import cardio from '../assets/cardio.png'
import weightlifting from '../assets/weightlifting.png'
import plyometrics from '../assets/plyometrics.png'
import stretching from '../assets/stretching.png'
import powerlifting from '../assets/powerlifting.png'
import strength from '../assets/strengthening.png'

const Categories = () => {

  const navigate = useNavigate();

  const nameStyle = {
    color : "black",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",    
  }

  const getImageSource = (type) => {
    switch (type) {
      case 'cardio':
        return cardio;
      case 'olympic_weightlifting':
        return weightlifting;
      case 'plyometrics':
        return plyometrics;
      case 'stretching':
        return stretching;
      case 'powerlifting':
        return powerlifting;
      case 'strength':
        return strength
      default:
        return null; // Return null for unknown exercise types
    }
  }

  const navigateExercise = (type) => {
    navigate(`/exercise/${type}`); // Navigate to the specified URL
  }

  return (
    <div className='categories'>
      <div className="cat-cards">
          {exerciseTypes.map((item, index) => (
              <div key={index} className="cat-container">
              <div className="cat-card" onClick={() => navigateExercise(item.type)}>
                <div className="cat-image">
                    <img src={getImageSource(item.type)}  />
                </div>
                <div className="cat-card-content">
                    <h2 style={nameStyle}>{item.name}</h2>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  
     
  )
}


// const Categories = () => {

//   const nameStyle = {
//     color : "black",
//     textAlign: "center",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     margin: "auto",    
//   }

//   return (
//     <div className='categories'>
//       <div className="cards">
//         {exerciseType.map((item,index) => {
//           return (
//             <div key={index} className="container"  >
//             <div className="card">
//               <div className="image">
//                   <img src={one}  alt='image'/>
//               </div>
//               <div className="card-content">
//                   <h2 style={nameStyle}>{item.name}</h2>
//               </div>
//              </div>
//           </div>
//           )
//         })}
//     </div>
//     </div>  
     
//   )
// }

export default Categories;