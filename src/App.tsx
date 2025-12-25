
  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" replace /> : <Navigate to="/signup" replace />
          }
        />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        <Route path="/dashboard" element={<DashBoardLayout />}>
          <Route
            index
            element={user ? <DashBoard /> : <Navigate to="/login" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>


    

   
  );
}

export default App;