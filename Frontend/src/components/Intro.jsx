import React, { useState } from "react";
import { FaFireAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GiWeightScale } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import './Intro.css';
import { FaUserGroup } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";


function Intro() {

    const style1 = {
        '--i' : 1,
    }

    const style2 = {
        '--i' : 2,
    }

    const style3 = {
        '--i' : 3,
    }

    const style4 = {
        '--i' : 4,
    }

    const style5 = {
        '--i' : 5,
    }

    const style6 = {
        '--i' : 6,
    }

    const style7 = {
        '--i' : 7,
    }

    const style8 = {
        '--i' : 8,
    }

    const [activeElement, setActiveElement] = useState(null);

    const handleClick = (id) => {
        setActiveElement(id);
    }

    const [isOpenPopup, setIsOpenPopup] = useState(false);

    function clickHandler1() {
        console.log("clicked icon");
        setIsOpenPopup(true);
    }

    return (
        <div className="intro">

            <div className="intro-heading">
                <h1>Explore the<br/> <span className="intro-span">Fitter</span> version<br/> of you</h1>
            </div>

            <div className="intro-circle-container">
                <div className="intro-icon">
                    
                    <div onClick={clickHandler1} className="imgBx active" style={style1}>
                        <div className="intro-img">
                            <IoMail />  {/* mail a friend */}
                        </div>
                    </div>
                    <div onClick={clickHandler1} className="imgBx" style={style2}>
                        <div className="intro-img">
                            <FaArrowTrendUp />  {/* time u did */}
                        </div>
                    </div>
                    <div onClick={clickHandler1} className="imgBx" style={style3}>
                        <div className="intro-img">   {/* calories */}
                            <FaFireAlt />
                        </div>
                    </div>
                    <div onClick={clickHandler1} className="imgBx" style={style4}>
                        <div className="intro-img">   {/* bmi */ }
                            <GiWeightScale />
                        </div>
                    </div>
                    <div onClick={clickHandler1} className="imgBx" style={style5}>
                        <div className="intro-img">      {/* personal trainer */}
                            <CgGym />
                        </div>
                    </div>
                    <div onClick={clickHandler1} className="imgBx" style={style6}>
                        <div className="intro-img">
                            <FaUserGroup /> {/* groups */}
                        </div>
                    </div>
                    <div onClick={clickHandler1} className="imgBx" style={style7}>
                        <div className="intro-img">
                            <FaFireAlt />       
                        </div>
                    </div>
                    <div onClick={clickHandler1}className="imgBx" style={style8}>
                        <div className="intro-img">
                        <MdPerson />     {/* bio */}
                        </div>
                    </div>
                    <div className="intro-circle">
                    </div>
                </div>
                
                
            </div>

            {/* <div>
            {
                isOpenPopup && <Popup setIsOpenPopup={setIsOpenPopup} />
            }
            </div> */}
            
        </div>
    );
}

export default Intro;