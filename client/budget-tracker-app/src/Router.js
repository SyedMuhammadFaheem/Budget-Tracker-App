import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import EditUserDetails from "./pages/EditUserDetails";
import EditExpenses from "./pages/EditExpenses";
import AddExpenses from "./pages/AddExpenses";
import AddIncome from "./pages/AddIncome";
import EditSavings from "./pages/EditSavings";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route path="/user/dashboard/:id" element={<Dashboard />} />
            <Route path="/user/edit-user-profile/:id" element={<EditUserDetails />} />
            <Route path="/user/edit-expenses/:id" element={<EditExpenses />} />
            <Route path="/user/edit-savings/:id" element={<EditSavings />} />
            <Route path="/user/add-new-expense/:id" element={<AddExpenses />} />
            <Route path="/user/add-new-income/:id" element={<AddIncome />} />
          </Route>
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
