import { useState } from "react"
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Exercise from './pages/Exercise'
import Workout from './pages/Workout'
import LoginForm from './pages/LoginForm'
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import MyPrograms from "./pages/MyPrograms"
import OpenProgram from "./pages/OpenProgram"
import MyGroups from "./pages/MyGroups"
import CreateGroup from "./pages/CreateGroup"
import VideoCall from "./pages/VideoCall"
import ProgramPreview from "./pages/ProgramPreview"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/exercise/:type' element={<Exercise />} />
      <Route path='/workout/:name' element={<Workout />} />
      <Route path='/signin' element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}/>
      <Route path='/signup' element={<Signup />} />
      <Route path='/profile' element={<Profile/>}/>
      <Route path="/addProgram/:pid/:userID" element={<ProgramPreview />} /> 
      <Route path="/myprograms" element={<MyPrograms />}/>
      <Route path="/openProgram/:user/:pid" element={<OpenProgram />}/>
      <Route path="/myGroups" element={<MyGroups/>}/>
      <Route path="/createGroup" element={<CreateGroup/>}/>
      <Route path="/videocall" element={<VideoCall/>}/>

    </Routes>
    // <Home/>
  )
}

export default App


