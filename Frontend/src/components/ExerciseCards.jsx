import React from 'react';
import './exerciseCards.css';
import { Link } from 'react-router-dom';

const ExerciseCards = (props) => {
    
  return (
    <div className="Excard">
          <div className="Excard-body">
            <h2>{props.title}</h2>
            <h5>{props.difficulty}</h5>
          </div>
          <Link to={`/workout/${props.title}`}><button className="Excard-button" style={{backgroundColor: '#B31312',
                                                                    color: '#fff',
                                                                    border : "1px solid #B31312",
                                                                    padding: "10px 15px",
                                                                    transition: "0.1s ease",
                                                                    cursor: "pointer",
                                                                    fontWeight: "500",
                                                                    borderRadius: "8px",
                                                                    marginBottom: "10px"}}>Check</button></Link>

          
    </div>
  )
}

export default ExerciseCards;
