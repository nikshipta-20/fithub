import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import { sliderData } from "../data/slider-data";
import "./Slider.css";

function Slider2() {
    const [programs, setPrograms] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const buttonStyle = {
        backgroundColor: '#B31312',
        color: '#fff',
        border : "1px solid #B31312",
        padding: "10px 15px",
        transition: "0.1s ease",
        cursor: "pointer",
        fontWeight: "500",
    }

    const slideLength = sliderData.length;
    const [currentSlide, setCurrentSlide] = useState(0);
    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength-1 ? 0 : currentSlide+1);
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength-1 : currentSlide-1);
    }

    // function auto() {
    //     slideInterval = setInterval(nextSlide, intervalTime);
    // }

    useEffect(() => {
        setCurrentSlide(0)
    }, []);

    // useEffect(() => {
    //     if(autoScroll) {
    //         auto();
    //     }
    //     return() => clearInterval(slideInterval);
    // }, [currentSlide]);


    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await fetch("http://localhost:5555/getPrograms");
                if (!response.ok) {
                    throw new Error('Failed to fetch programs');
                }
                const data = await response.json();
                console.log(programs);
                setPrograms(data);
                console.log(data);
                console.log(programs);
            } catch (error) {
                console.error('Error fetching programs:', error);
            }
        };

        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    navigate('/');
                    return;
                }

                const response = await fetch('http://localhost:5555/loggeduser', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUser(data.user.UserID);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
      
        fetchPrograms();
        fetchUser();
        console.log("hii",programs);
    }, [navigate]);

    const handleAddProgram = async (pid) => {
        if (user === null) {
            navigate('/signin');
        } else {
            //const progress = 10; // Assuming initial progress is 0
            console.log("helloo",pid);
            navigate(`/addProgram/${pid}/${user}`);
            // try {
            //     console.log(user);
            //     const response = await fetch(`http://localhost:5555/addProgram/${user}`, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({ pid, progress })
            //     });
            //     if (!response.ok) {
            //         throw new Error('Failed to add program');
            //     }
            //     navigate(`/addProgram/${user}/${pid}`);
            // } catch (error) {
            //     console.error('Error adding program:', error);
            // }
        }
    };

    return (

        <div className="slider">
            <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
            <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
            
            {sliderData.map((slide, index) => {
                {/* console.log(currentSlide); */}
                // const program = programs.find(program => program.Pid === slide.id);
                console.log("hey",programs[index]);
                const program = programs[index];
                console.log("ola",program);
                return (
                    <div className={index === currentSlide ? "slide current" : "slide"} key={index}>
                        {index === currentSlide && (
                            <div onClick={() => handleAddProgram(slide.id)}>
                                
                                <img className="img" src={slide.image} alt="slide" onClick={() => handleAddProgram(slide.id)} />
                                <div className="content">
                                    <h2>{slide.heading}</h2>
                                    <br />
                                    <p>{slide.desc}</p>
                                    <hr />
                                    {/* <button className="btn" onClick={() => handleAddProgram(slide.id)}> Add Program </button> */}
                                    
                                    <button style={{backgroundColor: '#B31312',
                                                                    color: '#fff',
                                                                    border : "1px solid #B31312",
                                                                    padding: "10px 15px",
                                                                    transition: "0.1s ease",
                                                                    cursor: "pointer",
                                                                    fontWeight: "500",}} onClick={() => handleAddProgram(slide.id)}>Add Program</button>


                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
            
        </div>
    );
}

export default Slider2;
