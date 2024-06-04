import React from "react";
import "./Slider.css";
import { useState, useEffect } from "react";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import { sliderData } from "../data/slider-data";
import { useNavigate } from 'react-router-dom';

function Slider() {

    const [isHovered, setIsHovered] = useState(false);

    const buttonStyle = {
        backgroundColor: '#B31312',
        color: '#fff',
        border : "1px solid #B31312",
        padding: "10px 15px",
        transition: "0.1s ease",
        cursor: "pointer",
        fontWeight: "500",
    }

    const [currentSlide, setCurrentSlide] = useState(0);

    const slideLength = sliderData.length;
    // slidelength = 1 2 3

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength-1 ? 0 : currentSlide+1);
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength-1 : currentSlide-1);
    }

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    useEffect(() => {
        setCurrentSlide(0)
    }, []);

    useEffect(() => {
        if(autoScroll) {
            auto();
        }
        return() => clearInterval(slideInterval);
    }, [currentSlide]);

    function programHandler(id) {
        console.log(id);
    }

    const [programs, setPrograms] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await fetch("http://localhost:5555/getPrograms");
                if (!response.ok) {
                    throw new Error('Failed to fetch programs');
                }
                const data = await response.json();
                setPrograms(data);
                console.log("hello",data);
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
            //     const response = await fetch(`http://localhost:5555/addProgram/${pid}/${user}`, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({ pid, progress })
            //     });
            //     if (!response.ok) {
            //         throw new Error('Failed to add program');
            //     }
            //     navigate(`/addProgram/${pid}/${user}`);
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
                const program = programs.find(program => program.Pid === slide.id);
                console.log(programs);
                return (
                    <div className={index === currentSlide ? 
                    "slide current" : "slide"} key={index}>
                        {index === currentSlide && (
                            <div>
                                <img className="img" src={slide.image} alt="slide" />
                                <div className="content">
                                    <h2>{program.PName}</h2>
                                    <p>{slide.desc}</p>
                                    <hr />
                                    <button className="btn" style={{backgroundColor: '#B31312',
                                                                    color: '#fff',
                                                                    border : "1px solid #B31312",
                                                                    padding: "10px 15px",
                                                                    transition: "0.1s ease",
                                                                    cursor: "pointer",
                                                                    fontWeight: "500",}} onClick={() => handleAddProgram(program.Pid)}>
                                                                    
                                                                    Add Program
                                                                    
                                                                    </button>
                                    {/* </Link> */}
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}

        </div>
    );
}

export default Slider;