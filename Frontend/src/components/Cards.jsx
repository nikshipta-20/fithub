import React from 'react';
import { Link } from 'react-router-dom';
import { exerciseType } from '../data/exeType';
import './cards.css'
import image1 from '../assets/stretching.png'

const Cards = () => {
  return (
    <div className="cards">
        {exerciseType.map((item) => (
            <div className="container">
              <div className="card">
              
              <div className="image">
                  <img src= {image1} />
              </div>
              <div className="content">
              <Link to={`/exercise/${item.type}`}><h2>{item.name}</h2></Link>
              {/* <h2>{item.name}</h2> */}
              </div>
             
             </div>
          </div>
        ))}
    </div>
    
     
  )
}

export default Cards