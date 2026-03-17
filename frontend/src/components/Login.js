import { useState } from "react";
import { Eye, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [role, setRole] = useState("admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/login/", {
                username: email,
                password,
                role,
            });

            console.log(response.data);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("role", role);
            localStorage.setItem("employee_id", response.data.id);

            alert("Login successful!");
            if (role === "admin") {
                navigate("/dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            console.error(error);
            const msg = error.response?.data ? JSON.stringify(error.response.data) : error.message;
            alert("Login failed: " + msg);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-[400px]">

                <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
                <p className="text-center text-gray-500 mb-6">
                    Welcome! Please login to continue
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                        <button
                            type="button"
                            onClick={() => setRole("admin")}
                            className={`flex-1 py-2 rounded-lg ${role === "admin"
                                ? "bg-blue-600 text-white"
                                : "text-gray-600"
                                }`}
                        >
                            Admin
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole("employee")}
                            className={`flex-1 py-2 rounded-lg ${role === "employee"
                                ? "bg-blue-600 text-white"
                                : "text-gray-600"
                                }`}
                        >
                            Employee
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Email</label>
                        <div className="flex items-center border rounded-lg px-3 mt-1">
                            <User className="text-gray-400 w-4 h-4" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 outline-none"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="text-sm text-gray-600">Password</label>
                        <div className="flex items-center border rounded-lg px-3 mt-1">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 outline-none"
                            />
                            <Eye className="text-gray-400 w-4 h-4" />

                        </div>
                    </div>


                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                        Login →
                    </button>

                    <div className="text-center mt-4 text-sm">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/register">
                                <span className="text-blue-600 cursor-pointer">
                                    Register Here
                                </span>
                            </Link>
                        </p>

                    </div>
                </form>
            </div>
        </div>
    );
}