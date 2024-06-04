import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import './LoginForm.css';
import loginImage from '../assets/login-image.jpg'
import google from "../assets/google.jpg";
import { Link } from "react-router-dom";

function LoginForm({setIsLoggedIn}) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email:"",
        password:""
    })

    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {
        setFormData((prev) => (
            {
                ...prev, [event.target.name]:event.target.value
            }
        ))
    }

    async function submitHandler(event) {
        event.preventDefault();
        console.log(formData);
        //setIsLoggedIn(true);
        //toast.success("Logged In");

        try{

            const response = await fetch('http://localhost:5555/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if(response.ok){
                const data = await response.json();

                console.log('Received JWT token:', data.token);

                localStorage.setItem('jwtToken', data.token);

                console.log('Gett ', localStorage.getItem('jwtToken'));
                navigate("/", { state: { id: formData.email } });
                // if (data === "exist") {
                //     console.log("Signed in");
                    
                // } else if (data === "notexist") {
                //     alert("User has not signed up");
                // }

            }
            else{
                console.log("Failed sigin");
            }

        }
        catch(error){
            console.error("Error occurred during login:", error);
        }
    }

    return (
        <div className="container">
            <div className="login-container">
                
                <div className="login">
                <div>
                    <h1>FitHub</h1>
                    <p className="tagline">makes you <s>fit</s> healthy.</p>
                </div>
                    <form onSubmit={submitHandler}>

                        <label htmlFor="email">
                            {/* <p>Email Address<sup>*</sup></p> */}
                            <input
                                required
                                type="text"
                                value={formData.email}
                                onChange={changeHandler}
                                placeholder="E-mail*"
                                id="email"
                                name="email"
                            />
                        </label>
                        <br />

                        <label htmlFor="password" className="label">
                            {/* <p>Password<sup>*</sup></p> */}
                        
                            <input
                                required
                                type={showPassword ? ("text") : ("password")}
                                value={formData.password}
                                onChange={changeHandler}
                                placeholder="Password*"
                                id="password"
                                name="password"
                            />
                            <span className="eyeIcon" onClick={() => setShowPassword((prev) => !prev)}>
                                {
                                    showPassword ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)
                                }
                            </span>

                            {/* <Link to="#">
                                <p>Forgot Password</p>
                            </Link> */}

                        </label>

                        <br /> <br />

                        <button className="signin-button">
                            Sign In 
                        </button>
                    </form>
                    <br />
                        <span className="last">Don't have an account? </span> <a href="#">Signup</a>
                </div>
            </div>
        </div>
        
    );
}

export default LoginForm;