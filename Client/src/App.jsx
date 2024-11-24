import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import AddUserForm from "./Components/AddUserForm/AddUserForm";
import AllUsers from "./Components/AllUsers/AllUsers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const api = "http://localhost:8000";
const api="https://rbac-backend-8310.onrender.com"

function App() {
  return (
    <Router>
      <div>
        <ToastContainer theme="colored" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard api={api} />} />
            <Route path="/form" element={<AddUserForm api={api}/>} />
            <Route path="/alluser" element={<AllUsers api={api}/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
