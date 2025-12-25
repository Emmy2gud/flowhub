import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";


import DashBoard from "./pages/dashboard/DashBoard";
import DashBoardLayout from "./components/layouts/DashBoardLayout";
import LoginForm from "./pages/auth/LoginForm";
import SignupForm from "./pages/auth/SignupForm";
import { AppContext } from "./Context/AppContext";
import { useContext } from "react";


function App() {
    const { user } = useContext(AppContext);
  return (


      <BrowserRouter>
        <div className="App">
          <Routes>
       
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            
            {/* Dashboard routes inside DashboardLayout */}
            <Route path="/dashboard" element={<DashBoardLayout /> }>
              <Route index element={user?<DashBoard />:<SignupForm />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>

    

   
  );
}

export default App;