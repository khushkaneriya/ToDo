import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { toast } from "react-toastify";

export function LoginPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    // 1. Update state dynamically on user typing
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, credentials: "" }));

    };
    // 2. Validate input constraints on submission          
    const validateForm = () => {
        let newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // returns true if no errors  
    };


    const handleLogin = (e) => {
        e.preventDefault();
        if (validateForm()) {
            let registeredUser;
            try {
                const savedUser = JSON.parse(localStorage.getItem("todo-user"));
                const emailMatches =
                    typeof savedUser?.email === "string" &&
                    savedUser.email.trim().toLowerCase() === formData.email.trim().toLowerCase();
                const passwordMatches = savedUser?.password === formData.password;
                registeredUser = emailMatches || passwordMatches ? savedUser : null;
            } catch {
                registeredUser = null;
            }

            if (!registeredUser) {
                setErrors((prev) => ({
                    ...prev,
                    credentials: "No registered account found. Please create an account first.",
                }));
                return;
            }

            const emailMatches = registeredUser.email?.trim().toLowerCase() === formData.email.trim().toLowerCase();
            const passwordMatches = registeredUser.password === formData.password;

            if (!emailMatches || !passwordMatches) {
                setErrors((prev) => ({ ...prev, credentials: "Email or password is incorrect." }));
                return;
            }

            localStorage.setItem("Login-user", JSON.stringify({ email: registeredUser.email }));
            setFormData({ email: "", password: "" });
            setErrors({});
            toast.success("Login successful!");
            navigate("/");
            
        }
    };

    
    return (
        <div className="login-page">

            <div className="login-box">

                <h1>LOGIN</h1>

                <p>Welcome back !!</p>

                <form onSubmit={handleLogin}>
                    {errors.credentials && <p className="login-error" role="alert">{errors.credentials}</p>}


                    <div className="form-group">
                        <label>Email Address:</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p style={{ color: "red", margin: "4px 0", textAlign:"start" }}>{errors.email}</p>}

                    </div>


                    <div className="form-group">
                        <label>Password:</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p style={{ color: "red", margin: "4px 0", textAlign:"start" }}>{errors.password}</p>}

                    </div>


                    <button type="submit" className="login-btn">
                        Login
                    </button>

                    <p className="switch">
                        New here? <NavLink to="/register">Create an account</NavLink>
                    </p>

                </form>

            </div>

        </div>
    );
}

