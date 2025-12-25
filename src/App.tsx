
  import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";


import DashBoard from "./pages/dashboard/DashBoard";
import DashBoardLayout from "./components/layouts/DashBoardLayout";
import LoginForm from "./pages/auth/LoginForm";
import SignupForm from "./pages/auth/SignupForm";
import { AppContext } from "./Context/AppContext";
import { useContext } from "react";
import Home from "./pages/Home";


function App() {
    const { user } = useContext(AppContext);
  return (




<BrowserRouter>
  <div className="App">
    <Routes>

     
      <Route path="/" element={<Home/>} />

      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />

      {/* Dashboard routes */}
      <Route path="/dashboard" element={<DashBoardLayout />}>
        <Route
          index
          element={user ? <DashBoard /> : <SignupForm />}
        />
      </Route>

    </Routes>
  </div>
</BrowserRouter>


    

   
  );
}

export default App;