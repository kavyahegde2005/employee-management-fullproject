import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div
            className="min-h-screen flex items-center px-20"
            style={{
                backgroundImage: "url('/images/img.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="bg-white/80 p-10 rounded-xl">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">
                    Welcome to Employee <br /> Management System
                </h1>

                <p className="text-lg text-gray-600 mb-8 max-w-xl">
                    Easily manage employees and track salaries
                    with our simple dashboard
                </p>

                <div className="flex gap-4">
                    <Link to="/login">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow">
                            Login
                        </button>
                    </Link>

                    <Link to="/register">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg shadow">
                            Register
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}