import React, { useState } from "react";
import './Navbar.css';
import { IoIosNotificationsOutline, IoIosNotifications } from "react-icons/io";
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';

export default function Navbar(props){

    const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn);

    const logout = () => {
        // Clear JWT token from localStorage
        localStorage.removeItem('jwtToken');
        // Update isLoggedIn state to false
        setIsLoggedIn(false);
        // Show toast message
        toast.success("Logged out");
    };

    const token = localStorage.getItem('jwtToken');
    const logIn = token ? true : false;

    const notifStyle = {
        transform: "rotate(45deg)", 
    };

    const [notifClicked, setNotifClicked] = useState(false);

    const notifClickedHandler1 = () => {
        setNotifClicked(!notifClicked);
    };

    return(
        <div className="nav-body">
            <div className="navbar">
                <Link to="/" className="logo link">
                    <img src={logo} alt="logo" height="70px" width="70px" />
                    
                </Link>
                <h2 className="nav-title">FitHub</h2>

                <input type="checkbox" id="nav_check" hidden />

                <nav>
                    <Link to="/" className="logo link">
                        <img src={logo} alt="logo" height="70px" width="70px" />
                        <h2 className="link active">FitHub</h2>
                    </Link>

                    <ul>
                        <li>
                            <Link to="/" className="link active">Home</Link>
                        </li>
                        <li>
                            <Link className="link" to="/myprograms">My Programs</Link>
                        </li>
                        <li onClick={notifClickedHandler1}>
                            <Link className="link notif" to="#">
                                {notifClicked ? <IoIosNotifications style={notifStyle} /> : <IoIosNotificationsOutline />}                      
                            </Link>
                        </li>
                        <li>
                            {!logIn &&
                                <Link className="link" to="/signup">
                                    Sign up
                                </Link>
                            }
                            {logIn &&
                                <Link className="link" onClick={logout} to="/">
                                    Log out
                                </Link>
                            }                        
                        </li>
                        <li>
                            {!logIn &&
                                <Link className="link" to="/signin">
                                    Log in
                                </Link>
                            }
                            {logIn &&
                                <Link className="link" to="/profile">
                                    Profile
                                </Link>
                            }
                        </li>
                        <li>
                        {logIn &&
                                <Link className="link" to="/myGroups">
                                    My Groups
                                </Link>
                            }
                        </li>
                    </ul>
                </nav>

                <label htmlFor="nav_check" className="hamburger">
                    <div></div>
                    <div></div>
                    <div></div>
                </label>
            </div>
        </div>
    );
}
