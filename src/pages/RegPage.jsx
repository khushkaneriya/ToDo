import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./RegPage.css";
import { toast } from "react-toastify";

export function RegPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (validateForm()) {
            localStorage.setItem("todo-user", JSON.stringify(formData));
            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            toast.success("Registration successful!.")
            navigate("/login");
        }
    };

    return (
        <div className="register-page">
            <div className="register-box">
                <h1>REGISTER</h1>
                <p>Create your account</p>

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Full Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                        {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                    </div>

                    <div className="form-group">
                        <label>Email Address:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>

                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                    </div>

                    <button type="submit" className="register-btn">
                        Register
                    </button>

                    <p className="switch">
                        You have an account? <NavLink to="/login">Login</NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
}
