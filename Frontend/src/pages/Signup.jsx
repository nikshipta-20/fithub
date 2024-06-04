import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from "react-hot-toast";
import './Signup.css';
import loginImage from '../assets/login-image.jpg'
import google from "../assets/google.jpg";
import { Link } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    function submitHandler(event) {
        event.preventDefault();
        // console.log(formData);
        // setIsLoggedIn(true);
        toast.success("Signed up succesfully!");
    }

    const [formData, setFormData] = useState({
        sfname: "",
        slname: "",
        semail:"",
        spassword:"",
        sconfirmpassword: "",
        sdateofbirth: "",
        sgender: "",
        sheight: "",
        sweight: "",
    })

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [div1, setDiv1] = useState(true);
    const [div2, setDiv2] = useState(false);
    const [div3, setDiv3] = useState(false);

    const div1Style = {
        display: (div1) ? "block" : "none"
    }
    const div2Style = {
        display: (div2) ? "block" : "none"
    }
    const div3Style = {
        display: (div3) ? "block" : "none"
    }

    function nextHandler1(event) {
        event.preventDefault();
        setDiv1(false);
        setDiv2(true);
        setDiv3(false);
    }

    function nextHandler2(event) {
        if(formData.spassword !== formData.sconfirmpassword){
            alert("Passwords not matching!");
        }
        else{
            event.preventDefault();
            setDiv1(false);
            setDiv2(false);
            setDiv3(true);
        }
    }

    function backHandler2(event){
        setDiv2(false);
        setDiv1(true);
        setDiv3(false);
    }

    function backHandler3(event){
        setDiv2(true);
        setDiv1(false);
        setDiv3(false);
    }

    // function changeHandler(event) {
    //     setFormData((prev) => (
    //         {
    //             ...prev, [event.target.name]:event.target.value
    //         }
    //     ))
    // }

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    

    async function submitHandler(event) {
        event.preventDefault();
        console.log(formData);
    
        try {
            const response = await fetch('http://localhost:5555/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Signup successful
                console.log(data); // Log the response from the backend
                toast.success("Signed up successfully");
                navigate("/signin");

            } else {
                // Signup failed
                toast.error(data.message || "Failed to sign up");
            }
        } catch (error) {
            console.error("Error occurred during signup:", error);
            toast.error("Failed to sign up");
        }
    }
    

    return (
        // <Template 
        //     formType="signup"
        //     setIsLoggedIn={setIsLoggedIn}
        // />

        <div className="scontainer">
            <div className="signup-container">
                

                <div className="signup">
                    <div className="sheading">
                        <h1>Join the Hub!</h1>
                        <p className="tagline">call it FitHub</p>
                    </div>
                    <form>

                        <div>
                            <div className="div1" style={div1Style}>
                                { /* first name, last name, email */ }

                                { /* first name */ }
                                <label htmlFor="sfname">
                                    First Name*<br/>
                                    <input 
                                        required
                                        type="text"
                                        value={formData.sfname}
                                        onChange={changeHandler}
                                        placeholder="e.g.; Jamie"
                                        id="sfname"
                                        name="sfname"
                                    />
                                </label>
                                <br/>

                                { /* last name */ }
                                <label htmlFor="slname">
                                    Last Name<br/>
                                    <input 
                                        type="text"
                                        value={formData.slname}
                                        onChange={changeHandler}
                                        placeholder="e.g.; Smith"
                                        id="slname"
                                        name="slname"
                                    />
                                </label>
                                <br/>

                                { /* email */ }
                                <label htmlFor="semail">
                                    E-mail*<br/>
                                    <input
                                        required
                                        type="email"
                                        value={formData.semail}
                                        onChange={changeHandler}
                                        placeholder="jamie1202@gmail.com"
                                        id="semail"
                                        name="semail"
                                    />
                                </label>
                                <br /> <br/>

                                <div className="buttons">
                                    <button className="back-button" id="back1">Back</button>
                                    <button className="next-button" id="next1" onClick={nextHandler1}>Next</button>
                                </div>
                            </div>

                            <div className="div2" style={div2Style}>
                                { /* password, confirm password */ }
                                <label htmlFor="spassword" className="label">                        
                                    <input
                                        required
                                        type={showPassword1 ? ("text") : ("password")}
                                        value={formData.spassword}
                                        onChange={changeHandler}
                                        placeholder="Password*"
                                        id="spassword"
                                        name="spassword"
                                    />
                                    <span className="eyeIcon" onClick={() => setShowPassword1((prev) => !prev)}>
                                        {
                                            showPassword1 ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)
                                        }
                                    </span>
                                </label>

                                <label htmlFor="sconfirmpassword" className="label">                      
                                    <input
                                        required
                                        type={showPassword2 ? ("text") : ("password")}
                                        value={formData.sconfirmpassword}
                                        onChange={changeHandler}
                                        placeholder="Confirm Password*"
                                        id="sconfirmpassword"
                                        name="sconfirmpassword"
                                    />
                                    <span className="eyeIcon" onClick={() => setShowPassword2((prev) => !prev)}>
                                        {
                                            showPassword2 ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)
                                        }
                                    </span>
                                </label>
                                <br/><br/>
                                <div className="buttons">
                                    <button className="back-button" id="back2" onClick={backHandler2}>Back</button>
                                    <button className="next-button" id="next2" onClick={nextHandler2}>Next</button>
                                </div>
                            </div>

                            <div className="div3" style={div3Style}>
                                { /* let's know more about you! */ }
                                { /* date of birth, gender, height, weight */ }
                                <label htmlFor="sdateofbirth">Date of Birth*<br/>
                                    <input 
                                        required
                                        type="date"
                                        value={formData.sdateofbirth}
                                        onChange={changeHandler}
                                        placeholder="Date of Birth*"
                                        id="sdateofbirth"
                                        name="sdateofbirth"
                                    />
                                </label>
                                <br/>

                                <label htmlFor="sheight">Height*<br/>
                                    <input 
                                        required
                                        type="number"
                                        value={formData.sheight}
                                        onChange={changeHandler}
                                        placeholder="Height in cms"
                                        id="sheight"
                                        name="sheight"
                                    />
                                </label>
                                <br/>

                                <label htmlFor="sweight">Weight*<br/>
                                    <input 
                                        required
                                        type="number"
                                        value={formData.sweight}
                                        onChange={changeHandler}
                                        placeholder="Weight in kgs"
                                        id="sweight"
                                        name="sweight"
                                    />
                                </label>
                                <br/>

                                <label htmlFor='sgender'>
                                    <select
                                        required
                                        id="sgender"
                                        onChange={changeHandler}
                                        value={formData.sgender}
                                        name="sgender"
                                        // className='input-box'
                                        >
                                        <option value="">Choose Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </label> 
                                <br/><br/>
                                <div className="buttons">
                                    <button className="back-button" id="back3" onClick={backHandler3}>Back</button>
                                    <button className="signin-button" onClick={submitHandler}>Create Account</button>
                                </div>

                                
                            </div>                           

                            <br /> <br />
                        </div>

                        {/* <button className="signin-button">
                            Create Account  
                        </button> */}
                    </form>
                    <br />
                    {/* <div className="google">
                        <button className="google-login">
                            <img className="google-logo" src={google} height="5px" width="5px" />
                            Sign up with Google
                        </button>
                    </div> */}
                </div>
            </div>
        </div>

    );
}

export default Signup;
