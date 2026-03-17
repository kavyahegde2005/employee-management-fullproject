import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <nav className="bg-white shadow-sm px-8 py-3 flex items-center justify-between">

            <div className="flex items-center gap-2">
                <svg
                    className="w-7 h-7 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>

                <h1 className="text-lg font-semibold text-gray-800">
                    {props.title}
                </h1>
            </div>
            <div className="flex gap-4">

                {!isLoggedIn ? (
                    <>
                        <Link to="/login">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium">
                                Login
                            </button>
                        </Link>

                        <Link to="/register">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium">
                                Register
                            </button>
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-medium"
                    >
                        Logout
                    </button>
                )}

            </div>

        </nav>
    );
}