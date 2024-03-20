import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Register/Login";
import Signup from "./pages/Register/Signup";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import EditUserDetails from "./pages/User/EditUserDetails";
import EditExpenses from "./pages/Expense/EditExpenses";
import AddExpenses from "./pages/Expense/AddExpenses";
import AddIncome from "./pages/Income/AddIncome";
import EditSavings from "./pages/Saving/EditSavings";
import AddSaving from "./pages/Saving/AddSaving";
import EditIncomes from "./pages/Income/EditIncomes";
import NotFound from "./pages/Others/NotFound";
import LandingPage from "./pages/Others/LandingPage";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route path="/user/dashboard/:id" element={<Dashboard />} />

            <Route path="/user/edit-user-profile/:id" element={<EditUserDetails />} />
            <Route path="/user/edit-expenses/:id/:expenseId" element={<EditExpenses />} />
            <Route path="/user/edit-savings/:id/:savingId" element={<EditSavings />} />
            <Route path="/user/edit-incomes/:id/:incomeId" element={<EditIncomes />} />

            <Route path="/user/add-new-expense/:id" element={<AddExpenses />} />
            <Route path="/user/add-new-income/:id" element={<AddIncome />} />
            <Route path="/user/add-new-saving/:id" element={<AddSaving />} />
          </Route>
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
