import { useState, useEffect, createContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Authpage from "./Pages/Authpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Home from "./Pages/Home";
import Form from "./Pages/Form";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import Preview from "./Pages/Preview";
import JobDashBoard from "./Pages/JobDashBoard";
import Quiz from "./Pages/Quiz"

//remaining work for tommorow
// login user sign up with frontend
//create resume
//fetch all resume
//update user details

export const context = createContext();
function App() {
  const [user, setUser] = useState(null);
  const [res, setres] = useState(null);

  return (
    <div className="bg-zinc-800 h-screen w-screen sidebar">
      <context.Provider value={{ user, setUser, res, setres }}>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Authpage />} />
            <Route path="/" element={<HomePage />}>
              <Route index element={<Home></Home>}></Route>
              <Route path="settings" element={<Settings></Settings>}></Route>
              <Route path="form" element={<Form></Form>}></Route>
              <Route path="profile" element={<Profile></Profile>}></Route>
              <Route path="preview/:id" element={<Preview></Preview>}></Route>
              <Route path="job" element={<JobDashBoard></JobDashBoard>}></Route>
              <Route path="quiz" element={<Quiz></Quiz>}></Route>
              
            </Route>
          </Routes>
        </BrowserRouter>
      </context.Provider>
    </div>
  );
}

export default App;
