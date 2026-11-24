import "./Navbar.css"

import React, { useContext, useState } from "react";

import { BsCloudSunFill } from "react-icons/bs";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaCheckSquare } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import { ConfirmationModal } from "./ConfirmationModal";
import { toast } from "react-toastify";

export function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const navigate = useNavigate();
  console.log("Navbar renders")

  const handleLogout = () => {
    localStorage.removeItem("Login-user");
    navigate("/login");
    toast.success("Logged out successfully!")
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo-text">TODO</span>
        <span className="logo-icon"><FaCheckSquare /></span>
      </div>

      <ul className="navbar-links">
        <NavLink to={'/'} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to={'/about'} className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
        <NavLink to={'/alltodos'} className={({ isActive }) => isActive ? 'active' : ''}>All Todos</NavLink>
      </ul>

      <div className="navbar-right">
        <button
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          className="theme-toggle sun-icon"
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          type="button"
        >
          {theme === "dark" ? <BsCloudSunFill /> : <BsMoonStarsFill />}
        </button>
        <button className="logout-btn" onClick={() => setShowLogoutDialog(true)}>Logout</button>
      </div>

      {showLogoutDialog && (
        <ConfirmationModal
          confirmLabel="Logout"
          message="Are you sure you want to logout?"
          onCancel={() => setShowLogoutDialog(false)}
          onConfirm={handleLogout}
        />    
      )}
    </nav>
  );
}