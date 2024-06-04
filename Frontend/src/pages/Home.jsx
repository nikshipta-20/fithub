import React from 'react'

import Navbar from '../components/Navbar';
import Intro from "../components/Intro";
import Footer from "../components/Footer";
import Categories from '../components/Categories';
import Slider2 from '../components/Slider2';

function Home() {

    return (
        <div>
            <Navbar/>
            <Intro/>
            <Slider2 /> 
            <Categories />
            <Footer /> 
            
        </div>
    );
}

export default Home;
