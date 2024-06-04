import React from 'react';
import exerciseType  from '../data/exeType';
import './cards.css';
import {img1} from '../assets/img1.jpg'

const ProgCards = () => {
  return (
    <div>
        {exerciseType.map((item) => (
            <div className="container">
            <div className="card">
              <div className="image">
                  <img src={img1} />
              </div>
              <div className="content">
                  <h2>{item.type}</h2>
              </div>
             </div>
          </div>
        ))}
    </div>
    
     
  )
}

export default ProgCards
